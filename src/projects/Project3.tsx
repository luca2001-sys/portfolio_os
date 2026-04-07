import { IntroBlock, TextBlock, ImageRow, Spacer, CreditsBlock } from "../components/UI";
import { PROJECTS_DATA } from "../ProjectsData";

export const Project3 = ({ openLightbox }: { openLightbox: (index: number) => void }) => {
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
        src={[p3[0].src, p3[1].src]}
        indices={[0, 1]} // <-- NUOVO: Diciamo che sono la foto 0 e 1
        onMediaClick={openLightbox}
        useThumbnail={true}
      />
      <ImageRow
        h="std" layout="50-50"
        src={[p3[2].src, p3[3].src]}
        indices={[2, 3]} // <-- e così via...
        onMediaClick={openLightbox}
        useThumbnail={true}
      />

      <Spacer size={5} />

      {/* 3. CONCEPTUAL (Foto 05, 06, 07, 08 -> Indici 4, 5, 6, 7) */}
      <TextBlock title="" text="For the conceptual part, we opted for a 2D representation using simple white lines. These abstract lines visualize silence, noise, and sound waves, making imperceptible sounds and their spatial behavior within the auditorium visible and understandable." />

      <ImageRow
        h="std" layout="50-50"
        src={[p3[4].src, p3[5].src]}
        indices={[4, 5]}
        onMediaClick={openLightbox}
        useThumbnail={true}
      />
      <ImageRow
        h="std" layout="50-50"
        src={[p3[6].src, p3[7].src]}
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
        src={[p3[10].src, p3[11].src]}
        indices={[10, 11]}
        onMediaClick={openLightbox}
        useThumbnail={true}
      />
      <ImageRow
        h="tall" layout="100"
        src={[p3[12].src]}
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
};
