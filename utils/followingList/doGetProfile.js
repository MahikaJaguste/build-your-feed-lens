// lens
import { profile } from "../../lens-api/profile/get-profile";

export default async function doGetProfile(profileHandleInput) {
    if(profileHandleInput){
        const response = await profile(profileHandleInput);
        if(response.data.profile){
            console.log("Profile owned by", response.data.profile.ownedBy)
            return response.data.profile.ownedBy;
        }
        else {
            console.log('No such profile exists!');
            return null;
        }
        
    }
}