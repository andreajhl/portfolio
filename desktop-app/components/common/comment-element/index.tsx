import React from "react";
import styles from "./styles.module.scss";

interface CommentItemProps {
  avatar_url?: string;
  userFullName: string;
  comment: string;
}

function CommentItem({ comment, avatar_url, userFullName }: CommentItemProps) {
  return (
    <div className={styles.CommentWrapper}>
      <img
        alt="Avatar"
        height="40px"
        width="40px"
        className={styles.UserImgProfile}
        src={avatar_url || "/assets/img/avatar-blank.png"}
      />
      <div className={styles.CommentDetails}>
        <span className={styles.UserFullName}>{userFullName}</span>
        <span className={styles.UserComment}>{comment}</span>
      </div>
    </div>
  );
}

export { CommentItem };
