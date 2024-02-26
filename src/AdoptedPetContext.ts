import { createContext } from "react";
import { Pet } from "./APIResponsesTypes";

const AdoptedPetContext = createContext<
  [Pet | null, (adoptedPet: Pet) => void]
>([
  {
    id: 12334,
    name: "Balu",
    animal: "dog",
    description: "Lorem ipsum",
    breed: "Golden",
    images: [],
    city: "Lisbon",
    state: "Lisbon",
  },
  () => {},
]); //if create a context without context provider above it, this is what is going to be stored.

export default AdoptedPetContext;
