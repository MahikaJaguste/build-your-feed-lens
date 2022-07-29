import { gql } from '@apollo/client/core';
import { queryEqual } from 'firebase/firestore';
import { apolloClient } from '../apollo-client';
import { prettyJSON } from '../helpers';

const SEARCH = `
  query($request: SearchQueryRequest!) {
    search(request: $request) {
    ... on ProfileSearchResult {
      __typename 
      items {
        ... on Profile {
          ...ProfileFields
        }
      }
      pageInfo {
        prev
        totalCount
        next
      }
     }
    }
  }

fragment MediaFields on Media {
  url
  mimeType
}

fragment ProfileFields on Profile {
  profileId: id,
  name
  bio
  attributes {
    displayType
    traitType
    key
    value
  }
  handle
  coverPicture {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }
    ... on MediaSet {
      original {
        ...MediaFields
      }
    }
  }
  ownedBy
  stats {
    totalFollowers
    totalFollowing
    totalPosts
    totalComments
    totalMirrors
    totalPublications
    totalCollects
  }
}
`;

// TODO typings
const searchRequest = (request) => {
  return apolloClient.query({
    query: gql(SEARCH),
    variables: {
      request,
    },
  });
};

export const search = async (queryTerm) => {
  const result = await searchRequest({
    query: queryTerm,
    type: 'PROFILE',
  });
  prettyJSON('search: result', result.data);

  return result.data;
};