import React from 'react';
import Box from '@mui/material/Box';
import { layoutTokens } from './layoutTokens';

export const TextBlock = ({ title, text }: { title?: string, text?: React.ReactNode }) => (
  <Box sx={{ marginBottom: '10px' }}>
    {title && (
      <Box sx={{ marginBottom: '5px' }}>
        <Box
          component="span"
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontSize: { xs: '16px', md: '14px' },
            fontWeight: 500,
            letterSpacing: '0',
            lineHeight: 1.25,
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
          }}
        >
          {title}
        </Box>
      </Box>
    )}
    {text && (
      <Box sx={{
        marginTop: '-5px',
        fontFamily: "'Inter', sans-serif",
        fontSize: { xs: '16px', md: '14px' },
        letterSpacing: '0',
        lineHeight: 1.25,
        fontWeight: 500,
        textIndent: layoutTokens.INDENT,
        textAlign: 'left',
        color: 'rgba(0, 0, 0, 0.5)',
      }}>
        {text}
      </Box>
    )}
  </Box>
);
