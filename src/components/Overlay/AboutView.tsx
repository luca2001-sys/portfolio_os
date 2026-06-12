import { IntroBlock } from "../../components/UI";

const AboutView = () => {
  return (
    <>
      {/* 1. BIO */}
      <IntroBlock
        year="WHO"
        text={
          <>
            Multidisciplinary Designer with a passion for transforming complex ideas into engaging visual narratives,
            balancing academic research in communication with a strong{' '}
            <u>technical expertise</u> in physical production and{' '}
            <u>material execution</u>.
          </>
        }
        isOverlay={true}
      />

      {/* 2. MAIL */}
      <IntroBlock
        year="MAIL"
        text={
          <>
            <a href="mailto:lucasquarcella@hotmail.it" style={{ textDecoration: 'none', color: 'inherit' }}>
              <u>lucasquarcella@hotmail.it</u>
            </a>
            <br />
          </>
        }
        isOverlay={true}
      />

      {/* 3. NUM */}
      <IntroBlock
        year="NUM"
        text={
          <>
            <a href="tel:+393664347482" style={{ textDecoration: 'UNDERLINE', color: 'inherit' }}>
              +39 366 434 7482
            </a>
            <br />
          </>
        }
        isOverlay={true}
      />

      {/* 4. LINKEDIN */}
      <IntroBlock
        year="LINKEDIN"
        text={
          <>
            <a
              href="https://www.linkedin.com/in/luca-squarcella"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <u>linkedin.com/in/luca-squarcella</u>
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
