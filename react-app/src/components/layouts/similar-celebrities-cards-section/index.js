import React, { useEffect } from "react";
import { connect } from "react-redux";
import { CelebrityCardLayout } from "../celebrity-card";
import { fetchSimilarCelebrities } from "../../../state/ducks/celebrities/actions";
import * as CarouselWithButtons from "../carousel-with-buttons";
import "./styles.scss";

const SimilarCelebritiesCardsSectionLayout = ({
  celebrityUsername,
  isLoading,
  similarCelebrities,
  fetchSimilarCelebrities
}) => {
  useEffect(() => {
    fetchSimilarCelebrities(celebrityUsername);
  }, [celebrityUsername]);

  console.log(similarCelebrities);

  return true ? (
    <section className="SimilarCelebritiesCardsSectionLayout mb-2">
      <CarouselWithButtons.Container buttonsStyles={{ top: "2.85rem" }}>
        <CarouselWithButtons.Header>
          <CarouselWithButtons.Title className="text-black text-center mb-4 w-100">
            Famosos similares
          </CarouselWithButtons.Title>
        </CarouselWithButtons.Header>
        <CarouselWithButtons.List>
          <ul className="SimilarCelebritiesCardsSectionLayout__list">
            {similarCelebrities.map((similarCelebrity) => {
              const celebrity = {
                ...similarCelebrity,
                username: similarCelebrity.celebrityUsername,
                avatar: similarCelebrity.celebrityAvatar,
                title: similarCelebrity.categoryTitle,
                id: similarCelebrity.celebrityId,
                fullName: similarCelebrity.celebrityFullName
              };

              return (
                <li
                  className="mr-3"
                  key={"similar-celebrities-" + celebrity.id}
                >
                  <CelebrityCardLayout celebrity={celebrity} />
                </li>
              );
            })}
          </ul>
        </CarouselWithButtons.List>
      </CarouselWithButtons.Container>
    </section>
  ) : null;
};

// default props
SimilarCelebritiesCardsSectionLayout.defaultProps = {
  isLoading: false,
  similarCelebrities: []
};

const mapStateToProps = ({ celebrities }) => {
  return {
    isLoading: celebrities.fetchSimilarCelebritiesReducer.loading,
    similarCelebrities: celebrities.fetchSimilarCelebritiesReducer.data.results
  };
};

const mapDispatchToProps = {
  fetchSimilarCelebrities
};

const _SimilarCelebritiesCardsSectionLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(SimilarCelebritiesCardsSectionLayout);

export { _SimilarCelebritiesCardsSectionLayout as SimilarCelebritiesCardsSectionLayout };
