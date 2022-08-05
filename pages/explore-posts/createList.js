import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import {AppContext} from '../_app';

// lens
import doGetProfile from "../../utils/createList/doGetProfile";

// db
import { AddDocument_AutoID } from "../../utils/db/createList/crudData";

// ipfs
import { create } from 'ipfs-http-client';
import getMetadata from "../../utils/followListNft/upload";

import dynamic from "next/dynamic";
const GetWeb3 = dynamic(() => import("../../components/GetWeb3"), {
  ssr: false,
});

// abi
import LIST_NFT_ABI from '../../artifacts/contracts/ListNFT.sol/ListNFT.json';
import { ethers } from 'ethers';

const client = create("https://ipfs.infura.io:5001/api/v0");

import { Flex,
    Heading,
    HStack,
    Button,
    Img,
    Image,
    VStack,
    Text,
    Icon,
    StackDivider,
    SimpleGrid,
    Box,
    Link,
    Input,
    Spinner
} from '@chakra-ui/react';

export default function CreateList() {

    const router = useRouter();

    const { signer, signerAddress, provider } = useContext(AppContext);
    let listNFTContract;

    const [tempHandleInput, setTempHandleInput] = useState(undefined);
    const [creatorList, setCreatorList] = useState([]);
    const [listTitle, setListTitle] = useState(undefined);
    const [creatorHandles, setCreatorHandles] = useState([]);
    const [isCreating, setIsCreating] = useState(false)


    async function handleAdd() {
        let response
        if(tempHandleInput){
            response = await doGetProfile(tempHandleInput);
        }
        if(response){
            if(!creatorList.includes(response.id)){
                setCreatorList([...creatorList, response.id])
                setCreatorHandles([...creatorHandles, response.handle])
            }
        }
        else{
            alert('No such profile exists')
        }
        console.log([...creatorList, tempHandleInput].length)
    }

    async function handleCreateList(){
        setIsCreating(true)
        await AddDocument_AutoID(signerAddress, listTitle, creatorList);

        const metadata = getMetadata(signerAddress, listTitle, creatorList);
        console.log(metadata, JSON.stringify(metadata));

        const ipfsMetadata = await client.add(JSON.stringify(metadata));
        console.log(`ipfs://${ipfsMetadata.path}`);
        console.log(signer, provider);

        const listNFTContractAddress = "0x5D10B62aCeB376e75fC77da632db4878c2F98343";
        listNFTContract = new ethers.Contract(listNFTContractAddress, LIST_NFT_ABI.abi, provider);

        if(signer && listNFTContract) {
            // mint nft here
            try {
                const txn = await listNFTContract.connect(signer).mint(signerAddress, `ipfs://${ipfsMetadata.path}`);
                await txn.wait();
            }
            catch (err) {
                setIsCreating(false)
            }
        }
        
        setCreatorList([])
        setListTitle(undefined)
        setTempHandleInput(undefined)
        
    }   

    return (
    <>
        {signerAddress? null : <GetWeb3/>}

        <Flex
        px="60px"
        py='20px'
        width="full"
        justifyContent="space-between"
        // bg='grey'
        >
        <Link href='/'>
            <Img src='https://i.ibb.co/g7z0ZW0/logo.png' boxSize='75px'/>
        </Link>
        
        <Heading 
            // mr='60px'
            fontSize={50}
            letterSpacing='1.5px'
            
            >
            Create your Lens List
        </Heading>
        
        <Link href='/explore-posts'>
          <Button
            bg="darkgreen"
            textColor="white"
            size='md'
            // onClick={() => {
            //     router.push({
            //         pathname: `/explore-profiles`,
            //     });
            // }}
        >
            Back to Explore Posts
        </Button>
        </Link>

    </Flex>

    <VStack
        mr='100px'
    >
        {isCreating ? null : 
        <HStack spacing='0px'>
            <Input
                type="text"  
                id='listHandleInputForm'
                onChange={(e) => setTempHandleInput(e.target.value)}
                size='md'
                placeholder="Search by profile handle (e.g. stani.lens)"
                w="350px"
            />

            <Button
                bg="darkgreen"
                textColor="white"
                type='submit'
                size='md'
                onClick={() => {handleAdd()}}
            >
                Add
            </Button>
        </HStack>}


        {creatorList.length  ?
            <>

            
            {creatorList.map((handle, index) => {
                return (
                <Text fontSize='lg' key={index}>
                    {creatorHandles[index]} 
                </Text>
                )
            })}

            
            <Input
                type="text"  
                id='listTitleForm'
                onChange={(e) => setListTitle(e.target.value)}
                size='md'
                placeholder="Enter list title"
                w="200px"
            />
            
            {creatorList.length && listTitle ?
                isCreating ? <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='darkgreen'
                size='xl'
                mt='75px'
                w={10} h={10}
            /> : 
                <Button
                bg="darkgreen"
                textColor="white"
                type='submit'
                size='md'
                onClick={() => {handleCreateList()}}
                
                >
                    Create
                </Button>
            : null }
            </>
        : null
        }
        </VStack>
    </>
    )
}