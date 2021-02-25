import { ReactNode } from "react";
import styled from "styled-components";

type ChildrenProp = {
  children?: ReactNode;
};

const PostsSection = styled.section`
  background-color: #f6f8fc;
  padding: 14px 0;
`;

export const SubscriptionPostsSection = ({ children = null }: ChildrenProp) => (
  <PostsSection>
    <div className="container">{children}</div>
  </PostsSection>
);

const PostsHeader = styled.header`
  padding: 1.5rem 0 0.8125rem;
  position: relative;
  z-index: 2;
  box-shadow: 0px 8px 10px -8px rgba(0, 0, 0, 0.1);
`;

export const SubscriptionPostsHeader = ({ children = null }: ChildrenProp) => (
  <PostsHeader>
    <div className="container">{children}</div>
  </PostsHeader>
);
