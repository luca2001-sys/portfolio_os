import React from 'react';
import Box from '@mui/material/Box';
import { layoutTokens } from './layoutTokens';

export const TextBlock = ({ title, text }: { title?: string, text?: React.ReactNode }) => (
  <Box sx={{ marginBottom: '10px' }}>
    {title && (
      <Box sx={{ marginBottom: '5px' }}>
        <span style={{
          fontFamily: "'Hanken Grotesk', sans-serif", 
          fontSize: '15px',
          textDecoration: 'underline', 
          textUnderlineOffset: '2px'
        }}>
          {title}
        </span>
      </Box>
    )}
    <Box sx={{
      marginTop: '-5px', 
      fontFamily: "'Hanken Grotesk', sans-serif",
      fontSize: '15px', 
      letterSpacing: '-0.03em', 
      lineHeight: 1.15,
      textIndent: layoutTokens.INDENT, 
      textAlign: 'left', 
      color: 'rgba(0, 0, 0, 0.5)'
    }}>
      {text}
    </Box>
  </Box>
);
