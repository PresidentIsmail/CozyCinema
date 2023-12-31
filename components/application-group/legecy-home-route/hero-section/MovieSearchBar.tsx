"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { MdOutlineClose } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MovieSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  function onSubmit() {
    // if there is a search query, redirect to search page
    if (searchQuery) {
      // Navigate to the search route with the search term as a query parameter
      router.push(`/search?term=${encodeURIComponent(searchQuery)}`);
    }
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }
  function handleClear() {
    // Clear search query if there is one
    if (searchQuery) {
      setSearchQuery("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[80%] flex-col items-center justify-center gap-y-4"
    >
      <h3 className="mt-4 text-center text-lg font-semibold tracking-wide text-white/70  lg:text-xl">
        Ready to watch? Find Your Favorite Shows and Movies!
      </h3>

      <div className="flex w-full flex-col items-center justify-center gap-x-4 gap-y-4 md:flex-row">
        <div className="relative w-[80%] lg:w-[70%] xl:w-[60%]">
          <Input
            autoFocus
            type="text"
            placeholder="Find movies, TV shows, and more..."
            className="mx-auto h-12  rounded-lg bg-black/30 px-4 py-3  text-lg font-semibold leading-[1.5] tracking-wide text-white placeholder:pb-1 placeholder:text-lg placeholder:text-[rgba(163,163,163,0.70)] md:mx-0  lg:text-2xl"
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && (
            <MdOutlineClose
              className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer rounded-full text-white lg:h-6 lg:w-6 "
              onClick={handleClear}
            />
          )}
        </div>

        <Button
          type="submit"
          className={` h-12 min-w-max  rounded-lg bg-[#e50914] text-base font-semibold text-white hover:bg-[#c11119] md:px-6 md:py-3 md:text-lg  lg:text-xl `}
        >
          Search <IoSearchOutline className="ml-2 h-5 w-5 lg:h-6 lg:w-6" />
        </Button>
      </div>
    </form>
  );
};

export default MovieSearchBar;
