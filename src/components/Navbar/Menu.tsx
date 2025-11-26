import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface NavbarProps {
  onOpenModal: (modalName: "about" | "cv") => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "32px", 
        left: "50%",
        transform: "translateX(-50%)",

        zIndex: 1000,
        backgroundColor: "white",
        border: "2px solid black",
        borderRadius: "50px",
        padding: "6px 8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",

      }}
    >
      <Stack direction="row" spacing={1}>
        <NavButton onClick={() => onOpenModal("about")}>About</NavButton>
        <NavButton onClick={() => onOpenModal("cv")}>CV</NavButton>
      </Stack>
    </Box>
  );
}

const NavButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <Button
    onClick={onClick}
    disableRipple
    sx={{
      color: "black",
      borderRadius: "30px",
      padding: "0.5rem 1.5rem",
      textTransform: "none",
      fontWeight: "bold",
      fontSize: "1rem",
      backgroundColor: "transparent",
      "&:active": { boxShadow: "none", transform: "none" },
      "&:hover": {
        backgroundColor: "black",
        color: "white",
        transition: "all 0.3s ease",
      },
    }}
  >
    {children}
  </Button>
);
