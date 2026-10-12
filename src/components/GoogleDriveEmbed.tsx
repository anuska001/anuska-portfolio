import { useState } from 'react';
import { getGoogleDrivePdfStreamUrl, getGoogleDriveEmbedUrl } from '../utils/googleDrive';
import { PdfViewer } from './PdfViewer';

interface GoogleDriveEmbedProps {
  url: string;
  title: string;
}

export function GoogleDriveEmbed({ url, title }: GoogleDriveEmbedProps) {
  const [proxyFailed, setProxyFailed] = useState(false);
  const pdfStreamUrl = getGoogleDrivePdfStreamUrl(url);
  const fallbackEmbedUrl = getGoogleDriveEmbedUrl(url);

  if (proxyFailed) {
    return (
      <div className="w-full relative rounded-xl overflow-hidden shadow-2xl bg-[#0E0E11] aspect-[16/9] border border-white/[0.08]">
        <iframe
          src={fallbackEmbedUrl}
          title={title}
          className="w-full h-full border-0 rounded-xl"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Renders all slides vertically altogether; falls back to responsive embed if static hosting has no proxy */}
      <PdfViewer
        url={pdfStreamUrl}
        title={title}
        onError={() => setProxyFailed(true)}
      />
    </div>
  );
}
