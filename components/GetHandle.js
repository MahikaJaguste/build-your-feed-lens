import { useContext } from "react";
import { useWeb3 } from "@3rdweb/hooks";
import { AppContext } from '../pages/index.js'
import Image from "next/image";

// lens
import { createProfile } from "../lens-api/profile/create-profile";
import { getProfiles } from "../lens-api/profile/get-profiles";


function GetHandle() {

    const { address } = useWeb3();
    const {myProfiles, setMyProfiles} = useContext(AppContext);

    async function doGetMyProfiles() {
        const request = { 
          limit: 10,
          ownedBy: [address]
        };
        const response = await getProfiles(request);
        setMyProfiles(response.data.profiles.items)
        console.log(response.data.profiles);
    }

    return (
    <>
    {
        myProfiles.length == 0 ? <button onClick={() => doGetMyProfiles()}>Get Profiles</button> :

        <ul>
        {
        myProfiles.map((profile) => 
        <div key={profile.id}>
            <h3>{profile.handle}</h3>
            {profile.picture && profile.picture.original && profile.picture.original.url? 
                <Image
                src={`https://res.cloudinary.com/demo/image/fetch/${profile.picture.original.url}`}
                width='60px'
                height='60px'/> :
                <div style={{width:'60px', height:'60px', backgroundColor:'black' }}></div>
            }
            <p>{profile.bio}</p>
        </div>
        )
        }
        </ul>
    } 
    </>
    );
}
    
export default GetHandle;