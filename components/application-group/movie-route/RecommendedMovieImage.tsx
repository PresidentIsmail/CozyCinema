import Image from "next/image";
import Link from "next/link";

import { fetchMovieDetails } from "@/lib/tmdb-api/movies";

import Skeleton from "@/components/Skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

/* 
Movie image component used in the MovieRecommendations component
gets the movie id, fetches the movie details and displays the movie image with a link to the movie page and some basic information about the movie
*/
const RecommendedMovieImage = async ({ movieId }: { movieId: string }) => {
  const { data: movieDetails, error } = await fetchMovieDetails(movieId);

  //   prepare url path for the movie details page, the structure is /movie/:id-nameofmovie, the name is seperated by a dash
  const moviePageUrl = `/movie/${movieId}-${movieDetails?.original_title
    .split(" ")
    .join("-")}`;

  //   only show images that have a backdrop_path || poster_path
  if (!movieDetails?.backdrop_path && !movieDetails?.poster_path) {
    return null;
  }

  return (
    <li className="relative h-auto flex-1">
      <Link href={moviePageUrl}>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={`${imageBaseUrl}${
              movieDetails?.backdrop_path || movieDetails?.poster_path
            }`}
            alt={movieDetails?.original_title}
            fill
            className="rounded-md object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 25vw"
          />
        </AspectRatio>
      </Link>
    </li>
  );
};

export default RecommendedMovieImage;