import React, { useState, useEffect } from "react";
import { SIGN_IN_PATH } from "../../../routing/Paths";
import { Session } from "../../../state/utils/session";

const initialState = {
  isHovering: false
};

const preventRedirectFromParent = (event) => {
  if (event.stopPropagation) {
    event.stopPropagation();
    event.preventDefault();
  }
};

const CelebrityFavoriteButton = ({ celebrityId }) => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    // getCelebritiesLikesData
  }, []);

  const toggleFavorite = (event) => {
    preventRedirectFromParent(event);
    const session = new Session().getSession();
    if (session) {
      setToggle((toggle) => !toggle);
    } else {
      alert(`Redirect a ${SIGN_IN_PATH}`);
      // localStorage.setItem("finalRedirect", window.location.pathname);
      // history.push();
    }
  };

  const addOrRemoveFav = () => {
    /* const session = new Session().getSession();
    if(session) {
        addOrRemoveContractLike(this.props.contractReference)
            .then(data => {
                this.setState({
                    ...this.state,
                    markedByMe: data.markedByMe,
                    favCount: data.count,
                });
                GTM.tagManagerDataLayer(
                    data.markedByMe ? "MARKED_FAV_CONTRACT" : "UNMARKED_FAV_CONTRACT",
                    {
                        ...this.state,
                        markedByMe: data.markedByMe,
                        favCount: data.count,
                        ...this.props
                    }
                );
            })

    }else{
        history._pushRoute(ROUTING_PATHS.SIGN_UP_PATH)
    } */
  };

  // const [isHovering, setIsHovering] = useState(initialState.isHovering);

  // const fillHeart = () => setIsHovering(true);
  // const unFillHeart = () => setIsHovering(initialState.isHovering);

  return (
    <img
      src={`/assets/img/${
        toggle /* || isHovering */ ? "filled" : "outlined"
      }-heart.svg`}
      className="like-icon"
      // onMouseOver={fillHeart}
      // onMouseLeave={unFillHeart}
      onClick={toggleFavorite}
    />
  );
};

export default CelebrityFavoriteButton;
