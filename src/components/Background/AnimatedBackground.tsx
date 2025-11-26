import { useEffect, useRef } from "react";
import p5 from "p5";
import "./AnimatedBackground.css";

const AnimatedBackground = () => {
  const renderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Definizione dello sketch in "Instance Mode"
    const sketch = (p: p5) => {
      // --- CONFIGURAZIONE E STATO (Incapsulati dentro lo sketch) ---
      const tempoPausa = 3000; // Tempo di attesa
      const tempoMovimento = 1500; // Tempo transizione

      const contenuti = [
        { tipo: "OROLOGIO", sfondo: "rgba(0, 0, 0, 0.01)" }, // Nero 1%
        { tipo: "NOME", sfondo: "rgb(255,222,227)" }, // Rosa
      ];

      let indiceSopra = 0;
      let indiceSotto = 1;
      let stato = "PAUSA_100"; // 'PAUSA_100', 'MUOVI_VERSO_50', 'PAUSA_50', 'MUOVI_VERSO_0'
      let ultimoTempo = 0;

      // Variabili per i buffer grafici (tipizzati come p5.Graphics)
      let pgSopra: p5.Graphics;
      let pgSotto: p5.Graphics;

      // --- HELPER FUNCTIONS ---
      // Definite qui dentro per accedere a 'p' senza doverlo passare ogni volta

const disegnaGraficaStretch = (
  pg: p5.Graphics,
  testo: string,
  coloreSfondo: string
) => {
  pg.background(coloreSfondo);

  pg.textFont("Host Grotesk");
  pg.textSize(100);
  pg.textAlign(p.CENTER, p.BASELINE); // Ancoriamo i piedi delle lettere

  pg.strokeWeight(5);
  pg.strokeJoin(p.ROUND);
  pg.fill(0, 7);

  // --- STRETCH ORIZZONTALE ---
  const larghezzaTesto = pg.textWidth(testo);
  const scalaX = larghezzaTesto > 0 ? pg.width / larghezzaTesto : 1;

  // --- STRETCH VERTICALE (TRUCCO PER RIMUOVERE LO SPAZIO SOPRA) ---

  // Questo è il numero magico.
  // 0.75 significa: "Considera solo il 75% inferiore dell'altezza dichiarata dal font".
  // - Se c'è ancora spazio sopra: ABBASSA questo numero (es. 0.70)
  // - Se le lettere vengono tagliate sopra: ALZA questo numero (es. 0.80)
  const fattoreAltezzaVisiva = 0.70;

  const altezzaRealeMaiuscole = pg.textAscent() * fattoreAltezzaVisiva;
  const scalaY =
    altezzaRealeMaiuscole > 0 ? pg.height / altezzaRealeMaiuscole : 1;

  pg.push();

  // 1. Ci posizioniamo in BASSO al centro
  pg.translate(pg.width / 2, pg.height);

  // 2. Scaliamo
  pg.scale(scalaX, scalaY);

  // 3. Disegniamo.
  // Un piccolo offset Y positivo (es. 10) può servire se le lettere curve (O, C)
  // sembrano tagliate sotto. Per ora lo lascio a 0.
  pg.text(testo, 0, 0);

  pg.pop();
};

      const renderizzaContenuto = (pg: p5.Graphics, datiContenuto: any) => {
        let testoDaScrivere = "";

        if (datiContenuto.tipo === "OROLOGIO") {
          const h = p.hour();
          const m = p.minute();
          const s = p.second();
          // p.nf è il number formatting di p5
          testoDaScrivere = p.nf(h, 2) + ":" + p.nf(m, 2) + ":" + p.nf(s, 2);
        } else if (datiContenuto.tipo === "NOME") {
          testoDaScrivere = "LUCA SQUARCELLA";
        }

        disegnaGraficaStretch(pg, testoDaScrivere, datiContenuto.sfondo);
      };

      // --- SETUP ---
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);

        // Creazione buffer
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
            // SCAMBIO INDICI (Infinite Scroll)
            indiceSopra = indiceSotto;
            indiceSotto = (indiceSopra + 1) % contenuti.length;

            stato = "PAUSA_100";
            ultimoTempo = tempoAttuale;
            altezzaSopra = p.height;
          }
        }

        // --- RENDER SU BUFFER ---
        if (pgSopra) {
          pgSopra.clear(0, 0, 0, 0); // Pulisce mantenendo trasparenza se necessario
          renderizzaContenuto(pgSopra, contenuti[indiceSopra]);
        }

        if (pgSotto) {
          pgSotto.clear(0, 0, 0, 0);
          renderizzaContenuto(pgSotto, contenuti[indiceSotto]);
        }

        // --- DISEGNO FINALE A SCHERMO ---
        // Blocco SOPRA
        if (altezzaSopra > 0.1 && pgSopra) {
          p.image(pgSopra, 0, 0, p.width, altezzaSopra);
        }

        // Blocco SOTTO
        const altezzaSotto = p.height - altezzaSopra;
        if (altezzaSotto > 0.1 && pgSotto) {
          p.image(pgSotto, 0, altezzaSopra, p.width, altezzaSotto);
        }
      };

      // --- RESIZE ---
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        if (pgSopra) pgSopra.resizeCanvas(p.width, p.height);
        if (pgSotto) pgSotto.resizeCanvas(p.width, p.height);
      };
    };

    // Creazione istanza
    const p5Instance = new p5(sketch, renderRef.current!);

    // Cleanup alla distruzione del componente
    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={renderRef} className="background-container" />;
};

export default AnimatedBackground;
