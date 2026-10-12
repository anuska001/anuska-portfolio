import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import https from 'node:https';
import http from 'node:http';
import {defineConfig} from 'vite';

function streamGooglePdf(targetUrl: string, res: any, hops = 0) {
  if (hops > 5) {
    res.statusCode = 502;
    res.end('Too many redirects');
    return;
  }
  const client = targetUrl.startsWith('https:') ? https : http;
  client.get(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (upstream) => {
    if (upstream.statusCode && upstream.statusCode >= 300 && upstream.statusCode < 400 && upstream.headers.location) {
      streamGooglePdf(upstream.headers.location, res, hops + 1);
      return;
    }
    if (upstream.statusCode && upstream.statusCode >= 400) {
      res.statusCode = upstream.statusCode;
      res.end(`Upstream error: ${upstream.statusCode}`);
      return;
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Cache-Control', 'public, max-age=60');
    upstream.pipe(res);
  }).on('error', (err) => {
    res.statusCode = 500;
    res.end(`Proxy error: ${err.message}`);
  });
}

function resolveGooglePdfDownloadUrl(rawUrl: string): string {
  if (!rawUrl) return '';
  // Google Slides (presentation/d/{id}/...)
  const slidesMatch = rawUrl.match(/docs\.google\.com\/presentation\/d(?:\/e)?\/([a-zA-Z0-9_-]+)/);
  if (slidesMatch && slidesMatch[1]) {
    return `https://docs.google.com/presentation/d/${slidesMatch[1]}/export/pdf`;
  }
  // Google Drive File (drive.google.com/file/d/{id}/...)
  const driveFileMatch = rawUrl.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveFileMatch && driveFileMatch[1]) {
    return `https://drive.google.com/uc?export=download&id=${driveFileMatch[1]}`;
  }
  // Query param id
  const queryMatch = rawUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (queryMatch && queryMatch[1]) {
    return `https://drive.google.com/uc?export=download&id=${queryMatch[1]}`;
  }
  return rawUrl;
}

export default defineConfig(() => {
  const middlewareHandler = (req: any, res: any, next: any) => {
    const rawUrl = req.url || '';
    const decodedUrl = decodeURIComponent(rawUrl);

    // 1. Google Drive / Slides live PDF stream proxy
    if (decodedUrl.includes('/api/drive-pdf')) {
      try {
        const parsed = new URL(rawUrl, 'http://localhost:3000');
        const target = parsed.searchParams.get('url') || parsed.searchParams.get('id') || '';
        if (target) {
          const downloadUrl = resolveGooglePdfDownloadUrl(target);
          streamGooglePdf(downloadUrl, res);
          return;
        }
      } catch (err: any) {
        res.statusCode = 400;
        res.end(`Invalid request: ${err.message}`);
        return;
      }
    }

    // 2. Local case-studies/ PDF files
    const match = decodedUrl.match(/(?:\/anuska-portfolio)?\/case-studies\/(.+)$/);
    if (match) {
      const filename = match[1].split('?')[0].split('#')[0];
      const filePath = path.resolve(process.cwd(), 'case-studies', filename);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
        res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(filename)}"`);
        fs.createReadStream(filePath).pipe(res);
        return;
      }
    }
    next();
  };

  return {
    base: '/anuska-portfolio/',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'serve-case-studies',
        configureServer(server: any) {
          server.middlewares.use(middlewareHandler);
        },
        configurePreview(server: any) {
          server.middlewares.use(middlewareHandler);
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || process.cwd(), '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
