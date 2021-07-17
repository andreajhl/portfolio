import React, { useEffect, useMemo } from "react";
import { NavLink } from "react-app/src/components/common/routing";
import { connect } from "react-redux";
import { fetchSimilarCelebrities } from "../../../state/ducks/celebrities/actions";
import { SEARCH_PATH } from "../../../routing/Paths";
import { jsonToQueryString } from "../../../state/utils/apiService";
import getMoreFrequentIds from "../../../utils/getMoreFrequentIds";
import * as GTM from "../../../state/utils/gtm";
import PropTypes from "prop-types";
import { LessImportantCallToActionButton } from "../less-important-call-to-action-button";

const GoToSimilarCelebritiesButton = ({
  celebrityUsername,
  isLoading,
  similarCelebrities,
  fetchSimilarCelebrities,
  children,
  fontSize,
  width,
  className,
}) => {
  useEffect(() => {
    if (similarCelebrities.length > 0 || isLoading) return;
    fetchSimilarCelebrities(celebrityUsername);
  }, []);

  const similarCelebritiesPath = useMemo(() => {
    if (similarCelebrities.length < 1) return "#";
    return (
      SEARCH_PATH +
      jsonToQueryString({
        country_id: getMoreFrequentIds(similarCelebrities, "countryId"),
        category_id: getMoreFrequentIds(similarCelebrities, "categoryId"),
        limit: 20,
      })
    );
  }, [similarCelebrities]);

  const registerGoToSimilarCelebritiesButtonEvent = (eventName) => {
    GTM.tagManagerDataLayer(eventName + "_GO_TO_SIMILAR_CELEBRITIES_BUTTON", {
      path: window.location.pathname,
      widget: "GoToSimilarCelebritiesButton",
      text: typeof children === "string" ? children : "React.Node",
      celebrityUsername,
      similarCelebritiesPath,
    });
  };

  return (
    <NavLink
      to={similarCelebritiesPath}
      onClick={() => registerGoToSimilarCelebritiesButtonEvent("CLICK")}
    >
      <LessImportantCallToActionButton
        fontSize={fontSize}
        width={width}
        className={className}
      >
        {children}
      </LessImportantCallToActionButton>
    </NavLink>
  );
};

GoToSimilarCelebritiesButton.propTypes = {
  children: PropTypes.node.isRequired,
};

const mapStateToProps = ({ celebrities }) => {
  return {
    isLoading: celebrities.fetchSimilarCelebritiesReducer.loading,
    similarCelebrities: celebrities.fetchSimilarCelebritiesReducer.data.results,
  };
};

const mapDispatchToProps = {
  fetchSimilarCelebrities,
};

const _GoToSimilarCelebritiesButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(GoToSimilarCelebritiesButton);

export { _GoToSimilarCelebritiesButton as GoToSimilarCelebritiesButton };
