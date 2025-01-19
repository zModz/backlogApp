import { Alert } from "react-native";

const CLIENT_ID = process.env.EXPO_PUBLIC_CLIENTID;

const requestQueue = [];
let isProcessing = false;

// Process the request queue at a fixed rate
const processQueue = () => {
  if (isProcessing) return;

  isProcessing = true;

  const interval = 1000 / 4; // 4 requests per second (250ms per request)

  const process = () => {
    if (requestQueue.length === 0) {
      clearInterval(timer);
      isProcessing = false;
      return;
    }

    const { api_url, endpoint, body, token, resolve, reject } =
      requestQueue.shift();
    fetchDataInternal(api_url, endpoint, body, token)
      .then(resolve)
      .catch(reject);
  };

  const timer = setInterval(process, interval);
};

const fetchDataInternal = async (api_url, endpoint, body, token) => {
  try {
    const response = await fetch(`${api_url}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-ID": CLIENT_ID,
        Authorization: `${token.token_type} ${token.access_token}`,
      },
      body,
    });

    if (!response.ok) {
      throw new Error(
        `${
          String(endpoint).charAt(0).toUpperCase() + String(endpoint).slice(1)
        } Request Error! HTTP Status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    Alert.alert("A Request Error Occured", error.message);
    throw error;
  }
};

// Public fetchData function with rate limiting
export const fetchData = (api_url, endpoint, body, token) => {
  return new Promise((resolve, reject) => {
    requestQueue.push({ api_url, endpoint, body, token, resolve, reject });
    processQueue();
  });
};
