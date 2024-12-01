import logo from './logo.svg';
import './App.css';
import { Box, Typography } from '@mui/material';
import AppNavbar from './Components/NavBar';
import Dashboard from './Components/Dashboard';
import SignIn from './Components/SignIn';

function App() {
  return (
    <div>
      {/* <Dashboard/> */}
      <SignIn/>
    </div>
  );
}

export default App;
