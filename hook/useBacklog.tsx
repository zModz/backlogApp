import { fetchGameById } from "@/api/igdb";
import { UserBacklogEntry } from "@/mockdata"; // TS types we made earlier
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { mapGame } from "./useBacklogWithGames";

const BACKLOG_KEY = "@backlog";

export function useBacklog() {
  const [backlog, setBacklog] = useState<UserBacklogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Load backlog from storage
  const loadBacklog = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(BACKLOG_KEY);
      setBacklog(stored ? JSON.parse(stored) : []);
    } catch (error) {
      console.error("Error loading backlog:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save backlog to storage
  const saveBacklog = useCallback(async (newBacklog: UserBacklogEntry[]) => {
    try {
      await AsyncStorage.setItem(BACKLOG_KEY, JSON.stringify(newBacklog));
      setBacklog(newBacklog);
    } catch (error) {
      console.error("Error saving backlog:", error);
    }
  }, []);

  // Add a new game (auto-build entry if only gameId is passed)
  const addToBacklog = useCallback(
    async (gameId: number, token: string) => {
      try {
        // Fetch and map first
        const rawGame = await fetchGameById(gameId, token);
        const mapppedGame = mapGame(rawGame);

        // Only create entry if fetch is successful
        const entry: UserBacklogEntry = {
          gameId: gameId,
          game: mapppedGame,
          status: "Backlog",
          addedAt: new Date().toISOString(),
        };

        const exists = backlog.find((b) => b.gameId === entry.gameId);
        if (!exists) {
          await saveBacklog([...backlog, entry]);
          return { success: true, game: mapppedGame.name };
        }

        return { success: false, error: "Game already in backlog" };
      } catch (error) {
        console.error("[AddToBacklog] Error adding to Backlog: ", error);
        return { success: false, error: error.message };
      }
    },
    [backlog, saveBacklog],
  );

  // Update a game entry
  const updateBacklogEntry = useCallback(
    async (gameId: number, updates: Partial<UserBacklogEntry>) => {
      const updated = backlog.map((entry) =>
        entry.gameId === gameId ? { ...entry, ...updates } : entry,
      );
      await saveBacklog(updated);
    },
    [backlog, saveBacklog],
  );

  // Remove a game
  const removeFromBacklog = useCallback(
    async (gameId: number) => {
      setBacklog((prev) => {
        const updated = prev.filter((entry) => entry.gameId !== gameId);
        // persist after updating state
        saveBacklog(updated);
        return updated;
      });
    },
    [saveBacklog],
  );

  // Check if a game is in backlog
  const isInBacklog = useCallback(
    (gameId: number): boolean => {
      return backlog.some((entry) => entry.gameId === gameId);
    },
    [backlog],
  );

  //  Check if a game is completed
  const isCompleted = useCallback(
    (gameId: number): boolean => {
      return backlog.some(
        (entry) => entry.gameId === gameId && entry.status === "Completed",
      );
    },
    [backlog],
  );

  //  Check if a game is completed
  const isDropped = useCallback(
    (gameId: number): boolean => {
      return backlog.some(
        (entry) => entry.gameId === gameId && entry.status === "Dropped",
      );
    },
    [backlog],
  );

  // Load data on mount
  useEffect(() => {
    loadBacklog();
  }, [loadBacklog]);

  return {
    backlog,
    loading,
    addToBacklog,
    updateBacklogEntry,
    removeFromBacklog,
    isInBacklog,
    isCompleted,
    isDropped,
    reload: loadBacklog,
  };
}
