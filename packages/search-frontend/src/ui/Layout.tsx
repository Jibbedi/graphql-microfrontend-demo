import React from "react";
import styled from "styled-components";
import {
  space,
  flex,
  layout,
  position,
  border,
  color,
  typography,
  grid,
  background
} from "styled-system";

export const Flex = styled.div`
  display: flex;
  ${flex}
  ${space}
  ${position}
  ${color}
  ${layout}
  ${typography}
  ${border}
`;

export const Box = styled.div`
  ${flex}
  ${space}
  ${color}
  ${grid}
  ${position}
  ${layout}
  ${typography}
  ${background}
  ${border}
`;

export const Grid = styled.div`
  display: grid;
  ${flex}
  ${color}
  ${position}
  ${space}
  ${layout}
  ${typography}
  ${grid}
  ${border}
`;
