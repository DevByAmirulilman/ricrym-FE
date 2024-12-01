import * as React from "react";
import Stack from "@mui/material/Stack";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import MenuButton from "./MenuButton";
import { Typography, Box } from "@mui/material";

export default function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        maxWidth: "1700px",
        padding: "16px",
        backgroundColor: "background.default",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      {/* Left side */}
      <Typography
        variant="h5"
        sx={{
          fontFamily: "'Roboto Slab', serif", // Custom font family
          fontWeight: "bold",
          fontStyle: "italic", // Add italic style
          color: "text.primary",
        }}
      >
        Wira
      </Typography>

      {/* Right side */}
      <Stack direction="row" spacing={2} alignItems="center">
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon
            sx={{
              color: "text.secondary",
              fontSize: "1.8rem",
            }}
          />
        </MenuButton>
      </Stack>
    </Box>
  );
}
