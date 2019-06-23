import React from "react";
import gql from "graphql-tag";
import { ProminentResultFragment } from "../generated/graphql";
import { Box, Flex } from "../ui/Layout";
import styled from "styled-components";
import { formatMoney } from "../helper/format";
import Button from "../ui/Button";

const Image = styled.img`
  width: 100%;
  height: 400px;
  border-radius: ${props => props.theme.radii[0]}px;
  object-fit: cover;
  object-position: center center;
`;

const ProminentResult: React.FC<ProminentResultFragment> = ({ hotel }) => {
  return (
    <Box mb={5}>
      <Box>
        <Image src={hotel.prominentImageUrl} />
      </Box>
      <Flex>
        <Box flex="1">
          <Box color="accent" fontWeight="bold">
            Genau das Richtige
          </Box>
          <Box fontSize={4}>{hotel.name}</Box>
          <Box mb={2} fontWeight="bold">
            {hotel.rating} Sterne
          </Box>
        </Box>
        <Flex alignItems="center">
          <Button>{formatMoney(hotel.price)} €</Button>
        </Flex>
      </Flex>
    </Box>
  );
};

gql`
  fragment ProminentResult on ProminentResult {
    hotel {
      name
      price
      rating
      prominentImageUrl
    }
  }
`;

export default ProminentResult;
