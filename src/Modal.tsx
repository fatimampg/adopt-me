import { useEffect, useRef, MutableRefObject, ReactElement } from "react";
import { createPortal } from "react-dom";

//could be here also:
//const modalRoot = document.getElementById("modal");

const Modal = ({ children }: { children: ReactElement }) => {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null); //reference a value that's not needed for rendering
  if (!elRef.current) {
    elRef.current = document.createElement("div"); //elRef is like a container to give back the same thing (the div, in this case)  every single time
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal"); //"modal" - added to index.html
    if (!modalRoot || !elRef.current) {
      return;
    } // if one of those is null, it will not pass this point
    modalRoot.appendChild(elRef.current);

    // get rid of the modal after clicking yes or no (question: are you sure you want to adopt this dog?)
    return () => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      } // equivalent to componentDidUnmount (to remove from the DOM)
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current); // create this div and pass it to elRef.current
};

export default Modal;
