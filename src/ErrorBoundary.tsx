import { Component, ErrorInfo, ReactElement } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component<{ children: ReactElement }> {
  state = { hasError: false }; //to start
  static getDerivedStateFromError() {
    return { hasError: true }; //if there is an error, then change state to true
  }
  //Since getDerivedStateFromError is static, it should be called on the class (ex.: ErrorBoundary.getDerivedStateFromError()) (not an instance of the class)
  componentDidCatch(error: Error, info: ErrorInfo) {
    //there's nothing in functional components that is equivalent to componentDidCatch (that's why we must use a class component)
    console.error("ErrorBoundary component caught and error", error, info);
    //could log this to something like TrackJS or NewRelic
  }
  render() {
    if (this.state.hasError) {
      return (
        <h2>
          There was an error with this listing.{" "}
          <Link to="/">Click here to go back to the home page.</Link>
        </h2>
      );
    }
    return this.props.children; //if there is no error, we want want to run with no interference
  }
}

export default ErrorBoundary;
