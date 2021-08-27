import getObjectWithFallbackValues from "lib/utils/getObjectWithFallbackValues";
import { useEffect, useState } from "react";
import { listPostComment } from "react-app/src/state/ducks/celebrity-subscription-posts/actions";
import usePromise from "./usePromise";

const defaultParams = {
  offset: 0,
  limit: 5,
};

type ParamsType = typeof defaultParams;

type CommentType = {
  comment: string;
  userAvatar: string;
  userFullName: string;
};

function useListSubscriptionPostComments({
  postId,
  shouldFetch = true,
  offset = defaultParams.offset,
  limit = defaultParams.limit,
}: { postId?: number; shouldFetch?: boolean } & ParamsType) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const { handle, status } = usePromise();

  useEffect(() => {
    if (!shouldFetch) return;
    const listParams = getObjectWithFallbackValues(
      {
        offset,
        limit,
      },
      defaultParams
    );
    async function fetchComments() {
      try {
        const response = await handle(listPostComment(postId, listParams));
        if (!response || response?.status === "ERROR") return;
        const newComments = response?.results || [];
        setComments((previousComments) =>
          offset > 0 ? [...previousComments, ...newComments] : newComments
        );
        setTotalResults(response?.totalResults);
      } catch (error) {
        console.warn(error);
      }
    }
    fetchComments();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetch, postId, limit, offset]);

  return { comments, totalResults, status };
}

export default useListSubscriptionPostComments;
