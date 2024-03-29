import { QueryFunction } from "@tanstack/react-query";
import { Animal, BreedListAPIResponse } from "./APIResponsesTypes";

const fetchBreedList: QueryFunction<
  BreedListAPIResponse,
  ["breeds", Animal]
> = async ({ queryKey }) => {
  const animal = queryKey[1];

  if (!animal) return []; //if there is no animal, don't go to the api for that

  const apiRes = await fetch(
    `https://pets-v2.dev-apis.com/breeds?animal=${animal}`,
  );

  if (!apiRes.ok) {
    throw new Error(`breeds/${animal} fetch not ok`);
  }

  return apiRes.json();
};

export default fetchBreedList;
