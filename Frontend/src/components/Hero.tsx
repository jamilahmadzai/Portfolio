import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Stack,
  useTheme,
  alpha,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import DownloadIcon from "@mui/icons-material/Download";
import { useTranslation } from "react-i18next";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// --- Typing Component for Code Block ---
const TypingCode = ({ isDark }: { isDark: boolean }) => {
  // VS Code Inspired Colors
  const colors = {
    keyword: isDark ? "#c678dd" : "#a626a4", // Purple
    type: isDark ? "#e5c07b" : "#986801", // Yellow/Brown
    string: isDark ? "#98c379" : "#50a14f", // Green
    property: isDark ? "#61afef" : "#4078f2", // Blue
    comment: isDark ? "#5c6370" : "#a0a1a7", // Gray
    plain: isDark ? "#abb2bf" : "#383a42", // Default
  };

  const codeLines = [
    {
      text: "// Engineering reliable & scalable software\n",
      color: colors.comment,
    },
    { text: "public class ", color: colors.keyword },
    { text: "Developer", color: colors.type },
    { text: " {", color: colors.plain },
    { text: "\n    public string ", color: colors.keyword },
    { text: "Name", color: colors.property },
    { text: " { get; set; } = ", color: colors.plain },
    { text: '"Jamil Ur Rehman"', color: colors.string },
    { text: ";", color: colors.plain },
    { text: "\n    public string ", color: colors.keyword },
    { text: "Role", color: colors.property },
    { text: " { get; set; } = ", color: colors.plain },
    { text: '"Fullstack Developer"', color: colors.string },
    { text: ";", color: colors.plain },
    { text: "\n    public string[] ", color: colors.keyword },
    { text: "Stack", color: colors.property },
    { text: " = { ", color: colors.plain },
    { text: '"React 19"', color: colors.string },
    { text: ", ", color: colors.plain },
    { text: '".NET 9.0"', color: colors.string },
    { text: " };", color: colors.plain },
    { text: "\n}", color: colors.plain },
  ];

  const fullText = codeLines.map((l) => l.text).join("");
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleChars((prev) => {
        if (prev < fullText.length) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 25);
    return () => clearInterval(timer);
  }, [fullText.length]);

  let charCount = 0;

  return (
    <Typography
      variant="body2"
      component="pre"
      sx={{
        fontFamily: "'Fira Code', 'Courier New', monospace",
        fontSize: { xs: "0.85rem", md: "0.95rem" },
        lineHeight: 1.7,
        margin: 0,
        whiteSpace: "pre-wrap",
      }}
    >
      {codeLines.map((line, i) => {
        const lineStart = charCount;
        charCount += line.text.length;
        if (visibleChars <= lineStart) return null;
        const visibleInLine = Math.min(
          line.text.length,
          visibleChars - lineStart,
        );
        return (
          <Box key={i} component="span" sx={{ color: line.color }}>
            {line.text.substring(0, visibleInLine)}
          </Box>
        );
      })}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        style={{
          borderLeft: `2px solid ${isDark ? "#2dd4bf" : "#2563eb"}`,
          marginLeft: "2px",
          display: "inline-block",
          height: "1.2em",
          verticalAlign: "middle",
        }}
      />
    </Typography>
  );
};

