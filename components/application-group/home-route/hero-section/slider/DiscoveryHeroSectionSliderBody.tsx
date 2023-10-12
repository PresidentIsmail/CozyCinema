import { isMovieDetails } from "@/lib/tmdb-api/movies";

import ResponsiveBackgroundPoster from "@/components/application-group/ResponsiveBackgroundPoster";
import ShowDetailsSmallScreen from "../../ShowDetailsSmallScreen";
import ShowDetailsLargeScreen from "../../ShowDetailsLargeScreen";

type DiscoveryHeroSectionSliderBodyProps = {
  movieOrTvShowDetails: MovieDetailsData | TVSeriesData;
  priority: boolean;
};

const DiscoveryHeroSectionSliderBody = ({
  movieOrTvShowDetails,
  priority,
}: DiscoveryHeroSectionSliderBodyProps) => {
  const movieOrTvShowTitle = isMovieDetails(movieOrTvShowDetails)
    ? movieOrTvShowDetails.original_title
    : movieOrTvShowDetails.original_name;

  return (
    <li className="relative  h-[80dvh] w-[100vw] flex-1 md:h-[85dvh] lg:h-[85dvh] ">
      {/* Carousel Image */}
      <ResponsiveBackgroundPoster
        poster_path={movieOrTvShowDetails.poster_path}
        backdrop_path={movieOrTvShowDetails.backdrop_path}
        alt={movieOrTvShowTitle}
        priority={priority}
        imageClassNames="object-cover object-center"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black  via-black/80 to-transparent  md:w-[80%] md:bg-gradient-to-r md:from-black md:via-black md:to-transparent " />

      {/* Overlay with Poster details */}
      <div className="absolute inset-0 ">
        {/* Poster details component for small screens */}
        <ShowDetailsSmallScreen movieOrTvShowDetails={movieOrTvShowDetails} />

        {/* Poster details component for large screens */}
        <ShowDetailsLargeScreen movieOrTvShowDetails={movieOrTvShowDetails} />
      </div>

      {/* 
        short dark overlay at the bottom of the image to blend into the 
        next section
      */}
      <div className="absolute inset-x-0 bottom-0 hidden h-4 bg-gradient-to-t from-black to-transparent md:flex" />
    </li>
  );
};

export default DiscoveryHeroSectionSliderBody;