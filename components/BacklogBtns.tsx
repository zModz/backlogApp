import React, { useState } from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";

type BacklogBtnsProps = {
  game: any;
  type: string;
  backlogActions: any;
};

export const BacklogBtns = ({
  game,
  type,
  backlogActions,
}: BacklogBtnsProps) => {
  const isInBacklog = backlogActions.isInBacklog(game?.id);
  const isCompleted = backlogActions.isCompleted(game?.id);
  const [selected, setSelected] = useState(isInBacklog);
  const [completed, setCompleted] = useState(isCompleted);

  return (
    <View>
      {type === "search" && (
        <IconButton
          mode="contained"
          icon={isInBacklog ? "check" : "plus"}
          selected={isInBacklog}
          onPress={() => {
            if (!isInBacklog) {
              backlogActions.addToBacklog({
                gameId: game?.id,
                status: "Backlog",
                addedAt: new Date().toISOString(),
              });
              setSelected(true);
            } else {
              backlogActions.removeFromBacklog(game?.id);
              setSelected(false);
            }
          }}
          animated
        />
      )}
      {type === "backlog" && (
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
            } else {
              backlogActions.updateBacklogEntry(game?.id, {
                status: "Backlog",
                completedAt: null,
              });
              setCompleted(false);
            }
          }}
          animated
        />
      )}
    </View>
  );
};
