"use server";

import { searchAll } from "@/lib/tmdb-api/search";
import { filterResultsByLanguage } from "@/helpers/filterResults";
import { sortResultsByPopularity } from "@/helpers/sortResults";
import { filterMediaWithVideoUrl } from "@/helpers/filterMediaWithVideoUrl";

export async function fetchSearchResults(term: string, page: number = 1) {
  const results = await searchAll(term, page);
  const filteredResultsByLanguage = filterResultsByLanguage(
    results as any,
    "en",
  );
  const sortedResults = sortResultsByPopularity(
    filteredResultsByLanguage as any,
  );
  const resultsWithVideoUrl = await filterMediaWithVideoUrl(
    sortedResults as any,
  );

  return resultsWithVideoUrl;
}
