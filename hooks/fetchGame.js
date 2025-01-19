import { useState, useEffect } from "react";
import { fetchData } from "../config/apiUtils"; // Adjust the path as needed

const API_URL = "https://api.igdb.com/v4";

const useGame = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDeveloper = async (developerId, token) => {
    const body = `fields id,company; where id=${developerId};limit 10;`;
    return fetchData(API_URL, "involved_companies", body, token);
  };

  const getCompany = async (companyId, token) => {
    const body = `fields id,name; where id=${companyId};limit 10;`;
    return fetchData(API_URL, "companies", body, token);
  };

  const getPlatform = async (platformId, token) => {
    const body = `fields id,name; where id=${platformId};limit 10;`;
    return fetchData(API_URL, "platforms", body, token);
  };

  const convertDate = (date) => {
    return new Date(date * 1000).toLocaleDateString("pt-PT");
  };

  const getCategory = (id) => {
    const categories = {
      0: "Game",
      1: "DLC",
      3: "Bundle",
      6: "Episode",
      8: "Remake",
    };

    // Return the category if it exists, otherwise default to "N/A"
    return categories[id] || "N/A";
  };

  const fetchGameData = async (token, body) => {
    setIsLoading(true);
    const gamesData = await fetchData(API_URL, "games", body, token);

    if (gamesData) {
      const gamesWithDevAndPlatform = await Promise.all(
        gamesData.map(async (game) => {
          const developerId =
            game.involved_companies?.map(
              (involvedCompany) => involvedCompany.id
            ) || "N/A";
          const companyId =
            game.involved_companies?.map(
              (involvedCompany) => involvedCompany.company
            ) || "N/A";
          const platformIds = game.platforms;

          await Promise.all(developerId.map((id) => getDeveloper(id, token)));

          const companyData = await Promise.all(
            companyId.map((id) => getCompany(id, token))
          );

          const platformData = await Promise.all(
            platformIds.map((id) => getPlatform(id, token))
          );

          const releaseDate =
            game.release_dates?.map((date) => convertDate(date.date)) || "N/A";

          const genres =
            game.genres && game.genres.length > 0
              ? game.genres.map((genre) => genre.name).join(", ")
              : "N/A";

          return {
            id: game.id,
            name: game.name,
            developer: companyData.map((data) => data[0]),
            platforms: platformData.map((data) => data[0]),
            genres: genres,
            release_date: releaseDate,
            category: getCategory(game.category),
            summary: game.summary || "No Summary Available",
            rating: game.rating,
            images: {
              cover: game.cover?.url
                ? `https:${game.cover.url.replace("t_thumb", "t_cover_big")}`
                : "", // Safe URL formatting
              screenshots: game.screenshots,
            },
          };
        })
      );

      setIsLoading(false);
      return gamesWithDevAndPlatform;
    }
  };

  return { games, isLoading, error, fetchGameData };
};

export default useGame;
