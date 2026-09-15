import axios, { AxiosInstance } from "axios";

const apiInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // headers: {
  //   "X-Api-Key": process.env.API_KEY,
  // },
});

export default apiInstance;

export async function safeFetch<T>(
  fetcher: () => Promise<{ data: T }>,
  fallback: T,
): Promise<T> {
  try {
    const response = await fetcher();
    return response.data;
  } catch (error) {
    if (typeof window === "undefined") {
      return fallback;
    }
    throw error;
  }
}
