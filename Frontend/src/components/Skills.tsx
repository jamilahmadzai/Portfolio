import { useEffect, useState, useMemo } from "react";
import {
  Typography,
  Container,
  Box,
  Paper,
  Tabs,
  Tab,
  Grid as Grid,
  useTheme,
  alpha,
  Tooltip,
  Chip,
  TextField,
  InputAdornment,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { FaReact, FaNodeJs, FaDocker, FaGitAlt, FaJs } from "react-icons/fa";
import {
  SiTypescript,
  SiDotnet,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiRabbitmq,
  SiNextdotjs,
  SiTailwindcss,
  SiMui,
  SiSymfony,
  SiRedux,
  SiVite,
  SiNginx,
  SiLeaflet,
  SiFramer,
  SiSharp as SiCsharp,
  SiPostgresql as SiPostgis,
} from "react-icons/si";
import { DiVisualstudio } from "react-icons/di";
import SearchIcon from "@mui/icons-material/Search";
import { getSkills, type SkillData } from "../services/api";
import { useTranslation } from "react-i18next";

const MotionPaper = motion(Paper);

const categories = [
  "All",
  "Application Layer",
  "Backend & APIs",
  "Data & Messaging",
  "Infrastructure",
];

export const Skills = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const accentColor = isDark ? "#2dd4bf" : "#2563eb";

  const iconMap: Record<string, React.ReactNode> = {
    FaReact: <FaReact color="#61DAFB" />,
    SiTypescript: <SiTypescript color="#3178C6" />,
    SiDotnet: <SiDotnet color="#512BD4" />,
    SiPostgresql: <SiPostgresql color="#336791" />,
    SiMui: <SiMui color="#007FFF" />,
    SiRabbitmq: <SiRabbitmq color="#FF6600" />,
    SiNextdotjs: <SiNextdotjs color={isDark ? "white" : "black"} />,
    SiRedis: <SiRedis color="#DC382D" />,
    FaDocker: <FaDocker color="#2496ED" />,
    SiSymfony: <SiSymfony color={isDark ? "white" : "black"} />,
    SiTailwindcss: <SiTailwindcss color="#06B6D4" />,
    SiMongodb: <SiMongodb color="#47A248" />,
    FaGitAlt: <FaGitAlt color="#F05032" />,
    FaJs: <FaJs color="#F7DF1E" />,
    FaNodeJs: <FaNodeJs color="#339933" />,
    SiRedux: <SiRedux color="#764ABC" />,
    SiVite: <SiVite color="#646CFF" />,
    SiNginx: <SiNginx color="#009639" />,
    SiLeaflet: <SiLeaflet color="#199900" />,
    SiFramer: <SiFramer color="#0055FF" />,
    SiCsharp: <SiCsharp color="#239120" />,
    SiPostgis: <SiPostgis color="#336791" />,
    Syncfusion: <DiVisualstudio color="#0078D7" />,
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills(i18n.language);
        setSkills(data || []);
      } catch (error) {
        // Failed silently
      }
    };
    fetchSkills();
  }, [i18n.language]);

  const filteredSkills = useMemo(() => {
    let result = skills;

    if (activeTab !== 0) {
      result = result.filter((s) => s.category === categories[activeTab]);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.usageContext?.toLowerCase().includes(query),
      );
    }

    // Sort: Expert -> Advanced -> Others
    const proficiencyOrder: Record<string, number> = {
      Expert: 0,
      Advanced: 1,
    };

    return result.sort((a, b) => {
      const orderA = proficiencyOrder[a.proficiency || ""] ?? 99;
      const orderB = proficiencyOrder[b.proficiency || ""] ?? 99;
      return orderA - orderB;
    });
  }, [skills, activeTab, searchQuery]);

  return (
    <Box
      component="section"
      id="skills"
      sx={{
        py: { xs: 12, md: 24 },
        bgcolor: isDark ? "#020617" : "#f8fafc",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "flex-end" },
            mb: 10,
            gap: 4,
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                color: isDark ? "#f8fafc" : "#0f172a",
                mb: 2,
                letterSpacing: "-0.04em",
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              {t("skills.title")}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                maxWidth: "600px",
                opacity: 0.8,
                fontWeight: 400,
              }}
            >
              {t(
                "skills.subtitle",
                "Expertise and technologies used to build scalable enterprise solutions.",
              )}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <TextField
              size="small"
              placeholder={t("skills.search", "Search skills...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: accentColor }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                width: { xs: "100%", md: "300px" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  bgcolor: isDark ? alpha("#ffffff", 0.05) : "#fff",
                  "&:hover fieldset": { borderColor: accentColor },
                  "&.Mui-focused fieldset": { borderColor: accentColor },
                },
              }}
            />
          </motion.div>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              minHeight: "auto",
              "& .MuiTabs-indicator": { display: "none" },
              "& .MuiTabs-flexContainer": { gap: 1.5 },
            }}
          >
            {categories.map((cat) => (
              <Tab
                key={cat}
                label={cat}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  minHeight: "auto",
                  minWidth: "auto",
                  px: 3,
                  py: 1.2,
                  borderRadius: "12px",
                  color: isDark ? "#94a3b8" : "#64748b",
                  bgcolor: isDark
                    ? alpha("#ffffff", 0.03)
                    : alpha("#000000", 0.03),
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&.Mui-selected": {
                    color: "#fff",
                    bgcolor: accentColor,
                    boxShadow: `0 8px 20px ${alpha(accentColor, 0.3)}`,
                  },
                  "&:hover:not(.Mui-selected)": {
                    bgcolor: isDark
                      ? alpha("#ffffff", 0.08)
                      : alpha("#000000", 0.08),
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        <Grid container spacing={4}>
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const isPrimary = skill.tier === "Primary";
              return (
                <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={skill.name}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      duration: 0.4,
                      delay: (index % 12) * 0.05,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    <Tooltip
                      title={
                        <Box sx={{ p: 1 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 800, mb: 0.5 }}
                          >
                            {skill.name}
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            {skill.usageContext}
                          </Typography>
                        </Box>
                      }
                      arrow
                      placement="top"
                      slotProps={{
                        tooltip: {
                          sx: {
                            bgcolor: isDark ? "#1e293b" : "#fff",
                            color: isDark ? "#fff" : "#0f172a",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                            borderRadius: "12px",
                            border: `1px solid ${alpha(accentColor, 0.2)}`,
                          },
                        },
                      }}
                    >
                      <MotionPaper
                        whileHover={{
                          y: -10,
                          scale: 1.05,
                          borderColor: alpha(accentColor, 0.6),
                          boxShadow: isPrimary
                            ? `0 20px 40px ${alpha(accentColor, 0.2)}`
                            : `0 15px 30px ${alpha("#000000", isDark ? 0.3 : 0.1)}`,
                        }}
                        sx={{
                          p: 4,
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 2,
                          bgcolor: isDark ? alpha("#1e293b", 0.4) : "#ffffff",
                          backdropFilter: "blur(8px)",
                          borderRadius: "24px",
                          border: `1px solid ${isPrimary ? alpha(accentColor, 0.3) : isDark ? alpha("#ffffff", 0.05) : alpha("#000000", 0.05)}`,
                          position: "relative",
                          overflow: "visible",
                          transition:
                            "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                          cursor: "pointer",
                        }}
                      >
                        {/* Proficiency Badge */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: -10,
                            right: -10,
                            zIndex: 2,
                          }}
                        >
                          <Chip
                            label={skill.proficiency || "Daily"}
                            size="small"
                            sx={{
                              height: "20px",
                              fontSize: "0.6rem",
                              fontWeight: 900,
                              bgcolor:
                                skill.proficiency === "Expert"
                                  ? isDark
                                    ? "#8b5cf6"
                                    : "#7c3aed" // Premium Violet for Expert
                                  : skill.proficiency === "Advanced"
                                    ? accentColor // Cyan Theme Color for Advanced
                                    : isDark
                                      ? "#334155"
                                      : "#e2e8f0", // Grey for others
                              color:
                                skill.proficiency === "Expert" ||
                                skill.proficiency === "Advanced"
                                  ? "#fff"
                                  : "text.secondary",
                              border: "2px solid",
                              borderColor: isDark ? "#020617" : "#f8fafc",
                              boxShadow:
                                skill.proficiency === "Expert" ||
                                skill.proficiency === "Advanced"
                                  ? `0 4px 10px ${alpha(
                                      skill.proficiency === "Expert"
                                        ? "#8b5cf6"
                                        : accentColor,
                                      0.4,
                                    )}`
                                  : "none",
                            }}
                          />
                        </Box>

                        <Box
                          sx={{
                            fontSize: "3.5rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            filter: isDark
                              ? "drop-shadow(0 0 15px rgba(255,255,255,0.05))"
                              : "none",
                            "& svg": {
                              transition:
                                "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                            },
                          }}
                        >
                          {iconMap[skill.iconName] || <FaJs />}
                        </Box>

                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 800,
                            color: isDark ? "#f1f5f9" : "#1e293b",
                            fontSize: "0.9rem",
                            textAlign: "center",
                          }}
                        >
                          {skill.name}
                        </Typography>
                      </MotionPaper>
                    </Tooltip>
                  </motion.div>
                </Grid>
              );
            })}
          </AnimatePresence>
        </Grid>

        {filteredSkills.length === 0 && (
          <Box sx={{ mt: 10, textAlign: "center", opacity: 0.5 }}>
            <Typography variant="h6">
              No skills found matching your search.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};
