import { useState } from "react";
import type { SelectChangeEvent } from "@mui/material";
import {
  Typography,
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
  Grid as Grid,
  useTheme,
  alpha,
  IconButton,
  Tooltip,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { sendMessage } from "../services/api";
import { useTranslation } from "react-i18next";

const EMAIL = "jura.ahmadzai@gmail.com";

const subjectOptions = [
  "Full-time Opportunity",
  "Freelance / Contract Project",
  "Open Source Collaboration",
  "Technical Consultation",
  "Other",
];

export const Contact = () => {
  const { t } = useTranslation();
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackError, setSnackError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const accentColor = isDark ? "#2dd4bf" : "#2563eb";
  const successColor = "#22c55e";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (e: SelectChangeEvent<string>) => {
    setFormData({ ...formData, subject: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await sendMessage(formData);
      setSnackOpen(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Failed to send message:", error);
      setSnackError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 } as never,
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" } as never,
    },
  };

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        py: { xs: 10, md: 20 },
        bgcolor: isDark ? "#020617" : "#f8fafc",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial background glow */}
      <Box
        sx={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: isDark
            ? `radial-gradient(circle, ${alpha(accentColor, 0.06)} 0%, transparent 70%)`
            : `radial-gradient(circle, ${alpha(accentColor, 0.04)} 0%, transparent 70%)`,
          top: "-200px",
          right: "-100px",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants}>
            <Box sx={{ mb: 10 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  color: isDark ? "#f8fafc" : "#0f172a",
                  letterSpacing: "-0.04em",
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  mb: 2,
                }}
              >
                {t("contact.title")}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  fontWeight: 400,
                  maxWidth: "540px",
                }}
              >
                {t(
                  "contact.subtitle",
                  "Open to full-stack engineering roles and impactful collaborations.",
                )}
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={6} alignItems="stretch">
            {/* ── LEFT: Connection Panel ── */}
            <Grid
              size={{ xs: 12, md: 5 }}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <motion.div
                variants={itemVariants}
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 4, md: 5 },
                    height: "100%",
                    bgcolor: isDark ? alpha("#1e293b", 0.5) : "#ffffff",
                    backdropFilter: "blur(12px)",
                    borderRadius: "28px",
                    border: `1px solid ${isDark ? alpha("#ffffff", 0.06) : alpha("#000000", 0.06)}`,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  {/* Availability Badge */}
                  <Box>
                    <Chip
                      icon={
                        <FiberManualRecordIcon
                          sx={{
                            fontSize: "10px !important",
                            color: `${successColor} !important`,
                          }}
                        />
                      }
                      label="Open to Opportunities"
                      sx={{
                        bgcolor: alpha(successColor, 0.1),
                        color: successColor,
                        fontWeight: 800,
                        fontSize: "0.8rem",
                        border: `1px solid ${alpha(successColor, 0.2)}`,
                        borderRadius: "12px",
                        "& .MuiChip-icon": { ml: 1 },
                      }}
                    />
                  </Box>

                  {/* Heading */}
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 900,
                        color: isDark ? "#f1f5f9" : "#0f172a",
                        letterSpacing: "-0.03em",
                        lineHeight: 1.2,
                        mb: 1.5,
                      }}
                    >
                      Let's build scalable systems together.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Based in <strong>Paderborn, Germany</strong>.
                    </Typography>
                  </Box>

                  <Divider
                    sx={{
                      borderColor: isDark
                        ? alpha("#ffffff", 0.06)
                        : alpha("#000000", 0.06),
                    }}
                  />

                  {/* Email with Copy */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: "14px",
                        bgcolor: alpha(accentColor, 0.1),
                        display: "flex",
                        flexShrink: 0,
                      }}
                    >
                      <EmailIcon
                        sx={{ color: accentColor, fontSize: "1.3rem" }}
                      />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontWeight: 700, display: "block" }}
                      >
                        EMAIL
                      </Typography>
                      <Typography
                        component="a"
                        href={`mailto:${EMAIL}`}
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: isDark ? "#f1f5f9" : "#0f172a",
                          textDecoration: "none",
                          "&:hover": { color: accentColor },
                          transition: "color 0.2s",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "block",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {EMAIL}
                      </Typography>
                    </Box>
                    <Tooltip
                      title={copied ? "Copied!" : "Copy email"}
                      placement="top"
                    >
                      <IconButton
                        size="small"
                        onClick={handleCopyEmail}
                        sx={{
                          bgcolor: copied
                            ? alpha(successColor, 0.1)
                            : alpha(accentColor, 0.08),
                          color: copied ? successColor : accentColor,
                          border: `1px solid ${copied ? alpha(successColor, 0.3) : alpha(accentColor, 0.2)}`,
                          borderRadius: "10px",
                          transition: "all 0.3s",
                          "&:hover": { bgcolor: alpha(accentColor, 0.15) },
                        }}
                      >
                        {copied ? (
                          <CheckIcon fontSize="small" />
                        ) : (
                          <ContentCopyIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Box>

                  {/* Location */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: "14px",
                        bgcolor: alpha("#8b5cf6", 0.1),
                        display: "flex",
                        flexShrink: 0,
                      }}
                    >
                      <LocationOnIcon
                        sx={{ color: "#8b5cf6", fontSize: "1.3rem" }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontWeight: 700, display: "block" }}
                      >
                        LOCATION
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: isDark ? "#f1f5f9" : "#0f172a",
                        }}
                      >
                        Paderborn, Germany 🇩🇪
                      </Typography>
                    </Box>
                  </Box>

                  {/* Response time */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: "14px",
                        bgcolor: alpha("#f59e0b", 0.1),
                        display: "flex",
                        flexShrink: 0,
                      }}
                    >
                      <AccessTimeIcon
                        sx={{ color: "#f59e0b", fontSize: "1.3rem" }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontWeight: 700, display: "block" }}
                      >
                        RESPONSE TIME
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: isDark ? "#f1f5f9" : "#0f172a",
                        }}
                      >
                        Usually within 24–48 hours
                      </Typography>
                    </Box>
                  </Box>

                  <Divider
                    sx={{
                      borderColor: isDark
                        ? alpha("#ffffff", 0.06)
                        : alpha("#000000", 0.06),
                    }}
                  />

                  {/* Social Links */}
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontWeight: 700, display: "block", mb: 2 }}
                    >
                      CONNECT
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                      <Button
                        variant="outlined"
                        startIcon={<LinkedInIcon />}
                        href="https://www.linkedin.com/in/jamilurehman-ahmadzai"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          borderRadius: "12px",
                          textTransform: "none",
                          fontWeight: 700,
                          borderColor: isDark
                            ? alpha("#ffffff", 0.12)
                            : alpha("#000000", 0.12),
                          color: isDark ? "#f1f5f9" : "#0f172a",
                          "&:hover": {
                            borderColor: "#0077b5",
                            color: "#0077b5",
                            bgcolor: alpha("#0077b5", 0.06),
                          },
                        }}
                      >
                        LinkedIn
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<GitHubIcon />}
                        href="https://github.com/jamilahmadzai"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          borderRadius: "12px",
                          textTransform: "none",
                          fontWeight: 700,
                          borderColor: isDark
                            ? alpha("#ffffff", 0.12)
                            : alpha("#000000", 0.12),
                          color: isDark ? "#f1f5f9" : "#0f172a",
                          "&:hover": {
                            borderColor: accentColor,
                            color: accentColor,
                            bgcolor: alpha(accentColor, 0.06),
                          },
                        }}
                      >
                        GitHub
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            {/* ── RIGHT: Contact Form ── */}
            <Grid
              size={{ xs: 12, md: 7 }}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <motion.div
                variants={itemVariants}
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Paper
                  component="form"
                  onSubmit={handleSubmit}
                  elevation={0}
                  sx={{
                    p: { xs: 4, md: 5 },
                    flex: 1,
                    bgcolor: isDark ? alpha("#1e293b", 0.5) : "#ffffff",
                    backdropFilter: "blur(12px)",
                    borderRadius: "28px",
                    border: `1px solid ${isDark ? alpha("#ffffff", 0.06) : alpha("#000000", 0.06)}`,
                  }}
                >
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        color: isDark ? "#f1f5f9" : "#0f172a",
                        mb: 0.5,
                      }}
                    >
                      Send a Message
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      I'll reply within 24–48 hours.
                    </Typography>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        name="name"
                        label="Full Name"
                        variant="outlined"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jon Doe"
                        sx={inputSx(accentColor)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        name="email"
                        label="Email Address"
                        type="email"
                        variant="outlined"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        sx={inputSx(accentColor)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <FormControl fullWidth required sx={inputSx(accentColor)}>
                        <InputLabel>I'm reaching out about…</InputLabel>
                        <Select
                          value={formData.subject}
                          label="I'm reaching out about…"
                          onChange={handleSubjectChange}
                          sx={{ borderRadius: "14px" }}
                        >
                          {subjectOptions.map((opt) => (
                            <MenuItem key={opt} value={opt}>
                              {opt}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        name="message"
                        label="Your Message"
                        multiline
                        rows={5}
                        variant="outlined"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project, opportunity, or idea…"
                        sx={inputSx(accentColor)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 1,
                          flexWrap: "wrap",
                          gap: 2,
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontStyle: "italic" }}
                        >
                          All fields are required
                        </Typography>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={isSubmitting}
                          endIcon={<ArrowForwardIcon />}
                          sx={{
                            px: 4,
                            py: 1.5,
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            textTransform: "none",
                            borderRadius: "14px",
                            background: isDark
                              ? `linear-gradient(135deg, ${accentColor} 0%, #8b5cf6 100%)`
                              : "linear-gradient(135deg, #0f172a 0%, #334155 100%)",
                            boxShadow: isDark
                              ? `0 8px 24px -4px ${alpha(accentColor, 0.4)}`
                              : "0 8px 24px -4px rgba(15, 23, 42, 0.35)",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            "& .MuiButton-endIcon": {
                              transition: "transform 0.3s",
                            },
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: isDark
                                ? `0 14px 32px -6px ${alpha(accentColor, 0.5)}`
                                : "0 14px 32px -6px rgba(15, 23, 42, 0.45)",
                              "& .MuiButton-endIcon": {
                                transform: "translateX(4px)",
                              },
                            },
                          }}
                        >
                          {isSubmitting ? "Sending…" : t("contact.sendButton")}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      {/* Success Toast */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="success"
          variant="filled"
          sx={{
            borderRadius: "14px",
            fontWeight: 700,
            boxShadow: "0 10px 30px rgba(34,197,94,0.25)",
          }}
        >
          Message sent! I'll get back to you within 24–48 hours. 🚀
        </Alert>
      </Snackbar>

      {/* Error Toast */}
      <Snackbar
        open={snackError}
        autoHideDuration={6000}
        onClose={() => setSnackError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackError(false)}
          severity="error"
          variant="filled"
          sx={{ borderRadius: "14px", fontWeight: 700 }}
        >
          Something went wrong. Please try emailing me directly.
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Shared input styling helper
const inputSx = (accentColor: string) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    transition: "all 0.25s ease",
    "& fieldset": {
      borderColor: "rgba(148, 163, 184, 0.25)",
      transition: "border-color 0.25s ease",
    },
    "&:hover fieldset": {
      borderColor: "rgba(148, 163, 184, 0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: accentColor,
      borderWidth: "2px",
      boxShadow: `0 0 0 3px ${accentColor}1a`,
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: accentColor,
  },
});
