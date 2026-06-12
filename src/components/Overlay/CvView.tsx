import { CvBlock, CvSectionHeader, Spacer } from "../../components/UI";

const CvView = () => {
  return (
    <>
      {/* ─── EDUCATION ─── */}
      <CvSectionHeader label="EDUCATION" />

      <CvBlock
        date="2024 – PRES"
        role="MA in Communication Design"
        company={<>Politecnico di Milano<br />Milan (IT)</>}
      />

      <CvBlock
        date="2020 – 2023"
        role="Bachelor's Degree in Design"
        company={<>Università "G. D'Annunzio"<br />Pescara (IT)</>}
      />

      <CvBlock
        date="02/22 – 07/22"
        role="Industrial Design and Product Development"
        company={<>University of Málaga<br />Málaga (ES)</>}
      />

      <CvBlock
        date="2015 – 2020"
        role="High School Diploma in Computer Science"
        company={<>Technical Institute<br />SGR (FG)</>}
      />

      {/* ─── WORK EXPERIENCE ─── */}
      <Spacer size={30} />
      <CvSectionHeader label="WORK" />

      <CvBlock
        date="06/2026 – PRES"
        role="UX/UI Designer & Front-End Developer"
        company="VISLAVIE"
        bullets={
          <>
            • Interface Development<br />
            • Shopify Readiness<br />
            • AI-Assisted Development<br />
            • AI Model generation & dressing<br />
            • Bulk Asset Management
          </>
        }
      />

      <CvBlock
        date="05/2026 – PRES"
        role="Visual Designer & Social Media Strategist"
        company="FIRM.GS"
        bullets={
          <>
            • Template System Design<br />
            • Social Media Strategy
          </>
        }
      />

      <CvBlock
        date="09/2025 – 12/2025"
        role="Social Media Manager"
        company="Politecnico di Milano"
        bullets={
          <>
            • Storytelling<br />
            • Editing<br />
            • Social Media Content
          </>
        }
      />

      <CvBlock
        date="07/2023 – 09/2023"
        role="Graphic & Print Designer"
        company="Cromya Studio"
        bullets={
          <>
            • Printing<br />
            • Apparel<br />
            • Vehicles<br />
            • Catering / Restaurants<br />
            • Storefronts
          </>
        }
      />

      <CvBlock
        date="LANGUAGES"
        role={null}
        topSpacing
        customDateStyle={{
          backgroundColor: '#000000',
          color: '#ffffff',
          padding: '0px 3px',
        }}
        bullets={
          <>
            Italian<br />
            English<br />
            Spanish
          </>
        }
      />
    </>
  );
};

export default CvView;
