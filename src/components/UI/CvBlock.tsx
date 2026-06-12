import React from 'react';
import Box from '@mui/material/Box';

// ─── Riga di sezione (header _EDUCATION, _WORK, _SKILLS) ───────────────────
export const CvSectionHeader = ({ label }: { label: string }) => (
  <Box sx={{
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    fontFamily: "'Inter', sans-serif",
    fontSize: { xs: '16px', md: '14px' },
    letterSpacing: '0',
    lineHeight: 1.25,
  }}>
    <Box component="span" sx={{
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '0px 3px',
      fontWeight: 500,
    }}>
      {label}
    </Box>
  </Box>
);

// ─── Riga CV a 3 colonne: data | azienda | ruolo + bullet ──────────────────
interface CvBlockProps {
  date: React.ReactNode;
  role: React.ReactNode;
  company?: React.ReactNode;
  bullets?: React.ReactNode;
  customDateStyle?: React.CSSProperties;
  topSpacing?: boolean;
}

export const CvBlock = ({ date, role, company, bullets, customDateStyle, topSpacing }: CvBlockProps) => (
  <Box sx={{
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', md: '130px 36px 1fr 72px 1fr' },
    columnGap: '0px',
    rowGap: { xs: '18px', md: '0px' },
    marginBottom: { xs: '40px', md: '20px' },
    paddingTop: topSpacing ? '36px' : '0px',
    fontFamily: "'Inter', sans-serif",
    fontSize: { xs: '16px', md: '14px' },
    letterSpacing: '0',
    fontWeight: 500,
    lineHeight: 1.25,
    color: '#000000ff',
  }}>

    {/* Col 1 — Data: no sfondo nero */}
    <Box sx={{ flexShrink: 0, gridColumn: { xs: 'auto', md: '1' } }}>
      <Box
        component="span"
        sx={{
          display: 'inline-block',
          ...customDateStyle,
        }}
      >
        {date}
      </Box>
    </Box>

    {/* Col 2 — Azienda (nera, sempre renderizzata per mantenere la griglia) */}
    <Box sx={{ color: '#000000', display: company ? 'block' : { xs: 'none', md: 'block' }, gridColumn: { xs: 'auto', md: '3' } }}>
      {company ? (
        <Box
          component="span"
          sx={{
            display: 'inline-block',
          }}
        >
          {company}
        </Box>
      ) : null}
    </Box>

    {/* Col 3 — Ruolo (prima riga nera) + Bullet (semitrasparenti) */}
    <Box sx={{ gridColumn: { xs: 'auto', md: '5' } }}>
      {role ? (
        <Box sx={{ fontWeight: 500, color: '#000000' }}>
          {role}
        </Box>
      ) : null}
      {bullets && (
        <Box sx={{ marginTop: '8px', opacity: 0.45 }}>
          {bullets}
        </Box>
      )}
    </Box>

  </Box>
);
