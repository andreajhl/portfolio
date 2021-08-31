import { LikeButton } from "desktop-app/components/common/button/like";
import styled from "styled-components";
import { Card } from "..";

export const PostCard = styled(Card)`
  padding-left: 0;
  padding-right: 0;
  background-color: white;
  margin-bottom: 14px;
`;
export const PostHeader = styled.header`
  padding: 0 14px 16px;
  display: flex;
  align-items: center;
`;
export const PostDate = styled.span`
  font-size: 14px;
  color: #7d7d7d;
  margin-left: auto;
`;
export const PostMedia = styled.div`
  display: block;
  height: 86.06vw;
  max-height: 572px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: ${(props) => props.cursor || "default"};
`;
export const PostText = styled.p`
  margin-bottom: 9px;
  font-size: 1rem;
  line-height: 19px;
`;
export const PostBody = styled.div`
  padding: 0 14px /* 16px PARA CUANDO SE AÑADA EL FOOTER */;
  position: relative;

  ${PostMedia} + ${PostText} {
    margin-top: 12px;
    margin-bottom: 0;
  }
`;
export const PostImage = styled.img`
  margin-bottom: 12px;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const PostHiddenDiv = styled.div`
  padding: 0 3rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  background-image: linear-gradient(
    180deg,
    #272727 0%,
    rgba(0, 0, 0, 0.61) 100%
  );
  border-radius: 10px;
  position: absolute;
`;

export const PostHiddenImage = styled(PostImage)`
  filter: blur(4px);
  transform: scale(1.2);
`;

export const PostHiddenText = styled.p`
  text-align: center;
  margin: 18px 0;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: white;
`;
export const PostSubscribeButton = styled.button`
  font-size: 12px;
  padding: 1.5em 2em;
  background: #ffffff;
  border-radius: 10px;
  border: none;

  &:hover {
    background: #f5f4f2;
  }
`;
export const PostFooter = styled.footer`
  display: flex;
  flex-flow: column;
  border-top: 2px solid #f0f2f5;

  margin-top: 1.25rem;
`;
export const PostInteractionCount = styled.span`
  font-size: 12px;
  margin: 0 16px 0 9px;
  font-weight: bold;
`;

export const PostCounterSection = styled.div`
  padding-top: 1rem;
  padding-left: 23px;

  & + section {
    margin-top: 1rem;
    border-top: 2px solid #f0f2f5;
  }
`;

export const PostLikeIcon = styled(LikeButton)`
  &:not(.post-is-liked) {
    color: ${(props) => props.color};
    fill: none;
  }

  path {
    stroke-width: 1.5px;
  }
`;

export const PostReactionButton = styled.button`
  padding: 0;
  background: none;
  border: none;

  &,
  & * {
    line-height: 1;
  }
`;
