import { Suspense } from "react";

import MovieDetailsTop from "@/components/application-group/movie-route/top-section/MovieDetailsTop";
import MovieDetailsMiddle from "@/components/application-group/movie-route/middle-section/MovieDetailsMiddle";
import LoadingSpinner from "@/components/LoadingSpinner";

type PageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: PageProps) => {
  //  id from the params is a string with the movie id and the movie name seperated by a dash, so we split the string and get the id
  const movieId = id.split("-")[0];

  return (
    <section className="pb-[70px] text-white">
      {/* Top Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <MovieDetailsTop movieId={movieId} />
      </Suspense>
      {/* Middle Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <MovieDetailsMiddle movieId={movieId} />
      </Suspense>
    </section>
  );
};

export default page;
