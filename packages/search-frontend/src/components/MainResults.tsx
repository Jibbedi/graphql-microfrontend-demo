import React from "react";
import gql from "graphql-tag";
import { MainResultsFragment } from "../generated/graphql";
import { Box, Grid, Flex } from "../ui/Layout";
import Button from "../ui/Button";
import { formatMoney } from "../helper/format";

const MainResults: React.FC<MainResultsFragment> = ({ hotels }) => {
  return (
    <Box mb={4}>
      {hotels.map((hotel, index) => (
        <Grid
          key={hotel.id}
          mb={5}
          gridAutoFlow="dense"
          gridTemplateColumns="1fr 1fr"
          gridTemplateRows="300px"
          gridGap={4}
        >
          <Box
            style={{ gridColumnStart: index % 2 === 0 ? "1" : "2" }}
            borderRadius={0}
            backgroundSize="cover"
            backgroundPosition="center center"
            backgroundImage={`url(${hotel.thumbnailImageUrl}) `}
            key={hotel.id}
          />
          <Box>
            <Box fontSize={4} fontWeight="bold">
              {hotel.name}
            </Box>
            <Box mb={2} fontWeight="bold">
              {hotel.rating} Sterne
            </Box>
            <Box mb={2}>{hotel.description}</Box>
            <Flex justifyContent="flex-end">
              <Button>{formatMoney(hotel.price)} €</Button>
            </Flex>
          </Box>
        </Grid>
      ))}
    </Box>
  );
};

gql`
  fragment MainResults on MainResults {
    hotels {
      id
      name
      description
      rating
      price
      thumbnailImageUrl
    }
  }
`;

export default MainResults;
