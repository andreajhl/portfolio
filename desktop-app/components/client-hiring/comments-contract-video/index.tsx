import { CommentItem } from "desktop-app/components/common/comment-element";
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
        <CommentItem
          key={index}
          userFullName={comment.userFullName}
          comment={comment.comment}
        />
      ))}
    </div>
  );
}

export default CommentsContractVideo;
