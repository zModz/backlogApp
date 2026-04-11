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
  const {...backlogActions} = useBacklog();
  
  const isInBacklog = backlogActions.isInBacklog(game?.id);
  const isCompleted = backlogActions.isCompleted(game?.id);
  const isDropped = backlogActions.isDropped(game?.id);
  const [selected, setSelected] = useState(isInBacklog);
  const [completed, setCompleted] = useState(isCompleted);
  const [dropped, setDropped] = useState(isDropped);

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
            icon={!isDropped ? isCompleted ? "check-all" : "check" : "close"}
            selected={isCompleted}
            disabled={isDropped}
            onPress={() => {
              if (!isCompleted) {
                backlogActions.updateBacklogEntry(game?.id, {
                  status: "Completed",
                  completedAt: new Date().toISOString(),
                });
                setCompleted(true);
                backlogActions.reload();
              } else {
                backlogActions.updateBacklogEntry(game?.id, {
                  status: "Backlog",
                  completedAt: null,
                });
                setCompleted(false);
                backlogActions.reload();
              }

            }}
            animated
          />
          <IconButton
            icon={"close"}
            onPress={() => {
              backlogActions.updateBacklogEntry(game?.id, {
                status: "Dropped",
                completedAt: null,
              });
              setDropped(true);
              backlogActions.reload();
            }}
          />
        </>
      )}
    </View>
  );
};
