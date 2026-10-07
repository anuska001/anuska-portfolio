import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { Loader2, AlertCircle } from 'lucide-react';

// Configure the worker for PDF.js using the minified worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
}

interface PdfViewerProps {
  url: string;
  title?: string;
}

interface PdfPageCanvasProps {
  pdfDoc: any;
  pageNum: number;
  containerWidth: number;
}

function PdfPageCanvas({ pdfDoc, pageNum, containerWidth }: PdfPageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<any>(null);
  const renderedWidthRef = useRef<number>(0);
  const [aspectRatio, setAspectRatio] = useState<number>(16 / 9);
  const [isRendered, setIsRendered] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;
    if (!pdfDoc || !canvasRef.current || containerWidth <= 0) return;

    // Avoid unnecessary re-renders on minor subpixel or scrollbar shifts
    if (
      renderedWidthRef.current > 0 &&
      Math.abs(containerWidth - renderedWidthRef.current) < 80
    ) {
      return;
    }

    const render = async () => {
      try {
        if (renderTaskRef.current) {
          try {
            renderTaskRef.current.cancel();
          } catch {
            // Rendering cancel is safe to ignore
          }
        }

        const page = await pdfDoc.getPage(pageNum);
        if (isCancelled) return;

        const unscaledViewport = page.getViewport({ scale: 1 });
        const ratio = unscaledViewport.width / unscaledViewport.height;
        setAspectRatio(ratio);

        // High resolution target:
        // Use at least 2560px (native master slide width) or 2.5x container width for 4K/retina sharpness
        const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
        const targetRenderWidth = Math.max(containerWidth * Math.max(dpr, 2.0), 2560);
        const renderScale = Math.max(targetRenderWidth / unscaledViewport.width, 1.0);

        const viewport = page.getViewport({ scale: renderScale });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d', { alpha: false });
        if (!context) return;

        canvas.width = Math.round(viewport.width);
        canvas.height = Math.round(viewport.height);
        canvas.style.width = '100%';
        canvas.style.height = 'auto';

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';

        const renderContext = {
          canvasContext: context,
          viewport,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;
        await renderTask.promise;

        if (!isCancelled) {
          renderedWidthRef.current = containerWidth;
          setIsRendered(true);
        }
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error(`Page ${pageNum} render error:`, err);
        }
      }
    };

    render();

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // Ignore
        }
      }
    };
  }, [pdfDoc, pageNum, containerWidth]);

  return (
    <div
      className="w-full relative overflow-hidden rounded-xl shadow-2xl bg-[#0E0E11]"
      style={{
        aspectRatio: `${aspectRatio}`,
        transform: 'translateZ(0)', // Force GPU composite layer for 60/120fps smooth scrolling
        backfaceVisibility: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-auto block rounded-xl bg-transparent"
        style={{
          aspectRatio: `${aspectRatio}`,
          opacity: isRendered ? 1 : 0.9,
          transition: 'opacity 0.25s ease-out',
        }}
      />
    </div>
  );
}

export function PdfViewer({ url }: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Measure container width responsively with threshold to prevent scroll jitter
  useEffect(() => {
    if (!containerRef.current) return;

    let rafId: number | null = null;
    const updateWidth = (measured: number) => {
      if (measured > 0) {
        setContainerWidth((prev) => {
          // If within 24px (e.g. scrollbar toggle or scroll flutter), do not re-render
          if (prev > 0 && Math.abs(prev - measured) < 24) return prev;
          return Math.round(measured);
        });
      }
    };

    if (containerRef.current.clientWidth > 0) {
      setContainerWidth(Math.round(containerRef.current.clientWidth));
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          if (rafId) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            updateWidth(entry.contentRect.width);
          });
        }
      }
    });

    resizeObserver.observe(containerRef.current);

    const onWindowResize = () => {
      if (containerRef.current) {
        updateWidth(containerRef.current.clientWidth);
      }
    };

    window.addEventListener('resize', onWindowResize);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', onWindowResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Fetch the PDF document
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);

    const loadDocument = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch PDF (${response.status} ${response.statusText})`);
        }
        const arrayBuffer = await response.arrayBuffer();
        if (isCancelled) return;

        const loadingTask = pdfjsLib.getDocument({
          data: new Uint8Array(arrayBuffer),
        });

        const doc = await loadingTask.promise;
        if (!isCancelled) {
          setPdfDoc(doc);
          setTotalPages(doc.numPages);
          setLoading(false);
        }
      } catch (err: any) {
        if (!isCancelled) {
          console.error('Failed to load PDF document:', err);
          setError(err?.message || 'Failed to load PDF document.');
          setLoading(false);
        }
      }
    };

    loadDocument();

    return () => {
      isCancelled = true;
    };
  }, [url]);

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-4 py-1">
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-[#A39E93]">
          <Loader2 className="w-7 h-7 text-[#ceb573] animate-spin" />
          <p className="text-xs font-mono tracking-wider text-[#EDE9E1]">
            Rendering presentation...
          </p>
        </div>
      )}

      {error ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center text-[#A39E93] gap-2 border border-white/[0.06] rounded-xl bg-[#141418]">
          <AlertCircle className="w-7 h-7 text-rose-400" />
          <p className="text-sm font-medium text-[#EDE9E1]">Unable to display PDF preview</p>
          <p className="text-xs max-w-sm text-[#8C877D]">{error}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ceb573] text-[#0B0B0D] text-xs font-bold hover:brightness-110 transition-all"
          >
            Open PDF in New Tab
          </a>
        </div>
      ) : (
        !loading &&
        pdfDoc &&
        containerWidth > 0 &&
        Array.from({ length: totalPages }, (_, index) => (
          <PdfPageCanvas
            key={index + 1}
            pdfDoc={pdfDoc}
            pageNum={index + 1}
            containerWidth={containerWidth}
          />
        ))
      )}
    </div>
  );
}
