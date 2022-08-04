import { useContext, useEffect, useState } from "react";

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
import { FiArrowUpRight } from "react-icons/fi";
import { TbCircle3, TbCircle2, TbCircle1} from 'react-icons/tb' 

import Image from 'next/image';
import {useRouter} from 'next/router'

// components
import dynamic from "next/dynamic";
const ConnectWallet = dynamic(() => import("../components/ConnectWallet"), {
  ssr: false,
});
import LandingPage from "../components/LandingPage.js";

// context
import { AppContext } from "./_app.js";

export default function Home() {

  const { provider,
          signer,
          signerAddress,
          networkId
        } = useContext(AppContext)

  useEffect(() => {
    console.log('In index.js', provider, signer, signerAddress, networkId);
  }, [networkId])

  const router = useRouter();

  return (
    <>

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
          mr='150px'
          fontSize={50}
          letterSpacing='1.5px'
          pt='30px'
          pb='30px'
          >
          Find Your People
      </Heading>
      
      <Button
          bg="white"
          textColor="white"
          size='md'
      >

      </Button>

  </Flex>

    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      wrap="no-wrap"
      minH="70vh"
      px={8}
      mb={12}
      // bg='grey'
      
    >
      <Stack
        spacing={6}
        minW={{ base: "100%", md: "40%" }}
        minH = {{ base: "100%", md: "40%" }}
        align={["center", "center", "flex-start", "flex-start"]}
        ml={10}
        justify='center'
        alignItems='center'
        pt={8}
      >
        <Heading
          as="h2"
          size="xl"
          fontWeight="normal"
          color="primary.800"
          textAlign={["center", "center", "center", "center"]}
          
        >
          Losing your favorite people <br/> amidst spam recommendations ?
          
        </Heading>

        <Heading
          as="h2"
          size="xl"
          fontWeight="normal"
          color="primary.800"
          textAlign={["center", "center", "center", "center"]}
          
        >
          Tired of black-box algorithms <br/>
          trying to figure you out ?
          
        </Heading>

        
        <Heading
          as="h3"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="bold"
          lineHeight={1.5}
          textAlign={["center", "center", "center", "center"]}
        >
          Follow profiles based on your favorite <br/> DeFi protocols and NFT projects
        </Heading>
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
            Explore
        </Button>
        </Link> : 
        <ConnectWallet/>
        }
        <Text
          fontSize="xs"
          mt={2}
          textAlign="center"
          color="primary.800"
          opacity="0.6"
        >
          Building on decentralised social graph - Lens
        </Text>
      </Stack>

      <Box w={{ base: "100%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }} mr={10} 
      >
        <Img src='https://i.ibb.co/DfVhxsp/bgImage.gif' size="100%" rounded="1rem"  />
      </Box>
    
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
          Whom to follow ?
      </Heading>

      <List spacing={10} justifyContent='center'>
        <ListItem>
          <HStack>
          <ListIcon as={TbCircle1} color='darkgreen'/>
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
          <ListIcon as={TbCircle2} color='darkgreen'/>
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
          <ListIcon as={TbCircle3} color='darkgreen'/>
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
          What to follow ?
      </Heading>

      <List spacing={10} justifyContent='center'>
        <ListItem>
          <HStack>
          <ListIcon as={TbCircle1} color='darkgreen'/>
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
          <ListIcon as={TbCircle2} color='darkgreen'/>
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
          <ListIcon as={TbCircle3} color='darkgreen'/>
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
      {/* // <LandingPage/>
      // <ConnectWallet/> */}
    </>
  );
}