import { IntroBlock, TextBlock, ImageRow, Spacer, CreditsBlock } from "../components/UI";
import { PROJECTS_DATA } from "../ProjectsData";

export const Project8 = ({ openLightbox }: { openLightbox: (index: number) => void }) => {
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
        src={[p8[0].src, p8[1].src]}
        indices={[0, 1]}
        onMediaClick={openLightbox}
      />

      {/* Row 2: Left MP4 (03) - Right JPG (04) */}
      <ImageRow
        h="tall"
        layout="50-50"
        src={[p8[2].src, p8[3].src]}
        indices={[2, 3]}
        onMediaClick={openLightbox}
      />

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
        src={[p8[4].src, p8[5].src]}
        indices={[4, 5]}
        onMediaClick={openLightbox}
      />
      {/* Row 2: Left MP4 (07) - Right JPG (08) */}
      <ImageRow
        h="tall"
        layout="50-50"
        src={[p8[6].src, p8[7].src]}
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
        src={[p8[8].src, p8[9].src]}
        indices={[8, 9]}
        onMediaClick={openLightbox}
      />
      {/* Row 2: Left MP4 (11) - Right JPG (12) */}
      <ImageRow
        h="tall"
        layout="50-50"
        src={[p8[10].src, p8[11].src]}
        indices={[10, 11]}
        onMediaClick={openLightbox}
      />

      <Spacer size={10} />

      {/* 5. CREDITS */}
      <CreditsBlock
        leftTitle="Lead Artist & Creative Direction"
        leftBody={[]}
        rightTitle="Collaborators"
        rightBody={["Fatmir Bylyshi", "Ugo Bylyshi", "Giuseppe Steduto"]}
        logos={[]}
      />
    </>
  );
};
