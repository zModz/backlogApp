import { useAuthContext } from "../hooks/useAuthContext";
import { useBacklogContext } from "../hooks/useBacklogContext";

const AddToBacklog = async (game) => {
  const { user } = useAuthContext();
  const { backlogs, dispatch } = useBacklogContext();

  if (!user) return;

  const res = await fetch(
    EXPO_PUBLIC_SERVER_IP + "/api/backlog/" + backlogs._id,
    {
      method: "PATCH",
      body: game,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );

  const json = await res.json();

  if (res.ok) {
    dispatch({ type: "ADD_BACKLOG", payload: json });
  }
};

export default AddToBacklog;
