import React from 'react';
import './Menu.css';

interface MenuProps {
  onOpenAbout: () => void;
  onOpenCV: () => void;
  activeItem: 'about' | 'cv' | null;
}

const Menu: React.FC<MenuProps> = ({ onOpenAbout, onOpenCV, activeItem }) => {
  
  // Non usiamo più activeStyle o style={{...}} inline.
  // Usiamo solo le classi CSS per permettere all'hover di funzionare sempre.

  return (
    <nav className="navbar-container">
      
      {/* Tasto ABOUT ME */}
      <button 
        onClick={onOpenAbout}
        className={`brutalist-btn ${activeItem === 'about' ? 'active' : ''}`}
      >
        ABOUT ME
      </button>

      {/* Tasto CV */}
      <button 
        onClick={onOpenCV}
        className={`brutalist-btn ${activeItem === 'cv' ? 'active' : ''}`}
      >
        CV
      </button>

    </nav>
  );
};

export default Menu;