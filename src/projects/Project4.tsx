import { IntroBlock, TextBlock, ImageRow, Spacer, CreditsBlock } from "../components/UI";
import { PROJECTS_DATA } from "../ProjectsData";

export const Project4 = ({ openLightbox }: { openLightbox: (index: number) => void }) => {
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
        src={[p4[0].src]}
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
        src={[p4[1].src, p4[2].src]}
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
        src={[p4[3].src]}
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
        src={[p4[4].src]}
        indices={[4]}
        onMediaClick={openLightbox}
        useThumbnail={true}
      />

      <ImageRow
        h="std"
        layout="100"
        src={[p4[5].src]}
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
};
