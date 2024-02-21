import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";

export default function useBreedList(animal) {
  const results = useQuery(["breeds", animal], fetchBreedList); //cachekey: breeds, give: animal
  return [results?.data?.breeds ?? [], results.status]; //if data is not available, then give me an empty array, otherwise, give me the results
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
