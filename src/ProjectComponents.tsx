import React from 'react';
import Box from '@mui/material/Box';

// --- MISURE FISSE ---
const INDENT = '140px'; 
const GAP = '10px';
const H_STD = '202.5px';
const H_TALL = '360px';

// 1. BLOCCO INTRO
// Assicurati che INDENT sia definito da qualche parte sopra, es:
// const INDENT = '150px'; 

export const IntroBlock = ({ 
  year, 
  text, 
  link, 
  isOverlay,
  customYearStyle // <--- NUOVA PROP per la bandiera
}: { 
  year?: React.ReactNode, // <--- CAMBIATO da string a ReactNode (per accettare <i>, <span>, ecc.)
  text?: React.ReactNode, // <--- CAMBIATO da string a ReactNode (per accettare <u>, <br>, ecc.)
  link?: string, 
  isOverlay?: boolean,
  customYearStyle?: React.CSSProperties // <--- Tipo per lo stile custom
}) => (
  <Box sx={{ 
    display: 'flex', 
    alignItems: 'flex-start', 
    marginBottom: '15px',
    // I TUOI COLORI: Se overlay, testo NERO (#000000ff)
    color: isOverlay ? '#000000ff' : 'inherit' 
  }}>
    <Box sx={{ width: INDENT, flexShrink: 0, fontSize: '20px' }}>
      
      {/* LOGICA ANNO */}
      {isOverlay ? (
        <span style={{ 
          // I TUOI COLORI: Sfondo NERO, Testo BIANCO
          backgroundColor: '#000000ff', 
          color: '#ffffffff', 
          padding: '0px 3px',
          ...customYearStyle // <--- QUI SOVRASCRIVIAMO SE C'È LA BANDIERA
        }}>
          {year}
        </span>
      ) : (
        year
      )}

    </Box>
    <Box sx={{ flexGrow: 1 }}>
      {/* Indentazione originale preservata */}
      <div style={{ 
        textIndent: `calc(${INDENT} + 90px)`,
        
        // Aggiungi questi stili per farlo uguale ai Modali:
        fontFamily: "'Hanken Grotesk', sans-serif", // O il font che usi nei modali
        fontSize: "20px", 
        letterSpacing: "-0.04em",       // Controlla la grandezza dei modali (spesso è 20px o 18px)
        fontWeight: 400,         // Peso del font
        lineHeight: 1.15,         // Interlinea per leggibilità
        textAlign: "left"     // Se i modali sono giustificati, aggiungilo qui
      }}>
        {text}
      </div>
      
      {link && (
        <Box sx={{ marginTop: '10px', paddingLeft: '0px' }}>
          ◣&nbsp;
          <a href={link} target="_blank" rel="noreferrer" style={{ 
              // I TUOI COLORI LINK
              color: isOverlay ? '#ffffff' : '#000', 
              textDecoration: 'underline', textDecorationThickness: '1px', 
              textUnderlineOffset: '3px', fontSize: 'inherit', wordBreak: 'break-all' 
            }}>
            {link}
          </a>
        </Box>
      )}
    </Box>
  </Box>
);

// 2. SOTTOTITOLO + DESCRIZIONE
export const TextBlock = ({ title, text }: { title?: string, text?: string }) => (
  <Box sx={{ marginBottom: '10px' }}>
    {title && (
      <Box sx={{ marginBottom: '5px' }}>
        <span style={{
          fontFamily: "'Hanken Grotesk', sans-serif", fontSize: '15px',
          textDecoration: 'underline', textUnderlineOffset: '2px'
        }}>
          {title}
        </span>
      </Box>
    )}
    <div style={{
      marginTop: '-5px', fontFamily: "'Hanken Grotesk', sans-serif",
      fontSize: '15px', letterSpacing: '-0.03em', lineHeight: 1.15, 
      textIndent: INDENT, textAlign: 'left', color: 'rgba(0, 0, 0, 0.5)'
    }}>
      {text}
    </div>
  </Box>
);

// 3. SPAZIO
export const Spacer = ({ size = 10 }: { size?: number }) => <Box sx={{ height: size }} />;

//////// --- AGGIUNTA: Helper per capire se è un video ---
const isVideo = (src: string) => src?.toLowerCase().endsWith('.mp4');

// --- COMPONENTE MEDIA ITEM (Versione Aggiornata con Bordo Hover) ---
const MediaItem = ({ 
  src, 
  width, 
  height, 
  onClick, 
  objectPosition,
  scale = 1 
}: { 
  src: string, 
  width: string, 
  height: string, 
  onClick?: () => void, 
  objectPosition?: string,
  scale?: number 
}) => {
  if (!src) return null;

  // 1. Stile del CONTENITORE
  const containerStyle = {
    width: width,
    height: height,
    overflow: 'hidden', 
    position: 'relative' as const,
    display: 'block',
    // Rimuoviamo il cursor da qui, lo gestiamo via CSS/classe per pulizia
  };

  // 2. Stile dell'IMMAGINE/VIDEO
  const mediaStyle = { 
    width: '100%', 
    height: '100%', 
    objectFit: 'cover' as const,
    objectPosition: objectPosition || 'center', 
    transform: `scale(${scale})`, 
    display: 'block'
  };

  // Classe per gestire il cursore se è cliccabile
  const containerClass = onClick ? "media-item-container clickable" : "media-item-container";

  if (isVideo(src)) {
    return (
      <div style={containerStyle} onClick={onClick} className={containerClass}>
        <video
          src={src}
          // Aggiunta classe per il bordo
          className="media-item-content"
          style={mediaStyle}
          autoPlay muted loop playsInline
        />
      </div>
    );
  }
  
  return (
    <div style={containerStyle} onClick={onClick} className={containerClass}>
      <img 
        src={src} 
        // Aggiunta classe per il bordo
        className="media-item-content"
        style={mediaStyle}
        alt="project detail"
      />
    </div>
  );
};

