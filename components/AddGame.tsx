import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import GameList from "./GameList";

export function useDebounce(value: string, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const AddGame = ({ auth, ref }) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 600); // wait 600ms after typing

  return (
    <View>
      <Searchbar
        ref={ref}
        placeholder="Halo: Combat Evolved"
        mode="view"
        value={search}
        onChangeText={setSearch}
      />
      <GameList search={debouncedSearch} token={auth} />
    </View>
  );
};

export default AddGame;
