import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

//could be here also:
//const modalRoot = document.getElementById("modal");

const Modal = ({ children }) => {
  const elRef = useRef(null); //reference a value that's not needed for rendering
  if (!elRef.current) {
    elRef.current = document.createElement("div"); //elRef is like a container to give back the same thing (the div, in this case)  every single time
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal"); //"modal" - added to index.html
    modalRoot.appendChild(elRef.current);

    // after clicking yes or no (modal - are you sure you want to adopt this dog?), we need to cleanup/get rid of the modal:
    return () => modalRoot.removeChild(elRef.current); // equivalent to componentDidUnmount (to remove from the DOM)
  }, []); //[] to only happens once

  return createPortal(<div>{children}</div>, elRef.current); // create this div and pass it to elRef.current
};

export default Modal;
