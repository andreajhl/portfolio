import React, { useState, useEffect, useMemo } from "react";
import { withRouter } from "../../common/routing";
import { connect } from "react-redux";
import { SIGN_IN_WITH_SPECIFIC_FORM_PATH } from "../../../routing/Paths";
import { addOrRemoveLike } from "../../../state/ducks/celebrity-likes/actions";
import { Session } from "../../../state/utils/session";
import PropTypes from "prop-types";
import * as GTM from "../../../state/utils/gtm";
import { defineMessages, useIntl } from "react-intl";
import { LikeButton } from "../../common/buttons/LikeButton";

const intlMessages = defineMessages({
  isLikedAlternativeText: {
    defaultMessage: "No me gusta",
  },
  isNotLikedAlternativeText: {
    defaultMessage: "Me gusta",
  },
});

const preventRedirectFromParent = (event) => {
  if (event.stopPropagation) {
    event.stopPropagation();
    event.preventDefault();
  }
};

const mapStateToProps = ({ celebrityLikes }) => {
  return {
    userCelebrityLikes: celebrityLikes.fetchUserCelebrityLikesReducer.data.data,
  };
};

const CelebrityFavoriteButton = ({
  celebrityId,
  className,
  userCelebrityLikes,
  filledImageSource,
  outlinedImageSource,
  width,
  height = width,
  history,
  location,
}) => {
  const { formatMessage } = useIntl();
  const [isFavorite, setIsFavorite] = useState(false);
  const analyticsData = useMemo(
    () => ({
      celebrityId,
      path: location.pathname,
      widget: "CelebrityFavoriteButton",
    }),
    [celebrityId, location.pathname]
  );

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
      if (response.status === "OK") {
        GTM.tagManagerDataLayer(
          `CLICK_${!isFavorite ? "" : "UN"}LIKE_CELEBRITY`,
          analyticsData
        );
        setIsFavorite((isFavorite) => !isFavorite);
      }
    } else {
      GTM.tagManagerDataLayer(
        `CLICK_LIKE_CELEBRITY_UNAUTHENTICATED`,
        analyticsData
      );
      localStorage.setItem("finalRedirect", window.location.pathname);
      history.push(
        SIGN_IN_WITH_SPECIFIC_FORM_PATH.replace(":form", "email-form")
      );
    }
  };

  return (
    <LikeButton
      isFavorite={isFavorite}
      filledImageSource={filledImageSource}
      outlinedImageSource={outlinedImageSource}
      className={className}
      width={width}
      height={height}
      onClick={toggleFavorite}
    />
  );
};

CelebrityFavoriteButton.defaultProps = {
  className: "",
  userCelebrityLikes: [],
  filledImageSource: "/assets/img/filled-heart.svg",
  outlinedImageSource: "/assets/img/outlined-heart.svg",
  width: "1rem",
};

CelebrityFavoriteButton.propTypes = {
  className: PropTypes.string,
  celebrityId: PropTypes.number.isRequired,
  userCelebrityLikes: PropTypes.array,
  filledImageSource: PropTypes.string,
  outlinedImageSource: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

const _CelebrityFavoriteButton = connect(mapStateToProps)(
  withRouter(CelebrityFavoriteButton)
);

export { _CelebrityFavoriteButton as CelebrityFavoriteButton };
