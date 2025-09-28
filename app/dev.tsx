import GameCard from "@/components/GameCard";
import { useThemeContext } from "@/contexts/ThemeContext";
import { mockGames } from "@/mockdata";
import { useState } from "react";
import { ScrollView, StatusBar, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Divider,
  IconButton,
  Searchbar,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const [selected, setSelected] = useState(false);
  const [search, setSearch] = useState("");
  const { isDark, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const handledSelected = () => {
    setSelected(!selected);
  };

  const LeftContent = (props) => <Avatar.Icon {...props} icon="bell" />;

  return (
    <View
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Text variant="titleLarge">ARMORY</Text>
        <IconButton
          mode="contained"
          icon={isDark ? "weather-night" : "weather-sunny"}
          onPress={toggleTheme}
          animated
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          paddingBottom: insets.bottom + 10,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            flexShrink: 1,
          }}
        >
          <IconButton
            mode="contained"
            icon={selected ? "check" : "plus"}
            selected={selected}
            onPress={() => handledSelected()}
            animated
          />
          <IconButton
            mode="contained"
            icon={selected ? "check" : "plus"}
            // selected={selected}
            onPress={() => handledSelected()}
            animated
            disabled
          />
          <IconButton
            mode="outlined"
            icon={selected ? "check" : "plus"}
            selected={selected}
            onPress={() => handledSelected()}
            animated
          />
          <IconButton
            mode="outlined"
            icon={selected ? "check" : "plus"}
            // selected={selected}
            onPress={() => handledSelected()}
            animated
            disabled
          />
        </View>
        <Divider />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            flexShrink: 1,
            justifyContent: "space-around",
            gap: 10,
          }}
        >
          <ActivityIndicator size={"small"} />
          <ActivityIndicator size={"large"} />
          <ActivityIndicator size={69} />
        </View>
        <Divider />
        <View
          style={{
            gap: 10,
          }}
        >
          <Button
            mode="contained"
            icon={selected ? "check" : "plus"}
            onPress={() => handledSelected()}
          >
            {selected ? "Added to backlog" : "Add to backlog"}
          </Button>
          <Button
            mode="contained"
            icon={selected ? "check" : "plus"}
            onPress={() => handledSelected()}
            disabled
          >
            {selected ? "Added to backlog" : "Add to backlog"}
          </Button>
          <Button
            mode="outlined"
            icon={selected ? "check" : "plus"}
            onPress={() => handledSelected()}
          >
            {selected ? "Added to backlog" : "Add to backlog"}
          </Button>
          <Button
            mode="outlined"
            icon={selected ? "check" : "plus"}
            onPress={() => handledSelected()}
            disabled
          >
            {selected ? "Added to backlog" : "Add to backlog"}
          </Button>
        </View>
        <Divider />
        <Card>
          <Card.Cover
            source={{
              uri: "https://images.igdb.com/igdb/image/upload/t_1080p/ar3qze.webp",
            }}
          />
          <Card.Title
            title={"Borderlands 4 Released"}
            subtitle={"9 days ago"}
            left={LeftContent}
          />
          <Card.Content>
            <Text variant="bodyMedium">
              {
                "See if you have what it takes to go down in history as a legendary Vault Hunter as you search for secret alien treasure, blasting everything in sight."
              }
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              icon={selected ? "check" : "plus"}
              onPress={() => handledSelected()}
            >
              {selected ? "Added to backlog" : "Add to backlog"}
            </Button>
          </Card.Actions>
        </Card>
        <Divider />
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            gap: 10,
          }}
        >
          <Surface
            elevation={1}
            style={{
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
          >
            <Text>1</Text>
          </Surface>
          <Surface
            elevation={2}
            style={{
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
          >
            <Text>2</Text>
          </Surface>
          <Surface
            elevation={3}
            style={{
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
          >
            <Text>3</Text>
          </Surface>
          <Surface
            elevation={4}
            style={{
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
          >
            <Text>4</Text>
          </Surface>
          <Surface
            elevation={5}
            style={{
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
          >
            <Text>5</Text>
          </Surface>
        </View>
        <Divider />
        <View
          style={{
            flex: 1,
            gap: 10,
          }}
        >
          <Searchbar
            placeholder="Halo: Combat Evolved"
            value={search}
            onChangeText={setSearch}
          />
          <TextInput mode="flat" label={"Flat"} />
          <TextInput
            mode="flat"
            label={"Flat"}
            left={<TextInput.Icon icon="black-mesa" />}
          />
          <TextInput mode="flat" label={"Flat Disabled"} disabled />
          <TextInput mode="outlined" label={"Outlined"} />
          <TextInput
            mode="outlined"
            label={"Outlined"}
            left={<TextInput.Icon icon="black-mesa" />}
          />
          <TextInput mode="outlined" label={"Outlined Disabled"} disabled />
        </View>
        <Divider />
        <GameCard type="backlog" game={mockGames[0]} />
        <Divider />
      </ScrollView>
      {/* <View
        style={{
          position: "absolute",
          right: 10,
          bottom: 10,
        }}
      >
        <FAB
          variant="surface"
          icon={"plus"}
          onPress={() => console.info("BRUH")}
        />
      </View> */}
    </View>
  );
}
