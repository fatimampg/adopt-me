import { Component, MouseEvent } from "react"; //needed for creating class components

interface IProps {
  images: string[];
}

class Carousel extends Component<IProps> {
  //state initialization (to keep track of the index of the currently active image)
  state = {
    active: 0, //the first image will be the one presented bigger
  };

  static defaultProps = {
    images: ["https://pets-images.dev-apis.com/pets/none.jpg"],
  }; //provide default values of the images prop, in case no images prop is provided

  handleIndexClick = (event: MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }
    if (event.target.dataset.index) {
      this.setState({
        active: +event.target.dataset.index, //dataset which refers to all data... this in this case refers to data-index) (index is a string (everything that comes from the DOM is a string --> "+" added to transform it into a number))
      });
    }
  };

  // handleIndexClick(){
  //   console.log(this);
  // } --> here, this = undefined (not the component). When I create a normal function, when I invoque it, it creates a new scope at the point of invocation (using the array functions --> invoqued with no context, so it captures carousel)

  render() {
    //throw new Error("lol error");
    const { active } = this.state; // the same as: const active = this.state.active
    const { images } = this.props; // the same as: const images = this.state.images

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal hero" />
        {/* display image[0] (main image) which is the index specified by the active property */}
        <div className="carousel-smaller">
          {images.map(
            (
              photo, //current value in the array.map
              index, //mapping over the image array [array.map(function(currentValue, index))]
            ) => (
              // eslint-disable-next-line
              <img
                onClick={this.handleIndexClick}
                data-index={index}
                key={photo} //assign a unique key to each image (important for React to efficiently update the DOM when the array changes)
                src={photo} //set source attribute to the current image URL
                className={index === active ? "active" : ""} //if the index is equal to the one that is active, is has active class, otherwise it has no class.
                alt="animal thumbnail"
              />
            ),
          )}
        </div>
      </div>
    );
  }
}
export default Carousel;
