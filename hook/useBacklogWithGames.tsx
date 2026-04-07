import { AgeRating, Game, InvolvedCompany, Platform } from "@/mockdata";

export function mapGame(game: any): Game {
  try {
    return {
    id: game.id || "",
    name: game.name || "Unknown Title",
    slug: game.slug || "",
    coverUrl:
      game.cover?.url?.replace("t_thumb", "t_cover_big") ||
      "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500",
    platforms: game.platforms?.map((p: Platform) => p.name) || [],
    genres: game.genres?.map((g: any) => g.name) || [],
    summary: game.summary || "No description",
    totalRating: game.total_rating || null,
    firstReleaseDate: game.first_release_date
      ? new Date(game.first_release_date * 1000).toLocaleDateString()
      : null,
    releaseDates: game.release_dates?.map((r: any) => r.date) || [],
    involvedCompanies: game.involved_companies?.map(
      (c: InvolvedCompany) => c.company.name,
    ) || [],
    gameType: game.game_type?.type || "Unknown",
    screenshots: game.screenshots?.map((s: any) => s.url) || [],
    gameStatus: game.game_status?.status || "Unknown",
    gameModes: game.game_modes?.map((m: any) => m.name) || [],
    franchises: game.franchises?.map((f: any) => f.name) || [],
    ageRatings:
      game.age_ratings?.map((r: AgeRating) => {
        return `${r.organization.name} ${r.rating_category.rating}`;
      }) || [],
    parentGame: game.parent_game || "None",
  };  
  } catch (error) {
    console.error("Error mapping game data:", error, game);
    throw new Error(`Failed to map game data for game: ${game.name || game.id}`);
  }
}
