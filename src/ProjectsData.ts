export interface ProjectMedia {
  type: 'image' | 'video';
  src: string;
}

export const PROJECTS_DATA: Record<string, ProjectMedia[]> = {

// === PROGETTO 1: BODY OF EVIDENCE ===
  "1": [
    { type: 'video', src: '/projects/p1/01.mp4' }, // Index 0
    { type: 'video', src: '/projects/p1/02.mp4' }, // Index 1
    { type: 'video', src: '/projects/p1/03.mp4' }, // Index 2
    { type: 'video', src: '/projects/p1/04.mp4' }, // Index 3
    { type: 'image', src: '/projects/p1/05.png' }, // Index 4 (Skip)
    { type: 'video', src: '/projects/p1/06.mp4' }, // Index 5 (Skip)
    { type: 'video', src: '/projects/p1/07.mp4' }, // Index 6
    { type: 'video', src: '/projects/p1/08.mp4' }, // Index 7
    { type: 'image', src: '/projects/p1/09.png' }, // Index 8 (Skip)
    { type: 'video', src: '/projects/p1/10.mp4' }, // Index 9
    { type: 'video', src: '/projects/p1/11.mp4' }, // Index 10
    { type: 'image', src: '/projects/p1/12.png' }, // Index 11 (Skip)
    { type: 'video', src: '/projects/p1/13.mp4' }, // Index 12 (Skip)
    { type: 'video', src: '/projects/p1/14.mp4' }, // Index 13
    { type: 'video', src: '/projects/p1/15.mp4' }, // Index 14
    { type: 'image', src: '/projects/p1/16.png' }, // Index 15 (Skip)
    { type: 'image', src: '/projects/p1/17.png' }, // Index 16 (Skip)
    { type: 'image', src: '/projects/p1/18.png' }, // Index 17
    { type: 'image', src: '/projects/p1/19.png' }, // Index 18 (Skip)
    { type: 'image', src: '/projects/p1/20.png' }, // Index 19 (Skip)
    { type: 'video', src: '/projects/p1/21.mp4' }, // Index 20 (Skip)
    { type: 'video', src: '/projects/p1/22.mp4' }, // Index 21 (Skip)
    { type: 'image', src: '/projects/p1/23.jpg' }, // Index 22
  ],

// === PROGETTO 2: DIPARTIMENTO DI ARCHITETTURA ===
  "2": [
    { type: 'image', src: '/projects/p2/01.jpg' }, // Index 0
    { type: 'image', src: '/projects/p2/02.jpg' }, // Index 1
    { type: 'image', src: '/projects/p2/03.jpg' }, // Index 2
    { type: 'image', src: '/projects/p2/04.jpg' }, // Index 3
    { type: 'image', src: '/projects/p2/05.jpg' }, // Index 4
    { type: 'image', src: '/projects/p2/06.jpg' }, // Index 5
    { type: 'image', src: '/projects/p2/07.jpg' }, // Index 6
    { type: 'image', src: '/projects/p2/08.jpg' }, // Index 7
    { type: 'image', src: '/projects/p2/09.jpg' }, // Index 8
    { type: 'image', src: '/projects/p2/10.jpg' }, // Index 9
    { type: 'image', src: '/projects/p2/11.jpg' }, // Index 10
    { type: 'image', src: '/projects/p2/12.jpg' }, // Index 11
    { type: 'image', src: '/projects/p2/13.jpg' }, // Index 12
    { type: 'image', src: '/projects/p2/14.jpg' }, // Index 13
    { type: 'image', src: '/projects/p2/15.jpg' }, // Index 14
  ],

  // === PROGETTO 3: IL SILENZIO NON ESISTE ===
  "3": [
    { type: 'image', src: '/projects/p3/01.jpg' }, // Index 0
    { type: 'video', src: '/projects/p3/02.mp4' }, // Index 1
    { type: 'video', src: '/projects/p3/03.mp4' }, // Index 2
    { type: 'image', src: '/projects/p3/04.jpg' }, // Index 3
    { type: 'image', src: '/projects/p3/05.jpg' }, // Index 4
    { type: 'video', src: '/projects/p3/06.mp4' }, // Index 5
    { type: 'video', src: '/projects/p3/07.mp4' }, // Index 6
    { type: 'image', src: '/projects/p3/08.jpg' }, // Index 7
    { type: 'video', src: '/projects/p3/09.mp4' }, // Index 8 (Solo Lightbox)
    { type: 'video', src: '/projects/p3/10.mp4' }, // Index 9 (Solo Lightbox)
    { type: 'image', src: '/projects/p3/11.jpg' }, // Index 10
    { type: 'image', src: '/projects/p3/12.jpg' }, // Index 11
    { type: 'image', src: '/projects/p3/13.jpg' }, // Index 12
  ],

  // === PROGETTO 4: SAVE THE KEYS ===
  "4": [
    { type: 'image', src: '/projects/p4/01.jpg' }, // Index 0
    { type: 'image', src: '/projects/p4/02.jpg' }, // Index 1
    { type: 'image', src: '/projects/p4/03.jpg' }, // Index 2
    { type: 'image', src: '/projects/p4/04.jpg' }, // Index 3
    { type: 'video', src: '/projects/p4/05.mp4' }, // Index 4 (Solo Lightbox)
    { type: 'video', src: '/projects/p4/06.mp4' }, // Index 5 (Solo Lightbox)
  ],

  // === PROGETTO 5: CHLADNI MUSIK FEST ===
  "5": [
    { type: 'image', src: '/projects/p5/01.jpg' }, // Index 0
    { type: 'image', src: '/projects/p5/02.jpg' }, // Index 1
    { type: 'image', src: '/projects/p5/03.jpg' }, // Index 2
    { type: 'image', src: '/projects/p5/04.jpg' }, // Index 3
    { type: 'image', src: '/projects/p5/05.jpg' }, // Index 4
    { type: 'image', src: '/projects/p5/06.jpg' }, // Index 5
    { type: 'image', src: '/projects/p5/07.jpg' }, // Index 6
    { type: 'image', src: '/projects/p5/08.jpg' }, // Index 7
    { type: 'video', src: '/projects/p5/09.mp4' }, // Index 8 (Video - Solo Lightbox)
    { type: 'video', src: '/projects/p5/10.mp4' }, // Index 9 (Video - Solo Lightbox)
  ],

  // === PROGETTO 6: IO:BRAND ===
  "6": [
    { type: 'image', src: '/projects/p6/01.jpg' }, // Index 0
    { type: 'image', src: '/projects/p6/02.jpg' }, // Index 1
    { type: 'image', src: '/projects/p6/03.jpg' }, // Index 2
    { type: 'image', src: '/projects/p6/04.jpg' }, // Index 3
    { type: 'image', src: '/projects/p6/05.jpg' }, // Index 4
    { type: 'image', src: '/projects/p6/06.jpg' }, // Index 5
    { type: 'image', src: '/projects/p6/07.jpg' }, // Index 6
    { type: 'image', src: '/projects/p6/08.jpg' }, // Index 7
    { type: 'image', src: '/projects/p6/09.jpg' }, // Index 8
    { type: 'image', src: '/projects/p6/10.jpg' }, // Index 9 (Solo Lightbox)
  ],

  // === PROGETTO 7: DAY-DREAM ===
  "7": [
    { type: 'image', src: '/projects/p7/01.jpg' }, // Index 0
    { type: 'image', src: '/projects/p7/02.jpg' }, // Index 1
    { type: 'image', src: '/projects/p7/03.jpg' }, // Index 2
    { type: 'image', src: '/projects/p7/04.jpg' }, // Index 3
    { type: 'image', src: '/projects/p7/05.jpg' }, // Index 4
    { type: 'image', src: '/projects/p7/06.jpg' }, // Index 5
    { type: 'video', src: '/projects/p7/07.mp4' }, // Index 6 (VIDEO)
    { type: 'image', src: '/projects/p7/08.jpg' }, // Index 7
    { type: 'image', src: '/projects/p7/09.jpg' }, // Index 8
    { type: 'video', src: '/projects/p7/10.mp4' }, // Index 9 (VIDEO)
    { type: 'video', src: '/projects/p7/11.mp4' }, // Index 10 (VIDEO)
    { type: 'image', src: '/projects/p7/12.jpg' }, // Index 11
    { type: 'image', src: '/projects/p7/13.jpg' }, // Index 12
    { type: 'video', src: '/projects/p7/14.mp4' }, // Index 13 (VIDEO)
  ],

  // === PROGETTO 8: ALIENZ ===
  "8": [
    { type: 'image', src: '/projects/p8/01.jpg' }, // Index 0
    { type: 'video', src: '/projects/p8/02.mp4' }, // Index 1
    { type: 'video', src: '/projects/p8/03.mp4' }, // Index 2
    { type: 'image', src: '/projects/p8/04.jpg' }, // Index 3
    { type: 'image', src: '/projects/p8/05.jpg' }, // Index 4
    { type: 'video', src: '/projects/p8/06.mp4' }, // Index 5
    { type: 'video', src: '/projects/p8/07.mp4' }, // Index 6
    { type: 'image', src: '/projects/p8/08.jpg' }, // Index 7
    { type: 'image', src: '/projects/p8/09.jpg' }, // Index 8
    { type: 'video', src: '/projects/p8/10.mp4' }, // Index 9
    { type: 'video', src: '/projects/p8/11.mp4' }, // Index 10
    { type: 'image', src: '/projects/p8/12.jpg' }, // Index 11
    { type: 'image', src: '/projects/p8/13.jpg' }, // Index 12
    { type: 'image', src: '/projects/p8/14.jpg' }, // Index 13
    { type: 'image', src: '/projects/p8/15.jpg' }, // Index 14
    { type: 'image', src: '/projects/p8/16.jpg' }, // Index 15
    { type: 'image', src: '/projects/p8/17.jpg' }, // Index 16
    { type: 'image', src: '/projects/p8/18.jpg' }, // Index 17
    { type: 'image', src: '/projects/p8/19.jpg' }, // Index 18
    { type: 'image', src: '/projects/p8/20.jpg' }, // Index 19
    { type: 'image', src: '/projects/p8/21.jpg' }, // Index 20
    { type: 'image', src: '/projects/p8/22.jpg' }, // Index 21
    { type: 'image', src: '/projects/p8/23.jpg' }, // Index 22
    { type: 'image', src: '/projects/p8/24.jpg' }, // Index 23
    { type: 'image', src: '/projects/p8/25.jpg' }, // Index 24
    { type: 'image', src: '/projects/p8/26.jpg' }, // Index 25
  ],

};