import { IntroBlock, TextBlock, ImageRow, Spacer, CreditsBlock } from "../components/UI";
import { PROJECTS_DATA } from "../ProjectsData";

export const Project2 = ({ openLightbox }: { openLightbox: (index: number) => void }) => {
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
        src={[p2[0].src, p2[2].src]}
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
        src={[p2[3].src, p2[4].src]}
        indices={[3, 4]}
        onMediaClick={openLightbox}
        useThumbnail={true}

      />
      <ImageRow
        h="tall"
        layout="100"
        src={[p2[5].src]}
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
        src={[p2[7].src, p2[8].src]}
        indices={[7, 8]}
        onMediaClick={openLightbox}
        useThumbnail={true}
      />
      <ImageRow
        h="std"
        layout="100"
        src={[p2[9].src]}
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
        src={[p2[10].src]}
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
        src={[p2[11].src, p2[12].src]}
        indices={[11, 12]}
        onMediaClick={openLightbox}
        useThumbnail={true}
      />
      <ImageRow
        h="tall"
        layout="100"
        src={[p2[14].src]} // Ricorda: è la foto 15.jpg (Index 14)
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
};