export const Hero = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { t } = useTranslation();

  const accentColor = isDark ? "#2dd4bf" : "#0d9488";
  const secondaryAccent = isDark ? "#3b82f6" : "#2563eb";

  const handleDownloadCV = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5015/api";
      const response = await fetch(`${baseUrl}/resume/download`);
      if (!response.ok) throw new Error("Failed");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Jamil_Ur_Rehman_CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Download failed:", e);
    }
  };

  return (
    <Box
      component="section"
      id="home"
      sx={{
        minHeight: { xs: "auto", md: "100vh" },
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        py: { xs: 12, md: 0 }, // Mobile vertical padding, desktop handled by minHeight
        bgcolor: isDark ? "#020617" : "#f8fafc",
        // Subtle Background noise/grain pattern for depth
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
          opacity: isDark ? 0.03 : 0.015,
          pointerEvents: "none",
          zIndex: 0,
        },
      }}
    >
      {/* Dynamic Glows */}
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          left: "5%",
          width: "45vw",
          height: "45vw",
          background: `radial-gradient(circle, ${alpha(accentColor, isDark ? 0.08 : 0.05)} 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={{ xs: 8, md: 12 }} alignItems="center">
          {/* Text Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  color: isDark ? "primary.light" : "primary.main",
                  letterSpacing: "0.1em",
                  fontWeight: 500,
                  mb: 2,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  opacity: 0.85,
                }}
              >
                {t("hero.greeting")}
              </Typography>

              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  mb: 3,
                  lineHeight: { xs: 1.15, md: 1.05 },
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "5rem" },
                  color: isDark ? "#f8fafc" : "#0f172a",
                  letterSpacing: "-0.03em",
                }}
              >
                {t("hero.title")}{" "}
                <Box
                  component="span"
                  sx={{
                    background: `linear-gradient(135deg, ${accentColor} 0%, ${secondaryAccent} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                    position: "relative",
                    "&::after": isDark
                      ? {
                          content: '""',
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "125%",
                          height: "125%",
                          background: alpha(accentColor, 0.2),
                          filter: "blur(50px)",
                          zIndex: -1,
                        }
                      : {},
                  }}
                >
                  {t("hero.titleHighlight")}
                </Box>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 5,
                  maxWidth: "520px",
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                  lineHeight: 1.8,
                  color: "text.secondary",
                  fontWeight: 400,
                }}
              >
                {t("hero.description")}
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon className="arrow-icon" />}
                    href="#contact"
                    sx={{
                      width: { xs: "100%", sm: "auto" },
                      px: 5,
                      py: 2,
                      borderRadius: "14px",
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      textTransform: "none",
                      background: `linear-gradient(135deg, ${accentColor} 0%, ${secondaryAccent} 100%)`,
                      color: isDark ? "#0f172a" : "white",
                      boxShadow: isDark
                        ? `0 12px 30px ${alpha(accentColor, 0.4)}`
                        : `0 12px 30px ${alpha("#0f172a", 0.2)}`,
                      "&:hover": {
                        "& .arrow-icon": { transform: "translateX(5px)" },
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {t("hero.contactButton")}
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<DownloadIcon />}
                    onClick={handleDownloadCV}
                    sx={{
                      width: { xs: "100%", sm: "auto" },
                      px: 5,
                      py: 2,
                      borderRadius: "14px",
                      fontWeight: 600,
                      fontSize: "1.05rem",
                      textTransform: "none",
                      color: "text.primary",
                      borderColor: alpha(isDark ? "#f8fafc" : "#0f172a", 0.6),
                      borderWidth: "2px",
                      "&:hover": {
                        borderWidth: "2px",
                        borderColor: accentColor,
                        bgcolor: alpha(accentColor, 0.05),
                      },
                    }}
                  >
                    {t("hero.downloadCV")}
                  </Button>
                </motion.div>
              </Stack>
            </motion.div>
          </Grid>

          {/* Visual/Code Window */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              style={{ position: "relative" }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  bgcolor: isDark ? "#0f172a" : "#ffffff",
                  borderRadius: "24px",
                  border: `1px solid ${alpha(isDark ? "#ffffff" : "#000000", 0.08)}`,
                  boxShadow: isDark
                    ? "0 40px 100px -20px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.05)"
                    : "0 40px 80px -20px rgba(0, 0, 0, 0.15)",
                  overflow: "hidden",
                  transition: "transform 0.4s ease",
                  "&:hover": {
                    transform: "translateY(-8px) rotate(0.5deg)",
                  },
                }}
              >
                {/* Window Header */}
                <Box
                  sx={{
                    px: 3,
                    py: 2.5,
                    bgcolor: alpha(isDark ? "#ffffff" : "#000000", 0.03),
                    borderBottom: `1px solid ${alpha(isDark ? "#ffffff" : "#000000", 0.06)}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Stack direction="row" spacing={1.2}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        bgcolor: "#ff5f56",
                      }}
                    />
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        bgcolor: "#ffbd2e",
                      }}
                    />
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        bgcolor: "#27c93f",
                      }}
                    />
                  </Stack>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.disabled", fontFamily: "monospace" }}
                  >
                    JamilStack.cs
                  </Typography>
                </Box>

                <Box sx={{ p: { xs: 3, md: 5 }, minHeight: "350px" }}>
                  <TypingCode isDark={isDark} />
                </Box>

                {/* Accent line */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: `linear-gradient(90deg, ${accentColor}, ${secondaryAccent})`,
                  }}
                />
              </Box>

              {/* Enhanced Badge */}
              <Tooltip title={t("hero.stackTooltip")} arrow placement="top">
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                  style={{
                    position: "absolute",
                    top: "-25px",
                    right: "30px",
                    padding: "14px 24px",
                    background: isDark
                      ? alpha(accentColor, 0.1)
                      : alpha(secondaryAccent, 0.05),
                    backdropFilter: "blur(12px)",
                    borderRadius: "16px",
                    border: `1px solid ${alpha(accentColor, 0.3)}`,
                    zIndex: 2,
                    cursor: "help",
                    boxShadow: `0 8px 32px ${alpha(accentColor, 0.2)}`,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      color: isDark ? accentColor : secondaryAccent,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: accentColor,
                        animation: "pulse 2s infinite",
                      }}
                    />
                    React 19 + .NET 9
                  </Typography>
                </motion.div>
              </Tooltip>

              <style>{`
                @keyframes pulse {
                  0% { transform: scale(1); opacity: 1; }
                  50% { transform: scale(1.5); opacity: 0.5; }
                  100% { transform: scale(1); opacity: 1; }
                }
              `}</style>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
