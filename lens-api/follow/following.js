import { apolloClient } from './apollo-client'
import { gql } from '@apollo/client'

const GET_FOLLOWING = `
  query($request: FollowingRequest!) {
    following(request: $request) { 
		items {
            profile {
              id
              name
              bio
              handle
              picture {
                ... on NftImage {
                  contractAddress
                  tokenId
                  uri
                  verified
                }
                ... on MediaSet {
                  original {
                    url
                    width
                    height
                    mimeType
                  }
                }
              }
              coverPicture {
                ... on NftImage {
                  contractAddress
                  tokenId
                  uri
                  verified
                }
                ... on MediaSet {
                  original {
                    url
                    width
                    height
                    mimeType
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
        }
       pageInfo {
          prev
          next
          totalCount
       }
		}
  }
`;

const followingRequest = (walletAddress, limit) => {
  return apolloClient.query({
    query: gql(GET_FOLLOWING),
    variables: {
      request: {
        address: walletAddress,
        limit: limit,
      },
    },
  });
};

export const following = async (address, limit) => {
  const result = await followingRequest(address, limit);
  return result;
};