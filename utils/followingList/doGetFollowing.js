// lens
import { following } from "../../lens-api/follow/following";

export default async function doGetFollowing(profileAddress, limit, cursor=null, followingList=[]) {
    console.log(profileAddress, limit, cursor)
    if(profileAddress){
        const response = await following(profileAddress, limit, cursor);
        // console.log('repsosne list', response.data.following);
        followingList.push(...response.data.following.items);
        // console.log('following list', followingList);
        if(response.data.following && response.data.following.items.length){
            console.log("Following list returned");
            return [
                followingList, 
                response.data.following.pageInfo
            ];
        }
        else{
            console.log('Empty following list');
            return [[], null]
        }
    }
}