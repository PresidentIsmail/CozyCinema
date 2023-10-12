const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovieDetails(
  movieId: string | number,
): Promise<MovieDetailsData> {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits`,
      { cache: "force-cache" },
    );

    if (!response.ok) {
      // Parse the error response as JSON to extract status_message
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.status_message || "Unknown error occurred";
      throw new Error(errorMessage);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    throw new Error(errorMessage);
  }
}

/*
type guard function that checks if a given object is of type MovieDetailsData.
*/
export function isMovieDetails(
  data: TVSeriesData | MovieDetailsData,
): data is MovieDetailsData {
  return (data as MovieDetailsData).original_title !== undefined;
}
