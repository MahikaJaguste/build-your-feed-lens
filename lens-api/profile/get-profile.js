import { apolloClient } from './apollo-client'
import { gql } from '@apollo/client'

const GET_PROFILE = `
  query($request: SingleProfileQueryRequest!) {
    profile(request: $request) {
        id
        name
        handle
        ownedBy     
    }
  }
`;

const getProfileRequest = (request) => {
  return apolloClient.query({
    query: gql(GET_PROFILE),
    variables: {
      request,
    },
  });
};

export const profile = async (profileHandle) => {
  const request = { handle: profileHandle };
  const profile = await getProfileRequest(request);
  return profile;
};