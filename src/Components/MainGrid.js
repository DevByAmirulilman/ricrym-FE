import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { LeaderBoard } from "./LeaderBoard";
import {
  Avatar,
  Card,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import axios from "axios";
import avatarWarrior from "../images/warrior.png";
import avatarMage from "../images/mage.jpg";
import avatarArcher from "../images/archer.jpg";
import avatarHealer from "../images/healer.jpg";
import LoadingComponet from "./LoadingComponet";

export default function MainGrid() {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const sessionId = localStorage.getItem("session_id");

  const handleCharacterChange = (event) => {
    const selectedId = event.target.value; // Get the value of the selected radio
    setSelectedCharacter(selectedId); // Update the state with the selected class_id
    console.log("Selected Character ID:", selectedId);
  };

  const selectPlayer = (playerId) => {
    setSelectedPlayerId(playerId);
    console.log("Selected Player ID:", playerId);
  };

  useEffect(() => {
    setIsLoading(true); // Start loading when the request is made
    axios
      .get("https://ricrym-be.onrender.com/api/all-characters")
      .then((response) => {
        setCharacters(response.data);  // Set characters when data is received
        setIsLoading(false);  // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Stop loading even if the request fails
      });
  }, []);  // Empty array ensures this effect runs only once on component mount

  const avatarMapping = {
    1: avatarWarrior,
    2: avatarMage,
    3: avatarArcher,
    4: avatarHealer,
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1700px",
        margin: "0 auto", // Center the container horizontally
        padding: 2, // Add some padding for spacing
      }}
    >
      {/* Title */}
      <Box sx={{ mb: 4, p: 2, textAlign: "center", border: "2px solid black" }}>
        <Typography component="h2" variant="h6">
          Leaderboard
        </Typography>
        <Typography variant="body2">Overall Leaderboard</Typography>
      </Box>

      {/* Overall Leaderboard */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={10} lg={8}>
          <Card sx={{ border: "2px solid black", p: 2 }}>
            {isLoading ? (
              <LoadingComponet />
            ) : (
              <LeaderBoard
                overAllLeaderboard={true}
                selectedPlayerId={selectedPlayerId}
                selectPlayer={selectPlayer}
              />
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
