import { QueryStatus, useQuery } from "@tanstack/react-query";
import { Animal } from "./APIResponsesTypes";
import fetchBreedList from "./fetchBreedList";

export default function useBreedList(animal: Animal) {
  const results = useQuery(["breeds", animal], fetchBreedList); //cachekey: breeds, give: animal

  //if data is not available, then give me an empty array, otherwise, give me the results:
  return [results?.data?.breeds ?? [], results.status] as [
    string[],
    QueryStatus,
  ]; //"as [..." to ensure that it wil allways give this shape: a string and a status (not one or another type)
}

// Before using React Query:
// export default function useBreedList(animal) {
//   const [breedList, setBreedList] = useState([]);
//   const [status, setStatus] = useState("unloaded");

//   useEffect(() => {
//     if (!animal) {
//       setBreedList([]);
//     } else if (localCache[animal]) {
//       setBreedList(localCache[animal]);
//     } else {
//       requestBreedList();
//     }
//     // requestBreedList defined inside the useEffect so it's not recreated on every render cycle:
//     async function requestBreedList() {
//       setBreedList([]);
//       setStatus("loading");

//       const res = await fetch(
//         `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
//       );
//       const json = await res.json();
//       localCache[animal] = json.breeds || []; //it it doesn't exists, set to an empty array.
//       setBreedList(localCache[animal]);
//       setStatus("loaded");
//     }
//   }, [animal]); //request new breed list everytime animal changes

//   return [breedList, status];
// }
