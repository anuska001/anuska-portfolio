import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: '/anuska-portfolio/',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'serve-case-studies',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const rawUrl = req.url || '';
            const decodedUrl = decodeURIComponent(rawUrl);
            
            // Handle both /case-studies/... and /anuska-portfolio/case-studies/...
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
          });
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
