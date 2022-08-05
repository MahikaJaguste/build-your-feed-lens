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
        setPreference,
        erc721_preference,
        erc721_setPreference,
        
        user_result_ids, 
        setUser_result_ids,
        user_result,
        setUser_result,
        erc721_user_result_ids, 
        setErc721_user_result_ids, 
        erc721_user_result,
        setErc721_user_result,

        matchingPercent,
        setMatchingPercent
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
        const [temp_user_result_ids, temp_user_result] = await axios_getERC20(profileOwner);
        setUser_result_ids(temp_user_result_ids)
        setUser_result(temp_user_result)
        // console.log(temp_user_result.length)

        const [erc721_temp_user_result_ids, erc721_temp_user_result] =  await axios_getERC721(profileOwner);
        setErc721_user_result_ids(erc721_temp_user_result_ids)
        setErc721_user_result(erc721_temp_user_result)
        // console.log(erc721_temp_user_result.length)

        let output = 0, erc721_output = 0;

        if(preference.length && temp_user_result.length){
            console.log(temp_user_result_ids, preference)
            output = temp_user_result_ids.filter((obj) => preference.indexOf(obj) !== -1);
            console.log(output.length, temp_user_result.length, output.length/temp_user_result.length * 100);
            // console.log(temp_user_result)
            output = output.length/temp_user_result.length * 100
        }
        if(erc721_preference.length && erc721_temp_user_result.length){
            console.log(erc721_temp_user_result_ids, erc721_preference)
            erc721_output = erc721_temp_user_result_ids.filter((obj) => erc721_preference.indexOf(obj) !== -1);
            console.log(erc721_output.length, erc721_temp_user_result.length, erc721_output.length/erc721_temp_user_result.length * 100);
            // console.log(erc721_user_result)
            erc721_output = erc721_output.length/erc721_temp_user_result.length * 100
        }

        console.log('matching', output, erc721_output, (output + erc721_output)/2)
        setMatchingPercent((output + erc721_output)/2)
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
                placeholder="Search following by profile handle"
                w="350px"
            />

            <Button
                bg="darkgreen"
                textColor="white"
                type='submit'
                size='md'
                onClick={() => {handleSubmit()}}
            >
                Search
            </Button>
        </HStack>

        {profileHandleInput ? <Text fontSize='sm'>
            {profileHandleInput} follows ... 
        </Text> : <Text fontSize='sm'>
            You follow ... 
        </Text> }
        </VStack>

    </>
    );
}
    
export default FollowingProfileSearch;