import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false }; //to start
  static getDerivedStateFromError() {
    return { hasError: true }; //if there is an error, then change state to true
  }
  //About static: since getDerivedStateFromError is static, it should be called on the class (ex.: ErrorBoundary.getDerivedStateFromError()) (not an instance of the class)
  componentDidCatch(error, info) {
    //there is nothing in functional components that is equivalent to componentDidCatch (that's why we must use a class component)
    //info is the actual error
    console.error("ErrorBoundary component caught and error", error, info);
    //typically you would log this to something like TrackJS or NewRelic
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
