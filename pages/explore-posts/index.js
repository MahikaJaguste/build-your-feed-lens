import { useRouter } from "next/dist/client/router";
import { useContext } from "react";
import { GetOwnedDocuments, GetOtherDocuments, GetDocuments } from "../../utils/db/createList/crudData";
import { AppContext } from "../_app";


// components
import dynamic from "next/dynamic";
const GetWeb3 = dynamic(() => import("../../components/GetWeb3"), {
  ssr: false,
});

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
    Box,
    Spinner,
    Link,
    SimpleGrid,
    Tooltip,

} from '@chakra-ui/react';

const truncateAddress = (address) => {
    return address.slice(0, 6) + "..." + address.slice(-4);
  };


export default function ListFollowing({
    lists
}) {

    const router = useRouter();
    const { signerAddress } = useContext(AppContext) 

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
          Lens Lists
      </Heading>
      
      {signerAddress ?
      <Link href='/explore-posts/createList'>
          <Button
            bg="darkgreen"
            textColor="white"
            size='md'
        >
             Create List
        </Button>
        </Link>
        : null}

        </Flex>

        <Text fontSize='3xl' pl={20} pb={4} pt={2}>Your Lists</Text>
        {lists && lists.length ?
            <SimpleGrid columns={3} spacing={4} px={20}>
            {lists.map((list, index) => {
                if(list.walletAddress != signerAddress){
                    return null
                }

                return (
                    <Flex
                    justifyContent='center'
                    borderRadius='20'
                    boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                    pb='30px'
                    _focus={{ boxShadow: "none !important" }}
                    align-content='space-between'
                    >      
                
                        <VStack
                            pt='20px'
                        >
                            <Text fontSize='3xl' as='b'>{list.title}</Text>
                            <Text fontSize='lg' opacity='0.6'>{list.creatorList.length} members</Text>
                            {/* <HStack justifyContent='center'>
                                <Text fontSize='sm' mr='10px'>{profile.stats.totalFollowers} followers</Text>
                                <Text fontSize='sm' ml='10px'>{profile.stats.totalFollowing} following</Text>
                            </HStack> */}
                            <Link href={`/explore-posts/${list.docId}`}>
                            <Button
                            bg="darkgreen"
                            textColor="white"
                            size='md'
                            >
                                View Feed
                            </Button>
                            </Link>
                        </VStack>
                </Flex>
                )
            })}
            </SimpleGrid>
        : null}

        <Text fontSize='3xl' pl={20} pb={4} pt={4}>Explore Lists</Text>
        {lists && lists.length ?
            <SimpleGrid columns={3} spacing={4} px={20}>
            {lists.map((list, index) => {
                if(list.walletAddress == signerAddress){
                    return null
                }

                return (
                    <Flex
                    justifyContent='center'
                    borderRadius='20'
                    boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                    pb='30px'
                    _focus={{ boxShadow: "none !important" }}
                    align-content='space-between'
                    >      
                
                        <VStack
                            pt='20px'
                        >
                            <Text fontSize='3xl' as='b'>{list.title}</Text>
                            <Tooltip label={list.walletAddress}>
                                <Text fontSize='xl'>by {truncateAddress(list.walletAddress)}</Text>
                            </Tooltip>
                            <Text fontSize='lg' opacity='0.6'>{list.creatorList.length} members</Text>
                            {/* <HStack justifyContent='center'>
                                <Text fontSize='sm' mr='10px'>{profile.stats.totalFollowers} followers</Text>
                                <Text fontSize='sm' ml='10px'>{profile.stats.totalFollowing} following</Text>
                            </HStack> */}
                            <Link href={`/explore-posts/${list.docId}`}>
                            <Button
                            bg="darkgreen"
                            textColor="white"
                            size='md'
                            >
                                View Feed
                            </Button>
                            </Link>
                        </VStack>
                </Flex>
                )
            })}
            </SimpleGrid>
        : null}
    </>
    )
}

export async function getStaticProps() {
    const [lists, lists_keys, success] = await GetDocuments();
    console.log(lists)
    return { props: { 
        lists
    },
    revalidate: 10
 }
}