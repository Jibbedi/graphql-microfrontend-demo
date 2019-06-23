import React from "react";
import { Query, ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
import { ThemeProvider } from "styled-components";
import { client } from "./client";
import {
  MainResultsFragmentDoc,
  ProminentResultFragmentDoc
} from "./generated/graphql";
import ProminentResult from "./components/ProminentResult";
import MainResults from "./components/MainResults";
import theme from "./ui/Theme";
import { Box } from "./ui/Layout";

const COMPONENT_MAP = {
  ProminentResult: ProminentResult,
  MainResults: MainResults
};

const QUERY = gql`
  query LoadSearch {
    getSearchResults {
      ...ProminentResult
      ...MainResults
    }
  }

  ${ProminentResultFragmentDoc}
  ${MainResultsFragmentDoc}
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Query query={QUERY}>
          {({ loading, data }) => (
            <>
              {!loading && (
                <Box mx="auto" pt={3} maxWidth="900px">
                  {data.getSearchResults.map((searchResult, index) =>
                    React.createElement(
                      COMPONENT_MAP[searchResult.__typename],
                      {
                        ...searchResult,
                        key: index
                      }
                    )
                  )}
                </Box>
              )}
            </>
          )}
        </Query>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
