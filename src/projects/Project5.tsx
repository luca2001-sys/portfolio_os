import { IntroBlock, TextBlock, ImageRow, Spacer, CreditsBlock } from "../components/UI";
import { PROJECTS_DATA } from "../ProjectsData";

export const Project5 = ({ openLightbox }: { openLightbox: (index: number) => void }) => {
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
        src={[p5[0].src]}
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
        src={[p5[1].src]}
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
        src={[p5[2].src]}
        indices={[2]}
        onMediaClick={openLightbox}
        useThumbnail={true}
      />


      {/* Immagine 5 */}
      <TextBlock title="Social" />

      <ImageRow
        h="tall"
        layout="100"
        src={[p5[3].src]}
        indices={[3]}
        onMediaClick={openLightbox}
        useThumbnail={true}
      />

      <ImageRow
        h="std"
        layout="100"
        src={[p5[4].src]}
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
        src={[p5[5].src]}
        indices={[5]}
        onMediaClick={openLightbox}
        useThumbnail={true}
        scale1={1.3}
      />

      {/* Immagine 7 (Tall 100 Finale) */}
      <ImageRow
        h="415px"
        layout="100"
        src={[p5[6].src]}
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
};
