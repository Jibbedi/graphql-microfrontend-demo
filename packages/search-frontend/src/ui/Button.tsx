import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes[1]}px;
  font-weight: bold;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: ${props => props.theme.radii[1]}px;
`;

export default Button;
