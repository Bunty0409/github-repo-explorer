import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { formatDistanceToNow } from "date-fns";

interface RepoCardProps {
  repo: any;
  onExpand: () => void;
  isExpanded: boolean;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, onExpand, isExpanded }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        {/* Column 1: Avatar */}
        <Avatar
          src={repo.owner.avatar_url}
          alt={repo.owner.login}
          sx={{ width: 48, height: 48, mr: 2 }}
        />

        {/* Column 2: Info (grows to fill space) */}
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="h6" noWrap>
            {repo.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {repo.description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              mt: 1,
            }}
          >
            <Typography variant="caption">
              ⭐ {repo.stargazers_count}
            </Typography>
            <Typography variant="caption">
              🐞 {repo.open_issues_count}
            </Typography>
            <Typography variant="caption" noWrap>
              Last pushed {formatDistanceToNow(new Date(repo.pushed_at))} ago by{" "}
              {repo.owner.login}
            </Typography>
          </Box>
        </Box>

        {/* Column 3: Chevron aligned to end */}
        <IconButton onClick={onExpand} sx={{ ml: 2 }}>
          <ChevronRightIcon
            sx={{
              transform: isExpanded ? "rotate(90deg)" : "none",
              transition: "transform 0.3s ease",
            }}
          />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default RepoCard;
