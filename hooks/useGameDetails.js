import { useState, useEffect } from "react";
import { fetchData } from "../config/apiUtils"; // Adjust the path as needed

const API_URL = "https://api.igdb.com/v4";

const useGameDetails = (selectedGame, token) => {
  const [gameDetails, setGameDetails] = useState(selectedGame || null);
  const [isLoading, setIsLoading] = useState(!selectedGame);
  const [error, setError] = useState(null);

  // Cache for companies to avoid redundant API calls
  const cache = {
    companies: new Map(),
  };

  useEffect(() => {
    if (!selectedGame || selectedGame.developer) return; // Skip if game details are already available
    fetchGameDetails();
  }, [selectedGame, token]);

  // Fetch company details
  const getCompany = async (companyId) => {
    if (cache.companies.has(companyId)) return cache.companies.get(companyId); // Use cached data if available
    const body = `fields id,name; where id=${companyId};limit 10;`;
    const company = await fetchData(API_URL, "companies", body, token);
    cache.companies.set(companyId, company); // Cache the company data
    return company;
  };

  // Fetch game details
  const fetchGameDetails = async () => {
    if (!selectedGame?.id) return;

    setIsLoading(true);
    try {
      // Fetch game data including involved companies and platforms
      const body = `fields involved_companies.*, platforms.*; where id=${selectedGame.id};`;
      const data = await fetchData(API_URL, "games", body, token);

      if (!data || data.length === 0) {
        setGameDetails(selectedGame); // Use existing data if nothing is found
        setIsLoading(false);
        return;
      }

      const game = data[0];

      // Get company IDs from involved_companies
      const companyIds =
        game.involved_companies
          ?.filter((involvedCompany) => involvedCompany.id)
          .sort((a, b) => {
            // Prioritize developer > support > publisher
            const getPriority = (company) => {
              if (company.developer) return 1;
              if (company.support) return 2;
              if (company.publisher) return 3;
              return 4;
            };
            return getPriority(a) - getPriority(b);
          })
          .map((involvedCompany) => involvedCompany.company) || [];

      // Fetch all companies in parallel (no need to fetch platforms since it's already in the game data)
      const companies = await Promise.all(
        companyIds.map((id) => getCompany(id))
      );

      // Set the game details with fetched company data and existing platform data
      setGameDetails((prev) => ({
        ...prev,
        developer: companies.map((companyData) => companyData[0]), // Assuming the API returns an array
        platforms:
          game.platforms?.map((platform) => ({
            id: platform.id,
            name: platform.name,
          })) || [],
      }));
    } catch (err) {
      setError("Error fetching game details");
    } finally {
      setIsLoading(false);
    }
  };

  return { gameDetails, isLoading, error };
};

export default useGameDetails;
