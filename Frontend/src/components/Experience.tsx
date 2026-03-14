import { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Box,
  Chip,
  Paper,
  Stack,
  useTheme,
  alpha,
  useMediaQuery,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import { motion } from "framer-motion";
import { getExperience, downloadResume, type ExperienceData } from "../services/api";
import { useTranslation } from "react-i18next";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const MotionPaper = motion(Paper);

const parseDate = (dateStr: string): Date => {
  const delimiters = ["/", "-", "."];
  const delimiter = delimiters.find((d) => dateStr.includes(d)) || "/";
  const parts = dateStr.split(delimiter).map(Number);
  if (parts[0] > 12) return new Date(parts[0], parts[1] - 1);
  return new Date(parts[1], parts[0] - 1);
};

export const Experience = () => {
  const { t, i18n } = useTranslation();
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const accentColor = isDark ? "#2dd4bf" : "#2563eb";
  const contrastText = isDark ? "#f8fafc" : "#0f172a";

  const calculateDuration = (period: string): string => {
    try {
      const parts = period.split(" - ");
      if (parts.length !== 2) return "";
      const startDate = parseDate(parts[0]);
      const isPresent =
        parts[1].toLowerCase().includes("present") ||
        parts[1].toLowerCase().includes("heute");
      const endDate = isPresent ? new Date() : parseDate(parts[1]);
      let totalMonths =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth()) +
        1;
      if (totalMonths <= 0) return "";
      const years = Math.floor(totalMonths / 12);
      const months = totalMonths % 12;
      const result = [];
      if (years > 0)
        result.push(
          `${years} ${t(years === 1 ? "experience.year_one" : "experience.year_other")}`,
        );
      if (months > 0)
        result.push(
          `${months} ${t(months === 1 ? "experience.month_one" : "experience.month_other")}`,
        );
      return `(${result.join(" ")})`;
    } catch {
      return "";
    }
  };

  const handleDownloadCV = async () => {
    try {
      await downloadResume();
    } catch (e) {
      console.error("Experience: Download failed", e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExperience(i18n.language);
        const sorted = (data || []).sort((a, b) => {
          const getStart = (period: string) => {
            const start = period.split(" - ")[0]?.trim();
            if (!start) return new Date(0);
            return parseDate(start);
          };
          return getStart(b.period).getTime() - getStart(a.period).getTime();
        });
        setExperiences(sorted);
      } catch (e) {
        console.error("Failed to fetch experiences:", e);
      }
    };
    fetchData();
  }, [i18n.language]);

  return (
    <Box
      component="section"
      id="experience"
      sx={{
        py: { xs: 12, md: 20 },
        bgcolor: isDark ? "#020617" : "#f8fafc",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              mb: { xs: 8, md: 12 },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                color: contrastText,
                mb: 2,
                letterSpacing: "-0.02em",
              }}
            >
              {t("experience.title")}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                fontWeight: 400,
                maxWidth: "600px",
                opacity: 0.8,
              }}
            >
              {t("experience.subtitle")}
            </Typography>
          </Box>

          <Timeline
            position={isMobile ? "right" : "alternate"}
            sx={{
              p: 0,
              pointerEvents: "none", // Ensure the timeline structure doesn't block mouse events
            }}
          >
            {experiences.map((exp, index) => {
              const isPresent =
                exp.period.toLowerCase().includes("present") ||
                exp.period.toLowerCase().includes("heute");

              return (
                <TimelineItem key={exp.id}>
                  {!isMobile && (
                    <TimelineOppositeContent
                      sx={{
                        m: "auto 0",
                        py: 4,
                        px: 2, // Anchored closer to the spine
                        pointerEvents: "none",
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? -15 : 15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{ opacity: 0.85 }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: "'Fira Code', monospace",
                            fontSize: "1.1rem",
                            fontWeight: 800,
                            color: isPresent ? accentColor : contrastText,
                            mb: 0,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {exp.period}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            fontWeight: 500,
                            fontSize: "0.8rem",
                            opacity: 0.6,
                            letterSpacing: "0.02em",
                          }}
                        >
                          {calculateDuration(exp.period)}
                        </Typography>
                      </motion.div>
                    </TimelineOppositeContent>
                  )}

                  <TimelineSeparator sx={{ pointerEvents: "none" }}>
                    <TimelineDot
                      variant="outlined"
                      sx={{
                        p: 0,
                        border: "none",
                        bgcolor: "transparent",
                        my: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          border: `3px solid ${isPresent ? accentColor : alpha(accentColor, 0.3)}`,
                          bgcolor: isPresent
                            ? accentColor
                            : isDark
                              ? "#0f172a"
                              : "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: isPresent
                            ? `0 0 15px ${alpha(accentColor, 0.4)}`
                            : `0 0 5px rgba(0,0,0,0.05)`,
                          zIndex: 2,
                          "&::after": isPresent
                            ? {
                                content: '""',
                                position: "absolute",
                                width: "250%",
                                height: "250%",
                                borderRadius: "50%",
                                border: `1px solid ${alpha(accentColor, 0.3)}`,
                                animation: "ripple 2.5s infinite ease-out",
                              }
                            : {},
                        }}
                      >
                        {isPresent && (
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              bgcolor: "#fff",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                      </Box>
                    </TimelineDot>
                    <TimelineConnector
                      sx={{
                        width: 2,
                        background: `linear-gradient(to bottom, ${isPresent ? accentColor : alpha(accentColor, 0.4)}, ${alpha(accentColor, 0.05)})`,
                        boxShadow: `0 0 4px ${alpha(accentColor, 0.1)}`,
                      }}
                    />
                  </TimelineSeparator>

                  <TimelineContent
                    sx={{
                      py: 4,
                      px: { xs: 2, md: 6 },
                      position: "relative",
                      pointerEvents: "none",
                    }}
                  >
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 30,
                        x: isMobile ? 20 : index % 2 === 0 ? 30 : -30,
                      }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: isMobile
                          ? "flex-start"
                          : index % 2 === 0
                            ? "flex-start"
                            : "flex-end",
                        pointerEvents: "none",
                      }}
                    >
                      <MotionPaper
                        whileHover={{
                          scale: 1.015,
                          y: -8,
                          zIndex: 20,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                          zIndex: { duration: 0 },
                        }}
                        elevation={0}
                        sx={{
                          p: { xs: 4, md: 5 },
                          width: "100%",
                          maxWidth: { md: "560px" },
                          bgcolor: isDark ? alpha("#0f172a", 0.4) : "#ffffff",
                          backdropFilter: "blur(12px)",
                          borderRadius: "20px",
                          border: `1px solid ${isPresent ? alpha(accentColor, 0.4) : alpha(isDark ? "#ffffff" : "#000000", 0.08)}`,
                          borderLeft: `4px solid ${accentColor}`,
                          boxShadow: isPresent
                            ? `0 25px 50px ${alpha(accentColor, 0.12)}`
                            : isDark
                              ? "0 15px 35px rgba(0,0,0,0.3)"
                              : "0 15px 35px rgba(0,0,0,0.05)",
                          position: "relative",
                          cursor: "pointer",
                          pointerEvents: "auto",
                          transition:
                            "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                          "&:hover": {
                            borderColor: alpha(accentColor, 0.6),
                            boxShadow: `0 40px 80px ${alpha(accentColor, isPresent ? 0.2 : 0.12)}`,
                          },
                        }}
                      >
                        {isPresent && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 16,
                              right: 16,
                              bgcolor: alpha(accentColor, 0.1),
                              color: accentColor,
                              border: `1px solid ${alpha(accentColor, 0.3)}`,
                              px: 1.2,
                              py: 0.4,
                              borderRadius: "6px",
                              fontSize: "0.6rem",
                              fontWeight: 800,
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                            }}
                          >
                            ACTIVE
                          </Box>
                        )}

                        <Box sx={{ mb: 3 }}>
                          <Typography
                            variant="h4"
                            sx={{
                              fontWeight: 900,
                              color: contrastText,
                              fontSize: { xs: "1.4rem", md: "1.75rem" },
                              mb: 0.5,
                              letterSpacing: "-0.02em",
                              textAlign: "left",
                            }}
                          >
                            {exp.role}
                          </Typography>

                          <Stack direction="row" spacing={2} flexWrap="wrap">
                            <Stack
                              direction="row"
                              spacing={0.5}
                              alignItems="center"
                            >
                              <BusinessIcon
                                sx={{ fontSize: "1rem", color: accentColor }}
                              />
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: 700,
                                  color: accentColor,
                                  fontSize: "0.95rem",
                                  textAlign: "left",
                                }}
                              >
                                {exp.company}
                              </Typography>
                            </Stack>
                            <Stack
                              direction="row"
                              spacing={0.5}
                              alignItems="center"
                            >
                              <LocationOnIcon
                                sx={{
                                  fontSize: "1rem",
                                  color: "text.disabled",
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "text.disabled",
                                  fontWeight: 500,
                                  textAlign: "left",
                                }}
                              >
                                {exp.location}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.8,
                            mb: 4,
                          }}
                        >
                          {exp.techStack.map((tech) => (
                            <Chip
                              key={tech}
                              label={tech}
                              size="small"
                              sx={{
                                height: "18px",
                                fontSize: "0.65rem",
                                fontWeight: 700,
                                bgcolor: alpha(accentColor, 0.05),
                                color: isDark
                                  ? alpha(accentColor, 0.9)
                                  : accentColor,
                                border: `1px solid ${alpha(accentColor, 0.15)}`,
                                borderRadius: "4px",
                                "&:hover": {
                                  bgcolor: accentColor,
                                  color: "#fff",
                                },
                              }}
                            />
                          ))}
                        </Box>

                        <Stack spacing={2}>
                          {exp.description.map((desc, i) => {
                            const words = desc.split(" ");
                            const firstThree = words.slice(0, 3).join(" ");
                            const rest = words.slice(3).join(" ");
                            return (
                              <Box key={i} sx={{ display: "flex", gap: 2 }}>
                                <Box
                                  sx={{
                                    width: 5,
                                    height: 5,
                                    borderRadius: "50%",
                                    bgcolor: isPresent
                                      ? accentColor
                                      : alpha(accentColor, 0.3),
                                    mt: 1.1,
                                    flexShrink: 0,
                                    boxShadow: isPresent
                                      ? `0 0 6px ${accentColor}`
                                      : "none",
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: isDark ? "#94a3b8" : "#475569",
                                    lineHeight: 1.7,
                                    fontSize: "0.92rem",
                                    textAlign: "left",
                                  }}
                                >
                                  <Box
                                    component="span"
                                    sx={{
                                      fontWeight: 700,
                                      color: isDark ? "#f1f5f9" : "#1e293b",
                                    }}
                                  >
                                    {firstThree}{" "}
                                  </Box>
                                  {rest}
                                </Typography>
                              </Box>
                            );
                          })}
                        </Stack>
                      </MotionPaper>
                    </motion.div>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>

          <Box sx={{ mt: 10, textAlign: "center" }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Typography
                component="button"
                onClick={handleDownloadCV}
                sx={{
                  background: "none",
                  border: "none",
                  p: 0,
                  cursor: "pointer",
                  color: accentColor,
                  fontWeight: 800,
                  fontSize: "1rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  opacity: 0.8,
                  transition: "opacity 0.2s",
                  "&:hover": { opacity: 1 },
                  fontFamily: "inherit",
                }}
              >
                {t("experience.view_full_cv")}
                <Box
                  component="span"
                  sx={{
                    width: 20,
                    height: 1,
                    bgcolor: accentColor,
                    display: "inline-block",
                  }}
                />
              </Typography>
            </motion.div>
          </Box>
        </motion.div>
      </Container>

      <style>{`
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </Box>
  );
};
