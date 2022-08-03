import { useContext, useEffect, useState } from "react";
import { AppContext } from '../pages/_app.js'
import { useRouter } from 'next/router'

// lens
import doGetProfile from "../utils/followingList/doGetProfile"
import doGetFollowing from "../utils/followingList/doGetFollowing"

import axios_getERC20 from "../utils/alchemy/axios_getERC20.js";
import axios_getERC721 from "../utils/alchemy/axios_getERC721.js";

// style
import { HStack, 
    Input, 
    Icon,
    Text,
    VStack,
    Button } from "@chakra-ui/react";


function FollowingProfileSearch() {

    const {
        signerAddress,
        tempProfileHandleInput,
        setTempProfileHandleInput,
        profileHandleInput, 
        setProfileHandleInput,
        setProfileAddress,
        setFollowingList,
        followingPageInfo, 
        setFollowingPageInfo,
        exploreProfileDetails,
        setExploreProfileDetails,
        preference,
        setPreference
     } = useContext(AppContext);

    async function handleSearch() {
        if(profileHandleInput){
            const response1 = await doGetProfile(profileHandleInput)
            if(response1){
                setProfileAddress(response1);
                const [response2, pageInfo] = await doGetFollowing(response1, 1)
                setFollowingList(response2);
                setFollowingPageInfo(pageInfo);
                if(response2.length){
                    handleGetDetails(response2[0].profile.ownedBy)
                }
            }
            else{
                setProfileAddress(null);
            }
        }
    }

    useEffect(() => {
        handleSearch();
    }, [profileHandleInput]);

    async function handleInitialSearch() {
        if(signerAddress){
            const [response, pageInfo] = await doGetFollowing(signerAddress, 1)
            setFollowingList(response);
            setFollowingPageInfo(pageInfo);
            if(response.length){
                handleGetDetails(response[0].profile.ownedBy)
            }
        }
    }

    useEffect(() => {
        if(signerAddress) {
            setProfileAddress(signerAddress);
            setFollowingList(null); 
            handleInitialSearch();
        }
    }, [signerAddress]);

    const handleSubmit = async () => {
        // e.preventDefault();
        setProfileAddress(null);
        setFollowingList(null);
        setProfileHandleInput(tempProfileHandleInput);
    };

    async function handleGetDetails(profileOwner) {
        // const [user_result_ids, user_result] = await axios_getERC20(profileOwner);
        // if(preference){
        //     console.log(user_result_ids, preference)
        //     const output = user_result_ids.filter((obj) => preference.indexOf(obj) !== -1);
        //     console.log(output.length, preference.length, output.length/preference.length * 100);
        //     console.log(user_result)
        // }
        // const [user_result_ids, user_result] = 
        // await axios_getERC721(profileOwner);
        // if(preference){
        //     console.log(user_result_ids, preference)
        //     const output = user_result_ids.filter((obj) => preference.indexOf(obj) !== -1);
        //     console.log(output.length, preference.length, output.length/preference.length * 100);
        //     console.log(user_result)
        // }
    }

    return (
    <>
        {/* <form onSubmit={handleSubmit}>
            <label>Enter handle (eg. vitalik.eth)</label>
            <input 
                type="text"  
                id='profileHandleInputForm'
                value={tempProfileHandleInput}
                onChange={(e) => setTempProfileHandleInput(e.target.value)}/>
            <button type="submit">Search</button>
        </form>
        <p>{profileHandleInput ? profileHandleInput + " follows these profiles": 
            signerAddress ? "You follows these profiles" : null
        } </p> */}

        <VStack>
        <HStack spacing='0px'>
            <Input
                type="text"  
                id='profileHandleInputForm'
                value={tempProfileHandleInput}
                onChange={(e) => setTempProfileHandleInput(e.target.value)}
                size='md'
                placeholder="Search by profile handle"
                w="350px"
            />

            <Button
                colorScheme='green'
                type='submit'
                size='md'
                onClick={() => {handleSubmit()}}
            >
                Search
            </Button>
        </HStack>

        {profileHandleInput ? <Text fontSize='sm'>
            {profileHandleInput} follows ... 
        </Text> : null }
        </VStack>

    </>
    );
}
    
export default FollowingProfileSearch;