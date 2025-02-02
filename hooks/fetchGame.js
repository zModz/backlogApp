import { useState, useEffect } from "react";
import { fetchData } from "../config/apiUtils"; // Adjust the path as needed

const API_URL = "https://api.igdb.com/v4";

const useGame = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const convertDate = (date) => {
    return new Date(date * 1000).toLocaleDateString("pt-PT");
  };

  const getCategory = (id) => {
    const categories = {
      0: "Game",
      1: "DLC",
      6: "Episode",
      8: "Remake",
    };

    // Return the category if it exists, otherwise default to "N/A"
    return categories[id] || "N/A";
  };

  const fetchGameData = async (token, body) => {
    setIsLoading(true);
    const gamesData = await fetchData(API_URL, "games", body, token);

    if (gamesData && gamesData.length > 0) {
      const gamesWithDevAndPlatform = await Promise.all(
        gamesData.map(async (game) => {
          const releaseDate =
            game.release_dates
              ?.map((date) => new Date(date.date))
              .sort((a, b) => a - b)
              .map((date) => convertDate(date)) || "N/A";

          const genres =
            game.genres && game.genres.length > 0
              ? game.genres.map((genre) => genre.name).join(", ")
              : "N/A";

          return {
            id: game.id,
            name: game.name,
            genres: genres,
            release_date: releaseDate,
            category: getCategory(game.category),
            summary: game.summary || "No Summary Available",
            rating: game.rating,
            images: {
              cover: game.cover?.url
                ? `https:${game.cover.url.replace("t_thumb", "t_cover_big")}`
                : undefined, // Safe URL formatting
              screenshots: game.screenshots,
            },
          };
        })
      );

      setIsLoading(false);
      return gamesWithDevAndPlatform;
    } else {
      setIsLoading(false);
      return [
        {
          id: null,
          name: "No results found",
          genres: "N/A",
          release_date: undefined,
          category: "N/A",
          summary: "No games available.",
          rating: "N/A",
          images: undefined,
        },
      ];
    }
  };

  return { games, isLoading, error, fetchGameData };
};

export default useGame;
