import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { SIGN_IN_WITH_SPECIFIC_FORM_PATH } from "../../../routing/Paths";
import { addOrRemoveLike } from "../../../state/ducks/celebrity-likes/actions";
import { Session } from "../../../state/utils/session";

const preventRedirectFromParent = (event) => {
  if (event.stopPropagation) {
    event.stopPropagation();
    event.preventDefault();
  }
};

const mapStateToProps = ({ celebrityLikes }) => {
  return {
    userCelebrityLikes: celebrityLikes.fetchUserCelebrityLikesReducer.data.data
  };
};

const CelebrityFavoriteButton = ({
  celebrityId,
  userCelebrityLikes,
  history
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!userCelebrityLikes) return;
    setIsFavorite(
      Boolean(
        userCelebrityLikes.find(
          (likeCelebrityId) => likeCelebrityId === celebrityId
        )
      )
    );
  }, [userCelebrityLikes]);

  const toggleFavorite = async (event) => {
    preventRedirectFromParent(event);
    const session = new Session().getSession();
    if (session) {
      const response = await addOrRemoveLike(celebrityId);
      if (response.status === "OK") setIsFavorite((isFavorite) => !isFavorite);
    } else {
      localStorage.setItem("finalRedirect", window.location.pathname);
      history.push(
        SIGN_IN_WITH_SPECIFIC_FORM_PATH.replace(":form", "email-form")
      );
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
        isFavorite /* || isHovering */ ? "filled" : "outlined"
      }-heart.svg`}
      className="like-icon"
      // onMouseOver={fillHeart}
      // onMouseLeave={unFillHeart}
      onClick={toggleFavorite}
    />
  );
};

const _CelebrityFavoriteButton = connect(mapStateToProps)(
  withRouter(CelebrityFavoriteButton)
);
export { _CelebrityFavoriteButton as CelebrityFavoriteButton };
