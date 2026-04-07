import { IntroBlock, TextBlock, ImageRow, Spacer, CreditsBlock } from "../components/UI";
import { PROJECTS_DATA } from "../ProjectsData";

export const Project1 = ({ openLightbox }: { openLightbox: (index: number) => void }) => {
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
        src={[p1[0].src, p1[1].src]}
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
        src={[p1[2].src, p1[3].src]}
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
        src={[p1[6].src, p1[7].src]}
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
        src={[p1[9].src, p1[10].src]}
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
        src={[p1[13].src, p1[14].src]}
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
        src={[p1[17].src]}
        indices={[17]}
        onMediaClick={openLightbox}
        useThumbnail={true}
      />

      <ImageRow
        h="tall"
        layout="100"
        src={[p1[20].src]}
        indices={[20]}
        onMediaClick={openLightbox}
        useThumbnail={true}
      />

      <ImageRow
        h="tall"
        layout="100"
        src={[p1[21].src]}
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
        src={[p1[22].src]}
        indices={[22]}
        onMediaClick={openLightbox}
        useThumbnail={true}
      />

      <Spacer size={5} />

      <IntroBlock
        link="https://youtu.be/nJ9tLW3XNIk {prova__prototipo_1}"
      />

      <IntroBlock
        link="https://youtu.be/Q9CpwwsZOMk {prova__prototipo_2}"
      />

      <Spacer size={5} />

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
};
