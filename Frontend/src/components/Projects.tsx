import { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Box,
  Paper,
  Grid as Grid,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  useTheme,
  alpha,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StorageIcon from "@mui/icons-material/Storage";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import { motion, AnimatePresence } from "framer-motion";
import BusinessIcon from "@mui/icons-material/Business";
import VerifiedIcon from "@mui/icons-material/Verified";
import { getProjects, type ProjectData } from "../services/api";

import { useTranslation } from "react-i18next";

export const Projects = () => {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleOpenModal = (project: ProjectData) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjects(i18n.language);
        setProjects(data);
      } catch (error) {
        // Failed silently
      }
    };
    fetchData();
  }, [i18n.language]);

  return (
    <Box
      component="section"
      id="projects"
      sx={{
        py: { xs: 12, md: 24 },
        bgcolor: isDark ? "#020617" : "#f8fafc",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
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
            {t("projects.title")}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              mb: { xs: 8, md: 12 },
              maxWidth: "600px",
              lineHeight: 1.6,
              fontWeight: 500,
              fontSize: "1.1rem",
            }}
          >
            {t("projects.subtitle")}
          </Typography>
        </motion.div>

        <Grid container spacing={8}>
          {projects.map((project, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 4, md: 6 },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: isDark ? alpha("#0f172a", 0.4) : "#ffffff",
                    backdropFilter: "blur(12px)",
                    borderRadius: "24px",
                    border: `1px solid ${isDark ? alpha("#ffffff", 0.08) : alpha("#000000", 0.05)}`,
                    position: "relative",
                    overflow: "hidden",
                    transition:
                      "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: alpha("#2dd4bf", 0.4),
                      transform: "translateY(-12px) scale(1.02)",
                      boxShadow: isDark
                        ? `0 40px 80px ${alpha("#000000", 0.6)}, 0 0 20px ${alpha("#2dd4bf", 0.1)}`
                        : `0 30px 60px ${alpha("#000000", 0.1)}`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: "10px",
                          bgcolor: alpha("#2dd4bf", 0.1),
                          color: "#2dd4bf",
                          display: "flex",
                        }}
                      >
                        <BusinessIcon fontSize="small" />
                      </Box>
                      <Typography
                        variant="overline"
                        sx={{
                          fontWeight: 800,
                          letterSpacing: "0.1em",
                          fontSize: "0.7rem",
                          color: isDark ? "#94a3b8" : "#64748b",
                        }}
                      >
                        {project.organization}
                      </Typography>
                    </Stack>

                    {project.isInternalProject && (
                      <Chip
                        label={t("projects.internalProject")}
                        size="small"
                        sx={{
                          height: "20px",
                          fontSize: "0.6rem",
                          fontWeight: 900,
                          bgcolor: alpha("#3b82f6", 0.1),
                          color: "#3b82f6",
                          border: `1px solid ${alpha("#3b82f6", 0.2)}`,
                          borderRadius: "6px",
                          textTransform: "uppercase",
                          px: 0.5,
                        }}
                      />
                    )}
                  </Box>

                  <Typography
                    variant="h4"
                    sx={{
                      mb: 2,
                      fontWeight: 900,
                      color: isDark ? "#f1f5f9" : "#1e293b",
                      fontSize: { xs: "1.5rem", md: "1.75rem" },
                      lineHeight: 1.2,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {project.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      color: "text.secondary",
                      lineHeight: 1.7,
                      fontSize: "1rem",
                      fontWeight: 400,
                    }}
                  >
                    {project.description}
                  </Typography>

                  {project.architectureDescription && (
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 4,
                        color: "#2dd4bf",
                        fontFamily: "'Fira Code', monospace",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        opacity: 0.9,
                        bgcolor: alpha("#2dd4bf", 0.05),
                        p: 1.5,
                        borderRadius: "8px",
                        borderLeft: "3px solid #2dd4bf",
                      }}
                    >
                      {project.architectureDescription}
                    </Typography>
                  )}

                  <Box sx={{ mt: "auto" }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      useFlexGap
                      sx={{ mb: 5 }}
                    >
                      {project.techStack.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          sx={{
                            height: "18px",
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            bgcolor: isDark
                              ? alpha("#ffffff", 0.03)
                              : alpha("#000000", 0.03),
                            color: "text.secondary",
                            border: `1px solid ${isDark ? alpha("#ffffff", 0.1) : alpha("#000000", 0.1)}`,
                            borderRadius: "4px",
                          }}
                        />
                      ))}
                    </Stack>

                    <Button
                      variant="text"
                      onClick={() => handleOpenModal(project)}
                      sx={{
                        p: 0,
                        justifyContent: "flex-start",
                        textTransform: "none",
                        fontWeight: 800,
                        fontSize: "0.95rem",
                        color: "#2dd4bf",
                        gap: 1,
                        "&:hover": {
                          bgcolor: "transparent",
                          color: isDark ? "#5eead4" : "#0d9488",
                          "& .arrow-icon": {
                            transform: "translateX(4px)",
                          },
                        },
                      }}
                    >
                      {t("projects.viewArchitecture")}
                      <Box
                        className="arrow-icon"
                        sx={{
                          transition: "transform 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        →
                      </Box>
                    </Button>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Dialog
          open={isModalOpen}
          onClose={handleCloseModal}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "32px",
              bgcolor: isDark ? "#0f172a" : "#ffffff",
              backgroundImage: "none",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: isDark ? 0.05 : 0.03,
                pointerEvents: "none",
                backgroundImage: `linear-gradient(${isDark ? "#ffffff" : "#000000"} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? "#ffffff" : "#000000"} 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              },
            },
          }}
        >
          <AnimatePresence mode="wait">
            {isModalOpen && selectedProject && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ width: "100%", height: "100%" }}
              >
                <Box
                  sx={{
                    height: { xs: "100vh", md: "85vh" },
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <IconButton
                    onClick={handleCloseModal}
                    sx={{
                      position: "absolute",
                      right: 24,
                      top: 24,
                      bgcolor: isDark
                        ? alpha("#ffffff", 0.05)
                        : alpha("#000000", 0.05),
                      "&:hover": {
                        bgcolor: isDark
                          ? alpha("#ffffff", 0.1)
                          : alpha("#000000", 0.1),
                        transform: "scale(1.1) rotate(90deg)",
                      },
                      transition: "all 0.3s ease",
                      zIndex: 100,
                    }}
                  >
                    <CloseIcon />
                  </IconButton>

                  <DialogTitle
                    sx={{
                      px: { xs: 4, md: 8 },
                      pt: { xs: 6, md: 8 },
                      pb: 3,
                      flexShrink: 0,
                      borderBottom: `1px solid ${isDark ? alpha("#ffffff", 0.05) : alpha("#000000", 0.05)}`,
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        color: "#2dd4bf",
                        fontWeight: 900,
                        letterSpacing: "0.2em",
                        display: "block",
                        mb: 1,
                      }}
                    >
                      {t("projects.architecturalAnalysis")}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 900,
                        color: isDark ? "#f8fafc" : "#0f172a",
                        fontSize: { xs: "1.75rem", md: "2.5rem" },
                        letterSpacing: "-0.03em",
                        lineHeight: 1.1,
                        maxWidth: "85%",
                      }}
                    >
                      {selectedProject.title}
                    </Typography>
                  </DialogTitle>

                  <DialogContent
                    sx={{
                      px: { xs: 4, md: 8 },
                      py: { xs: 6, md: 10 },
                      flexGrow: 1,
                      overflowY: "auto",
                      "&::-webkit-scrollbar": {
                        width: "8px",
                      },
                      "&::-webkit-scrollbar-track": {
                        background: "transparent",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: alpha("#2dd4bf", 0.2),
                        borderRadius: "10px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        background: alpha("#2dd4bf", 0.4),
                      },
                    }}
                  >
                    <Grid container spacing={8}>
                      <Grid size={{ xs: 12, md: 7 }}>
                        <Box sx={{ mb: 8 }}>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 900,
                              color: isDark ? "#f1f5f9" : "#1e293b",
                              mb: 4,
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              position: "relative",
                              "&::after": {
                                content: '""',
                                position: "absolute",
                                bottom: -12,
                                left: 0,
                                width: 40,
                                height: 4,
                                bgcolor: "#2dd4bf",
                                borderRadius: "2px",
                                boxShadow: "0 0 10px rgba(45, 212, 191, 0.4)",
                              },
                            }}
                          >
                            <VerifiedIcon sx={{ color: "#2dd4bf" }} />
                            {t("projects.keyTechnicalSolutions")}
                          </Typography>
                          <Stack spacing={4}>
                            {selectedProject.features.map((feature, i) => {
                              const [bold, ...rest] = feature.split(". ");
                              return (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.2 + i * 0.1 }}
                                >
                                  <Box sx={{ display: "flex", gap: 3 }}>
                                    <Box
                                      sx={{
                                        mt: 1.2,
                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        bgcolor: "#2dd4bf",
                                        flexShrink: 0,
                                        boxShadow:
                                          "0 0 12px rgba(45, 212, 191, 0.6)",
                                      }}
                                    />
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        color: "text.secondary",
                                        lineHeight: 1.7,
                                        fontSize: "1.1rem",
                                      }}
                                    >
                                      <strong
                                        style={{
                                          color: isDark ? "#f8fafc" : "#0f172a",
                                        }}
                                      >
                                        {bold}.
                                      </strong>{" "}
                                      {rest.join(". ")}
                                    </Typography>
                                  </Box>
                                </motion.div>
                              );
                            })}
                          </Stack>
                        </Box>

                        <Box>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 900,
                              color: isDark ? "#f1f5f9" : "#1e293b",
                              mb: 4,
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              position: "relative",
                              "&::after": {
                                content: '""',
                                position: "absolute",
                                bottom: -12,
                                left: 0,
                                width: 40,
                                height: 4,
                                bgcolor: "#3b82f6",
                                borderRadius: "2px",
                                boxShadow: "0 0 10px rgba(59, 130, 246, 0.4)",
                              },
                            }}
                          >
                            <StorageIcon sx={{ color: "#3b82f6" }} />
                            {t("projects.coreInfrastructure")}
                          </Typography>
                          <Grid container spacing={3}>
                            {selectedProject.architectureDescription
                              ?.split("|")
                              .map((part, i) => {
                                const [label, value] = part.split(": ");
                                return (
                                  <Grid size={{ xs: 12, sm: 6 }} key={i}>
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.95 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: 0.5 + i * 0.1 }}
                                    >
                                      <Paper
                                        elevation={0}
                                        sx={{
                                          p: 3,
                                          borderRadius: "20px",
                                          bgcolor: isDark
                                            ? alpha("#ffffff", 0.03)
                                            : alpha("#000000", 0.03),
                                          border: `1px solid ${isDark ? alpha("#ffffff", 0.08) : alpha("#000000", 0.08)}`,
                                          height: "100%",
                                          display: "flex",
                                          flexDirection: "column",
                                          justifyContent: "center",
                                          "&:hover": {
                                            bgcolor: isDark
                                              ? alpha("#ffffff", 0.06)
                                              : alpha("#000000", 0.06),
                                            borderColor: alpha("#3b82f6", 0.4),
                                            transform: "translateY(-4px)",
                                            boxShadow: isDark
                                              ? `0 20px 40px ${alpha("#000000", 0.4)}`
                                              : `0 20px 40px ${alpha("#000000", 0.05)}`,
                                          },
                                          transition:
                                            "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                        }}
                                      >
                                        <Typography
                                          variant="caption"
                                          sx={{
                                            color: "#3b82f6",
                                            fontWeight: 900,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.15em",
                                            display: "block",
                                            mb: 1,
                                            fontSize: "0.75rem",
                                          }}
                                        >
                                          {label.trim()}
                                        </Typography>
                                        <Typography
                                          variant="body1"
                                          sx={{
                                            fontWeight: 800,
                                            color: isDark
                                              ? "#f8fafc"
                                              : "#1e293b",
                                            fontSize: "1rem",
                                          }}
                                        >
                                          {value?.trim()}
                                        </Typography>
                                      </Paper>
                                    </motion.div>
                                  </Grid>
                                );
                              })}
                          </Grid>
                        </Box>
                      </Grid>

                      <Grid size={{ xs: 12, md: 5 }}>
                        <motion.div
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4, duration: 0.6 }}
                        >
                          <Paper
                            elevation={0}
                            sx={{
                              p: { xs: 5, md: 6 },
                              borderRadius: "32px",
                              bgcolor: isDark
                                ? alpha("#2dd4bf", 0.04)
                                : alpha("#2dd4bf", 0.03),
                              border: `1px solid ${alpha("#2dd4bf", 0.15)}`,
                              position: "relative",
                              overflow: "hidden",
                              height: "fit-content",
                            }}
                          >
                            <SettingsEthernetIcon
                              sx={{
                                position: "absolute",
                                right: -30,
                                top: -30,
                                fontSize: "160px",
                                opacity: 0.04,
                                color: "#2dd4bf",
                              }}
                            />
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 900,
                                color: "#2dd4bf",
                                mb: 6,
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <VerifiedIcon />
                              {t("projects.projectContext")}
                            </Typography>

                            <Stack spacing={5}>
                              <Box>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontWeight: 900,
                                    color: alpha(
                                      isDark ? "#f8fafc" : "#0f172a",
                                      0.4,
                                    ),
                                    textTransform: "uppercase",
                                    letterSpacing: "0.2em",
                                    display: "block",
                                    mb: 1.5,
                                  }}
                                >
                                  {t("projects.organization")}
                                </Typography>
                                <Typography
                                  variant="h6"
                                  sx={{ fontWeight: 900 }}
                                >
                                  {selectedProject.organization}
                                </Typography>
                              </Box>

                              <Box>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontWeight: 900,
                                    color: alpha(
                                      isDark ? "#f8fafc" : "#0f172a",
                                      0.4,
                                    ),
                                    textTransform: "uppercase",
                                    letterSpacing: "0.2em",
                                    display: "block",
                                    mb: 1.5,
                                  }}
                                >
                                  {t("projects.deploymentType")}
                                </Typography>
                                <Typography
                                  variant="h6"
                                  sx={{ fontWeight: 900 }}
                                >
                                  {selectedProject.isInternalProject
                                    ? t("projects.enterpriseInternal")
                                    : t("projects.publicCloud")}
                                </Typography>
                              </Box>

                              <Box>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontWeight: 900,
                                    color: alpha(
                                      isDark ? "#f8fafc" : "#0f172a",
                                      0.4,
                                    ),
                                    textTransform: "uppercase",
                                    letterSpacing: "0.2em",
                                    display: "block",
                                    mb: 1.5,
                                  }}
                                >
                                  {t("projects.architecturalFocus")}
                                </Typography>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    fontWeight: 600,
                                    lineHeight: 1.8,
                                    color: "text.secondary",
                                    fontSize: "1.1rem",
                                  }}
                                >
                                  {selectedProject.architectureImpact ||
                                    "High-performance system integration and real-time data orchestration."}
                                </Typography>
                              </Box>
                            </Stack>
                          </Paper>
                        </motion.div>
                      </Grid>
                    </Grid>
                  </DialogContent>

                  <DialogActions
                    sx={{
                      px: { xs: 4, md: 8 },
                      py: 4,
                      flexShrink: 0,
                      justifyContent: "flex-end",
                      borderTop: `1px solid ${isDark ? alpha("#ffffff", 0.05) : alpha("#000000", 0.05)}`,
                      bgcolor: isDark
                        ? alpha("#000000", 0.2)
                        : alpha("#000000", 0.02),
                    }}
                  >
                    <Button
                      onClick={handleCloseModal}
                      variant="outlined"
                      sx={{
                        px: 6,
                        py: 1.5,
                        borderRadius: "14px",
                        textTransform: "none",
                        fontWeight: 900,
                        fontSize: "1.1rem",
                        borderWidth: "2px",
                        borderColor: isDark
                          ? alpha("#ffffff", 0.2)
                          : alpha("#000000", 0.1),
                        color: "text.primary",
                        "&:hover": {
                          borderWidth: "2px",
                          bgcolor: "#2dd4bf",
                          borderColor: "#2dd4bf",
                          color: "#0f172a",
                          transform: "translateY(-2px)",
                          boxShadow: `0 10px 20px ${alpha("#2dd4bf", 0.3)}`,
                        },
                        transition:
                          "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      }}
                    >
                      {t("projects.dismissAnalysis")}
                    </Button>
                  </DialogActions>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Dialog>
      </Container>
    </Box>
  );
};
