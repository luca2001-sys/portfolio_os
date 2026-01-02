import React, { useRef } from 'react';
import { motion } from 'framer-motion'; 
import './ProjectCard.css';

interface ProjectCardProps {
  id: string;
  title: string;
  coverImage: string;
  top: string; 
  left: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  id, 
  title, 
  coverImage, 
  top, 
  left 
}) => {
  
  // 1. Il nostro semaforo
  const isDraggingRef = useRef(false);

  return (
    <motion.div 
      className="card-container"
      style={{ top: top, left: left }}
      
      drag
      dragMomentum={false}
      
      whileHover={{ scale: 1.05, zIndex: 100 }}
      whileDrag={{ scale: 1.15, zIndex: 1000, cursor: 'grabbing' }}

      // 2. RESETTA IL SEMAFORO SOLO QUANDO TOCCHI DI NUOVO
      // Usiamo Capture per essere sicuri di prenderlo prima di tutti
      onPointerDownCapture={() => {
        isDraggingRef.current = false;
      }}

      // 3. SE INIZI A MUOVERE, ALZA IL SEMAFORO
      onDragStart={() => {
        isDraggingRef.current = true;
      }}

      // 4. AL CLICK (RILASCIO), CONTROLLA IL SEMAFORO
      // Nota: Non usiamo onDragEnd per resettare.
      onClick={(e) => {
        // Se stavo trascinando, isDraggingRef è ancora TRUE.
        if (isDraggingRef.current) {
          e.stopPropagation(); // Ferma la propagazione
          console.log('Click ignorato dopo il drag');
          return; 
        }
        
        // Se arrivo qui, onDragStart non è mai partito -> È un click vero
        console.log('APRI PROGETTO:', id);
        // onOpen(id);
      }}
    >
      <div className="card-image-wrapper">
        <img 
          src={coverImage} 
          alt={title} 
          draggable="false" 
        />
      </div>

      <div className="card-label">
        {title}
      </div>
    </motion.div>
  );
};

export default ProjectCard;