// 4. GRIGLIA IMMAGINI (Versione Aggiornata con Scale)
export const ImageRow = ({ 
  h = 'std', 
  layout = '100', 
  src,
  indices, 
  onMediaClick,
  pos1, pos2,      // Posizione (left/right/center)
  scale1, scale2   // Zoom (es. 1.1, 1.3)
}: { 
  h?: 'std' | 'tall' | string, 
  layout?: '100' | '50-50' | '33-66' | '66-33' | string,
  src: string[],
  indices?: number[],
  onMediaClick?: (index: number) => void,
  pos1?: string, pos2?: string,
  scale1?: number, scale2?: number // Nuove props opzionali
}) => {
  
  let height = h; 
  if (h === 'std') height = H_STD;
  else if (h === 'tall') height = H_TALL;
  
  let w1 = '100%', w2 = '0%';
  if (layout === '50-50') { w1 = `calc(50% - 5px)`; w2 = `calc(50% - 5px)`; }
  if (layout === '33-66') { w1 = `calc(33.3% - 5px)`; w2 = `calc(66.6% - 5px)`; }
  if (layout === '66-33') { w1 = `calc(66.6% - 5px)`; w2 = `calc(33.3% - 5px)`; }

  return (
    <Box sx={{ display: 'flex', width: '100%', gap: GAP, marginBottom: GAP }}>
      {/* Elemento Sinistro */}
      <MediaItem 
        src={src[0]} 
        width={w1} 
        height={height} 
        onClick={indices && onMediaClick ? () => onMediaClick(indices[0]) : undefined}
        objectPosition={pos1}
        scale={scale1} // Passiamo lo zoom 1
      />
      
      {/* Elemento Destro */}
      {layout !== '100' && src[1] && (
        <MediaItem 
          src={src[1]} 
          width={w2} 
          height={height}
          onClick={indices && indices[1] && onMediaClick ? () => onMediaClick(indices[1]) : undefined}
          objectPosition={pos2}
          scale={scale2} // Passiamo lo zoom 2
        />
      )}
    </Box>
  );
};

// 5. BLOCCO CREDITS (Footer: 2 Colonne Estreme + Loghi)
export const CreditsBlock = ({ 
  leftTitle, leftBody, rightTitle, rightBody, logos 
}: { 
  leftTitle: string, leftBody: string[], rightTitle: string, rightBody: string[], logos?: string[] 
}) => (
  <Box sx={{ 
    marginTop: '10px', 
    marginBottom: '20px',
    width: '100%', // Occupa tutta la larghezza
  }}>
    
    {/* --- PARTE SUPERIORE: 2 COLONNE ESTREME --- */}
    <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>
      
      {/* Colonna Sinistra (Allineata a Sinistra - 0px) */}
      <Box sx={{ width: '67%', textAlign: 'left' }}>
        <div style={{ 
          fontFamily: "'Hanken Grotesk', sans-serif", fontSize: '15px', fontWeight: 500, 
          textDecoration: 'underline', textUnderlineOffset: '2px', marginBottom: '5px', color: '#000'
        }}>
          {leftTitle}
        </div>
        {leftBody.map((line, i) => (
          <div key={i} style={{ 
            fontFamily: "'Hanken Grotesk', sans-serif", fontSize: '15px', lineHeight: 1.2, color: 'rgba(0, 0, 0, 0.5)' 
          }}>
            {line}
          </div>
        ))}
      </Box>

      {/* Colonna Destra (Allineata a Destra - 100%) */}
      <Box sx={{ width: '33%', textAlign: 'right' }}>
        <div style={{ 
          fontFamily: "'Hanken Grotesk', sans-serif", fontSize: '15px', fontWeight: 500, 
          marginBottom: '5px', color: '#000' 
        }}>
          {rightTitle}
        </div>
        {rightBody.map((line, i) => (
          <div key={i} style={{ 
            fontFamily: "'Hanken Grotesk', sans-serif", fontSize: '15px', lineHeight: 1.2, color: 'rgba(0, 0, 0, 0.5)' 
          }}>
            {line}
          </div>
        ))}
      </Box>
    </Box>

    {/* --- PARTE INFERIORE: LOGHI --- */}
    {logos && logos.length > 0 && (
      <Box sx={{ 
        marginTop: '60px', 
        display: 'flex', 
        flexWrap: 'wrap', 
        alignItems: 'center', 
        gap: '30px',
        // AGGIUNTA: Regola per trasformare tutte le immagini figlie in scala di grigi
        '& img': {
          filter: 'grayscale(100%)',
          opacity: 0.8, // Opzionale: abbassa leggermente l'opacità per uniformarli
          transition: 'all 0.3s ease', // Opzionale: transizione morbida
          cursor: 'pointer',
          
          // Opzionale: Tornano a colori quando ci passi sopra col mouse
          '&:hover': {
            filter: 'grayscale(0%)',
            opacity: 1
          }
        }
      }}>
        {logos.map((logoUrl, index) => (
          <img 
            key={index} 
            src={logoUrl} 
            alt="partner logo" 
            style={{ display: 'block', height: '40px', width: 'auto', objectFit: 'contain' }} 
          />
        ))}
      </Box>
    )}

    
  </Box>
);