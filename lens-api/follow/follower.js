// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
import { apolloClient } from './apollo-client'
import { gql } from '@apollo/client'

const GET_FOLLOWERS = `
    query($request: FollowersRequest!) {
        followers(request: $request) { 
            items {
                wallet {
                    address
                }
            }
            pageInfo {
                prev
                next
                totalCount
            }
        }
    }
`

export const followers = (_request) => {
   return apolloClient.query({
    query: gql(GET_FOLLOWERS),
    variables: {
      request: _request,
    },
  })
}