import { Suspense } from "react";
import dynamic from "next/dynamic";

import { movieGenres } from "@/constants/movieGenres";

import FilteredAndSortedMediaList from "@/components/application-group/explore-route/FilteredAndSortedMediaList";

// import ComingSoon from "@/components/ui/ComingSoon"
import { AspectRatio } from "@/components/ui/aspect-ratio";
import CardSkeleton from "@/components/skeletons/CardSkeleton";

const GenreSelect = dynamic(
  () => import("@/components/application-group/explore-route/GenreSelect"),
  {
    ssr: false,
  },
);

const SortSelect = dynamic(
  () => import("@/components/application-group/explore-route/SortSelect"),
  {
    ssr: false,
  },
);

const genres: { title: string; id: number }[] = [
  {
    title: "Action",
    id: movieGenres.action,
  },
  {
    title: "Adventure",
    id: movieGenres.adventure,
  },
  {
    title: "Animation",
    id: movieGenres.animation,
  },
  {
    title: "Comedy",
    id: movieGenres.comedy,
  },
  {
    title: "Crime",
    id: movieGenres.crime,
  },
  {
    title: "Documentary",
    id: movieGenres.documentary,
  },
  {
    title: "Drama",
    id: movieGenres.drama,
  },
  {
    title: "Family",
    id: movieGenres.family,
  },
  {
    title: "Fantasy",
    id: movieGenres.fantasy,
  },
  {
    title: "History",
    id: movieGenres.history,
  },
  {
    title: "Horror",
    id: movieGenres.horror,
  },
  {
    title: "Music",
    id: movieGenres.music,
  },
  {
    title: "Mystery",
    id: movieGenres.mystery,
  },
  {
    title: "Romance",
    id: movieGenres.romance,
  },
  {
    title: "Sci-Fi",
    id: movieGenres.sciFi,
  },
  {
    title: "TV Movie",
    id: movieGenres.tvMovie,
  },
  {
    title: "Thriller",
    id: movieGenres.thriller,
  },
  {
    title: "War",
    id: movieGenres.war,
  },
  {
    title: "Western",
    id: movieGenres.western,
  },
];

type Props = {
  searchParams: {
    genres?: string | undefined;
    sort?: string | undefined;
    page?: string | undefined;
  };
};

const page = ({ searchParams }: Props) => {
  const urlGenres = searchParams.genres?.split("~") as string[] | null;
  const urlPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const urlSortOption = searchParams.sort || "popularity.desc";

  // convert the string array to number array, where the genres match their given id
  let urlGenresAsIds: number[] | null = null;

  if (urlGenres && urlGenres.length > 0) {
    urlGenresAsIds = urlGenres
      .map((genre) => {
        return genres.find((genreObj) => genreObj.title === genre)?.id;
      })
      .filter(Boolean) as number[];
  }

  return (
    <section className="master-container relative mt-[72px] flex w-full flex-1 flex-col pt-10 lg:mt-[92px]">
      <div className="flex flex-col gap-x-8 gap-y-4 md:flex-row md:items-center md:gap-x-12">
        <h1 className="text-3xl font-bold md:text-4xl">Movies</h1>

        {/* Genre and Sort Select */}
        <div className="flex w-full justify-between">
          <Suspense fallback={null}>
            <GenreSelect genres={genres} urlGenres={urlGenres} />
          </Suspense>

          <Suspense fallback={null}>
            <SortSelect urlSortOption={urlSortOption} />
          </Suspense>
        </div>
      </div>

      {/* Display all the filtered and sorted content */}
      <Suspense
        fallback={
          <div className="mt-8 grid grid-cols-3 gap-x-2 gap-y-12 md:grid-cols-4 md:gap-y-16 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 20 }).map((_, index) => (
              <AspectRatio key={index} ratio={2 / 3}>
                <CardSkeleton rows={0} showOverlay={false} />
              </AspectRatio>
            ))}
          </div>
        }
      >
        <FilteredAndSortedMediaList
          urlGenres={urlGenresAsIds}
          page={urlPage}
          urlSortOption={urlSortOption}
          type="movie"
        />
      </Suspense>
    </section>
  );
};
export default page;
