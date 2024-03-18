import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = async () => {
        await AsyncStorage.removeItem('user')

        dispatch({ type: 'USER_LOGOUT' })
    }

    return { logout }
}