import React, { lazy } from 'react';

// Convertiamo le importazioni statiche in import dinamici tramite React.lazy
// Per mantenere i nomi esportati e funzionanti con la destrutturazione
const Project1 = lazy(() => import('./Project1').then((m) => ({ default: m.Project1 })));
const Project2 = lazy(() => import('./Project2').then((m) => ({ default: m.Project2 })));
const Project3 = lazy(() => import('./Project3').then((m) => ({ default: m.Project3 })));
const Project4 = lazy(() => import('./Project4').then((m) => ({ default: m.Project4 })));
const Project5 = lazy(() => import('./Project5').then((m) => ({ default: m.Project5 })));
const Project6 = lazy(() => import('./Project6').then((m) => ({ default: m.Project6 })));
const Project7 = lazy(() => import('./Project7').then((m) => ({ default: m.Project7 })));
const Project8 = lazy(() => import('./Project8').then((m) => ({ default: m.Project8 })));
const Project9 = lazy(() => import('./Project9').then((m) => ({ default: m.Project9 })));

// Definiamo il tipo per i props che ogni componente progetto dovrà accettare
export interface ProjectProps {
  openLightbox: (index: number) => void;
}

// L'Object Map centralizzata che mappa "ID_Stringa" al Componente "Lazy"
export const ProjectRegistry: Record<string, React.LazyExoticComponent<React.FC<ProjectProps>>> = {
  "1": Project1,
  "2": Project2,
  "3": Project3,
  "4": Project4,
  "5": Project5,
  "6": Project6,
  "7": Project7,
  "8": Project8,
  "9": Project9,
};

// Manteniamo le esportazioni dirette
export {
  Project1, Project2, Project3, Project4, Project5, Project6, Project7, Project8, Project9
};
