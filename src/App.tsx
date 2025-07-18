// src/App.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import RepoList from './components/RepoList';

const App: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2 }}>
        Most Starred Repos
      </Typography>
      <RepoList />
    </Container>
  );
};

export default App;
