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

export default function MainGrid() {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter,setSelectedCharacter] = useState()

  const sessionId = localStorage.getItem("session_id");
  console.log(sessionId);

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
    axios
      .get("http://localhost:5000/api/all-characters")
      .then((response) => {
        setCharacters(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
            <LeaderBoard
              overAllLeaderboard={true}
              selectedPlayerId={selectedPlayerId}
              selectPlayer={selectPlayer}
            />
          </Card>
        </Grid>
      </Grid>

      {/* Hero Leaderboard Title */}
      {/* <Box
        sx={{
          mt: 4,
          mb: 4,
          p: 2,
          textAlign: "center",
          border: "2px solid black",
        }}
      >
        <Typography component="h2" variant="h6">
          Heroes Leaderboard
        </Typography>
        <Typography variant="body2">Leaderboard based on heroes</Typography>
      </Box>

      Characters Filter
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} lg={8}>
          <FormControl fullWidth>
            <FormLabel id="demo-radio-buttons-group-label">Heroes</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: 2,
              }}
              onChange={handleCharacterChange}
            >
              {characters.map((character, index) => (
                <FormControlLabel
                  key={index}
                  value={character.class_id}
                  control={<Radio />}
                  label={character.class_name}
                  onClick={console.log(character.class_id)}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid> */}

      {/* Hero Leaderboard */}
      {/* <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        <Grid item xs={12} sm={10} lg={8}>
          <Card sx={{ border: "2px solid black", p: 2 }}>
            <LeaderBoard
              overAllLeaderboard={false}
              selectedPlayerId={selectedPlayerId}
              selectPlayer={selectPlayer}
            />
          </Card>
        </Grid>
      </Grid> */}
    </Box>
  );
}
