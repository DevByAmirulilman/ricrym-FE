import React, { useEffect, useState } from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  TablePagination,
} from "@mui/material";
import axios from "axios";

export const LeaderBoard = ({ overAllLeaderboard, characterId, selectedPlayerId, selectPlayer }) => {
  const [players, setPlayers] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);

  // Pagination states
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of items per page

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/all-accounts")
      .then((response) => {
        const allPlayers = response.data;

        // Flatten characters to include score and class association with player data
        const playersWithScores = [];
        allPlayers.forEach((player) => {
          player.characters.forEach((char) => {
            if (char.character._id === characterId) {
              playersWithScores.push({
                playerId: player._id,
                username: player.username,
                avatar: player.avatar?.url,
                score: char.score.reward_score,
              });
            }
          });
        });

        const overallScoreboard = [];
        allPlayers.forEach((player) => {
          const totalScore = player.characters.reduce(
            (sum, char) => sum + char.score.reward_score,
            0
          );
          overallScoreboard.push({
            playerId: player._id,
            username: player.username,
            avatar: player.avatar?.url,
            email: player.email,
            totalScore,
          });
        });

        // Sort players by score in descending order
        playersWithScores.sort((a, b) => b.score - a.score);
        overallScoreboard.sort((a, b) => b.totalScore - a.totalScore);
        setAllPlayers(overallScoreboard);
        setPlayers(playersWithScores);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [characterId]);

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  // Paginated data
  const displayedPlayers = overAllLeaderboard
    ? allPlayers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : players.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="leaderboard">
      <List>
        {displayedPlayers.map((player, index) => {
          const style =
            selectedPlayerId === player.playerId ? { backgroundColor: "#eee" } : {};

          return (
            <ListItem
              key={player.playerId}
              onClick={() => selectPlayer(player.playerId)}
              style={style}
              button // Makes the item clickable
            >
              <ListItemAvatar>
                <Avatar src={player.avatar || "/default-avatar.png"} alt={player.username} />
              </ListItemAvatar>
              <ListItemText
                primary={`${player.username}`}
                secondary={`Score: ${
                  overAllLeaderboard ? player.totalScore : player.score
                }`}
              />
                <ListSubheader>{index + 1 + page * rowsPerPage}</ListSubheader>
            </ListItem>
          );
        })}
      </List>

      {/* Pagination Component */}
      <TablePagination
        component="div"
        count={overAllLeaderboard ? allPlayers.length : players.length} // Total number of items
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]} // Rows per page options
      />
    </div>
  );
};
