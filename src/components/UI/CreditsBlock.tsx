import Box from '@mui/material/Box';

export const CreditsBlock = ({
  leftTitle, leftBody, rightTitle, rightBody, logos
}: {
  leftTitle: string, leftBody: string[], rightTitle: string, rightBody: string[], logos?: string[]
}) => (
  <Box sx={{
    marginTop: '10px',
    marginBottom: '20px',
    width: '100%', 
  }}>

    {/* --- PARTE SUPERIORE: 2 COLONNE ESTREME --- */}
    <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>

      {/* Colonna Sinistra (Allineata a Sinistra - 0px) */}
      <Box sx={{ width: '67%', textAlign: 'left' }}>
        <Box sx={{
          fontFamily: "'Inter', sans-serif",
          fontSize: { xs: '16px', md: '14px' },
          fontWeight: 500,
          letterSpacing: '0',
          lineHeight: 1.25,
          textDecoration: 'underline',
          textUnderlineOffset: '2px',
          marginBottom: '5px',
          color: '#000'
        }}>
          {leftTitle}
        </Box>
        {leftBody.map((line, i) => (
          <Box key={i} sx={{
            fontFamily: "'Inter', sans-serif",
            fontSize: { xs: '16px', md: '14px' },
            letterSpacing: '0',
            lineHeight: 1.25,
            fontWeight: 500,
            color: 'rgba(0, 0, 0, 0.5)'
          }}>
            {line}
          </Box>
        ))}
      </Box>

      {/* Colonna Destra (Allineata a Destra - 100%) */}
      <Box sx={{ width: '33%', textAlign: 'right' }}>
        <Box sx={{
          fontFamily: "'Inter', sans-serif",
          fontSize: { xs: '16px', md: '14px' },
          fontWeight: 500,
          letterSpacing: '0',
          lineHeight: 1.25,
          marginBottom: '5px',
          color: '#000'
        }}>
          {rightTitle}
        </Box>
        {rightBody.map((line, i) => (
          <Box key={i} sx={{
            fontFamily: "'Inter', sans-serif",
            fontSize: { xs: '16px', md: '14px' },
            letterSpacing: '0',
            lineHeight: 1.25,
            fontWeight: 500,
            color: 'rgba(0, 0, 0, 0.5)'
          }}>
            {line}
          </Box>
        ))}
      </Box>
    </Box>

    {/* --- PARTE INFERIORE: LOGHI --- */}
    {logos && logos.length > 0 && (
      <Box sx={{
        marginTop: '60px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '30px',
        '& img': {
          filter: 'grayscale(100%)',
          opacity: 0.8,
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            filter: 'grayscale(0%)',
            opacity: 1
          }
        }
      }}>
        {logos.map((logoUrl, index) => (
          <img
            key={index}
            src={logoUrl}
            alt="partner logo"
            style={{ display: 'block', height: '40px', width: 'auto', objectFit: 'contain' }}
          />
        ))}
      </Box>
    )}
  </Box>
);
