import axios from "axios";

export async function fetchData(path: string, query: {}, token: string) {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_DIRECTUS_API}/${path}?${new URLSearchParams(
        query
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return result.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
}
