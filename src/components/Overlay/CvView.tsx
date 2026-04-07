import { IntroBlock, Spacer } from "../../components/UI";

const CvView = () => {
  return (
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
            <u>Master’s Degree - Communication Design</u><br />
            Politecnico di Milano<br />
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
            <u>Bachelor’s Degree - Design</u><br />
            Università degli Studi “Gabriele D’Annunzio”<br />
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
          color: '#ffffff', // Testo nero
          fontWeight: '900',
          border: '1px solid #000' // Opzionale: bordino per definizione
        }}
        text={
          <>
            <u>Erasmus - Design and Product Development</u><br />
            Universidad de Málaga<br />
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
            <u>High School Diploma in Computer Science</u><br />
            Technical Institute “Luigi Di Maggio”<br />
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
            <u>Social Media Manager - 200h</u><br />
            Politecnico di Milano<br />
            Milan (IT)<br /><br />

            • Storytelling and scripting<br />
            • Video editing (short-form)<br />
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
            <u>Graphic Designer & Print Specialist</u><br />
            Cromya<br />
            San Giovanni Rotondo (IT)<br /><br />

            • Small and large format printing<br />
            • Branding on vehicles and clothing<br />
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
            <u>Drywall installer and painter</u><br />
            Emilio Decori<br />
            San Giovanni Rotondo (IT)<br /><br />

            • Plasterboard assembly<br />
            • Finishing and sanding<br />
            • Painting and textures
          </>
        }
        isOverlay={true}
      />
    </>
  );
};

export default CvView;
