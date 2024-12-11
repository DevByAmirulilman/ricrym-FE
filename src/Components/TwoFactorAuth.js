import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, FormControl, FormLabel, TextField, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import QRCode from "qrcode";
import axios from "axios";
import Dashboard from "./Dashboard";

const TwoFactorContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
  },
}));

const TwoFactorAuth = ({accountId}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [isSuccess,setIsSuccess] = useState(false)

  useEffect(() => {
    axios.get(`https://ricrym-be.onrender.com/api/generate-qr/${accountId}`)
  .then(function (response) {
    // handle success
    console.log(response);
    console.log(response?.data)
    setQrCodeUrl(response?.data.qrCode)

  })
  .catch(function (error) {
    // handle error
    console.error(error);
  })
  .finally(function () {
    // always executed
  });
  console.log(accountId)
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    axios
      .post('https://ricrym-be.onrender.com/api/2fa', {
        accountId: accountId, // Account ID from your state
        token: data.get("token"), // Token from the input field
      })
      .then(function (response) {
        console.log('2FA Verified:', response.data);
        setIsSuccess(true)
        // Handle successful login/2FA verification
      })
      .catch(function (error) {
        console.error('Error verifying 2FA:', error.response?.data || error.message);
        // Handle error
      });
      console.log(qrCodeUrl)
  };

  if(isSuccess){
    return <Dashboard accountId={accountId}/>
  }

  return (
    <TwoFactorContainer alignItems="center" justifyContent="center">
      <Card sx={{ maxWidth: 400, padding: 2, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Two-Factor Authentication
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Scan this QR code with your authentication app.
          </Typography>
          {qrCodeUrl ? (
            <Box>
            <Box component="img" src={qrCodeUrl} alt="QR Code" sx={{ width: "100%", maxWidth: 300 }}/>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: 2,
                }}
              >
              <FormControl sx={{mt:2}}>
              <FormLabel htmlFor="email">Token</FormLabel>
              <TextField
                id="token"
                type="number"
                name="token"
                placeholder="your token"
                required
                fullWidth
                variant="outlined"
              />
              <Button sx={{mt:2}} type="submit" fullWidth variant="contained">
              Sign in
              </Button>
              </FormControl>
              </Box>
              </Box>

          ) : (
            <Typography variant="body2" color="text.secondary">
              Loading QR Code...
            </Typography>
          )}
        </CardContent>
      </Card>
    </TwoFactorContainer>
  );
};

export default TwoFactorAuth;
