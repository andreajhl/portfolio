import styled from "styled-components";

export const AdWarrantyVideoPurchaseWrapper = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 128px;
  background-color: #f6f7ff;
  border-radius: 7px;
  padding: 16px;
`;

export const AdWarrantyHeader = styled.div`
  display: flex;
`;

export const AdWarrantyImg = styled.img`
  margin-left: auto;
`;

export const AdWarrantyTitle = styled.h2`
  margin-bottom: 0;
`;

export const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75em;
`;
export const InfoDescription = styled.div`
  flex: 1;
  text-align: left;
  font-size: 0.875rem;
  max-width: 160px;
`;

export const VLine = styled.hr`
  margin: 0 12px;
  border-left: 1px solid black;
  transform: scaleX(0.5);
  height: 50px;
`;
