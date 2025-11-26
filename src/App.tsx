import { useState, useMemo, useEffect, useRef } from "react";
import AnimatedBackground from "./components/Background/AnimatedBackground";
import Navbar from "./components/Navbar/Menu"; // Verifica che il path sia corretto
import Box from "@mui/material/Box";
import ProjectCard from "./components/Cards/ProjectCard";
import CssBaseline from "@mui/material/CssBaseline";

// Importa l'algoritmo intelligente
import { getKCenterPositions } from "./utils/kCenterDiscrete";

function App() {
  const [activeModal, setActiveModal] = useState<"about" | "cv" | null>(null);

  // REF per misurare il contenitore reale
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // RESIZE OBSERVER: Aggiorna le dimensioni se la finestra cambia
  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateSize(); // Prima misurazione

    const observer = new ResizeObserver(() => updateSize());
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const handleOpen = (modalName: "about" | "cv") => {
    setActiveModal(modalName);
  };

  // DATI DELLE CARD
  const rawCardsData = [
    {
      id: 1,
      title: "Tesla Clone",
      image: "https://picsum.photos/id/200/400/300",
      orientation: "landscape" as const,
    },
    {
      id: 2,
      title: "App Mobile",
      image: "https://picsum.photos/id/10/300/500",
      orientation: "portrait" as const,
    },
    {
      id: 3,
      title: "Dashboard Analytics",
      image: "https://picsum.photos/id/20/400/300",
      orientation: "landscape" as const,
    },
    {
      id: 4,
      title: "E-Commerce Shop",
      image: "https://picsum.photos/id/48/400/300",
      orientation: "landscape" as const,
    },
    {
      id: 5,
      title: "Coming Soon",
      image: "https://picsum.photos/id/60/300/500",
      orientation: "portrait" as const,
    },
  ];

  // CALCOLO POSIZIONI (Memoizzato per non ricalcolare ad ogni render inutile)
  const cardsWithPosition = useMemo(() => {
    // Se non abbiamo ancora misurato il container, aspettiamo
    if (containerSize.width === 0) return [];

    // Chiamiamo l'algoritmo passando le dimensioni reali del box
    const positions = getKCenterPositions(
      rawCardsData.length,
      containerSize.width,
      containerSize.height
    );

    // Uniamo dati e posizioni
    return rawCardsData.map((card, index) => ({
      ...card,
      top: positions[index]?.top || "50%", // Fallback al centro se qualcosa fallisce
      left: positions[index]?.left || "50%",
    }));
  }, [containerSize.width, containerSize.height]);

  return (
    <>
      <CssBaseline /> {/* Reset CSS fondamentale per full height */}
      <AnimatedBackground />
      {/* WRAPPER PRINCIPALE: Full Screen, No Scroll */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100vh",
          width: "100vw",
          overflow: "hidden", // Blocca scrollbar
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar onOpenModal={handleOpen} />

        {/* AREA DESKTOP: Occupa tutto lo spazio disponibile */}
        <Box
          ref={containerRef} // Qui misuriamo le dimensioni
          sx={{
            position: "relative",
            flexGrow: 1, // Riempie lo spazio sotto la navbar
            width: "100%",
            height: "100%",
          }}
        >
          {cardsWithPosition.map((card) => (
            <ProjectCard
              key={card.id}
              title={card.title}
              image={card.image}
              orientation={card.orientation}
              top={card.top}
              left={card.left}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}

export default App;
