import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { layoutTokens } from './layoutTokens';

export const ProjectSkeleton = () => {
  return (
    <Box sx={{ width: '100%', animation: 'fadeIn 0.3s ease-in-out' }}>
      {/* IntroBlock mimic */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: '15px' }}>
        <Box sx={{ width: layoutTokens.INDENT, flexShrink: 0 }}>
          {/* Anno finto */}
          <Skeleton variant="text" width="50%" height={35} animation="wave" />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {/* Testo Intro finto */}
          <Skeleton variant="text" width="95%" height={28} animation="wave" />
          <Skeleton variant="text" width="85%" height={28} animation="wave" />
          <Skeleton variant="text" width="90%" height={28} animation="wave" />
          <Skeleton variant="text" width="70%" height={28} animation="wave" />
        </Box>
      </Box>

      <Box sx={{ height: 20 }} />

      {/* Sottotitoli finti */}
      <Box sx={{ mb: '30px' }}>
        <Skeleton variant="text" width="20%" height={24} animation="wave" />
        <Box sx={{ pl: layoutTokens.INDENT, mt: '-5px' }}>
          <Skeleton variant="text" width="80%" height={20} animation="wave" />
          <Skeleton variant="text" width="75%" height={20} animation="wave" />
        </Box>
      </Box>

      {/* Ritorno a capo e riga di foto finte (Layout 50-50 o 100) */}
      <Box sx={{ 
          display: 'flex', 
          width: '100%', 
          gap: layoutTokens.GAP, 
          mb: layoutTokens.GAP,
          flexDirection: { xs: 'column', md: 'row' }
      }}>
        {/* Usiamo SX per supportare i breakpoint MUI nativi del container */}
        <Skeleton 
          variant="rectangular" 
          animation="wave"
          sx={{ width: { xs: '100%', md: '50%' }, height: layoutTokens.H_STD }} 
        />
        <Skeleton 
          variant="rectangular" 
          animation="wave"
          sx={{ width: { xs: '100%', md: '50%' }, height: layoutTokens.H_STD }} 
        />
      </Box>
      
      {/* Una riga Full-Width lunga (layout 100) */}
      <Box sx={{ width: '100%', mb: layoutTokens.GAP }}>
        <Skeleton 
          variant="rectangular" 
          animation="wave"
          sx={{ width: '100%', height: layoutTokens.H_TALL }} 
        />
      </Box>

    </Box>
  );
};
