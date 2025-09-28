import { useQueries } from "@tanstack/react-query";
import { fetchGameById } from "../api/igdb";
import { useBacklog } from "./useBacklog";

function mapGame(game: any) {
  return {
    id: game.id,
    name: game.name,
    coverUrl:
      game.cover?.url?.replace("t_thumb", "t_cover_big") ||
      "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500",
    platforms: game.platforms?.map((p: any) => p.name) || [],
    genres: game.genres?.map((g: any) => g.name) || [],
    summary: game.summary || "No description",
    totalRating: game.total_rating || null,
    firstReleaseDate: game.first_release_date
      ? new Date(game.first_release_date * 1000).toDateString()
      : null,
  };
}

export function useBacklogWithGames(token: string) {
  const { backlog, ...backlogActions } = useBacklog();

  const gameQueries = useQueries({
    queries: backlog.map((entry) => ({
      queryKey: ["game", entry.gameId],
      queryFn: async () => {
        const rawGame = await fetchGameById(entry.gameId, token);
        return mapGame(rawGame);
      },
      enabled: !!token && !backlogActions.loading,
    })),
  });

  // Merge backlog entries with game details
  const backlogWithGames = backlog.map((entry, index) => {
    const query = gameQueries[index];
    return {
      ...entry,
      game: query?.data ?? null,
      isLoading: query?.isLoading ?? true,
      isError: query?.isError ?? false,
    };
  });

  return {
    backlog: backlogWithGames,
    backlogActions,
    isLoading: backlogActions.loading || gameQueries.some((q) => q.isLoading),
    isError: gameQueries.some((q) => q.isError),
  };
}
