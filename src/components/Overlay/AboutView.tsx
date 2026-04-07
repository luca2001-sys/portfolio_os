import { IntroBlock } from "../../components/UI";

const AboutView = () => {
  return (
    <>
      {/* 1. BIO (English Version) */}
      <IntroBlock
        year="WHO"
        text={
          <>
            My journey began with code and evolved into design.
            <br /><br />
            Bridging a technical IT background with the academic training at Politecnico di Milano, I approach Visual Design as a dialogue between <u>logical rigor</u> and <u>design expression</u>.
            <br /><br />
            I build visual systems that are not just aesthetic, but functional structures.
          </>
        }
        isOverlay={true}
      />

      {/* 2. CONTACTS */}
      <IntroBlock
        year="MAIL"
        text={
          <>
            {/* Email Cliccabile */}
            <a href="mailto:lucasquarcella@hotmail.it" style={{ textDecoration: 'none', color: 'inherit' }}>
              <u>lucasquarcella@hotmail.it</u>
            </a>
            <br />
          </>
        }
        isOverlay={true}
      />

      <IntroBlock
        year="NUM"
        text={
          <>
            {/* Telefono Cliccabile */}
            <a href="tel:+393664347482" style={{ textDecoration: 'UNDERLINE', color: 'inherit' }}>
              +39 366 434 7482
            </a>
            <br />
          </>
        }
        isOverlay={true}
      />
    </>
  );
};

export default AboutView;
