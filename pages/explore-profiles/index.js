import { useContext, useEffect, useState } from "react";
import { AppContext } from "../_app";
import { useRouter } from 'next/router';

import FollowingProfileSearch from "../../components/FollowingProfileSearch.js"

import doGetFollowing from "../../utils/followingList/doGetFollowing"
import axios_getERC20 from "../../utils/alchemy/axios_getERC20";
import axios_getERC721 from "../../utils/alchemy/axios_getERC721";

import erc20_metadata from "../../utils/preferences/erc20_metadata.js";
import erc721_metadata from "../../utils/preferences/erc721_metadata.js";

// components
import dynamic from "next/dynamic";
const GetWeb3 = dynamic(() => import("../../components/GetWeb3"), {
  ssr: false,
});

// utils
import {GetDocuments, erc721_GetDocuments } from '../../utils/db/preferenceList/crudData.js';

// style
import { Flex,
    Heading,
    HStack,
    Button,
    Image,
    VStack,
    Text,
    Icon,

} from '@chakra-ui/react';

import { BsArrowRightCircle, BsArrowLeftCircle } from 'react-icons/bs'
import { following } from "../../lens-api/follow/following";


export default function ProfileFollowing({
    docData,
    docKey,
    erc721_docData,
    erc721_docKey }) {

    const [isFetchingMore, setIsFetchingMore] = useState(false); 

    const {
        signerAddress,

        profileHandleInput,
        setTempProfileHandleInput,
        setProfileHandleInput,
        profileAddress, 
        setProfileAddress,
        followingList,
        setFollowingList,
        followingPageInfo,
        setFollowingPageInfo,
        exploreProfileDetails,
        setExploreProfileDetails,
        preference,
        setPreference,
        erc721_preference,
        erc721_setPreference
    } = useContext(AppContext);

    const router = useRouter();

    async function handleFetchMore(prevFollowingList, prevFollwowingPageInfo) {
        setIsFetchingMore(true);
        const [response, newPageInfo] = await doGetFollowing(profileAddress, 1, prevFollwowingPageInfo.next)
        setFollowingList(response);
        setFollowingPageInfo(newPageInfo);
        setIsFetchingMore(false);
        if(response.length){
            handleGetDetails(response[0].profile.ownedBy)
        }
    }

    async function handleFetchLess(prevFollowingList, prevFollowingPageInfo) {
        setIsFetchingMore(true);
        const prevCursorNum = parseInt(prevFollowingPageInfo.prev.slice(10, prevFollowingPageInfo.prev.length-1)) - 1
        const prevCursor = `{\"offset\":${prevCursorNum}}`
        console.log(prevCursor)
        const [response, newPageInfo] = await doGetFollowing(profileAddress, 1, prevCursor)
        setFollowingList(response);
        setFollowingPageInfo(newPageInfo);
        setIsFetchingMore(false);
        if(response.length){
            handleGetDetails(response[0].profile.ownedBy)
        }
    }

    async function handleGetDetails(profileOwner) {
        // const [user_result_ids, user_result] = await axios_getERC20(profileOwner);
        // if(preference){
        //     console.log(user_result_ids, preference)
        //     const output = user_result_ids.filter((obj) => preference.indexOf(obj) !== -1);
        //     console.log(output.length, preference.length, output.length/preference.length * 100);
        //     console.log(user_result)
        // }
        // const [erc721_user_result_ids, erc721_user_result] = 
        // await axios_getERC721(profileOwner);
        // if(erc721_preference){
        //     console.log(erc721_user_result_ids, erc721_preference)
        //     const erc721_output = erc721_user_result_ids.filter((obj) => erc721_preference.indexOf(obj) !== -1);
        //     console.log(erc721_output.length, erc721_preference.length, erc721_output.length/erc721_preference.length * 100);
        //     console.log(erc721_user_result)
        // }
    }

    function getPreference() {
        if(signerAddress) {
            const index = docKey.indexOf(signerAddress)
            if(index != -1) {
                setPreference(docData[index]['preference'])
            }
        }
    }

    function erc721_getPreference() {
        if(signerAddress) {
            const index = erc721_docKey.indexOf(signerAddress)
            if(index != -1) {
                erc721_setPreference(erc721_docData[index]['preference'])
            }
        }
    }

    useEffect(() => {
        if(signerAddress && !preference.length){
            getPreference()
        }
        if(signerAddress && !erc721_preference.length){
            erc721_getPreference()
        }
    }, [signerAddress])

    useEffect(() => {
        if(!preference.length){
            getPreference()
        }
        if(!erc721_preference.length){
            erc721_getPreference()
        }
    }, [])

    function updateSearchHandle(currentHandle) {
        setProfileAddress(null);
        setFollowingList(null);
        setTempProfileHandleInput(currentHandle)
        setProfileHandleInput(currentHandle);
    }

    return (
        <>
            {signerAddress ? null : <GetWeb3/>}

            <Flex
                px="60px"
                py='20px'
                width="full"
                align-items="baseline"
                justifyContent="space-between"
                //bg='lightgreen'
            >
                <Heading 
                    mr='5px'
                    fontSize={30}
                    letterSpacing='1.5px'
                >
                    Build Your Feed
                </Heading>
                <Flex
                    align-items="center"
                    justifyContent="center" 
                    mr='110px'
                >
                    <FollowingProfileSearch/>
                </Flex>
                <Button
                    colorScheme='green'
                    size='md'
                    onClick={() => {
                        router.push({
                            pathname: `/explore-profiles/preferences`,
                        });
                    }}
                >
                    Your Preferences 
                </Button>

            </Flex>

            
            <HStack
                justifyContent='space-between'
                marginTop='10px'
                px='300px'
            >
            
            {followingList && followingList.length ? 
                followingPageInfo.prev == "{\"offset\":0}" ?
                    <Button bg='transparent' color='white' mt='75px'>
                    <Icon as={BsArrowLeftCircle} w={10} h={10}/> 
                    </Button> :
                    !isFetchingMore ?
                        // <button onClick={()=> handleFetchMore(followingList, followingPageInfo)}>Get more profiles</button>
                        <Button bg='white' onClick={()=> handleFetchLess(followingList, followingPageInfo)}
                        mt='75px'
                        >
                        <Icon as={BsArrowLeftCircle} w={10} h={10}/> 
                        </Button>
                    :
                    <p>Fetching more profiles</p>
            : null } 

            <HStack 
                justifyContent='center'
            >
                <Flex
                    justifyContent='center'
                    ml='100px'
                    mr='100px'
                >
                {followingList && followingList.length ?    
                    <>
                    <VStack>
                    <Flex
                        justifyContent='center'
                        borderRadius='20'
                        boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                        mt='75px'
                        pb='30px'
                        w='400px'
                        _focus={{ boxShadow: "none !important" }}
                        align-content='space-between'
                    >      
                    {followingList.map((obj, index) => {
                            // console.log(obj.profile)
                            const profile = obj.profile
                            return (
                            <VStack
                                key={profile.id}
                                pt='100px'
                            >
                                <Text fontSize='3xl' as='b'>{profile.name}</Text>
                                <Text fontSize='2xl'>@{profile.handle}</Text>
                                <HStack justifyContent='center'>
                                    <Text fontSize='sm' mr='10px'>{profile.stats.totalFollowers} followers</Text>
                                    <Text fontSize='sm' ml='10px'>{profile.stats.totalFollowing} following</Text>
                                </HStack>
                                <Text fontSize='md' px='10px' textAlign='center' pt='10px' pb='10px'>{profile.bio}</Text>
                                <Button
                                colorScheme='green'
                                size='md'
                                >
                                    Follow 
                                </Button>
                            </VStack>
                            )
                        })
                    }
                    </Flex>

                    <Image
                    borderRadius='full'
                    border='1px solid black'
                    boxSize='150px'
                    src={followingList[0].profile.picture ?  
                            followingList[0].profile.picture.uri ? followingList[0].profile.picture.uri  :
                            followingList[0].profile.picture.original ? followingList[0].profile.picture.original.url :
                            followingList[0].profile.picture.medium ?  followingList[0].profile.picture.medium.url  :
                            followingList[0].profile.picture.small ?  followingList[0].profile.picture.small.url : null
                            : null
                        }
                    alt='Loading image'
                    fallbackSrc='https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=webp&v=1530129081'
                    position='absolute'
                    />
                    </VStack>
                    
                    </>  
                    :
                    profileHandleInput || profileAddress ? 
                            !followingList ? 
                            <p>Fetching following</p> 
                            :
                            <p>Empty following list</p> 
                        : null
                }
                </Flex>
            </HStack> 

            {followingList && followingList.length ? 
                followingPageInfo.next == `{\"offset\":${followingPageInfo.totalCount}}` ?
                    <Button bg='transparent' color='white' mt='75px'>
                    <Icon as={BsArrowRightCircle} w={10} h={10}/> 
                    </Button> :
                    !isFetchingMore ?
                        // <button onClick={()=> handleFetchMore(followingList, followingPageInfo)}>Get more profiles</button>
                        <Button bg='white' onClick={()=> handleFetchMore(followingList, followingPageInfo)}
                        mt='75px'
                        >
                        <Icon as={BsArrowRightCircle} w={10} h={10}/>
                        </Button>
                    :
                    <p>Fetching more profiles</p>
            : null }
 
                
            </HStack>
        </>             
    );
}

// <button onClick={() => updateSearchHandle(profile.handle)}>Search this profile</button>
export async function getStaticProps() {
    const [docData, docKey, success] = await GetDocuments()
    const [erc721_docData, erc721_docKey, erc721_success] = await erc721_GetDocuments()
  
    if(!success || !erc721_success){
        console.log('error in fetching preferences')
    }

    // Pass data to the page via props
    return { 
        props: { 
            docData,
            docKey,
            erc721_docData,
            erc721_docKey
        },
        revalidate: 10,
    }
}