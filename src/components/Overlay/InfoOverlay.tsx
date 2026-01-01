import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
import './InfoOverlay.css';

interface InfoOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const InfoOverlay: React.FC<InfoOverlayProps> = ({ isOpen, onClose, children }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Utilizziamo useEffect per attaccare un listener globale alla finestra.
  // Questo ci permette di "vedere" anche i bottoni della Navbar che stanno sopra l'overlay.
  useEffect(() => {
    if (!isOpen) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;

      // 1. Muovi la X
      cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

      // 2. LOGICA INTELLIGENTE: Quando nascondere la X?
      // Controlliamo cosa sta toccando il mouse in questo momento
      const target = e.target as HTMLElement;

      // Nascondi se:
      // A. Siamo sopra il contenuto di testo dell'overlay (.overlay-content)
      // B. Siamo sopra un qualsiasi BOTTONE (inclusa la Navbar!)
      // C. Siamo sopra un link (<a>)
      const isHoveringInteractive = 
        target.closest('.overlay-content') !== null || 
        target.closest('button') !== null ||
        target.tagName === 'A';

      // Applica l'opacità direttamente (molto più veloce di useState)
      cursorRef.current.style.opacity = isHoveringInteractive ? '0' : '1';
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    
    // Pulizia quando si chiude
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          
          onClick={onClose}
          // Nota: Abbiamo tolto onMouseMove da qui perché ora è gestito globalmente
          
          className="overlay-backdrop"
        >
          
          {/* --- IL CURSORE CUSTOM (LA X) --- */}
          <div 
            ref={cursorRef} 
            className="custom-cursor-x"
            // L'opacity è gestita via JS nel useEffect per massima velocità
          >
            ✕
          </div>

          {/* Contenitore del testo */}
          <Box
            onClick={(e) => e.stopPropagation()} 
            className="overlay-content"
          >
            {children}
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoOverlay;