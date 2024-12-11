import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TablePagination,
  TextField,
} from "@mui/material";
import axios from "axios";
import LoadingComponet from "./LoadingComponet";

export const LeaderBoard = ({ characterId, overAllLeaderboard }) => {
  const [playersByRole, setPlayersByRole] = useState([]);
  const [players, setPlayers] = useState([]); // State for players
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [totalPlayers, setTotalPlayers] = useState(0); // Total players count
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Items per page
  const [sortBy, setSortBy] = useState("totalScore"); // Sort field
  const [order, setOrder] = useState("desc"); // Sort order
  const sessionId = localStorage.getItem("session_id");
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setIsLoading(true); // Start loading when new search or pagination is triggered
        const response = await axios.get("https://ricrym-be.onrender.com/api/all-accounts-scoreboard", {
          params: {
            search: searchQuery,
            page: page + 1, 
            limit: rowsPerPage,
            sortBy,
            order,
          },
          headers: {
            Authorization: sessionId,
          },
        });
        setPlayers(response.data.data); 
        setTotalPlayers(response.data.total); 
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setIsLoading(false);
      }
    };
    fetchPlayers();
  }, [searchQuery, page, rowsPerPage, sortBy, order, sessionId]); 

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to page 0 when rows per page changes
  };

  const renderList = () => (
    <>
      <List>
        {players.map((player) => {
          const style = selectedPlayer === player._id ? { backgroundColor: "#eee" } : {};
          return (
            <ListItem
              key={player._id}
              onClick={() => setSelectedPlayer(player._id)}
              style={style}
              button
            >
              <ListItemAvatar>
                <Avatar src={player.avatar?.url || "/default-avatar.png"} alt={player.username} />
              </ListItemAvatar>
              <ListItemText
                primary={`${player.rank}.${player.username}`}
                secondary={`Score: ${player.totalScore || player.score}`}
              />
            </ListItem>
          );
        })}
      </List>
      {/* Pagination */}
      <TablePagination
        component="div"
        count={totalPlayers}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </>
  );

  return (
    <Box className="leaderboard">
      {/* Search Input */}
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search Players"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      {isLoading ? <LoadingComponet /> : renderList()}
    </Box>
  );
};
