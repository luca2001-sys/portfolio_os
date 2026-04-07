import { useMemo, useRef, useState, Suspense } from "react";
import { useContainerObserver } from "./hooks/useContainerObserver";
import AnimatedBackground from "./components/Background/AnimatedBackground";
import Navbar from "./components/Navbar/Menu";
import Box from "@mui/material/Box";
import ProjectCard from "./components/Cards/ProjectCard";
import CssBaseline from "@mui/material/CssBaseline";
import UniversalModal from "./components/Modal/UniversalModal";
import { getKCenterPositions } from "./utils/kCenterDiscrete";
import { PROJECTS_LIST } from "./ProjectsData";
import InfoOverlay from "./components/Overlay/InfoOverlay";
import AboutView from "./components/Overlay/AboutView";
import CvView from "./components/Overlay/CvView";
import { ProjectRegistry } from './projects';
import { ProjectSkeleton } from './components/UI';

// --- LIGHTBOX IMPORTS ---
import { PortfolioLightbox } from "./components/Modal/PortfolioLightbox";


function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { containerSize, isMobile } = useContainerObserver(containerRef);

  // Stato Progetti (Finestre)
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Stato Overlay (About / CV)
  const [overlayMode, setOverlayMode] = useState<'about' | 'cv' | null>(null);

  // --- LOGICA DI APERTURA ---

  // 1. Apri Progetto (Chiude l'overlay se aperto)
  const handleOpenProject = (id: string) => {
    setOverlayMode(null); // Chiudi overlay
    setSelectedId(id);    // Apri progetto
  };

  // 2. Apri Overlay (Chiude il progetto se aperto)
  // Se clicco lo stesso bottone già aperto, lo chiude (toggle)
  const handleOpenOverlay = (mode: 'about' | 'cv') => {
    setSelectedId(null); // Chiudi progetti
    setOverlayMode(prev => prev === mode ? null : mode); // Toggle
  };

  // Stato per la Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Funzione helper per aprire la lightbox all'indice specifico
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const activeProject = PROJECTS_LIST.find(p => p.id === selectedId);

  const renderProjectContent = (id: string) => {
    const Component = ProjectRegistry[id];
    return Component ? (
      <Suspense fallback={<ProjectSkeleton />}>
        <Component openLightbox={openLightbox} />
      </Suspense>
    ) : <div>Progetto in fase di sviluppo...</div>;
  };



  const cardsWithPosition = useMemo(() => {
    if (containerSize.width === 0) return [];

    const positions = getKCenterPositions(
      PROJECTS_LIST.length,
      containerSize.width,
      containerSize.height,
      isMobile
    );

    return PROJECTS_LIST.map((p, i) => ({
      ...p,
      top: positions[i]?.top || "50%",
      left: positions[i]?.left || "50%"
    }));

  }, [containerSize, isMobile]);

  return (
    <>
      <CssBaseline />
      <AnimatedBackground />
      <Navbar
        onOpenAbout={() => handleOpenOverlay('about')}
        onOpenCV={() => handleOpenOverlay('cv')}
        activeItem={overlayMode} // <-- Passiamo lo stato per colorare i bottoni
      />

      <Box sx={{ position: "relative", zIndex: 1, height: "100vh", width: "100vw", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <Box ref={containerRef} sx={{ position: "relative", flexGrow: 1, width: "100%", height: "100%", padding: "40px" }}>
          {cardsWithPosition.map((card) => (
            <div key={card.id} onClick={() => handleOpenProject(card.id)} style={{ cursor: 'pointer' }}>
              <ProjectCard id={card.id} title={card.title} coverImage={card.cover} top={String(card.top)} left={String(card.left)} />
            </div>
          ))}
        </Box>
      </Box>

      {/* --- MODALE --- */}
      <UniversalModal
        isOpen={!!selectedId}
        onClose={() => setSelectedId(null)}
        title={activeProject?.title || ""}
        backgroundColor={activeProject?.bgColor}
      >
        {selectedId && renderProjectContent(selectedId)}
      </UniversalModal>

      {/* --- NUOVO INFO OVERLAY --- */}
      <InfoOverlay
        isOpen={!!overlayMode}
        onClose={() => setOverlayMode(null)}
      >
        {overlayMode === 'about' && <AboutView />}
        {overlayMode === 'cv' && <CvView />}
      </InfoOverlay>

      {/* --- LIGHTBOX COMPONENT --- */}
      <PortfolioLightbox 
         projectId={selectedId}
         isOpen={lightboxOpen}
         onClose={() => setLightboxOpen(false)}
         index={lightboxIndex}
      />
    </>
  );
}

export default App;