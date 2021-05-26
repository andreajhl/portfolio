import React from "react";
import DirectionButton from "../button/direction";
import styles from "./styles.module.scss";
type PaginationProps = {
  onChangePage: (arg: number) => void;
  totalPage: number;
  currentPage: number;
  className?: string;
};

function Pagination({
  onChangePage,
  totalPage,
  currentPage,
  className = "",
}: PaginationProps) {
  if (totalPage < 2) return null;
  return (
    <div className={`${styles.Pagination} ${className}`}>
      <DirectionButton
        disabled={currentPage === 1}
        onClick={() => onChangePage(1)}
        className={styles.PaginationArrowButtons}
        iconButtonVariant={<i className="fa fa-step-backward" />}
      />
      <DirectionButton
        disabled={currentPage === 1}
        onClick={() => onChangePage(currentPage - 1)}
        className={styles.PaginationArrowButtons}
        direction="left"
      />
      <span className={styles.PaginationIndicator}>
        Pagina {currentPage} de {totalPage}
      </span>
      <DirectionButton
        disabled={currentPage === totalPage}
        onClick={() => onChangePage(currentPage + 1)}
        className={styles.PaginationArrowButtons}
        direction="right"
      />

      <DirectionButton
        disabled={currentPage === totalPage}
        onClick={() => onChangePage(totalPage)}
        className={styles.PaginationArrowButtons}
        iconButtonVariant={<i className="fa fa-step-forward" />}
      />
    </div>
  );
}

export default Pagination;
