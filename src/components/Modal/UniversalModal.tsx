import React, { useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface UniversalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  backgroundColor?: string;
  children: React.ReactNode;
}

const UniversalModal: React.FC<UniversalModalProps> = ({
  isOpen,
  onClose,
  title,
  
  backgroundColor,
  children
}) => {
  const dragControls = useDragControls();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. OVERLAY TRASPARENTE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0)', 
              zIndex: 9998,
            }}
          />

          {/* 2. FINESTRA */}
          <motion.div
            drag
            dragListener={false}
            dragControls={dragControls}
            dragMomentum={false}
            dragElastic={10}         // Disattiva effetto elastico ai bordi
            dragTransition={{ power: 0, timeConstant: 0 }}
            
            initial={{ opacity: 0, scale: 0.95, y: "-40%", x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, y: "-40%", x: "-50%" }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}

            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              
              width: '750px',
              maxWidth: '92vw',
              height: '80vh',
              maxHeight: '900px',
              
              backgroundColor: backgroundColor || '#ffffff', 
              
              zIndex: 9999,
              boxShadow: 'none',
              
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* --- HEADER EDITORIALE (Drag Area) --- */}
            <div
              onPointerDown={(e) => dragControls.start(e)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start', 
                backgroundColor: 'transparent',
                padding: 0,
                cursor: 'grab',
                userSelect: 'none',
                zIndex: 10
              }}
            >
              {/* HEADER - TITOLO */}
              <Box sx={{ 
                  display: 'inline-flex',    // Usa flex per centrare il testo verticalmente
                  alignItems: 'center',      // Centra verticalmente
                  height: '25px',            // <--- ALTEZZA FISSA
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  padding: '0px 5px',       // Padding solo orizzontale
                  marginLeft: '150px',
                  
                  // Bordo opzionale per uniformità con il resto
                  border: '1px solid #000000' 
                }}>
                <span style={{ 
                  fontFamily: 'AlteHaas',
                  fontSize: '15px', 
                  fontWeight: 700,
                  lineHeight: 1 
                }}>
                  {title}
                </span>
              </Box>

              {/* HEADER - CHIUDI */}
              <IconButton
                onPointerDown={(e) => e.stopPropagation()} 
                onClick={onClose}
                disableRipple
                sx={{
                  height: '25px',
                  minWidth: 'auto',                  
                  color: '#ffffff',
                  backgroundColor: '#000000',
                  mixBlendMode: 'difference',
                  borderRadius: 0,
                  padding: '0px 20px',       // Padding laterale
                  
                  // Bordo opzionale (nero su nero di base)
                  border: '1px solid #000000',

                  '&:hover': { 
                    backgroundColor: '#ffffff', 
                    color: 'black',
                    // Se vuoi il bordo nero in hover:
                    borderColor: '#000000'
                  },
                }}
              >
                {/* Nota: Ho rimosso fontFamily dall'icona perché è un SVG, non testo */}
                <CloseIcon sx={{ fontSize: '20px' }} />
              </IconButton>
</div>

            {/* --- CONTENUTO --- */}
            <Box
              sx={{
                flexGrow: 1,
                overflowY: 'auto',
                // MODIFICA: Aumentato padding TOP (50px) per non finire sotto l'header all'inizio
                padding: '30px 10px 10px 10px', 
                
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontWeight: 400,
                letterSpacing: '-0.04em',
                fontSize: '20px',
                lineHeight: 1.15,
                textAlign: 'left',
                '&::-webkit-scrollbar': { width: '4px' },
                '&::-webkit-scrollbar-thumb': { background: '#000' },
              }}
            >
              {children}
            </Box>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UniversalModal;