import {
  useState,
  useContext,
  usedDeferredValue,
  useMemo,
  useDeferredValue,
  useTransition,
} from "react";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import Results from "./Results";
import useBreedList from "./useBreedList";
import fetchSearch from "./fetchSearch";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

//Uncontrolled form (breed and location don't need to be tracked by React (we want to wait until the user click on submit - we don't want to research everytime the user types the location). Animal feeds into breedList, so we need to keep track on that one. When the user selects the type of animal, the breed list is immediatly loaded (even before the user clicks submit))
const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const [isPending, startTransition] = useTransition();

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];
  const deferredPets = useDeferredValue(pets); //if I get new pets back from API it's ok to interrupt re-rendering results. The new value of pets will only be given when there is nothing left in the queue.
  const renderedPets = useMemo(
    () => <Results pets={deferredPets} />,
    [deferredPets],
  ); // give a rendered result of deferredPets (and only update when deferredPets changes). renderedPets is the Results that only gets updated when reacts render queue is empty.

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault(); // This line prevents the form from actually literally submitting (we just want to call requestPets). Note: (e) is not really a DOM event - is a React synthetic event (a fake DOM event/virtual DOM)
          const formData = new FormData(e.target); //browser api, where we can feed a form and turn the data into an object
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          }; //current state of the form
          startTransition(() => {
            setRequestParams(obj); // feeding into --> const results = useQuery(["search", requestParams], fetchSearch)
          });
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Location"
          />
          {/* //not tracking location so there is no need to set value */}
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select id="breed" disabled={breeds.length === 0} name="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>

        {isPending ? (
          <div className="mini loading-pane">
            <h2 className="loader">🐩</h2>
          </div>
        ) : (
          <button>Submit</button>
        )}
      </form>

      {renderedPets}
    </div>
  );
};

export default SearchParams;
