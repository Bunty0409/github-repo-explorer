import { Box, Container, Typography } from "@mui/material";
import RepoList from "./RepoList";
import ThemeToggleButton from "./ThemeToggleButton";

function Header() {
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt={4}
        mb={2}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: {
              xs: "1.2rem",
              sm: "1.25rem",
              md: "1.5rem",
              lg: "2rem",
            },
          }}
        >
          Most Starred Repos
        </Typography>
        <ThemeToggleButton />
      </Box>
      <RepoList />
    </Container>
  );
}

export default Header;
