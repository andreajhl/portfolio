import React, { useState, useRef, useEffect } from "react";
import debounce from "lodash.debounce";

const initialState = {
  showLeftScrollButton: false,
  showRightScrollButton: false
};

const Container = ({ children, buttonsStyles, onScrollTo, onListScroll }) => {
  const [showLeftScrollButton, setShowLeftScrollButton] = useState(
    initialState.showLeftScrollButton
  );
  const [showRightScrollButton, setShowRightScrollButton] = useState(
    initialState.showRightScrollButton
  );

  const childrenListRef = useRef(null);

  const scrollTo = (direction) => () => {
    const cardListElement = childrenListRef.current;
    const { offsetWidth } = cardListElement;
    cardListElement.scrollBy({
      left: direction === "right" ? offsetWidth : offsetWidth * -1,
      behavior: "smooth"
    });
    onScrollTo(direction);
  };

  const changeScrollButtonsVisibility = debounce(() => {
    const { scrollLeft, offsetWidth, scrollWidth } = childrenListRef.current;
    setShowLeftScrollButton(scrollLeft > 0);
    setShowRightScrollButton(scrollLeft + offsetWidth < scrollWidth);
    onListScroll(scrollLeft + offsetWidth >= scrollWidth);
  }, 100);

  useEffect(() => {
    const cardListElement = childrenListRef.current;
    setShowRightScrollButton(
      cardListElement.scrollWidth > cardListElement.offsetWidth
    );
  }, [children]);

  return (
    <section className="carousel-with-buttons-layout container pr-0">
      {showLeftScrollButton ? (
        <button
          className="carousel-with-buttons-layout__scroll-to-button d-none d-md-block"
          onClick={scrollTo("left")}
          style={buttonsStyles}
        >
          <i className="fa fa-chevron-left text-white" />
        </button>
      ) : null}
      {React.Children.map(children, (child) => {
        const isListComponent = child.type === List;
        if (!isListComponent) return child;
        return React.cloneElement(child, {
          className: "carousel-with-buttons-layout__list",
          ref: childrenListRef,
          onScroll: changeScrollButtonsVisibility
        });
      })}
      {showRightScrollButton ? (
        <button
          className="carousel-with-buttons-layout__scroll-to-button scroll-to-right-button d-none d-md-block"
          onClick={scrollTo("right")}
          style={buttonsStyles}
        >
          <i className="fa fa-chevron-right text-white" />
        </button>
      ) : null}
    </section>
  );
};

Container.defaultProps = {
  hasMoreResults: false,
  moreResultsPath: "#",
  onScrollTo: () => {},
  onListScroll: () => {}
};

const Header = ({ children }) => (
  <header className="carousel-with-buttons__header d-flex align-items-center justify-content-between">
    {children}
  </header>
);

const Title = ({ children, className }) => (
  <h2
    className={`carousel-with-buttons-layout__title ${
      className ? className : ""
    }`}
  >
    {children}
  </h2>
);

const List = React.forwardRef(({ children, className, ...props }, ref) =>
  React.cloneElement(children, {
    ...props,
    ref,
    className: `${className} ${
      children.props.className ? children.props.className : ""
    }`
  })
);

export { Container, Header, Title, List };
