import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Spinner() {
  return (
    <Box sx={{ width: '100%' }}>
      <CircularProgress />
    </Box>
  );
}