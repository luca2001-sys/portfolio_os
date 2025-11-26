interface Point {
  id: number;
  x: number;
  y: number;
}

const getDistance = (p1: Point, p2: Point) => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

export const getKCenterPositions = (
  itemsCount: number,
  containerWidth: number,
  containerHeight: number,
  candidatePoolSize: number = 1000
): { top: string; left: string }[] => {
  // Se il contenitore non ha dimensioni valide, ritorna array vuoto
  if (containerWidth === 0 || containerHeight === 0) return [];

  // --- CONFIGURAZIONE INGOMBRI (Conservative Bounding Box) ---
  // Queste costanti definiscono quanto spazio "immaginario" occupa una card
  // per essere sicuri che non esca mai dai bordi.
  // 240px copre larghezza card (220) + margine
  const SAFE_CARD_WIDTH = 260;
  // 350px copre altezza card (variabile) + titolo sotto + margine
  const SAFE_CARD_HEIGHT = 250;

  // Altezza Navbar + un po' di aria (es. 80px)
  const NAVBAR_HEIGHT = 150;

  // --- MARGINI LATERALI (Centratura) ---
  // Forziamo le card a stare in una zona centrale (evitiamo il 5% ai lati estremi)
  const xPadding = Math.max(20, containerWidth * 0.05);
  const yPadding = 20;

  // --- CALCOLO LIMITI SICURI ---
  // minX: Margine Sinistro
  const minX = Math.floor(xPadding);
  // maxX: Larghezza Totale - Larghezza Card Sicura - Margine Destro
  const maxX = Math.floor(containerWidth - SAFE_CARD_WIDTH - xPadding);

  // minY: Sotto la Navbar
  const minY = Math.floor(NAVBAR_HEIGHT);
  // maxY: Altezza Totale - Altezza Card Sicura - Margine Basso
  const maxY = Math.floor(containerHeight - SAFE_CARD_HEIGHT - yPadding);

  // --- CONTROLLO DI EMERGENZA (Per schermi piccoli/mobile) ---
  // Se i calcoli sopra danno numeri negativi (schermo troppo piccolo),
  // usiamo dei fallback minimi per non rompere l'app.
  const validMinX = minX < maxX ? minX : 10;
  const validMaxX = minX < maxX ? maxX : containerWidth - 220; // 220 larghezza minima card
  const validMinY = minY < maxY ? minY : NAVBAR_HEIGHT;
  const validMaxY = minY < maxY ? maxY : containerHeight - 200;

  // --- FASE 1: GENERAZIONE CANDIDATI ---
  const candidates: Point[] = [];

  for (let i = 0; i < candidatePoolSize; i++) {
    candidates.push({
      id: i,
      // Generiamo punti SOLO dentro il rettangolo sicuro calcolato sopra
      x: Math.floor(Math.random() * (validMaxX - validMinX) + validMinX),
      y: Math.floor(Math.random() * (validMaxY - validMinY) + validMinY),
    });
  }

  // --- FASE 2: SELEZIONE (GREEDY K-CENTER) ---
  // Selezioniamo tra i candidati quelli più distanti tra loro
  const selectedPoints: Point[] = [];

  // Primo punto random
  const firstIndex = Math.floor(Math.random() * candidates.length);
  selectedPoints.push(candidates[firstIndex]);
  candidates.splice(firstIndex, 1);

  while (selectedPoints.length < itemsCount) {
    let bestCandidateIndex = -1;
    let maxMinDistance = -1;

    for (let i = 0; i < candidates.length; i++) {
      const candidate = candidates[i];
      let minDistanceToSelected = Number.MAX_VALUE;

      for (const selected of selectedPoints) {
        const dist = getDistance(candidate, selected);
        if (dist < minDistanceToSelected) {
          minDistanceToSelected = dist;
        }
      }

      if (minDistanceToSelected > maxMinDistance) {
        maxMinDistance = minDistanceToSelected;
        bestCandidateIndex = i;
      }
    }

    if (bestCandidateIndex !== -1) {
      selectedPoints.push(candidates[bestCandidateIndex]);
      candidates.splice(bestCandidateIndex, 1);
    } else {
      break;
    }
  }

  return selectedPoints.map((p) => ({
    top: `${p.y}px`,
    left: `${p.x}px`,
  }));
};
