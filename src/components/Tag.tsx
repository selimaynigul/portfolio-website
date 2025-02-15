import React from "react";
import styled from "styled-components";

const StyledTag = styled.span`
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 50px;
  font-size: 0.9rem;
  color: #ccc;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

interface TagProps {
  children: React.ReactNode;
}

const Tag: React.FC<TagProps> = ({ children }) => {
  return <StyledTag>{children}</StyledTag>;
};

export default Tag;
