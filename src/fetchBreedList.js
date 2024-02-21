const fetchBreedList = async ({ queryKey }) => {
  const animal = queryKey[1];

  if (!animal) return []; //if no animal, then we don't need to go to the api for that

  const apiRes = await fetch(
    `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );

  if (!apiRes.ok) {
    throw new Error(`breeds/${animal} fetch not ok`);
  }

  return apiRes.json();
};

export default fetchBreedList;
