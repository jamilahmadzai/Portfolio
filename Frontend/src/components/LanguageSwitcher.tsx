import { Button, Menu, MenuItem, Box, useTheme } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const accentColor = isDark ? "#2dd4bf" : "#2563eb";

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  const languages = [
    { code: "en", label: "English", flag: "🇬🇧", short: "EN" },
    { code: "de", label: "Deutsch", flag: "🇩🇪", short: "DE" },
  ];

  const current =
    languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <Box>
      <Button
        onClick={handleClick}
        size="small"
        endIcon={
          <KeyboardArrowDownIcon
            sx={{
              fontSize: "0.95rem !important",
              transition: "transform 0.2s",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        }
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          px: 1.5,
          py: 0.55,
          borderRadius: "999px",
          fontSize: "0.78rem",
          fontWeight: 600,
          letterSpacing: "0.05em",
          color: isDark ? "rgba(148,163,184,0.85)" : "rgba(71,85,105,0.85)",
          border: `1px solid ${
            isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
          }`,
          background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
          transition: "all 0.2s",
          "&:hover": {
            color: accentColor,
            borderColor: accentColor,
            background: isDark
              ? "rgba(45,212,191,0.07)"
              : "rgba(37,99,235,0.06)",
          },
          minWidth: 0,
          textTransform: "none",
        }}
        aria-label="change language"
      >
        <span style={{ fontSize: "1rem", lineHeight: 1 }}>{current.flag}</span>
        <span>{current.short}</span>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            mt: 1,
            bgcolor: isDark ? "#0f172a" : "#ffffff",
            backgroundImage: "none",
            border: `1px solid ${
              isDark ? "rgba(45,212,191,0.12)" : "rgba(37,99,235,0.12)"
            }`,
            borderRadius: "10px",
            boxShadow: isDark
              ? "0 8px 32px rgba(0,0,0,0.5)"
              : "0 8px 24px rgba(0,0,0,0.12)",
            minWidth: 160,
            overflow: "hidden",
          },
        }}
      >
        {languages.map((lang) => {
          const isSelected = lang.code === current.code;
          return (
            <MenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              selected={isSelected}
              sx={{
                py: 1.25,
                px: 2,
                gap: 1.5,
                fontSize: "0.875rem",
                fontWeight: isSelected ? 600 : 400,
                color: isSelected ? accentColor : "text.primary",
                "&.Mui-selected": {
                  bgcolor: isDark
                    ? "rgba(45,212,191,0.08)"
                    : "rgba(37,99,235,0.07)",
                },
                "&:hover": {
                  bgcolor: isDark
                    ? "rgba(45,212,191,0.1)"
                    : "rgba(37,99,235,0.08)",
                  color: accentColor,
                },
              }}
            >
              <span style={{ fontSize: "1.25rem", lineHeight: 1 }}>
                {lang.flag}
              </span>
              <span>{lang.label}</span>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};
