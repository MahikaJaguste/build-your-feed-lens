import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

// api
import {AddDocument_CustomID, GetDocuments, erc721_AddDocument_CustomID, erc721_GetDocuments } from '../../utils/db/preferenceList/crudData.js';
import erc20_metadata from "../../utils/preferences/erc20_metadata.js";
import erc721_metadata from "../../utils/preferences/erc721_metadata.js";

// components
// components
import dynamic from "next/dynamic";
import { AppContext } from "../_app.js";
const GetWeb3 = dynamic(() => import("../../components/GetWeb3"), {
  ssr: false,
});

import {
    Box,
    Heading,
    Text,
    Link,
    Flex,
    Icon,
    AspectRatio,
    Img,
    HStack,
    Stack,
    Button,
    List,
    ListIcon,
    ListItem,
  
  } from "@chakra-ui/react";

export default function Preferences({
    docData,
    docKey,
    erc721_docData,
    erc721_docKey
}) {

    const [protocolInfo, setProtocolInfo] = useState([]);
    const [erc721_protocolInfo, erc721_setProtocolInfo] = useState([]);

    const router = useRouter();

    const { signerAddress,
        setTempProfileHandleInput,
        setPreference,
        erc721_setPreference } = useContext(AppContext)

    // get checkbox info
    let tempProtocolInfo = []
    const handleChange = (e) => {
        const { value, checked } = e.target;
        tempProtocolInfo = protocolInfo;
        // console.log(value, checked);
        if (checked) {
            tempProtocolInfo = [...tempProtocolInfo, value]
        }
        else { // Case 2  : The user unchecks the box
            tempProtocolInfo = tempProtocolInfo.filter((protocol) => protocol !== value);
        }
        setProtocolInfo(tempProtocolInfo)
    };

    // get checkbox info
    let erc721_tempProtocolInfo = []
    const erc721_handleChange = (e) => {
        const { value, checked } = e.target;
        erc721_tempProtocolInfo = erc721_protocolInfo;
        // console.log(value, checked);
        if (checked) {
            erc721_tempProtocolInfo = [...erc721_tempProtocolInfo, value]
        }
        else { // Case 2  : The user unchecks the box
            erc721_tempProtocolInfo = erc721_tempProtocolInfo.filter((protocol) => protocol !== value);
        }
        erc721_setProtocolInfo(erc721_tempProtocolInfo)
    };

    async function handleSubmit(e) {
        e.preventDefault();
        // console.log(protocolInfo);
        AddDocument_CustomID(signerAddress, protocolInfo);
        setPreference(protocolInfo)
    }

    async function erc721_handleSubmit(e) {
        e.preventDefault();
        // console.log(protocolInfo);
        erc721_AddDocument_CustomID(signerAddress, erc721_protocolInfo);
        erc721_setPreference(erc721_protocolInfo)
    }

    useEffect(() => {
        if(signerAddress) {
            if(docKey && docKey.length){
                let index = docKey.indexOf(signerAddress)
                if(index != -1) {
                    setProtocolInfo(docData[index]['preference'])
                }
            }
            if(erc721_docKey && erc721_docKey.length){
                let index = erc721_docKey.indexOf(signerAddress)
                if(index != -1) {
                    erc721_setProtocolInfo(erc721_docData[index]['preference'])
                }
            }
        }
    }, [signerAddress])

    useEffect(() => {
        setTempProfileHandleInput(undefined);
    }, [])


    return (
        <>
        {signerAddress ? null : <GetWeb3/>}

        <Flex
      px="60px"
      py='20px'
      width="full"
      justifyContent="space-between"
      alignItems='flex-start'
      // bg='grey'
    >
      <Link href='/'>
          <Img src='https://i.ibb.co/g7z0ZW0/logo.png' boxSize='75px'/>
      </Link>
    
      <Heading 
          fontSize={50}
          letterSpacing='1.5px'
          
          >
          Your Preferences
      </Heading>
      
      <Link href='/explore-profiles'>
          <Button
            bg="darkgreen"
            textColor="white"
            size='md'
            onClick={() => {
                router.push({
                    pathname: `/explore-profiles`,
                });
            }}
        >
            Back to Explore Profiles
        </Button>
        </Link>

        </Flex>

        <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-around" }}
      direction={{ base: "column-reverse", md: "row" }}
      wrap="no-wrap"
      minH="63vh"
      px={8}
      bg='grey'
    >

    <Stack
        spacing={6}
        minW={{ base: "100%", md: "40%" }}
        minH = {{ base: "100%", md: "40%" }}
        align={["center", "center", "flex-start", "flex-start"]}
        ml={10}
        justify='center'
        alignItems='center'
        pt={6}
        pb={6}
        bg='white'
        borderRadius='20'
        boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
      >
      
      <Heading
          as="h3"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="bold"
          lineHeight={1.5}
          textAlign={["center", "center", "center", "center"]}
        >
          ERC20 Tokens
      </Heading>

      <List spacing={10} justifyContent='center'>
        <ListItem>
          <HStack>
            <Text
            fontSize="lg"
            textAlign="center"
            color="primary"
          >
            Which tokens and NFTs do you find interesting? <br/>Set your preferences accordingly.
          </Text>
          </HStack>
        </ListItem>
        <ListItem>
        <HStack>
            <Text
            fontSize="lg"
            textAlign="center"
            color="primary"
          >
            Browse profiles being followed by someone.<br/>
          See what assets they own.
          </Text>
          </HStack>
          
        </ListItem>
        <ListItem>
        <HStack>
            <Text
            fontSize="lg"
            textAlign="center"
            color="primary"
          >
            Like how they think ? Go follow them !
          </Text>
          </HStack>
        </ListItem>
      </List>
        
        {signerAddress ? 
        <Link href='/explore-profiles' target='_blank'>
          <Button
            bg="darkgreen"
            textColor="white"
            size='md'
            onClick={() => {
                router.push({
                    pathname: `/explore-profiles`,
                });
            }}
        >
            Explore Profiles
        </Button>
        </Link> : null }
        
      </Stack>

      <Stack
        spacing={6}
        minW={{ base: "100%", md: "40%" }}
        minH = {{ base: "100%", md: "40%" }}
        align={["center", "center", "flex-start", "flex-start"]}
        ml={10}
        justify='center'
        alignItems='center'
        pt={6}
        pb={6}
        bg='white'
        borderRadius='20'
        boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
      >
      
      <Heading
          as="h3"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="bold"
          lineHeight={1.5}
          textAlign={["center", "center", "center", "center"]}
        >
          ERC721 Tokens (NFTs)
      </Heading>

      <List spacing={10} justifyContent='center'>
        <ListItem>
          <HStack>
            <Text
            fontSize="lg"
            textAlign="center"
            color="primary"
          >
            Have a favorite group of content creators ? <br/>
            Create your Lens Lists accordingly.
          </Text>
          </HStack>
        </ListItem>
        <ListItem>
        <HStack>
            <Text
            fontSize="lg"
            textAlign="center"
            color="primary"
          >
            Create separate feeds on multiple themes - <br/>game updates, fashion tips, etc.d
          </Text>
          </HStack>
          
        </ListItem>
        <ListItem>
        <HStack>
            <Text
            fontSize="lg"
            textAlign="center"
            color="primary"
          >
            Own your curated list by minting a ListNFT !
          </Text>
          </HStack>
        </ListItem>
      </List>
        
      {signerAddress ? 
        <Link href='/explore-profiles' target='_blank'>
          <Button
            bg="darkgreen"
            textColor="white"
            size='md'
            onClick={() => {
                router.push({
                    pathname: `/explore-posts`,
                });
            }}
        >
            Explore Posts
        </Button>
        </Link> : null }
        
      </Stack>

    </Flex>

        {signerAddress ?  
        <form onSubmit={handleSubmit}>
        {
            erc20_metadata.map((key, index) => {
                return (
                    <> 
                        <input
                            onChange={handleChange} // <-- pass item to handler
                            checked={protocolInfo.includes(`${key.id}`)}
                            style={{ margin: "20px" }}
                            type="checkbox"
                            name={key.name}
                            value={key.id}
                        />
                        <label>{key.name}</label><br/>
                    </>
                )
            })
        }
        {protocolInfo.length ? <button type="submit">Update</button> : <button type="submit">Save</button> }
        </form>
        : 'Fetching your preferences...'}

        {signerAddress ?  
        <form onSubmit={erc721_handleSubmit}>
        {
            erc721_metadata.map((key, index) => {
                return (
                    <> 
                        <input
                            onChange={erc721_handleChange} // <-- pass item to handler
                            checked={erc721_protocolInfo.includes(`${key.id}`)}
                            style={{ margin: "20px" }}
                            type="checkbox"
                            name={key.name}
                            value={key.id}
                        />
                        <label>{key.name}</label><br/>
                    </>
                )
            })
        }
        {erc721_protocolInfo.length ? <button type="submit">Update</button> : <button type="submit">Save</button> }
        </form>
        : 'Fetching your preferences...'}
        </>
  );
}

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