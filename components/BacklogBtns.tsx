import { useAuth } from "@/contexts/AuthContext";
import { useBacklog } from "@/hook/useBacklog";
import { Game } from "@/mockdata";
import React, { useState } from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";

type BacklogBtnsProps = {
  game: Game;
  type: string;
};

export const BacklogBtns = ({
  game,
  type,
}: BacklogBtnsProps) => {
  const { auth } = useAuth();
  
  const [selected, setSelected] = useState(isInBacklog);
  const [completed, setCompleted] = useState(isCompleted);
  const {...backlogActions} = useBacklog();

  return (
    <View>
      {type === "search" && (
        <IconButton
          mode="contained"
          icon={isInBacklog ? "check" : "plus"}
          selected={isInBacklog}
          onPress={() => {
            if (!isInBacklog) {
              backlogActions.addToBacklog(game?.id, auth);
              setSelected(true);
            } else {
              backlogActions.removeFromBacklog(game?.id);
              setSelected(false);
            }
            backlogActions.reload();
          }}
          animated
        />
      )}
      {type === "backlog" && (
        <>
          <IconButton
            mode="contained"
            icon={isCompleted ? "check-all" : "check"}
            selected={isCompleted}
            onPress={() => {
              if (!isCompleted) {
                backlogActions.updateBacklogEntry(game?.id, {
                  status: "Completed",
                  completedAt: new Date().toISOString(),
                });
                setCompleted(true);
                backlogActions.reload;
              } else {
                backlogActions.updateBacklogEntry(game?.id, {
                  status: "Backlog",
                  completedAt: null,
                });
                setCompleted(false);
                backlogActions.reload;
              }

            }}
            animated
          />
          <IconButton
            icon={"close"}
            onPress={() => {
              backlogActions.removeFromBacklog(game?.id);
              backlogActions.reload();
            }}
          />
        </>
      )}
    </View>
  );
};
