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
  width: 100%;
  /* height: 367.64px; */
  height: 86.06vw;
  max-width: 542px;
  max-height: 542px;
  border-radius: 10px;
  overflow: hidden;
`;
export const PostText = styled.p`
  margin-bottom: 9px;
  font-size: 1rem;
  line-height: 19px;
`;
export const PostBody = styled.div`
  padding: 0 14px 16px;
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
  width: calc(100% - 28px);
  height: calc(100% - 16px);
  top: 0;
  left: 14px;
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
`;
export const PostFooter = styled.footer`
  display: flex;
  align-items: center;
  border-top: 2px solid #f0f2f5;
  padding: 18px 14px 4px;
`;
export const PostInteractionCount = styled.span`
  font-size: 12px;
  margin: 0 16px 0 9px;
  font-weight: bold;
`;
