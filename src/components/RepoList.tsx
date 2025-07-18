import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RepoCard from "./RepoCard";
import RepoAnalytics from "./RepoAnalytics";
import { fetchReposRequest, setTimeRange } from "../features/repos/reposSlice";
import type { RootState } from "../app/store";
import TimeRangeSelector from "./TimeRangeSelector";
import { Box, CircularProgress } from "@mui/material";

const RepoList: React.FC = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state: RootState) => state.repos);
  const [expandedRepo, setExpandedRepo] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchReposRequest());
  }, [dispatch]);

  // For handling time range changes
  const handleTimeChange = (range: "1week" | "2weeks" | "1month") => {
    dispatch(setTimeRange(range));
    dispatch(fetchReposRequest());
  };

  // For loading more repos
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 300 >=
      document.documentElement.offsetHeight
    ) {
      if (!loading) dispatch(fetchReposRequest());
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);
  return (
    <Box sx={{ p: 2 }}>
      <TimeRangeSelector onChange={handleTimeChange} />
      {list.map((repo) => (
        <Box key={repo.id}>
          <RepoCard
            repo={repo}
            onExpand={() =>
              setExpandedRepo((prev) => (prev === repo.id ? null : repo.id))
            }
            isExpanded={expandedRepo === repo.id}
          />
          {expandedRepo === repo.id && (
            <RepoAnalytics owner={repo.owner.login} repoName={repo.name} />
          )}
        </Box>
      ))}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RepoList;
