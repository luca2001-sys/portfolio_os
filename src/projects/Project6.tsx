import { IntroBlock, TextBlock, ImageRow, Spacer, CreditsBlock } from "../components/UI";
import { PROJECTS_DATA } from "../ProjectsData";

export const Project6 = ({ openLightbox }: { openLightbox: (index: number) => void }) => {
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
        src={[p6[0].src, p6[1].src]}
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
        src={[p6[2].src, p6[3].src]}
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
        src={[p6[4].src]}
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
        src={[p6[5].src]}
        indices={[5]}
        onMediaClick={openLightbox}
        useThumbnail={true}
      />

      {/* 8. ALTRE FOTO (Img 07, 08) */}
      <ImageRow
        h="25vw"
        layout="100"
        src={[p6[6].src]}
        indices={[6]}
        onMediaClick={openLightbox}
        useThumbnail={true}
      />

      <ImageRow
        h="25vw"
        layout="100"
        src={[p6[7].src]}
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
        src={[p6[8].src]}
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
};
