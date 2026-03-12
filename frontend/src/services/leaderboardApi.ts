import { api, type PaginatedResponse } from './api'

export interface LeaderboardEntry {
  id: string
  name: string
  score: number
  created_at: string
}

export const leaderboardApi = {
  async getTopScores(): Promise<LeaderboardEntry[]> {
    const response = await api.get<PaginatedResponse<LeaderboardEntry>>('/api/leaderboard/scores/')
    return response.data.results
  },

  async submitScore(name: string, score: number): Promise<LeaderboardEntry> {
    const response = await api.post<LeaderboardEntry>('/api/leaderboard/scores/', { name, score })
    return response.data
  },
}
