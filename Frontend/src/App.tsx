import { Box } from "@mui/material";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Experience } from "./components/Experience";
import { Education } from "./components/Education";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";

function App() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        color: "text.primary",
        transition: "background-color 0.3s ease, color 0.3s ease",
        "&::selection": {
          bgcolor: "primary.main",
          color: "white",
        },
      }}
    >
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Education />
      <Skills />
      <Contact />
    </Box>
  );
}

export default App;
