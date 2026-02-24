// Utility functions for video handling

/**
 * Detect if a URL is a YouTube video link.
 * Supports both full and short URLs.
 */
export const isYouTube = (url: string): boolean => {
    if (!url) return false;
    const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/;
    return ytRegex.test(url);
};

/**
 * Convert a YouTube URL to an embeddable iframe src.
 */
export const getYouTubeEmbedUrl = (url: string): string => {
    const match = url.match(/(v=|\/)([A-Za-z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[2]}` : '';
};
