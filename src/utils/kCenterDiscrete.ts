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
  isMobile: boolean, // <--- 1. NUOVO PARAMETRO FONDAMENTALE
  candidatePoolSize: number = 1000
): { top: string; left: string }[] => {
  
  if (containerWidth === 0 || containerHeight === 0) return [];

  // --- CONFIGURAZIONE DINAMICA ---
  
  // SAFE_CARD_WIDTH:
  const SAFE_CARD_WIDTH = isMobile ? 80 : 260; 

  const SAFE_CARD_HEIGHT = isMobile ? 100 : 250;

  const NAVBAR_HEIGHT = isMobile ? 125 : 150;

  // PADDING:
  // Su mobile usiamo quasi tutto lo schermo (margine minimo).
  const xPadding = isMobile ? 10 : Math.max(20, containerWidth * 0.05);
  const yPadding = 20;

  // --- CALCOLO LIMITI SICURI ---
  const minX = Math.floor(xPadding);
  
  // Calcolo maxX:
  // Se containerWidth è 390 e SAFE è 160 -> maxX = 230.
  // I punti X saranno tra 10 e 230. 
  // Una card che inizia a 230 finirà visivamente verso i 390. Perfetto.
  let maxX = Math.floor(containerWidth - SAFE_CARD_WIDTH - xPadding);

  const minY = Math.floor(NAVBAR_HEIGHT);
  let maxY = Math.floor(containerHeight - SAFE_CARD_HEIGHT - yPadding);

  // --- FIX DI SICUREZZA PER SCHERMI MINUSCOLI ---
  // Se i calcoli danno risultati assurdi (tipo negativi), forziamo dei minimi.
  if (maxX <= minX) maxX = containerWidth - 100; // Fallback estremo
  if (maxY <= minY) maxY = containerHeight - 100;

  // --- FASE 1: GENERAZIONE CANDIDATI ---
  const candidates: Point[] = [];

  for (let i = 0; i < candidatePoolSize; i++) {
    candidates.push({
      id: i,
      // Qui ora la X può andare molto più a destra grazie al SAFE_CARD_WIDTH ridotto
      x: Math.floor(Math.random() * (maxX - minX) + minX),
      y: Math.floor(Math.random() * (maxY - minY) + minY),
    });
  }

  // --- FASE 2: SELEZIONE (GREEDY K-CENTER) - INVARIATA ---
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