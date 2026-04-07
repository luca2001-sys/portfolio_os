import { IntroBlock, TextBlock, ImageRow, Spacer, CreditsBlock } from "../components/UI";
import { PROJECTS_DATA } from "../ProjectsData";

export const Project7 = ({ openLightbox }: { openLightbox: (index: number) => void }) => {
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
        src={[p7[0].src]}
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
        src={[p7[1].src]}
        indices={[1]}
        onMediaClick={openLightbox}
        useThumbnail={true}
      />

      {/* Foto 03 (Tall 100) - Character (MODIFICATO: era 50-50) */}
      <ImageRow
        h="tall"
        layout="100"
        src={[p7[2].src]}
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
        src={[p7[3].src]}
        indices={[3]}
        onMediaClick={openLightbox}
        useThumbnail={true}
      />
      {/* Foto 05 */}
      <ImageRow
        h="tall"
        layout="100"
        src={[p7[4].src]}
        indices={[4]}
        onMediaClick={openLightbox}
        useThumbnail={true}
      />
      {/* Foto 06 */}
        <ImageRow
        h="tall"
        layout="100"
        src={[p7[5].src]}
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
        src={[p7[6].src, p7[7].src]}
        indices={[6, 7]}
        onMediaClick={openLightbox}
        useThumbnail={true}
      />
      {/* Riga 2: Foto 09 + Video 10 */}
      <ImageRow
        h="std"
        layout="50-50"
        src={[p7[8].src, p7[9].src]}
        indices={[8, 9]}
        onMediaClick={openLightbox}
        useThumbnail={true}
      />
      {/* Riga 3: Video 11 + Foto 12 */}
      <ImageRow
        h="std"
        layout="50-50"
        src={[p7[10].src, p7[11].src]}
        indices={[10, 11]}
        onMediaClick={openLightbox}
        useThumbnail={true}
      />
      {/* Riga 4: Foto 13 + Video 14 */}
      <ImageRow
        h="std"
        layout="50-50"
        src={[p7[12].src, p7[13].src]}
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
};
