// src/api/apiEndpoints.ts

const BASE_URL = 'https://api.github.com';

const apiEndpoints = {
  analytics: (owner: string, repo: string) => ({
    commitActivity: `${BASE_URL}/repos/${owner}/${repo}/stats/commit_activity`,
    codeFrequency: `${BASE_URL}/repos/${owner}/${repo}/stats/code_frequency`,
    contributors: `${BASE_URL}/repos/${owner}/${repo}/stats/contributors`,
  }),

  searchRepos: (date: string, page: number) =>
    `${BASE_URL}/search/repositories?q=created:>${date}&sort=stars&order=desc&page=${page}`,
};

export default apiEndpoints;
