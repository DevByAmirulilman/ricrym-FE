import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";

const ComingSoon = () => {
    const WinkyFace = () => {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="15" y1="9" x2="15" y2="9" />
            <path d="M9 9l1.5 1L12 9" />
          </svg>
        );
      };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: "background.default",
        color: "text.primary",
        p: 3,
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
        Coming Soon
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        We’re working hard to bring you something amazing. Stay tuned!
        (If they hire me )
       
      </Typography>
      <WinkyFace/>
    </Box>
  );
};

export default ComingSoon;
