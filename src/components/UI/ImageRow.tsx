import Box from '@mui/material/Box';
import { layoutTokens } from './layoutTokens';
import { MediaItem } from './MediaItem';

export const ImageRow = ({
  h = 'std',
  layout = '100',
  src,
  indices,
  onMediaClick,
  pos1, pos2,
  scale1, scale2,
  useThumbnail = false
}: {
  h?: 'std' | 'tall' | string,
  layout?: '100' | '50-50' | '33-66' | '66-33' | string,
  src: string[],
  indices?: number[],
  onMediaClick?: (index: number) => void,
  pos1?: string, pos2?: string,
  scale1?: number, scale2?: number,
  useThumbnail?: boolean
}) => {

  // --- 1. GESTIONE ALTEZZA ---
  let height: string | Record<string, string> = h;
  if (h === 'std') height = layoutTokens.H_STD;
  else if (h === 'tall') height = layoutTokens.H_TALL;

  // --- 2. CALCOLO LARGHEZZE ---
  const getWidthObj = (desktopWidth: string) => {
    return layout === '100' ? '100%' : { xs: '100%', md: desktopWidth };
  };

  let w1: string | Record<string, string> = '100%';
  let w2: string | Record<string, string> = '0%';

  if (layout === '50-50') { 
    w1 = getWidthObj(`calc(50% - (${layoutTokens.GAP.md}/2))`); 
    w2 = getWidthObj(`calc(50% - (${layoutTokens.GAP.md}/2))`); 
  }
  else if (layout === '33-66') { 
    w1 = getWidthObj(`calc(33.3% - (${layoutTokens.GAP.md}/2))`); 
    w2 = getWidthObj(`calc(66.6% - (${layoutTokens.GAP.md}/2))`); 
  }
  else if (layout === '66-33') { 
    w1 = getWidthObj(`calc(66.6% - (${layoutTokens.GAP.md}/2))`); 
    w2 = getWidthObj(`calc(33.3% - (${layoutTokens.GAP.md}/2))`); 
  }

  return (
    <Box sx={{
      display: 'flex',
      width: '100%',
      gap: layoutTokens.GAP,
      marginBottom: layoutTokens.GAP,
      // Colonna su mobile, Riga su desktop
      flexDirection: { xs: 'column', md: 'row' }
    }}>
      <MediaItem
        src={src[0]}
        width={w1}
        height={height}
        onClick={indices && onMediaClick ? () => onMediaClick(indices[0]) : undefined}
        objectPosition={pos1}
        scale={scale1}
        useThumbnail={useThumbnail}
      />

      {layout !== '100' && src[1] && (
        <MediaItem
          src={src[1]}
          width={w2}
          height={height}
          onClick={indices && indices[1] && onMediaClick ? () => onMediaClick(indices[1]) : undefined}
          objectPosition={pos2}
          scale={scale2}
          useThumbnail={useThumbnail}
        />
      )}
    </Box>
  );
};
