export interface Course {
  id?: number;
  name?: string;
  createTime?: string;
}

export interface User {
  id?: number;
  level?: number;
  name?: string;
  userName?: string;
  password?: string;
  address?: string;
  insertTime?: string;
  role?: number;
  sex?: string;
  title?: Title;
  courses?: Course[];
}

export interface Title {
  id?: number;
  name?: string;
}

export interface GithubUser {
  name?: string;
  company?: string;
  public_repos?: number;
  followers?: number;
  repos_url?: string;
  login?: string;
  avatar_url?: string;
  url?: string;
}

export interface GithubRepos {
  name?: string;
  html_url?: string;
  updated_at?: string;
  language?: string;
  size?: number;
  forks?: number;
  stargazers_count?: number;
}
