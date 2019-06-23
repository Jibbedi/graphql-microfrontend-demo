import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Hotel = {
  __typename?: "Hotel";
  id: Scalars["ID"];
  price: Scalars["Float"];
  name: Scalars["String"];
  description: Scalars["String"];
  rating: Scalars["Int"];
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
  prominentImageUrl: Scalars["String"];
  thumbnailImageUrl: Scalars["String"];
};

export type MainResults = {
  __typename?: "MainResults";
  hotels: Array<Hotel>;
};

export type Mutation = {
  __typename?: "Mutation";
  addToShoppingCart?: Maybe<ShoppingCart>;
};

export type MutationAddToShoppingCartArgs = {
  shoppingCartId?: Maybe<Scalars["ID"]>;
  hotelId: Scalars["ID"];
};

export type ProminentResult = {
  __typename?: "ProminentResult";
  hotel: Hotel;
};

export type Query = {
  __typename?: "Query";
  getSearchResults?: Maybe<Array<Maybe<SearchResult>>>;
  getShoppingCart?: Maybe<ShoppingCart>;
};

export type QueryGetShoppingCartArgs = {
  shoppingCartId: Scalars["ID"];
};

export type SearchResult = ProminentResult | MainResults;

export type ShoppingCart = {
  __typename?: "ShoppingCart";
  id: Scalars["ID"];
  hotels: Array<Hotel>;
};
export type LoadSearchQueryVariables = {};

export type LoadSearchQuery = { __typename?: "Query" } & {
  getSearchResults: Maybe<
    Array<Maybe<ProminentResultFragment | MainResultsFragment>>
  >;
};

export type MainResultsFragment = { __typename?: "MainResults" } & {
  hotels: Array<
    { __typename?: "Hotel" } & Pick<
      Hotel,
      "id" | "name" | "description" | "rating" | "price" | "thumbnailImageUrl"
    >
  >;
};

export type ProminentResultFragment = { __typename?: "ProminentResult" } & {
  hotel: { __typename?: "Hotel" } & Pick<
    Hotel,
    "name" | "price" | "rating" | "prominentImageUrl"
  >;
};
export const MainResultsFragmentDoc = gql`
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
export const ProminentResultFragmentDoc = gql`
  fragment ProminentResult on ProminentResult {
    hotel {
      name
      price
      rating
      prominentImageUrl
    }
  }
`;
export const LoadSearchDocument = gql`
  query LoadSearch {
    getSearchResults {
      ...ProminentResult
      ...MainResults
    }
  }
  ${ProminentResultFragmentDoc}
  ${MainResultsFragmentDoc}
`;
export type LoadSearchComponentProps = Omit<
  ReactApollo.QueryProps<LoadSearchQuery, LoadSearchQueryVariables>,
  "query"
>;

export const LoadSearchComponent = (props: LoadSearchComponentProps) => (
  <ReactApollo.Query<LoadSearchQuery, LoadSearchQueryVariables>
    query={LoadSearchDocument}
    {...props}
  />
);

export type LoadSearchProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<LoadSearchQuery, LoadSearchQueryVariables>
> &
  TChildProps;
export function withLoadSearch<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LoadSearchQuery,
    LoadSearchQueryVariables,
    LoadSearchProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    LoadSearchQuery,
    LoadSearchQueryVariables,
    LoadSearchProps<TChildProps>
  >(LoadSearchDocument, {
    alias: "withLoadSearch",
    ...operationOptions
  });
}
export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}

const result: IntrospectionResultData = {
  __schema: {
    types: [
      {
        kind: "UNION",
        name: "SearchResult",
        possibleTypes: [
          {
            name: "ProminentResult"
          },
          {
            name: "MainResults"
          }
        ]
      }
    ]
  }
};

export default result;
