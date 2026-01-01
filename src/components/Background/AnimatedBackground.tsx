import { useEffect, useRef } from "react";
import p5 from "p5";
import "./AnimatedBackground.css";

const AnimatedBackground = () => {
  const renderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Definizione dello sketch in "Instance Mode"
    const sketch = (p: p5) => {
      // --- CONFIGURAZIONE E STATO ---
      const tempoPausa = 3000;
      const tempoMovimento = 1500;

      // Solo l'opacità del riempimento (quel grigio impercettibile)
      const opacitaRiempimento = 7; 

      const contenuti = [
        { tipo: "OROLOGIO", sfondo: "rgba(255, 245, 245, 1)" },
        { tipo: "NOME", sfondo: "rgba(255, 255, 255, 1)" },
      ];

      let indiceSopra = 0;
      let indiceSotto = 1;
      let stato = "PAUSA_100";
      let ultimoTempo = 0;

      let pgSopra: p5.Graphics;
      let pgSotto: p5.Graphics;

      // --- HELPER FUNCTIONS ---

      const disegnaGraficaStretch = (
        pg: p5.Graphics,
        testo: string,
        coloreSfondo: string
      ) => {
        pg.background(coloreSfondo);

        pg.textFont("AlteHaas");
        pg.textStyle(p.BOLD);
        pg.textSize(100);
        pg.textAlign(p.CENTER, p.BASELINE);
        
        // --- CALCOLO DIMENSIONI (Senza stroke) ---
        const larghezzaTesto = pg.textWidth(testo);
        
        // Usiamo tutta la larghezza disponibile
        const scalaX = larghezzaTesto > 0 ? pg.width / larghezzaTesto : 1;

        // --- STRETCH VERTICALE ---
        const fattoreAltezzaVisiva = 0.70;
        const altezzaRealeMaiuscole = pg.textAscent() * fattoreAltezzaVisiva;
        
        const scalaY =
          altezzaRealeMaiuscole > 0 ? pg.height / altezzaRealeMaiuscole : 1;

        pg.push();

        // 1. Posizionamento in basso al centro (esatto bordo inferiore)
        pg.translate(pg.width / 2, pg.height);

        // 2. Scaliamo
        pg.scale(scalaX, scalaY);

        // --- DISEGNO PULITO ---
        pg.noStroke(); // Assicuriamoci che non ci sia stroke
        pg.fill(0, opacitaRiempimento);
        pg.text(testo, 0, 0);

        pg.pop();
      };

      const renderizzaContenuto = (pg: p5.Graphics, datiContenuto: any) => {
        let testoDaScrivere = "";

        if (datiContenuto.tipo === "OROLOGIO") {
          const h = p.hour();
          const m = p.minute();
          const s = p.second();
          testoDaScrivere = p.nf(h, 2) + ":" + p.nf(m, 2) + ":" + p.nf(s, 2);
        } else if (datiContenuto.tipo === "NOME") {
          testoDaScrivere = "LUCA SQUARCELLA";
        }

        disegnaGraficaStretch(pg, testoDaScrivere, datiContenuto.sfondo);
      };

      // --- SETUP ---
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);

        pgSopra = p.createGraphics(p.width, p.height);
        pgSotto = p.createGraphics(p.width, p.height);

        ultimoTempo = p.millis();
      };

      // --- DRAW ---
      p.draw = () => {
        p.background(255);

        const tempoAttuale = p.millis();
        let altezzaSopra = p.height;

        // --- MACCHINA A STATI ---
        if (stato === "PAUSA_100") {
          altezzaSopra = p.height;
          if (tempoAttuale - ultimoTempo > tempoPausa) {
            stato = "MUOVI_VERSO_50";
            ultimoTempo = tempoAttuale;
          }
        } else if (stato === "MUOVI_VERSO_50") {
          let progresso = (tempoAttuale - ultimoTempo) / tempoMovimento;
          if (progresso > 1) progresso = 1;
          const ease = -(Math.cos(Math.PI * progresso) - 1) / 2;
          altezzaSopra = p.lerp(p.height, p.height / 2, ease);

          if (progresso >= 1) {
            stato = "PAUSA_50";
            ultimoTempo = tempoAttuale;
          }
        } else if (stato === "PAUSA_50") {
          altezzaSopra = p.height / 2;
          if (tempoAttuale - ultimoTempo > tempoPausa) {
            stato = "MUOVI_VERSO_0";
            ultimoTempo = tempoAttuale;
          }
        } else if (stato === "MUOVI_VERSO_0") {
          let progresso = (tempoAttuale - ultimoTempo) / tempoMovimento;
          if (progresso > 1) progresso = 1;
          const ease = -(Math.cos(Math.PI * progresso) - 1) / 2;
          altezzaSopra = p.lerp(p.height / 2, 0, ease);

          if (progresso >= 1) {
            indiceSopra = indiceSotto;
            indiceSotto = (indiceSopra + 1) % contenuti.length;
            stato = "PAUSA_100";
            ultimoTempo = tempoAttuale;
            altezzaSopra = p.height;
          }
        }

        // --- RENDER SU BUFFER ---
        if (pgSopra) {
          pgSopra.clear(0, 0, 0, 0);
          renderizzaContenuto(pgSopra, contenuti[indiceSopra]);
        }
        if (pgSotto) {
          pgSotto.clear(0, 0, 0, 0);
          renderizzaContenuto(pgSotto, contenuti[indiceSotto]);
        }

        // --- DISEGNO FINALE A SCHERMO ---
        if (altezzaSopra > 0.1 && pgSopra) {
          p.image(pgSopra, 0, 0, p.width, altezzaSopra);
        }
        
        const altezzaSotto = p.height - altezzaSopra;
        
        if (altezzaSotto > 0.1 && pgSotto) {
          p.image(pgSotto, 0, altezzaSopra, p.width, altezzaSotto);
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        if (pgSopra) pgSopra.resizeCanvas(p.width, p.height);
        if (pgSotto) pgSotto.resizeCanvas(p.width, p.height);
      };
    };

    const p5Instance = new p5(sketch, renderRef.current!);
    
    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={renderRef} className="background-container" />;
};

export default AnimatedBackground;