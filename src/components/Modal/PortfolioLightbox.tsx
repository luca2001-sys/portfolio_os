import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Video from "yet-another-react-lightbox/plugins/video";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import { PROJECTS_DATA } from "../../ProjectsData";

interface PortfolioLightboxProps {
  projectId: string | null;
  isOpen: boolean;
  onClose: () => void;
  index: number;
}

export const PortfolioLightbox = ({ projectId, isOpen, onClose, index }: PortfolioLightboxProps) => {
  // Recupera i dati del progetto attivo (se ce n'è uno)
  const currentProjectMedia = projectId ? PROJECTS_DATA[projectId] : [];

  // Mappa i nostri dati nel formato richiesto dalla libreria Lightbox
  const lightboxSlides = currentProjectMedia?.map((item) => {
    if (item.type === 'video') {
      return {
        type: "video",
        width: 1920, // Valori indicativi per il player
        height: 1080,
        sources: [{ src: item.src, type: "video/mp4" }],
        autoPlay: true,
        muted: true,
        loop: true
      };
    }
    // Altrimenti è un'immagine
    return { src: item.src };
  }) || [];

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      index={index}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      slides={lightboxSlides as any}
      plugins={[Video, Counter, Zoom]}
      className="portfolio-lightbox"
      styles={{
        container: { backgroundColor: "#fffffff5" },
        root: {
          "--yarl__color_button": "#000000",
          "--yarl__color_backdrop": "#ffffff",
        },
        slide: { padding: "12vw" }
      }}
    />
  );
};
