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
  Button
} from "@chakra-ui/react";
import { FiArrowUpRight } from "react-icons/fi";

import Image from 'next/image';

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


  return (
    <>

    {/* <HStack w='full' spacing={0} pt='50px' h='100%' alignItems='flex-start' px='50px' bg='pink'>
      <Box bg='red' w='400px'>
       <Heading fontSize={40} letterSpacing="6px" maxW="400px" pl='100px' mt='0px'>
            Get a customised 
            social media feed
            acording to 
            your Web3 preferences
        </Heading>
        <Text>hi</Text>
      </Box>
      <Box pr='100px' bg='green'>
        <Image src='/backgroundImage.png'
          height='1000px'
          width='1500px'
        />
      </Box>
    </HStack> */}

    <Flex
      px="60px"
      py='20px'
      width="full"
      align-items="baseline"
      justifyContent="space-between"
      // bg='grey'
  >
          <Heading 
              mr='5px'
              fontSize={20}
              letterSpacing='1.5px'
          >
              <Link href='/'>
              Build-Your-Feed
              </Link>
          </Heading>
      <Button
          bg="darkgreen"
          textColor="white"
          size='md'
          onClick={() => {
              router.push({
                  pathname: `/explore-profiles/preferences`,
              });
          }}
      >
           Connect Wallet
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
      // bg='pink'
    >
      <Stack
        spacing={4}
        minW={{ base: "80%", md: "40%" }}
        minH = {{ base: "80%", md: "40%" }}
        align={["center", "center", "flex-start", "flex-start"]}

        pl='200px'
        pb='100px'
        pt='50px'
      >
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
        >
          Get a customised <br/> social media feed
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
          Based on your web3 preferences
        </Heading>
        <Link href='/explore-profiles' target='_blank'>
          <Button
            bg="darkgreen"
            borderRadius="8px"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
            textColor='white'
          >
            Launch App
          </Button>
        </Link>
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
      <Box w={{ base: "100%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }} mr='200px'>
        <Img src='https://i.ibb.co/kqNsjts/background-Image.png' size="100%" rounded="1rem"  />
      </Box>
    </Flex>

    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      wrap="no-wrap"
      minH="70vh"
      px={8}
      mb={16}
      bg='grey'
    >
      {/* <Stack
        spacing={4}
        minW={{ base: "80%", md: "40%" }}
        minH = {{ base: "80%", md: "40%" }}
        align={["center", "center", "flex-start", "flex-start"]}

        pl='200px'
        pb='100px'
        pt='50px'
      >
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
        >
          Get a customised <br/> social media feed
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
          Based on your web3 preferences
        </Heading>
        <Link href='/explore-profiles' target='_blank'>
          <Button
            bg="darkgreen"
            borderRadius="8px"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
            textColor='white'
          >
            Launch App
          </Button>
        </Link>
        <Text
          fontSize="xs"
          mt={2}
          textAlign="center"
          color="primary.800"
          opacity="0.6"
        >
          Building on decentralised social graph - Lens
        </Text>
      </Stack> */}
      <Box w={{ base: "100%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }} mr='200px'>
        {/* <Img src='https://i.ibb.co/kqNsjts/background-Image.png' size="100%" rounded="1rem"  /> */}
      </Box>
    </Flex>
      {/* // <LandingPage/>
      // <ConnectWallet/> */}
    </>
  );
}