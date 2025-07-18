// src/components/RepoAnalytics.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalyticsRequest } from "../features/analytics/analyticsSlice";
import type { RootState } from "../app/store";
import { Box, FormControl, Select, MenuItem } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { format } from "date-fns";
import { Skeleton } from "@mui/material";

interface Props {
  owner: string;
  repoName: string;
}

type CustomTooltipContext = {
  x?: string | number;
  y?: number;
  series: { name: string };
};

const RepoAnalytics: React.FC<Props> = ({ owner, repoName }) => {
  const dispatch = useDispatch();
  const [view, setView] = useState<"commits" | "additions" | "deletions">(
    "commits"
  );

  const key = `${owner}/${repoName}`;
  const analytics = useSelector(
    (state: RootState) => state.analytics.data[key]
  );
  const loading = useSelector((state: RootState) => state.analytics.loading);

  useEffect(() => {
    dispatch(fetchAnalyticsRequest({ owner, repo: repoName }));
  }, [dispatch, owner, repoName]);

  if (
    loading ||
    !analytics ||
    !Array.isArray(analytics.commitActivity) ||
    !Array.isArray(analytics.codeFrequency) ||
    !Array.isArray(analytics.contributors)
  ) {
    return (
      <Box sx={{ px: 2, py: 3 }}>
        <Skeleton variant="text" width={160} height={30} />
        <Skeleton variant="rectangular" height={300} sx={{ my: 2 }} />
        <Skeleton variant="text" width={180} height={30} />
        <Skeleton variant="rectangular" height={300} sx={{ mt: 2 }} />
      </Box>
    );
  }

  const weekLabels = analytics.commitActivity.map((w: any) =>
    format(new Date(w.week * 1000), "MMM d")
  );

  const totalChanges = analytics.commitActivity.map((w: any) => w.total);
  const codeFrequency = analytics.codeFrequency.map((w: any) => ({
    week: format(new Date(w[0] * 1000), "MMM d"),
    additions: w[1],
    deletions: Math.abs(w[2]),
  }));

  const contributorSeries = analytics.contributors.map((c: any) => ({
    name: c.author?.login || "Unknown",
    data: c.weeks.map((w: any) => {
      if (view === "commits") return w.c;
      if (view === "additions") return w.a;
      return w.d;
    }),
  }));

  const baseChartOptions = {
    chart: { type: "line", height: "300px" },
    xAxis: { categories: weekLabels, title: { text: "Week" } },
    yAxis: { title: { text: "Count" } },
    responsive: {
      rules: [
        {
          condition: { maxWidth: 600 },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };

  const chartOptionsTotal = {
    ...baseChartOptions,
    title: { text: "Total Changes" },
    series: [
      {
        type: "line",
        name:
          view === "commits"
            ? "Total Commits"
            : view === "additions"
            ? "Total Additions"
            : "Total Deletions",
        data:
          view === "commits"
            ? totalChanges
            : codeFrequency.map((w: any) => w[view]),
      },
    ],
    tooltip: {
      formatter: function (this: CustomTooltipContext): string {
        return `Week: ${this.x}<br/>Changes: ${this.y}`;
      },
    },
  };

  const chartOptionsContributors = {
    ...baseChartOptions,
    title: { text: "Contributor Changes" },
    series: contributorSeries,
    tooltip: {
      formatter: function (this: CustomTooltipContext): string {
        return `Week: ${this.x}<br/>Changes: ${this.y}<br/>Contributor: ${this.series.name}`;
      },
    },
  };

  return (
    <Box sx={{ px: 2, py: 1 }}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <FormControl size="small">
          <Select value={view} onChange={(e) => setView(e.target.value as any)}>
            <MenuItem value="commits">Commits</MenuItem>
            <MenuItem value="additions">Additions</MenuItem>
            <MenuItem value="deletions">Deletions</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <HighchartsReact highcharts={Highcharts} options={chartOptionsTotal} />
      <Box my={4} />
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptionsContributors}
      />
    </Box>
  );
};

export default RepoAnalytics;
