import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

interface ProjectCardProps {
  title: string;
  image: string;
  orientation?: "landscape" | "portrait";
  top: string;
  left: string;
  onClick?: () => void;
}

export default function ProjectCard({
  title,
  image,
  orientation = "landscape",
  top,
  left,
  onClick,
}: ProjectCardProps) {
  // Dimensioni precise per il look Polaroid
  const width = orientation === "landscape" ? 220 : 160;
  const height = orientation === "landscape" ? 140 : 220;

  return (
    <Box
      sx={{
        position: "absolute",
        top: top,
        left: left,

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1.5, // Spazio tra foto e titolo

        transition:
          "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), z-index 0s",
        "&:hover": {
          transform: "scale(1.15) rotate(2deg)", // Piccolo tilt simpatico all'hover
          zIndex: 100,
          cursor: "pointer",
        },
      }}
      onClick={onClick}
    >
      {/* CARD (L'immagine incorniciata) */}
      <Card
        elevation={6}
        sx={{
          width: width,
          height: height,
          borderRadius: 2,
          overflow: "hidden",
          border: "4px solid white", // Cornice bianca spessa
          backgroundColor: "rgba(255,255,255,0.1)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.15)", // Ombra realistica
        }}
      >
        <CardActionArea sx={{ width: "100%", height: "100%" }}>
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </CardActionArea>
      </Card>

      {/* TITOLO (Fuori dalla card) */}
      <Typography
        variant="subtitle2"
        sx={{
          color: "rgba(0,0,0,0.8)",
          fontWeight: 800,
          textTransform: "uppercase",
          fontSize: "0.75rem",
          letterSpacing: "1px",
          textAlign: "center",
          backgroundColor: "rgba(255,255,255,0.5)", // Sfondo semitrasparente per leggibilità
          padding: "2px 8px",
          borderRadius: "10px",
          backdropFilter: "blur(4px)",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}
