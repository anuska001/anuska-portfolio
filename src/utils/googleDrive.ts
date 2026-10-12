/**
 * Google Drive & Google Docs / Slides Embed URL Utilities
 * Converts standard sharing links into embeddable preview URLs
 */

export function extractUrlFromInput(input: string): string {
  if (!input) return '';
  const trimmed = input.trim();
  
  // If user pasted an entire iframe tag, extract the src attribute
  const iframeMatch = trimmed.match(/src=["']([^"']+)["']/i);
  if (iframeMatch && iframeMatch[1]) {
    return iframeMatch[1];
  }

  return trimmed;
}

export function getGoogleDriveEmbedUrl(rawUrl: string): string {
  const url = extractUrlFromInput(rawUrl);
  if (!url) return '';

  try {
    // 1. Google Slides published to web (docs.google.com/presentation/d/e/{published_id}/...)
    const publishedSlidesMatch = url.match(/docs\.google\.com\/presentation\/d\/e\/([a-zA-Z0-9_-]+)/);
    if (publishedSlidesMatch && publishedSlidesMatch[1]) {
      const pubId = publishedSlidesMatch[1];
      return `https://docs.google.com/presentation/d/e/${pubId}/embed?start=false&loop=false&delayms=3000`;
    }

    // 2. Standard Google Slides (docs.google.com/presentation/d/{id}/...)
    const slidesMatch = url.match(/docs\.google\.com\/presentation\/d\/([a-zA-Z0-9_-]+)/);
    if (slidesMatch && slidesMatch[1]) {
      const presentationId = slidesMatch[1];
      return `https://docs.google.com/presentation/d/${presentationId}/embed?start=false&loop=false&delayms=3000`;
    }

    // 2. Google Docs (docs.google.com/document/d/{id}/...)
    const docsMatch = url.match(/docs\.google\.com\/document\/d\/([a-zA-Z0-9_-]+)/);
    if (docsMatch && docsMatch[1]) {
      const docId = docsMatch[1];
      return `https://docs.google.com/document/d/${docId}/preview`;
    }

    // 3. Google Sheets (docs.google.com/spreadsheets/d/{id}/...)
    const sheetsMatch = url.match(/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
    if (sheetsMatch && sheetsMatch[1]) {
      const sheetId = sheetsMatch[1];
      return `https://docs.google.com/spreadsheets/d/${sheetId}/preview`;
    }

    // 4. Standard Google Drive File Link (drive.google.com/file/d/{id}/...)
    const driveFileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveFileMatch && driveFileMatch[1]) {
      const fileId = driveFileMatch[1];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }

    // 5. Query param format (drive.google.com/open?id={id} or /uc?id={id})
    const driveQueryMatch = url.match(/drive\.google\.com\/(?:open|uc)\?(?:[^&]*&)*id=([a-zA-Z0-9_-]+)/);
    if (driveQueryMatch && driveQueryMatch[1]) {
      const fileId = driveQueryMatch[1];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }

    // If it's already an embed/preview URL or another hosted presentation URL, return as-is
    return url;
  } catch {
    return url;
  }
}

/**
 * Returns a clean, direct web URL for opening the file in a new browser tab
 */
export function getDirectOpenUrl(rawUrl: string): string {
  const url = extractUrlFromInput(rawUrl);
  if (!url) return '';

  // If it's a preview URL, we can link to the standard view or keep the original
  return url;
}

/**
 * Detects if the link is from Google Drive / Google Docs / Google Slides
 */
export function isGoogleDriveService(url: string): boolean {
  if (!url) return false;
  return /drive\.google\.com|docs\.google\.com/.test(url);
}

/**
 * Returns a proxy URL that streams all slides exported as a high-resolution PDF
 * enabling continuous vertical slide stacking without needing next/previous buttons.
 */
export function getGoogleDrivePdfStreamUrl(rawUrl: string): string {
  const url = extractUrlFromInput(rawUrl);
  if (!url) return '';
  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${baseUrl}api/drive-pdf?url=${encodeURIComponent(url)}`;
}

