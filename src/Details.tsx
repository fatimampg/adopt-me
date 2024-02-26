import { useParams, useNavigate } from "react-router-dom";
//import { useState, useContext, lazy } from "react";
import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Carousel from "./Carousel";
import AdoptedPetContext from "./AdoptedPetContext";
import Modal from "./Modal";
import fetchPet from "./fetchPet";
import ErrorBoundary from "./ErrorBoundary";

//const Modal = lazy(() => import("./Modal"));

const Details = () => {
  const { id } = useParams(); //comes from the BrowserRouter in App.jsx
  if (!id) {
    throw new Error("why did you not give me an id? I want an id...");
  }

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const results = useQuery(["details", id], fetchPet); // [querykey provided to the fetchPet]-> [type of request, id]. Run fetch if you don't have a determined details id. Migration to typescript: add what kind of query it will get back (in this case, PetAPIResponse)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  if (results.isError) {
    return <h2>Oh no...There is an error</h2>;
  }
  //There will be no cach the first time, so it will show ⏳ and as soon as fetchPet completes it will rerender the informatiosn
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">⏳</h2>
      </div>
    );
  }

  const pet = results?.data?.pets[0]; //adding ?, pet can be pet or undefined
  if (!pet) {
    throw new Error("no pet");
  }

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city} - {pet.state}
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {pet.name}?</h1>
                <div className="buttons">
                  <button
                    onClick={() => {
                      setAdoptedPet(pet);
                      navigate("/");
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
    </div>
  );
};

function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
