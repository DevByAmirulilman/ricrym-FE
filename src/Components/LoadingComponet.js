import { Box } from '@mui/material'
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';


const LoadingComponet = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  )
}

export default LoadingComponet
