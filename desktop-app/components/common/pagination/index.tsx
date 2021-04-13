import React from "react";
import DirectionButton from "../button/direction";
import styles from "./styles.module.scss";
type PaginationProps = {
  onChangePage: (arg: number) => void;
  totalPage: number;
  currentPage: number;
};

function Pagination({ onChangePage, totalPage, currentPage }: PaginationProps) {
  return (
    <div className={styles.Pagination}>
      {currentPage === 1 ? null : (
        <DirectionButton
          onClick={() => onChangePage(1)}
          className={styles.PaginationArrowButtons}
          iconButtonVariant={<i className="fa fa-step-backward" />}
        />
      )}
      {currentPage === 1 ? null : (
        <DirectionButton
          onClick={() => onChangePage(currentPage - 1)}
          className={styles.PaginationArrowButtons}
          direction="left"
        />
      )}
      <span className={styles.PaginationIndicator}>
        Pagina {currentPage} de {totalPage}
      </span>
      {currentPage === totalPage ? null : (
        <DirectionButton
          onClick={() => onChangePage(currentPage + 1)}
          className={styles.PaginationArrowButtons}
          direction="right"
        />
      )}
      {currentPage === totalPage ? null : (
        <DirectionButton
          onClick={() => onChangePage(totalPage)}
          className={styles.PaginationArrowButtons}
          iconButtonVariant={<i className="fa fa-step-forward" />}
        />
      )}
    </div>
  );
}

export default Pagination;
