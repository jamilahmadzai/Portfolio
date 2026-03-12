import { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Box,
  Paper,
  Stack,
  useTheme,
  alpha,
  Chip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { getEducation, type EducationData } from "../services/api";
import { useTranslation } from "react-i18next";
import SchoolIcon from "@mui/icons-material/School";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const MotionPaper = motion(Paper);

export const Education = () => {
  const { t, i18n } = useTranslation();
  const [education, setEducation] = useState<EducationData[]>([]);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const accentColor = isDark ? "#2dd4bf" : "#2563eb";
  const contrastText = isDark ? "#f8fafc" : "#0f172a";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEducation(i18n.language);
        // Sort to ensure MSc is first (assuming MSc has higher ID or by parsing period)
        const sortedData = (data || []).sort((a, b) => {
          if (a.period.toLowerCase().includes("present")) return -1;
          if (b.period.toLowerCase().includes("present")) return 1;
          return b.period.split("-")[0].localeCompare(a.period.split("-")[0]);
        });
        setEducation(sortedData);
      } catch (error) {
        console.error("Failed to fetch education data:", error);
      }
    };
    fetchData();
  }, [i18n.language]);

  return (
    <Box
      component="section"
      id="education"
      sx={{
        py: { xs: 12, md: 20 },
        bgcolor: isDark ? "#020617" : "#f8fafc",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decor */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: "40%",
          height: "40%",
          background: `radial-gradient(circle, ${alpha(accentColor, 0.05)} 0%, transparent 70%)`,
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
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
              {t("education.title")}
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
              {t("education.subtitle")}
            </Typography>
          </Box>

          <Stack spacing={4}>
            <AnimatePresence>
              {education.map((edu, index) => {
                const isPresent = edu.period.toLowerCase().includes("present");

                return (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <MotionPaper
                      whileHover={{
                        scale: 1.01,
                        boxShadow: isDark
                          ? `0 20px 40px ${alpha("#000000", 0.4)}, 0 0 20px ${alpha(accentColor, 0.1)}`
                          : `0 20px 40px ${alpha("#000000", 0.05)}`,
                        borderColor: alpha(accentColor, 0.4),
                      }}
                      elevation={0}
                      sx={{
                        p: { xs: 4, md: 6 },
                        borderRadius: "24px",
                        bgcolor: isDark ? alpha("#0f172a", 0.6) : "#ffffff",
                        backdropFilter: "blur(12px)",
                        border: `1px solid ${isDark ? alpha("#ffffff", 0.08) : alpha("#000000", 0.05)}`,
                        position: "relative",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 6,
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      {/* Left Side: Institution Mark */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: { md: "100px" },
                          position: "relative",
                        }}
                      >
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: "20px",
                            bgcolor: alpha(accentColor, 0.1),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: accentColor,
                            position: "relative",
                            zIndex: 1,
                            "& svg": { fontSize: "2.5rem" },
                          }}
                        >
                          <SchoolIcon />
                        </Box>
                        {/* Decorative glow behind icon */}
                        <Box
                          sx={{
                            position: "absolute",
                            width: 120,
                            height: 120,
                            bgcolor: alpha(accentColor, 0.15),
                            borderRadius: "50%",
                            filter: "blur(40px)",
                            zIndex: 0,
                          }}
                        />
                      </Box>

                      {/* Right Side: Content */}
                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            flexWrap: "wrap",
                            gap: 2,
                            mb: 1,
                          }}
                        >
                          <Typography
                            variant="h4"
                            sx={{
                              fontWeight: 900,
                              color: contrastText,
                              fontSize: { xs: "1.5rem", md: "2rem" },
                              letterSpacing: "-0.02em",
                              textAlign: "left",
                            }}
                          >
                            {edu.degree}
                          </Typography>

                          <Chip
                            label={edu.period}
                            sx={{
                              bgcolor: isPresent
                                ? alpha(accentColor, 0.15)
                                : alpha(isDark ? "#ffffff" : "#000000", 0.05),
                              color: isPresent ? accentColor : "text.secondary",
                              fontWeight: 800,
                              fontSize: "0.75rem",
                              borderRadius: "10px",
                              border: `1px solid ${isPresent ? alpha(accentColor, 0.3) : "transparent"}`,
                            }}
                          />
                        </Box>

                        <Typography
                          variant="h6"
                          sx={{
                            color: accentColor,
                            fontWeight: 800,
                            mb: 2,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            fontSize: "1.1rem",
                            textAlign: "left",
                          }}
                        >
                          {edu.institution}
                          <Box
                            component="span"
                            sx={{
                              width: 4,
                              height: 4,
                              borderRadius: "50%",
                              bgcolor: "text.disabled",
                              opacity: 0.3,
                            }}
                          />
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{
                              color: "text.disabled",
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              textAlign: "left",
                            }}
                          >
                            <LocationOnIcon sx={{ fontSize: "1rem" }} />
                            {edu.location}
                          </Typography>
                        </Typography>

                        {edu.focus && (
                          <Box
                            sx={{
                              mb: 3,
                              p: 2,
                              bgcolor: isDark
                                ? alpha("#ffffff", 0.03)
                                : alpha("#000000", 0.02),
                              borderRadius: "12px",
                              borderLeft: `3px solid ${accentColor}`,
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            <AutoAwesomeIcon
                              sx={{
                                color: accentColor,
                                fontSize: "1.2rem",
                                opacity: 0.8,
                              }}
                            />
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 700,
                                color: contrastText,
                                textAlign: "left",
                              }}
                            >
                              {edu.focus}
                            </Typography>
                          </Box>
                        )}

                        <Typography
                          variant="body1"
                          sx={{
                            color: "text.secondary",
                            lineHeight: 1.8,
                            mb: 4,
                            maxWidth: "800px",
                            fontSize: "0.95rem",
                            textAlign: "left",
                          }}
                        >
                          {edu.description}
                        </Typography>

                        {edu.relevantModules &&
                          edu.relevantModules.length > 0 && (
                            <Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  mb: 1.5,
                                }}
                              >
                                <MenuBookIcon
                                  sx={{
                                    fontSize: "1rem",
                                    color: "text.disabled",
                                  }}
                                />
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontWeight: 800,
                                    color: "text.disabled",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                  }}
                                >
                                  Academic Focus
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 1,
                                }}
                              >
                                {edu.relevantModules.map((module) => (
                                  <Chip
                                    key={module}
                                    label={module}
                                    size="small"
                                    sx={{
                                      bgcolor: isDark
                                        ? alpha("#ffffff", 0.05)
                                        : alpha("#000000", 0.03),
                                      color: isDark ? "#94a3b8" : "#64748b",
                                      fontWeight: 700,
                                      fontSize: "0.75rem",
                                      borderRadius: "8px",
                                      "&:hover": {
                                        bgcolor: alpha(accentColor, 0.1),
                                        color: accentColor,
                                      },
                                    }}
                                  />
                                ))}
                              </Box>
                            </Box>
                          )}
                      </Box>

                      {/* "Present" Badge */}
                      {isPresent && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 20,
                            right: -30,
                            bgcolor: accentColor,
                            color: "#fff",
                            px: 5,
                            py: 0.5,
                            transform: "rotate(45deg)",
                            fontSize: "0.6rem",
                            fontWeight: 900,
                            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                            letterSpacing: "0.1em",
                            zIndex: 10,
                          }}
                        >
                          ACTIVE
                        </Box>
                      )}
                    </MotionPaper>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
};
