
import Box from '@mui/material/Box';

const isVideo = (src: string) => src?.toLowerCase().endsWith('.mp4');

const getThumbnailPath = (src: string) => {
  return src.replace(/(\.[\w\d_-]+)$/i, '_sm$1');
};

export const MediaItem = ({
  src,
  width,
  height,
  onClick,
  objectPosition,
  scale = 1,
  useThumbnail = false
}: {
  src: string,
  width: string | Record<string, string>,
  height: string | Record<string, string>,
  onClick?: () => void,
  objectPosition?: string,
  scale?: number,
  useThumbnail?: boolean
}) => {
  if (!src) return null;

  const displaySrc = useThumbnail ? getThumbnailPath(src) : src;

  const mediaStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    objectPosition: objectPosition || 'center',
    transform: `scale(${scale})`,
    display: 'block'
  };

  const containerClass = onClick ? "media-item-container clickable" : "media-item-container";

  if (isVideo(src)) {
    return (
      <Box sx={{ width, height, overflow: 'hidden', position: 'relative', display: 'block' }} onClick={onClick} className={containerClass}>
        <video
          src={displaySrc}
          className="media-item-content"
          style={mediaStyle}
          autoPlay muted loop playsInline
        />
      </Box>
    );
  }

  return (
    <Box sx={{ width, height, overflow: 'hidden', position: 'relative', display: 'block' }} onClick={onClick} className={containerClass}>
      <img
        src={displaySrc}
        className="media-item-content"
        style={mediaStyle}
        alt="project detail"
        loading="lazy"
        decoding="async"
      />
    </Box>
  );

};
