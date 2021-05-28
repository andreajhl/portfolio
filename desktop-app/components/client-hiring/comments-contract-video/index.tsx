import React, { useEffect } from "react";
import { setCelebrityProfileVersion } from "react-app/src/state/ducks/celebrities/actions";
import styles from "./styles.module.scss";
type CommentsContractVideoProps = {
  contractComments: {
    avatar_url: string;
    userFullName: string;
    comment: string;
  }[];
};

function CommentsContractVideo({
  contractComments,
}: CommentsContractVideoProps) {
  // TODO: agregar user image en response de backend
  return (
    <div className={styles.CommentsContractVideoWrapper}>
      {contractComments.map((comment, index) => (
        <div
          className={styles.CommentWrapper}
          key={`${comment.comment}-${comment.userFullName}`}
        >
          <img
            alt="Imagen de perfil"
            height="40px"
            width="40px"
            className={styles.UserImgProfile}
            src="/assets/img/avatar-blank.png"
          ></img>
          <div className={styles.CommentDetails}>
            <span className={styles.UserFullName}>{comment.userFullName}</span>
            <span className={styles.UserComment}>{comment.comment}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentsContractVideo;
