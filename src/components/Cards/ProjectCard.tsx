import React from 'react';
import { motion } from 'framer-motion'; // Reimportiamo la libreria
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
  return (
    <motion.div 
      className="card-container"
      
      // 1. Posizionamento Iniziale
      // Usiamo 'style' così framer motion rispetta le tue coordinate top/left
      style={{ top: top, left: left }}
      
      // 2. Abilita il trascinamento
      drag
      
      // 3. Rimuove l'inerzia (effetto ghiaccio) per un feeling più "Desktop OS"
      dragMomentum={false}
      
      // 4. Stati interattivi
      whileHover={{ scale: 1.05, zIndex: 100 }}
      whileDrag={{ scale: 1.15, zIndex: 1000, cursor: 'grabbing' }}
      
      // 5. Click
      onClick={() => console.log('Open project:', id)}
    >
      {/* Immagine */}
      <div className="card-image-wrapper">
        <img 
          src={coverImage} 
          alt={title} 
          draggable="false" // IMPORTANTE: evita che il browser trascini l'immagine invece del div
        />
      </div>

      {/* Etichetta */}
      <div className="card-label">
        {title}
      </div>
    </motion.div>
  );
};

export default ProjectCard;