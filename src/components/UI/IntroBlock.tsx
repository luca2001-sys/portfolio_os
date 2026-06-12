import React from 'react';
import Box from '@mui/material/Box';
import { layoutTokens } from './layoutTokens';

export const IntroBlock = ({
  year,
  text,
  link,
  isOverlay,
  customYearStyle
}: {
  year?: React.ReactNode,
  text?: React.ReactNode,
  link?: string,
  isOverlay?: boolean,
  customYearStyle?: React.CSSProperties
}) => (
  <Box sx={{
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '15px',
    color: isOverlay ? '#000000ff' : 'inherit',
    flexDirection: isOverlay ? { xs: 'column', md: 'row' } : 'row',
    gap: isOverlay ? { xs: '5px', md: '0px' } : '0px'
  }}>
    <Box sx={{
      width: layoutTokens.INDENT,
      flexShrink: 0,
      fontSize: isOverlay ? { xs: '16px', md: '14px' } : '20px',
      fontFamily: isOverlay ? "'Inter', sans-serif" : "'Hanken Grotesk', sans-serif"
    }}>
      {isOverlay ? (
        <Box component="span" sx={{
          backgroundColor: '#000000ff',
          color: '#ffffffff',
          padding: '0px 3px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          letterSpacing: '0',
          lineHeight: 1.25,
          ...customYearStyle
        }}>
          {year}
        </Box>
      ) : (
        year
      )}
    </Box>
    
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <Box sx={{
        textIndent: isOverlay ? { xs: '0px', md: layoutTokens.INDENT_TEXT.md } : layoutTokens.INDENT_TEXT,
        fontFamily: isOverlay ? "'Inter', sans-serif" : "'Hanken Grotesk', sans-serif",
        fontSize: isOverlay ? { xs: '16px', md: '14px' } : "20px",
        letterSpacing: isOverlay ? "0" : "-0.04em",
        fontWeight: isOverlay ? 500 : 400,
        lineHeight: isOverlay ? 1.25 : 1.15,
        textAlign: "left"
      }}>
        {text}
      </Box>

      {link && (
        <Box sx={{ marginTop: '10px', paddingLeft: '0px' }}>
          ◣&nbsp;
          <a href={link} target="_blank" rel="noreferrer" style={{
            color: isOverlay ? '#ffffff' : '#000',
            textDecoration: 'underline', 
            textDecorationThickness: '1px',
            textUnderlineOffset: '3px', 
            fontSize: 'inherit', 
            wordBreak: 'break-all'
          }}>
            {link}
          </a>
        </Box>
      )}
    </Box>
  </Box>
);
