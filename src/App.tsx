import { useState, useMemo, useEffect, useRef } from "react";
import AnimatedBackground from "./components/Background/AnimatedBackground";
import Navbar from "./components/Navbar/Menu"; 
import Box from "@mui/material/Box";
import ProjectCard from "./components/Cards/ProjectCard";
import CssBaseline from "@mui/material/CssBaseline";
import UniversalModal from "./components/Modal/UniversalModal";
import { getKCenterPositions } from "./utils/kCenterDiscrete";
import { IntroBlock, TextBlock, ImageRow, Spacer, CreditsBlock } from "./ProjectComponents";
import { PROJECTS_DATA } from "./ProjectsData";
import InfoOverlay from "./components/Overlay/InfoOverlay";

// --- LIGHTBOX IMPORTS ---
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Video from "yet-another-react-lightbox/plugins/video";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

// --- CONFIGURAZIONE PROGETTI ---
const PROJECTS_LIST = [
  { 
    id: "1", 
    title: "BODY OF EVIDENCE", 
    year: "2025", 
    cover: "/projects/p1/cover.jpg", // AGGIORNATO
    bgColor: "#E9E9E9"
  },
  { 
    id: "2", 
    title: "DIPARTIMENTO DI ARCHITETTURA", 
    year: "2023", 
    cover: "/projects/p2/cover.jpg", // AGGIORNATO
    bgColor: "#ffffff"
  },
  { 
    id: "3", 
    title: "IL SILENZIO NON ESISTE", 
    year: "2025", 
    cover: "/projects/p3/cover.jpg", // AGGIORNATO
    bgColor: "#f0f0f0"
  },
  { 
    id: "4", 
    title: "SAVE THE KEYS", 
    year: "2025", 
    cover: "/projects/p4/cover.jpg", // AGGIORNATO
    bgColor: "#fffbfbff"
  },
  { 
    id: "5", 
    title: "CHLADNI MUSIK FEST", 
    year: "2024", 
    cover: "/projects/p5/cover.jpg", // AGGIORNATO
    bgColor: "#FFFFFF"
  },
  { 
    id: "6", 
    title: "IO:BRAND", 
    year: "2023", 
    cover: "/projects/p6/01.jpg", // AGGIORNATO
    bgColor: "#F4F4F4"
  },
  { 
    id: "7", 
    title: "DAY-DREAM", 
    year: "2023", 
    cover: "/projects/p7/cover.jpg", // AGGIORNATO
    bgColor: "#ffffff"
  },
  { 
    id: "8", 
    title: "ALIENZ", 
    year: "2021", 
    cover: "/projects/p8/09.jpg", // AGGIORNATO
    bgColor: "#ffffff"
  },
  { 
    id: "9", 
    title: "VALLECHIARA", 
    year: "2021", 
    cover: "/projects/p9/cover.jpg", // AGGIORNATO
    bgColor: "#ffffff"
  },
];

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

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

  // --- COMPONENTE PER VIDEO SINGOLO ---
  const SingleVideo = ({ id, ratio = "16/9", autoPlay = false }: { id: string, ratio?: string, autoPlay?: boolean }) => {
    const containerStyle: React.CSSProperties = { 
      width: '100%', 
      marginBottom: '10px', 
      position: 'relative', 
      backgroundColor: '#000', // Sfondo nero mentre carica
      aspectRatio: ratio 
    };
    
    const iframeStyle: React.CSSProperties = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' };

    const getUrl = (id: string, isAuto: boolean) => {
      let base = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1`;
      if (isAuto) base += `&autoplay=1&mute=1&loop=1&playlist=${id}`;
      return base;
    };

    return (
      <div style={containerStyle}>
        <iframe 
          style={iframeStyle} 
          src={getUrl(id, autoPlay)} 
          frameBorder="0" 
          allowFullScreen 
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        />
      </div>
    );
  };

  // --- COMPONENTE PER VIDEO DOPPIO (Versione con Autoplay) ---
  const DoubleVideo = ({ 
    leftId, 
    rightId, 
    ratio = "16/9",
    autoPlayLeft = false, 
    autoPlayRight = false 
  }: { 
    leftId: string, 
    rightId: string, 
    ratio?: string,
    autoPlayLeft?: boolean,
    autoPlayRight?: boolean
  }) => {
    
    const commonStyle: React.CSSProperties = { flex: '1 1 300px', position: 'relative', aspectRatio: ratio };
    const iframeStyle: React.CSSProperties = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' };
    
    // Funzione intelligente: se è autoplay, aggiunge i comandi per il loop e il muto
    const getUrl = (id: string, isAuto: boolean) => {
      let base = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1`;
      if (isAuto) {
        // Aggiunge: Autoplay + Muto (Obbligatorio) + Loop + Playlist (serve per il loop)
        base += `&autoplay=1&mute=1&loop=1&playlist=${id}`;
      }
      return base;
    };

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', width: '100%', marginBottom: '10px' }}>
        {/* Video Sinistra */}
        <div style={commonStyle}>
          <iframe 
            style={iframeStyle} 
            src={getUrl(leftId, autoPlayLeft)} 
            frameBorder="0" 
            allowFullScreen 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
          />
        </div>
        {/* Video Destra */}
        <div style={commonStyle}>
          <iframe 
            style={iframeStyle} 
            src={getUrl(rightId, autoPlayRight)} 
            frameBorder="0" 
            allowFullScreen 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
          />
        </div>
      </div>
    );
  };

  // --- CONTENUTI ---
  const renderProjectContent = (id: string) => {
    switch (id) {
      
        case "1": {
        // Recupero i media del progetto 1
        const p1 = PROJECTS_DATA["1"];

        return (
          <>
            {/* 1. INTRO */}
            <IntroBlock 
              year="2025" 
              text="Immersive exhibition at the PAC in Milan dedicated to Shirin Neshat. An interactive journey transforms visitors’ emotions into a collective visual flow, through objects, projections and light trails, evoking the dialogue between the individual and the community." 
            />
            
            <Spacer size={5} />
            
            {/* 2. VIDEO INTRO: Riga Doppia (01.mp4, 02.mp4) */}
            <ImageRow 
              h="tall" 
              layout="50-50" 
              src={[ p1[0].src, p1[1].src ]} 
              indices={[0, 1]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />
            
            <Spacer size={5} />

            {/* 3. Room 1 (03.mp4, 04.mp4) */}
            <TextBlock 
              title="Room1 [shadow_projection]" 
              text="The first installation projects shadows that evoke distance and alienation between body and identity, emotionally engaging the visitor." 
            />

            <ImageRow 
              h="tall" 
              layout="33-66" 
              src={[ p1[2].src, p1[3].src ]} 
              indices={[2, 3]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />
            
            <Spacer size={5} />
            
            {/* 4. Room 2 (07.mp4, 08.mp4) */}
            {/* Nota: Ho saltato 05 e 06 come richiesto */}
            <TextBlock 
              title="Room2 [heatmap]" 
              text="The second installation make visitors' footsteps into a luminous trail becoming a silent memory." 
            />

             <ImageRow 
              h="tall" 
              layout="33-66" 
              src={[ p1[6].src, p1[7].src ]} 
              indices={[6, 7]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={5} />

            {/* 5. Room 3 (10.mp4, 11.mp4) */}
            {/* Nota: Ho saltato 09 come richiesto */}
            <TextBlock 
              title="Room3 [head_tracking]" 
              text="The third makes the audience's gaze visible, integrating it as a living part of the work." 
            />

            <ImageRow 
              h="tall" 
              layout="66-33" 
              src={[ p1[9].src, p1[10].src ]} 
              indices={[9, 10]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={5} />

            {/* 6. Room 4 (14.mp4, 15.mp4) */}
            {/* Nota: Ho saltato 12 e 13 come richiesto */}
            <TextBlock 
              title="Room4 [mapping]" 
              text="The fourth installation invites visitors to vote using a color palette, turning their choices into a dynamic particle. The collected emotions merge into a collective visual composition that evolves in real time, making the exhibition a living, ever-changing experience." 
            />

            <ImageRow 
              h="tall" 
              layout="33-66" 
              src={[ p1[13].src, p1[14].src ]} 
              indices={[13, 14]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={5} /> 

            {/* 7. App & Prototypes (18.png, 23.jpg) */}
            {/* Nota: Ho saltato 16, 17, 19, 20, 21, 22 come richiesto */}
            <TextBlock 
              title="App & Interactions" 
            />

            <ImageRow 
              h="tall" 
              layout="100" 
              src={[ p1[17].src ]} 
              indices={[17]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <ImageRow 
              h="tall" 
              layout="100" 
              src={[ p1[20].src ]} 
              indices={[20]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />
            
            <ImageRow 
              h="tall" 
              layout="100" 
              src={[ p1[21].src ]} 
              indices={[21]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={5} /> 

            <TextBlock 
              title="Tech & Prototypes" 
              text="The four prototypes were developed with TouchDesigner, using ParticleGpu to translate the narrative concept into an interactive experience. One of the four prototypes had NFC chips installed on the back of the emotion cards. We simulated the smartphone client as a receiver that wrote a JSON via the server which was read via the web client node on touchdesigner which translated the voted emotion into a color that was added to the general flow of particles." 
            />

            <ImageRow 
              h="tall" 
              layout="100" 
              src={[ p1[22].src ]} 
              indices={[22]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />
            
            <IntroBlock 
              link="https://youtu.be/nJ9tLW3XNIk (prova__prototipo_1)"
            />

            <IntroBlock 
              link="https://youtu.be/Q9CpwwsZOMk (prova__prototipo_2)"
            />

            <Spacer size={10} />             

            <CreditsBlock 
              leftTitle="Interaction Design - Laboratorio di sistemi per l’interazione"
              leftBody={["Marco Quaggiotto", "Emanuele Della Valle", "Matteo Valoriani", "\u00A0", "Maria Tasca"]}
              rightTitle="Group"
              rightBody={["Nicolò Armelin", "Carlotta Barchi", "Cosimo Gambarelli", "Andrea Gatti"]}
              logos={[
                "/logos/polimi.png",
                "/logos/pac.png"
              ]}
            />
          </>
        );
      }

        case "2": {
        // Recupero le immagini del progetto 2
        const p2 = PROJECTS_DATA["2"];

        return (
          <>
            {/* 1. INTRO */}
            <IntroBlock 
              year="2023" 
              text="The project aims to develop the new website proposal for the Department of Architecture of the “Gabriele D'Annunzio” University of Chieti-Pescara, through a value proposition based on familiarity and user experience of the desktop." 
            />
            
            <Spacer size={5} />

            {/* 2. MOODBOARD: Foto 01 + 03 */}
            <TextBlock title="Moodboard, slider and users" />
            
            <ImageRow 
              h="std" 
              layout="50-50" 
              src={[ p2[0].src, p2[2].src ]} 
              indices={[0, 2]} 
              onMediaClick={openLightbox}
              useThumbnail={true}

            />

            <Spacer size={5} />

            {/* 3. OVERLAY: Foto 04 + 05 + 06 */}
            <TextBlock 
              title="Overlay page, home page, window and tools" 
              text="The menu tools let users customize their website experience. On hover, the menu expands to reveal icon names, while other icons allow hiding the menu, showing all apps, and editing them." 
            />

            <ImageRow 
              h="std" 
              layout="50-50" 
              src={[ p2[3].src, p2[4].src ]} 
              indices={[3, 4]} 
              onMediaClick={openLightbox}
              useThumbnail={true}

            />
            <ImageRow 
              h="tall" 
              layout="100" 
              src={[ p2[5].src ]} 
              indices={[5]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={5} />

            {/* 4. BLOG: Foto 08 + 09 + 10 */}
            <TextBlock 
              title="Blog homepage, user page and section slider" 
              text="The site was custom-designed for university students, featuring a blog as a hub for knowledge sharing. It serves as an interactive tool for users to explore, learn, and grow together." 
            />

            <ImageRow 
              h="std" 
              layout="50-50" 
              src={[ p2[7].src, p2[8].src ]} 
              indices={[7, 8]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />
             <ImageRow 
              h="std" 
              layout="100" 
              src={[ p2[9].src ]} 
              indices={[9]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={5} />

            {/* 5. UI STYLE GUIDE (Nuovo Blocco Separato) */}
            {/* Immagine 11.jpg (Index 10) - Tall 100% */}
            <TextBlock title="UI style guide" />
            
            <ImageRow 
              h="tall" 
              layout="100" 
              src={[ p2[10].src ]} 
              indices={[10]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={5} />

            {/* 6. MOBILE (Nuovo Blocco Separato) */}
            {/* Immagini 12.jpg + 13.jpg (Std 50-50) e 15.jpg (Std 100) */}
            <TextBlock title="Mobile" />

            <ImageRow 
              h="std" 
              layout="50-50" 
              src={[ p2[11].src, p2[12].src ]} 
              indices={[11, 12]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />
            <ImageRow 
              h="tall" 
              layout="100" 
              src={[ p2[14].src ]} // Ricorda: è la foto 15.jpg (Index 14)
              indices={[14]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={10} />

            {/* 7. CREDITS */}
            <CreditsBlock 
              leftTitle="Dipartimento di Architettura: una nuova prospettiva per l'usabilità e la condivisione"
              leftBody={["Raffaella Massacesi"]}
              rightTitle=""
              rightBody={[]}
              logos={[
                "/logos/unich.png",
                "/logos/design.png"
              ]} 
            />
          </>
        );
      }

        case "3": {
        // Recupero l'array delle immagini per questo progetto
        const p3 = PROJECTS_DATA["3"]; 

        return (
          <>
            {/* 1. INTRO */}
            <IntroBlock 
              year="2025" 
              text="For the realization of our project, we had the opportunity to visit the RAI Production Center in Milan, located at Corso Sempione, 27. We created an evocative video centered on Auditorium A that tells the story of the space with detailed images and animations. Additionally, a tactile artifact allows exploration of materials and textures, making the experience multisensory and accessible from a distance." 
              link="https://youtu.be/78ZmvF0-YgU"
            />

            <Spacer size={5} />

            {/* 2. STORYBOARD (Foto 01, 02, 03, 04 -> Indici 0, 1, 2, 3) */}
            <TextBlock title="Storyboard" text="We created a 3D model of Auditorium A, with dynamic shots and camera movements to realistically showcase the space. The black-and-white style and light play highlight volumes like silence defines sound." />
            
            <ImageRow 
              h="std" layout="50-50" 
              src={[ p3[0].src, p3[1].src ]} 
              indices={[0, 1]} // <-- NUOVO: Diciamo che sono la foto 0 e 1
              onMediaClick={openLightbox}
              useThumbnail={true}
            />
            <ImageRow 
              h="std" layout="50-50" 
              src={[ p3[2].src, p3[3].src ]} 
              indices={[2, 3]} // <-- e così via...
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={5} />

            {/* 3. CONCEPTUAL (Foto 05, 06, 07, 08 -> Indici 4, 5, 6, 7) */}
            <TextBlock title="" text="For the conceptual part, we opted for a 2D representation using simple white lines. These abstract lines visualize silence, noise, and sound waves, making imperceptible sounds and their spatial behavior within the auditorium visible and understandable." />

            <ImageRow 
              h="std" layout="50-50" 
              src={[ p3[4].src, p3[5].src ]} 
              indices={[4, 5]}
              onMediaClick={openLightbox}
              useThumbnail={true}
            />
             <ImageRow 
              h="std" layout="50-50" 
              src={[ p3[6].src, p3[7].src ]} 
              indices={[6, 7]}
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={5} />

            {/* 4. TACTILE ARTEFACT (Foto 11, 12, 13 -> Indici 10, 11, 12) */}
            {/* Saltiamo i video 09 e 10 (indici 8 e 9) che si vedranno solo in lightbox */}
            <TextBlock title="Tactile artefact" text="We created a vertical, compact tactile artifact using materials and textures that embody the essence of Auditorium A. The design was adapted to material availability but kept true to the original concept." />

            <ImageRow 
              h="std" layout="50-50" 
              src={[ p3[10].src, p3[11].src ]} 
              indices={[10, 11]}
              onMediaClick={openLightbox}
              useThumbnail={true}
            />
            <ImageRow 
              h="tall" layout="100" 
              src={[ p3[12].src ]} 
              indices={[12]}
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={10} />

            {/* 5. CREDITS (Invariato) */}
            <CreditsBlock 
              leftTitle="Motion Design - Laboratorio di progettazione di artefatti e sistemi complessi"
              leftBody={["Dina Riccò", "Gian Luca Balzerano", "\u00A0", "Alberto Barone, Lorenzo Maffei,", "Giulia Martimucci, Alessandro Zamperini"]}
              rightTitle="Group"
              rightBody={["Tommaso Spadaro", "Andrea Gatti", "Nicolò Armelin", "Marco Brigenti"]}
              logos={[
                "/logos/polimi.png",
                "/logos/rai.png",
                "/logos/controsenso.png",
                "/logos/istituto-ciechi.png"
              ]}  
            />
          </>
        );
      }

        case "4": {
        // Recupero i media del progetto 4
        const p4 = PROJECTS_DATA["4"];

        return (
          <>
            {/* 1. INTRO */}
            <IntroBlock 
              year="2025" 
              text={
                <>
                  The project Save the Keys, born in collaboration with Save the Children, brings young people closer to the brand by allowing them to donate through the purchase of keychains created in partnership with five studios based in Milan.
                  <br /><br />
                  This initiative combines creativity and solidarity, offering a personalized product that supports fundamental social causes, encouraging awareness and active participation among young people.
                </>
              } 
            />

            <Spacer size={5} />

            {/* 2. HERO: Foto 01 (Tall 100) */}
            <ImageRow 
              h="500px" 
              layout="100" 
              src={[ p4[0].src ]} 
              indices={[0]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
              scale1={1.05}
            />

            <Spacer size={5} />

            {/* 3. KEYCHAIN: Foto 02 + 03 (Tall 50-50) */}
            <TextBlock 
              title="Keychain" 
              text="Each keychain piece was created in collaboration with a different studio, drawing inspiration from their design language. Each keychain tells the story of a specific donation cause, making the buyer’s experience unique." 
            />

            <ImageRow 
              h="500px" 
              layout="50-50" 
              src={[ p4[1].src, p4[2].src ]} 
              indices={[1, 2]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={5} />

            {/* 4. COLLABORATION: Foto 04 (Tall 100) */}
            <TextBlock 
              title="Collaboration" 
              text="The studios involved in the project are Caffè Design, FM Milano, NSS Magazine, Wondulust, and Burro Studio. The production, distribution, and logistics of the keychains were handled by Tiger." 
            />

            <ImageRow 
              h="650px" 
              layout="100" 
              src={[ p4[3].src ]} 
              indices={[3]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={5} />
            
            <TextBlock 
              title="Tech & Prototypes" 
            />

            <ImageRow 
              h="std" 
              layout="100" 
              src={[ p4[4].src ]} 
              indices={[4]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <ImageRow 
              h="std" 
              layout="100" 
              src={[ p4[5].src ]} 
              indices={[5]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />
            
            {/* Nota: I video 05 e 06 (Index 4 e 5) non sono nella pagina, 
                ma saranno visibili scorrendo la Lightbox se clicchi sull'ultima foto */}

            <Spacer size={10} />

            {/* 5. CREDITS */}
            <CreditsBlock 
              leftTitle="Event Design"
              leftBody={["Luca Fois", "Renato Ocone", "\u00A0", "Camilla Guerci"]}
              rightTitle="Group"
              rightBody={["Nicolò Armelin", "Andrea Gatti"]}
              logos={[
                "/logos/polimi.png",
                "/logos/stc.png",
                "/logos/tiger.png"
              ]} 
            />
          </>
        );
      }

        case "5": {
        // Recupero i media del progetto 5
        const p5 = PROJECTS_DATA["5"];

        return (
          <>
            {/* 1. INTRO */}
            <IntroBlock 
              year="2024" 
              text={
                <>
                  The branding for the Chladni Musik Fest is an exercise inspired by Chladni dishes.
                  <br /><br />
                  The festival takes place in a nightclub in Berlin and is created in collaboration with UNESCO, which recognizes Berlin techno as a cultural heritage. I develop an irregular typeface that perfectly matches the Chladni effect graphic.
                </>
              } 
            />

            <Spacer size={5} />

            {/* Immagine 1 (Hero) */}
            <ImageRow 
              h="415px" 
              layout="100" 
              src={[ p5[0].src ]} 
              indices={[0]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={5} />

            {/* Immagini 2 e 3 */}
            <TextBlock 
              title="Chladni font focus" 
              text="The font has a unique design with irregular and ornamental features, created through a process of research, sketching, digitization and refinement. Each letter has a distinctive quality, with curved lines and decorative details that give it a handcrafted and artistic look." 
            />
            
            <ImageRow 
              h="tall" 
              layout="100" 
              src={[ p5[1].src ]} 
              indices={[1]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={5} />

            {/* Immagine 4 */}
            <TextBlock 
              title="Chladni effect and 3d modelling" 
              text="I created the Chladni effect via Geometry Nodes in Blender, a phenomenon that shows vibration patterns on a thin, vibrating surface. To achieve this effect, I made a dot grid that deforms to form these wavy patterns, simulating how a vibrating plate would behave." 
            />

            <ImageRow 
              h="tall" 
              layout="100" 
              src={[ p5[2].src ]} 
              indices={[2]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />


            {/* Immagine 5 */}
            <TextBlock title="Social" />

            <ImageRow 
              h="tall" 
              layout="100" 
              src={[ p5[3].src ]} 
              indices={[3]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <ImageRow 
              h="std" 
              layout="100" 
              src={[ p5[4].src ]}
              indices={[4]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
              scale1={1.2}
            />

            <TextBlock title="Other" />

            {/* Immagine 6 (Std 100) */}
             <ImageRow 
              h="415px" 
              layout="100" 
              src={[ p5[5].src ]} 
              indices={[5]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
              scale1={1.3}
            />

            {/* Immagine 7 (Tall 100 Finale) */}
            <ImageRow 
              h="415px" 
              layout="100" 
              src={[ p5[6].src ]} 
              indices={[6]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={10} />
            
            {/* CREDITS */}
            <CreditsBlock 
              leftTitle="Personal Experimental Design"
              leftBody={[]} // <--- AGGIUNTO QUESTO (Obbligatorio)
              rightTitle=""
              rightBody={[]}
              logos={[]}
            />
          </>
        );
      }

        case "6": {
        // Recupero i media del progetto 6
        const p6 = PROJECTS_DATA["6"];

        return (
          <>
            {/* 1. INTRO */}
            <IntroBlock 
              year="2024" 
              text="The io:brand project was born out of a desire to experiment in two directions. The first consists of a clothing line that follows unconventional ideologies, while the second explores various visual concepts, using typography created specifically for the project and transforming images into pixels replaced by ASCII characters or elementary shapes." 
            />

            <Spacer size={5} />

            {/* 2. FOTO: Tall 50-50 (Img 01, 02) */}
            <ImageRow 
              h="tall" 
              layout="50-50" 
              src={[ p6[0].src, p6[1].src ]} 
              indices={[0, 1]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={5} />

            {/* 3. TESTO: Logo and typo */}
            <TextBlock 
              title="Logo and typo" 
              text="The creation of the pictogram and logotype is based on intentional experimentation with shapes. This approach allowed for playful geometry and gave the project a unique and recognizable identity." 
            />

            {/* 4. FOTO: Tall 50-50 (Img 03, 04) */}
            <ImageRow 
              h="tall" 
              layout="50-50" 
              src={[ p6[2].src, p6[3].src ]} 
              indices={[2, 3]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={5} />

            {/* 5. TESTO: Custom type */}
            <TextBlock 
              title="Custom type" 
              text="I continued experimenting with shapes, exploring their overlapping to create dynamic and layered compositions." 
            />

            {/* 6. FOTO: Tall 100 (Img 05) */}
            <ImageRow 
              h="tall" 
              layout="100" 
              src={[ p6[4].src]} 
              indices={[4]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={5} />
            
            {/* 7. POSTER (Img 06 - Index 5) */}
            <TextBlock title="Posters" />

            <ImageRow 
              h="35vw" 
              layout="100" 
              src={[ p6[5].src ]} 
              indices={[5]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            {/* 8. ALTRE FOTO (Img 07, 08) */}
            <ImageRow 
              h="25vw" 
              layout="100" 
              src={[ p6[6].src ]} 
              indices={[6]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <ImageRow 
              h="25vw" 
              layout="100" 
              src={[ p6[7].src ]} 
              indices={[7]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={5} />

            {/* 9. TESTO: Senza titolo (PDF shoot) */}
            <TextBlock 
              title="" 
              text="From a *PDF shoot by Domenico Formichetti, I experiment with translating color ranges into simple geometric shapes." 
            />

            {/* 10. FOTO FINALE (Img 09 - Index 8) */}
            <ImageRow 
              h="tall" 
              layout="100" 
              src={[ p6[8].src ]} 
              indices={[8]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={10} />

            {/* 11. CREDITS (Corretto per evitare crash) */}
            <CreditsBlock 
              leftTitle="Personal Experimental Design"
              leftBody={[]} // <--- AGGIUNTO QUESTO (Obbligatorio)
              rightTitle=""
              rightBody={[]}
              logos={[
                "/logos/pdf.png"
              ]} 
            />
          </>
        );
      }

        case "7": {
        // Recupero i media del progetto 7
        const p7 = PROJECTS_DATA["7"];

        return (
          <>
            {/* 1. INTRO */}
            <IntroBlock 
              year="2023" 
              text={
                <>
                  The project was created as the final project of the Motion Design course. The plot of the story had to combine the words extracted: caterpillar, determined, walk, mountain and high.
                  <br /><br />
                  From these words was born the plot that tells of a caterpillar that, in a dream, is seen at the top of an imposing mountain. So when he wakes up, feeling inspired and determined, he decides to leave.
                </>
              }
              link="https://youtu.be/_c1SixyoZrU"
            />

            <Spacer size={5} />

            {/* 2. HERO: Foto 01 (Tall 100) */}
            <ImageRow 
              h="tall" 
              layout="100" 
              src={[ p7[0].src ]} 
              indices={[0]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={5} />

            {/* 3. 3D SETTINGS & CHARACTER DESIGN */}
            <TextBlock 
              title="3d settings and character design" 
              text="" 
            />
            
            {/* Foto 02 (Std 100) - Settings */}
            <ImageRow 
              h="std" 
              layout="100" 
              src={[ p7[1].src ]} 
              indices={[1]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            {/* Foto 03 (Tall 100) - Character (MODIFICATO: era 50-50) */}
            <ImageRow 
              h="tall" 
              layout="100" 
              src={[ p7[2].src ]} 
              indices={[2]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={5} />

            {/* 4. STORYBOARD (MODIFICATO: 3 righe Tall) */}
            <TextBlock 
              title="Storyboard & Designboard" 
              text="" 
            />
            
            {/* Foto 04 */}
            <ImageRow 
              h="tall" 
              layout="100" 
              src={[ p7[3].src ]} 
              indices={[3]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />
            {/* Foto 05 */}
            <ImageRow 
              h="tall" 
              layout="100" 
              src={[ p7[4].src ]} 
              indices={[4]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />
            {/* Foto 06 */}
            <ImageRow 
              h="tall" 
              layout="100" 
              src={[ p7[5].src ]} 
              indices={[5]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={5} />

            {/* 5. EXTRACTS (8 file rimasti -> 4 righe da 2) */}
            <TextBlock 
              title="Extracts" 
              text="" 
            />
            
            {/* Riga 1: Video 07 + Foto 08 */}
            <ImageRow 
              h="std" 
              layout="50-50" 
              src={[ p7[6].src, p7[7].src ]} 
              indices={[6, 7]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />
            {/* Riga 2: Foto 09 + Video 10 */}
            <ImageRow 
              h="std" 
              layout="50-50" 
              src={[ p7[8].src, p7[9].src ]} 
              indices={[8, 9]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />
            {/* Riga 3: Video 11 + Foto 12 */}
            <ImageRow 
              h="std" 
              layout="50-50" 
              src={[ p7[10].src, p7[11].src ]} 
              indices={[10, 11]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />
            {/* Riga 4: Foto 13 + Video 14 */}
            <ImageRow 
              h="std" 
              layout="50-50" 
              src={[ p7[12].src, p7[13].src ]} 
              indices={[12, 13]} 
              onMediaClick={openLightbox}
              useThumbnail={true}
            />

            <Spacer size={10} />

            <CreditsBlock 
              leftTitle="Motion Design"
              leftBody={["Vincenzo Maselli"]}
              rightTitle="Group"
              rightBody={["Alessandro Caricato", "Kevin Lagatta", "Nicolò Tammaro"]}
              logos={[
                "/logos/unich.png",
                "/logos/design.png",
              ]}
            />
          </>
        );
      }

        case "8": {
        // Recupero i media del progetto 8
        const p8 = PROJECTS_DATA["8"];

        return (
          <>
            {/* 1. INTRO */}
            <IntroBlock 
              year="2021" 
              text="AlienZ is a generative art collection of 10,000 unique avatars living on the Cardano Blockchain. Born during the pivotal NFT boom of 2021, the project features a modular system of traits I designed as Lead Artist. These traits [once processed by code] generated thousands of distinct identities, each with its own rarity and immutable metadata." 
            />
            
            <Spacer size={5} />

            {/* 2. SEZIONE 1: Trait system */}
            <TextBlock 
              title="Trait system" 
              text="The challenge was not to draw a single character, but to build a flexible visual library. I hand-drawn over 100 individual assets across 7 distinct categories, from skin textures and eyes to mouths and accessories. Every layer was designed to be perfectly compatible with the others, ensuring that any random combination would result in a coherent, expressive character." 
            />

            {/* Row 1: Left JPG (01) - Right MP4 (02) */}
            <ImageRow 
              h="tall" 
              layout="50-50" 
              src={[ p8[0].src, p8[1].src ]} 
              indices={[0, 1]} 
              onMediaClick={openLightbox}
            />

            {/* Row 2: Left MP4 (03) - Right JPG (04) */}
            <ImageRow 
              h="tall" 
              layout="50-50" 
              src={[ p8[2].src, p8[3].src ]} 
              indices={[2, 3]} 
              onMediaClick={openLightbox}
            />

            {/* --- RIGA DOPPIO VIDEO (Versione Senza Installazioni) --- */}
            <div 
              style={{ 
                display: 'flex', 
                flexWrap: 'wrap', // Questo fa andare a capo su mobile
                gap: '10px',      
                width: '100%',
                marginBottom: '40px' 
              }}
            >
              
              {/* VIDEO SINISTRA */}
              <div style={{ flex: '1 1 300px', position: 'relative', aspectRatio: '1/1' }}>
                <iframe 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  src="https://www.youtube.com/embed/oJlnsYRFJxk?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1" 
                  title="Video Sinistra"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>

              {/* VIDEO DESTRA */}
              <div style={{ flex: '1 1 300px', position: 'relative', aspectRatio: '1/1' }}>
                <iframe 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  src="https://www.youtube.com/embed/ftN6vYfa4Tc?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1" 
                  title="Video Destra"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>

            </div>
            
            <Spacer size={5} />

            {/* 3. SEZIONE 2: Generative DNA */}
            <TextBlock 
              title="Generative DNA" 
              text="The artwork comes to life through code. A custom algorithm acted as the assembler, fusing the graphical layers based on rarity logic to create 10,000 unique iterations. This process generated a specific JSON 'DNA' for every Alien, permanently linking its visual appearance to its digital identity on the blockchain." 
            />

             {/* Row 1: Left JPG (05) - Right MP4 (06) */}
            <ImageRow 
              h="tall" 
              layout="50-50" 
              src={[ p8[4].src, p8[5].src ]} 
              indices={[4, 5]} 
              onMediaClick={openLightbox}
            />
            {/* Row 2: Left MP4 (07) - Right JPG (08) */}
            <ImageRow 
              h="tall" 
              layout="50-50" 
              src={[ p8[6].src, p8[7].src ]} 
              indices={[6, 7]}
              onMediaClick={openLightbox}              
            />

            <Spacer size={5} />

            {/* 4. SEZIONE 3: 10.000 unique identities */}
            <TextBlock 
              title="10.000 unique identities" 
              text="From common traits to ultra-rare combinations, no two AlienZ look exactly the same. The generative process allowed for a massive variety of expressions and personalities, fostering a dedicated community that valued both the aesthetic appeal and the statistical rarity of each piece." 
            />

            {/* Row 1: Left JPG (09) - Right MP4 (10) */}
            <ImageRow 
              h="tall" 
              layout="50-50" 
              src={[ p8[8].src, p8[9].src ]} 
              indices={[8, 9]} 
              onMediaClick={openLightbox}
            />
            {/* Row 2: Left MP4 (11) - Right JPG (12) */}
            <ImageRow 
              h="tall" 
              layout="50-50" 
              src={[ p8[10].src, p8[11].src ]} 
              indices={[10, 11]} 
              onMediaClick={openLightbox}
            />

            <Spacer size={10} />            

            {/* 5. CREDITS */}
            <CreditsBlock 
              leftTitle="Lead Artist & Creative Direction"
              leftBody={[]}
              rightTitle="Collaborators"
              rightBody={["Fatmir Bylishi", "Ugo Bylyshi", "Giuseppe Steduto"]}
              logos={[]}
            />
          </>
        );
      }

        case "9": {
      // === PROGETTO 9: VALLECHIARA ===
      // Recupero i media del progetto 9
      const p9 = PROJECTS_DATA["9"];

      return (
        <>
          {/* 1. INTRO BLOCK */}
          <IntroBlock 
            year="2025"
            text={
              <>
                A village that does not exist, built entirely on the expectations of its visitors. “Vallechiara: The Illusion of the Authentic” is a critical project analyzing the fracture between territorial reality and media representation.
                <br /><br />
                In a context where tourism communication tends to simplify the complexity of places to make them marketable, this project generates a visual paradox: a hyper-realistic place that, precisely in its perfection, reveals the standardized and stereotypical nature of today's territorial narratives.
              </>
            }
            link="https://youtu.be/oJlnsYRFJxk"
          />
          
          <Spacer size={5} />

          {/* 2. SEZIONE CONCEPT */}
          <TextBlock 
            title="Concept" 
            text={
              <>
                <p className="mb-4">
                  To investigate the standardization of tourism narratives, the project defines a speculative model: the Metaborgo. Vallechiara is a fictional yet hyper-realistic place, generated by the visual languages that the market imposes on territories.
                  <br /><br />
                  The intervention unfolds as a two-act transmedia strategy:
                  <br />
                  ☉ <u>The Deception (Campaign):</u> an integrated communication strategy that launches the destination by leveraging the rhetoric of authenticity.
                  <br />
                  ◉ <u>The Revelation (Exhibition):</u> an interactive journey that deconstructs the mechanisms of stereotyping, exposing the media infrastructure that sustains the Tuscan "postcard."
                </p>
              </>
            } 
          />

          {/* Row 1: Images 01 (Left) - 02 (Right) */}
          <ImageRow 
            h="tall" 
            layout="50-50" 
            src={[ p9[0].src, p9[1].src ]} 
            indices={[0, 1]} 
            onMediaClick={openLightbox}
            useThumbnail={true}
          />

          {/* Row 2: Double Video Embed (Shorts) - 1/1 Ratio */}
          <DoubleVideo 
            leftId="RirRteKyCJo" 
            rightId="-7pjONsmWoE" 
            ratio="1/1" 
          />

          <Spacer size={5} />

          {/* 3. SEZIONE PROMOTIONAL CAMPAIGN */}
          <TextBlock 
            title="Promotional campaign [Illusione]" 
            text="A two-phase strategy: first the deception, launching Vallechiara as a real destination via branding (billboards, merch, social); then the revelation, exposing the artifice to promote the critical exhibition." 
          />

          {/* Row 3: Image 04 (Full Width / Tall) */}
          {/* Nota: p9[2] è il video 03.mp4 (saltato qui), quindi 04.jpg è p9[3] */}
          <ImageRow 
            h="tall" 
            layout="100" 
            src={[ p9[3].src ]} 
            indices={[3]} 
            onMediaClick={openLightbox}
            useThumbnail={true}
          />

          <Spacer size={5} />

          {/* 4. SEZIONE ROOM (1) */}
          <TextBlock 
            title="Room (1) [Realtà simulata]" 
            text="A video installation introduces the Metaborgo, revealing Vallechiara not as a physical place but an aesthetic prediction: a visual product built entirely on tourist expectations." 
          />

          {/* Row 4: Double Video Embed - 1/1 Ratio */}
          <DoubleVideo 
            leftId="EDXWWB10pPM" 
            rightId="BflGqu4zytk"
            autoPlayLeft={true} 
            autoPlayRight={false}
            ratio="1/1" 
          />

          <Spacer size={5} />

          {/* 5. SEZIONE ROOM (2) */}
          <TextBlock 
            title="Room (2) [Identità in serie]" 
            text="A multi-screen system cyclically regenerates 10 scenarios. The spatial structure remains identical, details change every 15 seconds: a visual demonstration of the standardization and homogenization of tourist villages." 
          />

          {/* Row 5: Double Video Embed - 1/1 Ratio */}
          <DoubleVideo 
            leftId="RlbZkCaeIjw" 
            rightId="G2tliq8yVVM"
            autoPlayLeft={false} 
            autoPlayRight={true} 
            ratio="1/1" 
          />

          {/* Single Video Tall*/}
          <SingleVideo 
            id="mYOPiVbuARw" 
            ratio="3840/1080"
            autoPlay={false}
          />

          <Spacer size={5} />

          {/* ================= SECTION 5: ROOM (3a) [Dentro l’algoritmo] ================= */}
          <TextBlock 
            title="Room (3a) [Dentro l’algoritmo]" 
            text="Eight screens and exposed cables display the digital &quot;assembly line&quot; behind the romantic image. From data analysis to the final render, the Metaborgo’s technological infrastructure becomes transparent." 
          />

          {/* Row 5: Double Video Embed - 1/1 Ratio */}
          <DoubleVideo 
            leftId="tU5heTrzH4M"    // Autoplay: TRUE
            rightId="SkQUc_N4vMI"   // Autoplay: FALSE
            ratio="1/1" 
            autoPlayLeft={true}
            autoPlayRight={false}
          />

          {/* Single Video Tall*/}
          <SingleVideo 
            id="GUayb60a4bw" 
            ratio="3840/1080"
            autoPlay={false}
          />

          <Spacer size={5} />

          {/* ================= SECTION 6: ROOM (3b) [Interattiva] ================= */}
          <TextBlock 
            title="Room (3b) [Interattiva]" 
            text="Users explore the 3D model via tablet and generate real-time images. The interface breaks down the &quot;authentic&quot; view into its artificial layers (structure, data, prompt), making the simulation visible." 
          />

          {/* Row 6: Double Video Embed - 1/1 Ratio */}
          <DoubleVideo 
            leftId="9r0BOpra1_E"    // Autoplay: FALSE
            rightId="LaLfcxtas4w"   // Autoplay: TRUE
            ratio="1/1"
            autoPlayLeft={false}
            autoPlayRight={true}
          />


          <Spacer size={5} />

          {/* ================= SECTION 7: BROCHURE ================= */}
          <TextBlock 
            title="Brochure" 
            text="An editorial guide accompanying visitors, providing the theoretical and technical keys needed to decode the dynamics of stereotyping analyzed in the rooms." 
          />

          {/* Image 13 (Tall 100) */}
          <ImageRow 
            h="tall" 
            layout="100" 
            src={[ p9[12].src ]} 
            indices={[12]} 
            onMediaClick={openLightbox}
            useThumbnail={true}
          />


          <Spacer size={5} />

          {/* ================= SECTION 8: TECHNOLOGIES ================= */}
          <TextBlock 
            title="Technologies and Prototyping" 
            text="Iconic locations were modeled in 3D to extract depth maps. The final render was orchestrated via ComfyUI, using a custom LoRA (lightweight model fine-tuning) trained on the Tuscan aesthetic to clothe the geometry with photorealistic textures guided by prompts." 
          />

          {/* Row: Videos 15 & 16 (Tall 50-50) */}
          <ImageRow 
            h="tall" 
            layout="50-50" 
            src={[ p9[14].src, p9[15].src ]} 
            indices={[14, 15]} 
            onMediaClick={openLightbox}
            useThumbnail={true}
          />

          {/* Row: Video 17 (Tall 100) */}
          <ImageRow 
            h="tall" 
            layout="100" 
            src={[ p9[16].src ]} 
            indices={[16]} 
            onMediaClick={openLightbox}
            useThumbnail={true}
          />

          <CreditsBlock 
              leftTitle="Laboratorio di Sistesi Finale"
              leftBody={["Daniela Calabi", "Clorinda Galasso", "Marco Quaggiotto"]}
              rightTitle="Group"
              rightBody={["Andrea Gatti", "Arianna Lualdi", "Corinne Lisa Paterlini", "Elisa Paganoni"]}
              logos={[
                "/logos/polimi.png",
                "/logos/dcxt.png"
              ]}
            />

        </>
      );
    }

      default:
        return <div>Progetto non trovato</div>;
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => setContainerSize({ width: containerRef.current!.offsetWidth, height: containerRef.current!.offsetHeight });
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  // --- PREPARAZIONE DATI LIGHTBOX ---
  // Recupera i dati del progetto attivo (se ce n'è uno)
  const currentProjectMedia = selectedId ? PROJECTS_DATA[selectedId] : [];
  
  // Mappa i nostri dati nel formato richiesto dalla libreria Lightbox
  const lightboxSlides = currentProjectMedia?.map((item) => {
    if (item.type === 'video') {
      return {
        type: "video",
        width: 1920, // Valori indicativi per il player
        height: 1080,
        sources: [{ src: item.src, type: "video/mp4" }],
        autoPlay: true,
        muted: true,
        loop: true
      };
    }
    // Altrimenti è un'immagine
    return { src: item.src };
  }) || [];

  // Definisci il breakpoint (puoi usare containerSize.width o window.innerWidth)
  const isMobile = containerSize.width < 768; 

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
        {/* --- SEZIONE ABOUT ME --- */}
        {overlayMode === 'about' && (
           <>
             {/* 1. BIO (English Version) */}
             <IntroBlock 
               year="WHO" 
               text={
                 <>
                   My journey began with code and evolved into design.
                   <br/><br/>
                   Bridging a technical IT background with the academic training at Politecnico di Milano, I approach Visual Design as a dialogue between <u>logical rigor</u> and <u>design expression</u>.
                   <br/><br/>
                   I build visual systems that are not just aesthetic, but functional structures.
                 </>
               }
               isOverlay={true} 
             />
             
             {/* 2. CONTACTS */}
             <IntroBlock 
               year="MAIL" 
               text={
                 <>
                   {/* Email Cliccabile */}
                   <a href="mailto:lucasquarcella@hotmail.it" style={{ textDecoration: 'none', color: 'inherit' }}>
                     <u>lucasquarcella@hotmail.it</u>
                   </a>
                   <br/>
                 </>
               }
               isOverlay={true} 
             />

             <IntroBlock 
               year="NUM" 
               text={
                 <>
                   {/* Telefono Cliccabile */}
                   <a href="tel:+393664347482" style={{ textDecoration: 'UNDERLINE', color: 'inherit' }}>
                     +39 366 434 7482
                   </a>
                   <br/>
                 </>
               }
               isOverlay={true} 
             />

           </>
        )}

        {/* --- SEZIONE CV --- */}
        {overlayMode === 'cv' && (
           <>
             {/* HEADER: EDUCATION */}
             <IntroBlock 
                year="_EDUCATION" 
                text="" 
                isOverlay={true}
                customYearStyle={{
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: '1px solid #000000',
                  fontWeight: 'bold'
                }}
              />

             {/* 1. MASTER (Presente) */}
             <IntroBlock 
               year="2024–PRES" 
               text={
                 <>
                   <u>Master’s Degree - Communication Design</u><br/>
                   Politecnico di Milano<br/>
                   Milan (IT)
                 </>
               }
               isOverlay={true}
             />

             {/* 2. BACHELOR */}
             <IntroBlock 
               year="2020–2023" 
               text={
                 <>
                   <u>Bachelor’s Degree - Design</u><br/>
                   Università degli Studi “Gabriele D’Annunzio”<br/>
                   Pescara (IT)
                 </>
               }
               isOverlay={true}
             />

             {/* 3. ERASMUS */}
             <IntroBlock 
               year="2022" 
               // --- STILE CUSTOM BANDIERA ---
               customYearStyle={{
                 // Sovrascriviamo il tuo sfondo nero con la bandiera
                 background: 'linear-gradient(90deg, #AA151B 0%, #AA151B 25%, #F1BF00 25%, #F1BF00 75%, #AA151B 75%, #AA151B 100%)',
                 color: '#ffffff', // Testo nero (perché sul giallo/rosso il bianco si legge male)
                 fontWeight: '900', 
                 border: '1px solid #000' // Opzionale: bordino per definizione
               }}
               text={
                 <>
                   <u>Erasmus - Design and Product Development</u><br/>
                   Universidad de Málaga<br/>
                   Málaga (ES)
                 </>
               }
               isOverlay={true}
             />

             {/* 4. DIPLOMA */}
             <IntroBlock 
               year="2015–2020" 
               text={
                 <>
                   <u>High School Diploma in Computer Science</u><br/>
                   Technical Institute “Luigi Di Maggio”<br/>
                   San Giovanni Rotondo (IT)
                 </>
               }
               isOverlay={true}
             />

            {/* --- SEZIONE WORK --- */}

            <Spacer size={30} />
             
            <IntroBlock 
               year="_WORK" 
               text="" 
               isOverlay={true}
               customYearStyle={{
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: '1px solid #000000',
                  fontWeight: 'bold'
                }}
              />

             {/* 1. POLITECNICO DI MILANO (Sett 2025 - Dic 2025) */}
             <IntroBlock 
               year="09/2025-12/2025" 
               text={
                 <>
                   <u>Social Media Manager - 200h</u><br/>
                   Politecnico di Milano<br/>
                   Milan (IT)<br/><br/>
                   
                   • Storytelling and scripting<br/>
                   • Video editing (short-form)<br/>
                   • Content creation (IG/TikTok)
                 </>
               } 
               isOverlay={true} 
             />

             {/* 2. CROMYA (Lug 2023 - Set 2023) */}
             <IntroBlock 
               year="06/2023-09/2023" 
               text={
                 <>
                   <u>Graphic Designer & Print Specialist</u><br/>
                   Cromya<br/>
                   San Giovanni Rotondo (IT)<br/><br/>

                   • Small and large format printing<br/>
                   • Branding on vehicles and clothing<br/>
                   • Graphics for restaurants and shops
                 </>
               } 
               isOverlay={true} 
             />

             {/* 3. EMILIO DECORI (Nov 2023 - Lug 2024) */}
             <IntroBlock 
               year="09/2023–06/2024" 
               text={
                 <>
                   <u>Drywall installer and painter</u><br/>
                   Emilio Decori<br/>
                   San Giovanni Rotondo (IT)<br/><br/>

                   • Plasterboard assembly<br/>
                   • Finishing and sanding<br/>
                   • Painting and textures
                 </>
               } 
               isOverlay={true} 
             />
           </>
        )}
      </InfoOverlay>

      {/* --- LIGHTBOX COMPONENT --- */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        slides={lightboxSlides as any}

        plugins={[Video, Counter, Zoom]}

        className="portfolio-lightbox"

        styles={{
          container: { backgroundColor: "#fffffff5" },

          root: { 
            "--yarl__color_button": "#000000", 
            "--yarl__color_backdrop": "#ffffff",
          },

          slide: { padding: "12vw" }
        }}
      />
    </>
  );
}

export default App;