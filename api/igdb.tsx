import { mapGame } from "@/hook/useBacklogWithGames";
import { AgeRating, Game, InvolvedCompany, Platform } from "@/mockdata";

export async function fetchGameById(gameId: number, token: any) {
  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": process.env.EXPO_PUBLIC_CLIENTID!,
      Authorization: `Bearer ${token.access_token}`,
      "Content-Type": "text/plain",
    },
    body: `
      fields cover.url, name, slug, platforms.name, platforms.slug, release_dates.date, release_dates.platform.name,
    release_dates.status.name, involved_companies.company.name, involved_companies.publisher, involved_companies.supporting,
    involved_companies.developer, genres.name, category, screenshots.url, game_status.status, game_type.type, summary,
    total_rating, game_modes.name, first_release_date, franchises.name, age_ratings.organization.name,
    age_ratings.rating_category.rating, age_ratings.rating_cover_url, parent_game.name;
      where id = ${gameId};
      limit 1;
    `,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch game from IGDB");
  }

  const data = await response.json();
  return data[0];
}

export const fetchGames = async ({ pageParam = 0, queryKey }): Promise<{ results: Game[]; nextCursor: number | null }> => {
  const [_key, { search = "", filters = {}, sort = {}, token }] = queryKey;

  if (!token) throw new Error("No token provided to fetchGames");
  if (!search) return { results: [], nextCursor: null };

  // Build the WHERE clause
  let whereClause = "";
  if (filters) {
    const clauses = [];
    if (filters.genreIds?.length)
      clauses.push(`genres = (${filters.genreIds.join(",")})`);
    if (filters.platformIds?.length)
      clauses.push(`platforms = (${filters.platformIds.join(",")})`);
    if (filters.releaseDateFrom)
      clauses.push(`first_release_date >= ${filters.releaseDateFrom}`);
    if (filters.releaseDateTo)
      clauses.push(`first_release_date <= ${filters.releaseDateTo}`);
    if (filters.gameTypeIds?.length)
      clauses.push(`game_type = (${filters.gameTypeIds.join(",")})`);
    if (filters.gameId?.length)
      clauses.push(`id = (${filters.gameId.join(",")})`);

    if (clauses.length) whereClause = `where ${clauses.join(" & ")};`;
  }

  // Build the SORT clause
  let sortClause = "";
  if (sort?.field) {
    const order = sort.order?.toLowerCase() === "asc" ? "asc" : "desc";
    sortClause = `sort ${sort.field} ${order};`;
  }

  // Build the SEARCH clause
  let searchClause = "";
  if (search) {
    // Only add a semicolon if there is no sort or where clause after
    const semicolon = !whereClause && !sortClause ? ";" : "";
    searchClause = `search "${search}"${semicolon}`;
  }

  // Combine body
  const body = `
    fields cover.url, name, slug, platforms.name, platforms.slug, release_dates.date, release_dates.platform.name,
    release_dates.status.name, involved_companies.company.name, involved_companies.publisher, involved_companies.supporting,
    involved_companies.developer, genres.name, category, screenshots.url, game_status.status, game_type.type, summary,
    total_rating, game_modes.name, first_release_date, franchises.name, age_ratings.organization.name,
    age_ratings.rating_category.rating, age_ratings.rating_cover_url, parent_game.name;
    limit 10;
    offset ${pageParam};
    ${searchClause}
    ${whereClause}
    ${sortClause}
    `;

  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": `${process.env.EXPO_PUBLIC_CLIENTID}`,
      Authorization: `Bearer ${token.access_token}`,
      "Content-Type": "text/plain",
    },
    body,
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("IGDB fetch failed:", response.status, text);
    throw new Error("Failed to fetch games");
  }

  const data = await response.json();

  // Map response to a more readable format
  // return data.map((game: any) => mapGame(game));
  return {
    results: data.map((game: any) => mapGame(game)),
    nextCursor: data.length === 10 ? pageParam + 10 : null,
  }
};
