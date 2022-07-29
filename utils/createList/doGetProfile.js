// lens
import { profile } from "../../lens-api/profile/get-profile";

export default async function doGetProfile(profileHandleInput) {
    if(profileHandleInput){
        let response;
        try{
            response = await profile(profileHandleInput);
            console.log(response)
            if(response.data.profile){
                console.log("Profile owned by", response.data.profile.ownedBy)
                return response.data.profile;
            }
            else{
                console.log('No such profile exists!');
                return null;
            }
        }
        catch(err){
            console.log('No such profile exists!');
            return null;
        }   
    }
}