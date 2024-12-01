import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { LeaderBoard } from "./LeaderBoard";
import { Avatar, Card, CardHeader } from "@mui/material";
import axios from "axios";
import avatarWarrior from "../images/warrior.png";
import avatarMage from '../images/mage.jpg'
import avatarArcher from '../images/archer.jpg'
import avatarHealer from '../images/healer.jpg'

export default function MainGrid() {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [players,setPlayers] = useState()

  

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
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* Title */}
      <Box sx={{ mb: 2, border:'2px solid black', p:2}}>
      <Typography component="h2" variant="h6" >
        Leaderboard
      </Typography>
      <Typography  variant="body2" >
        Overall Leaderboard
      </Typography>
      </Box>


      {/* Character Cards */}
      <Grid container spacing={2}>
          <Grid item xs={12} sm={12} lg={12}>
            <Card sx={{ border:'2px solid black'}}>
              <LeaderBoard
                overAllLeaderboard={true}
                selectedPlayerId={selectedPlayerId}
                selectPlayer={selectPlayer}
              />
            </Card>
          </Grid>
      </Grid>

      
      <Box sx={{ mt:2 ,mb: 2, border:'2px solid black', p:2}}>
      <Typography component="h2" variant="h6" >
        Heroes Leaderboard
      </Typography>
      <Typography  variant="body2" >
        Leaderboard based on heroes
      </Typography>
      </Box>
      <Grid container spacing={2}>
        {characters.map((character, index) => (
          <Grid item key={character.class_id} xs={12} sm={6} lg={6}>
            <Card sx={{ border:'2px solid black'}}>
              <CardHeader
                title={character.class_name}
                avatar={<Avatar src={avatarMapping[character.class_id]} alt={character.class_name} />}
                titleTypographyProps={{
                    variant: 'h5', // Set the typography variant to make the text bigger
                    sx: { fontWeight: 'bold' }, // Optional: Add bold styling
                  }}
                  sx={{borderBottom:'2px solid black'}}
              />
              <LeaderBoard
                characterId={character._id}
                selectedPlayerId={selectedPlayerId}
                selectPlayer={selectPlayer}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
