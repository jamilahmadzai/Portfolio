import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Divider,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useColorMode } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navLinks = [
  { name: "nav.home", href: "#home", id: "home" },
  { name: "nav.experience", href: "#experience", id: "experience" },
  { name: "nav.projects", href: "#projects", id: "projects" },
  { name: "nav.education", href: "#education", id: "education" },
  { name: "nav.skills", href: "#skills", id: "skills" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const { t } = useTranslation();

  const isDark = theme.palette.mode === "dark";
  const accentColor = isDark ? "#2dd4bf" : "#2563eb";
  const accentGlow = isDark ? "rgba(45,212,191,0.35)" : "rgba(37,99,235,0.25)";

  const scrollToSection = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      const offset = 80;
      const offsetPosition =
        elem.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setActiveSection(targetId);
    }
    if (mobileOpen) setMobileOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sectionIds = [...navLinks.map((l) => l.id), "contact"];
      let current = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          transition: "background 0.35s ease, border-color 0.35s ease",
          bgcolor: isScrolled
            ? isDark
              ? "rgba(2, 6, 23, 0.88)"
              : "rgba(255, 255, 255, 0.92)"
            : isDark
              ? "rgba(2, 6, 23, 0.45)"
              : "rgba(255, 255, 255, 0.45)",
          backdropFilter: "blur(18px)",
          backgroundImage: "none",
          borderBottom: `1px solid ${
            isDark
              ? isScrolled
                ? "rgba(45, 212, 191, 0.14)"
                : "rgba(255,255,255,0.05)"
              : isScrolled
                ? "rgba(37, 99, 235, 0.12)"
                : "rgba(0,0,0,0.05)"
          }`,
          boxShadow: isScrolled
            ? isDark
              ? "0 4px 24px rgba(0, 0, 0, 0.45)"
              : "0 4px 20px rgba(0, 0, 0, 0.08)"
            : "none",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ minHeight: { xs: 66, md: 72 }, px: { md: 2 } }}
          >
            {/* ── Logo / Brand Name ── */}
            <Typography
              component="a"
              href="#"
              onClick={(e) => scrollToSection(e, "#home")}
              sx={{
                display: "flex",
                fontFamily: '"Inter", sans-serif',
                fontWeight: 700,
                fontSize: { xs: "1rem", md: "1.25rem" },
                letterSpacing: "-0.01em",
                textDecoration: "none",
                background: isDark
                  ? "linear-gradient(135deg, #2dd4bf 0%, #60a5fa 100%)"
                  : "linear-gradient(135deg, #0d9488 0%, #2563eb 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                flexShrink: 0,
                mr: 5,
                userSelect: "none",
                whiteSpace: "nowrap",
              }}
            >
              Jamil Ur Rehman Ahmadzai
            </Typography>

            {/* ── Desktop Nav Links ── */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
                gap: 1, // ~8px between buttons; buttons have px:2 each = ~32–40px visual gap
              }}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <Button
                    key={link.name}
                    onClick={(e) => scrollToSection(e, link.href)}
                    disableRipple
                    sx={{
                      position: "relative",
                      px: 2,
                      py: 0.75,
                      fontSize: "0.8125rem",
                      fontWeight: isActive ? 600 : 400,
                      letterSpacing: "0.04em",
                      color: isActive
                        ? accentColor
                        : isDark
                          ? "#94a3b8" // slate-400, full opacity — readable but not dominant
                          : "#64748b", // slate-500, slightly stronger than before
                      background: "none",
                      minWidth: 0,
                      transition: "color 0.2s",
                      "&:hover": {
                        color: accentColor,
                        background: "none",
                      },
                      // Animated underline
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 2,
                        left: "50%",
                        transform: isActive
                          ? "translateX(-50%) scaleX(1)"
                          : "translateX(-50%) scaleX(0)",
                        transformOrigin: "center",
                        width: "55%",
                        height: "2px",
                        borderRadius: "2px",
                        bgcolor: accentColor,
                        transition: "transform 0.25s ease",
                      },
                      "&:hover::after": {
                        transform: "translateX(-50%) scaleX(1)",
                      },
                    }}
                  >
                    {t(link.name)}
                  </Button>
                );
              })}
            </Box>

            {/* ── Right Side: Contact + Divider + Icons ── */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={0}
              sx={{ display: { xs: "none", md: "flex" }, ml: 4 }}
            >
              {/* Contact — filled pill CTA */}
              <Button
                onClick={(e) => scrollToSection(e, "#contact")}
                variant="contained"
                size="small"
                disableElevation
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  px: 2.5,
                  py: 0.75,
                  borderRadius: "999px",
                  bgcolor: accentColor,
                  color: isDark ? "#0f172a" : "#ffffff",
                  boxShadow:
                    activeSection === "contact"
                      ? `0 0 18px ${accentGlow}`
                      : "none",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    bgcolor: accentColor,
                    boxShadow: `0 0 22px ${accentGlow}`,
                    transform: "translateY(-1px)",
                  },
                }}
              >
                {t("nav.contact")}
              </Button>

              {/* Divider — more breathing room */}
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  mx: 3,
                  borderColor: isDark
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.1)",
                  height: 22,
                  alignSelf: "center",
                }}
              />

              {/* Language Switcher */}
              <Box sx={{ mr: 0.5 }}>
                <LanguageSwitcher />
              </Box>

              {/* Theme Toggle — pill button */}
              <Button
                onClick={toggleColorMode}
                size="small"
                startIcon={
                  isDark ? (
                    <WbSunnyRoundedIcon sx={{ fontSize: "1rem !important" }} />
                  ) : (
                    <NightlightRoundIcon
                      sx={{ fontSize: "0.95rem !important" }}
                    />
                  )
                }
                sx={{
                  mx: 0.5,
                  px: 1.5,
                  py: 0.55,
                  borderRadius: "999px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "none",
                  color: isDark
                    ? "rgba(148,163,184,0.85)"
                    : "rgba(71,85,105,0.85)",
                  border: `1px solid ${
                    isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                  }`,
                  background: isDark
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(0,0,0,0.03)",
                  transition: "all 0.2s",
                  "&:hover": {
                    color: accentColor,
                    borderColor: accentColor,
                    background: isDark
                      ? "rgba(45,212,191,0.07)"
                      : "rgba(37,99,235,0.06)",
                  },
                  minWidth: 0,
                }}
              >
                {isDark ? "Light" : "Dark"}
              </Button>

              {/* GitHub */}
              <IconButton
                size="small"
                href="https://github.com/jamilahmadzai"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  mx: 0.75,
                  color: isDark
                    ? "rgba(148,163,184,0.7)"
                    : "rgba(71,85,105,0.7)",
                  transition: "color 0.2s, filter 0.2s",
                  "&:hover": {
                    color: accentColor,
                    filter: `drop-shadow(0 0 6px ${accentGlow})`,
                  },
                }}
              >
                <FaGithub size={20} />
              </IconButton>

              {/* LinkedIn */}
              <IconButton
                size="small"
                href="https://linkedin.com/in/jamil-ur-rehman-ahmadzai-8424081b1/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  ml: 0.75,
                  color: isDark
                    ? "rgba(148,163,184,0.7)"
                    : "rgba(71,85,105,0.7)",
                  transition: "color 0.2s, filter 0.2s",
                  "&:hover": {
                    color: accentColor,
                    filter: `drop-shadow(0 0 6px ${accentGlow})`,
                  },
                }}
              >
                <FaLinkedin size={20} />
              </IconButton>
            </Stack>

            {/* ── Mobile Actions ── */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <IconButton
                onClick={toggleColorMode}
                size="small"
                color="inherit"
              >
                {isDark ? (
                  <WbSunnyRoundedIcon sx={{ fontSize: "1.2rem" }} />
                ) : (
                  <NightlightRoundIcon sx={{ fontSize: "1.2rem" }} />
                )}
              </IconButton>
              <IconButton
                size="small"
                aria-label="open menu"
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ── Mobile Drawer ── */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 270,
            bgcolor: isDark ? "#0f172a" : "#ffffff",
            backgroundImage: "none",
            borderLeft: `1px solid ${
              isDark ? "rgba(45,212,191,0.1)" : "rgba(37,99,235,0.1)"
            }`,
          },
        }}
      >
        <Box sx={{ textAlign: "center", px: 3, py: 4 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "-0.01em",
              background: isDark
                ? "linear-gradient(45deg, #2dd4bf 30%, #60a5fa 90%)"
                : "linear-gradient(45deg, #0f172a 30%, #2563eb 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Jamil Ur Rehman
          </Typography>

          <List disablePadding>
            {[
              ...navLinks,
              { name: "nav.contact", href: "#contact", id: "contact" },
            ].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={(e) => scrollToSection(e, item.href)}
                    sx={{
                      textAlign: "center",
                      borderRadius: 2,
                      py: 1.25,
                      color: isActive ? accentColor : "text.secondary",
                      bgcolor: isActive
                        ? isDark
                          ? "rgba(45,212,191,0.08)"
                          : "rgba(37,99,235,0.06)"
                        : "transparent",
                      "&:hover": {
                        bgcolor: isDark
                          ? "rgba(45,212,191,0.1)"
                          : "rgba(37,99,235,0.07)",
                        color: accentColor,
                      },
                    }}
                  >
                    <ListItemText
                      primary={t(item.name)}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 700 : 500,
                        fontSize: "0.925rem",
                        letterSpacing: "0.03em",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          <Divider sx={{ my: 3, borderColor: "divider" }} />

          {/* Social icons in drawer */}
          <Stack direction="row" justifyContent="center" spacing={2.5}>
            <IconButton
              href="https://github.com/jamilahmadzai"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "text.secondary",
                transition: "color 0.2s",
                "&:hover": { color: accentColor },
              }}
            >
              <FaGithub size={20} />
            </IconButton>
            <IconButton
              href="https://linkedin.com/in/jamil-ur-rehman-ahmadzai-8424081b1/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "text.secondary",
                transition: "color 0.2s",
                "&:hover": { color: accentColor },
              }}
            >
              <FaLinkedin size={20} />
            </IconButton>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};
