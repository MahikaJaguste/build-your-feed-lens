import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

// db
import { GetADocument, GetDocuments } from "../../utils/db/createList/crudData";

// lens
import { getPublications } from "../../lens-api/publication/get-publications";


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
    Spinner,
    List,
  ListIcon,
  ListItem,
  Stack
} from '@chakra-ui/react';

export default function CreateList({
    listTitle,
    creatorList
}) {

    const [pubsList, setPubsList] = useState([]);
    const [pubsPageInfo, setPubsPageInfo] = useState(null);
    
    async function doGetPubs() {
        try {
            let temp_pubsList = pubsList;
            let cursor = null;
            let response = [];
            if(pubsPageInfo){
                cursor = pubsPageInfo.next
            }
            for(let creator of creatorList) {
                response = await getPublications(creator, cursor);
                if(response.data.publications.items.length){
                    temp_pubsList.push(...response.data.publications.items)
                }
            }
            setPubsList(temp_pubsList);
            setPubsPageInfo(response.data.publications.pageInfo)
        }
        catch (err) {
            console.log('error in getPublications', err);
        }
    }

    useEffect(() => {
        if(creatorList && creatorList.length) {
            doGetPubs()
        }
    }, [creatorList]);

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
            // mr='60px'
            fontSize={50}
            letterSpacing='1.5px'
            >
            {listTitle}
        </Heading>
        
        <Link href='/explore-posts'>
          <Button
            bg="darkgreen"
            textColor="white"
            size='md'
        >
            Back to Explore Posts
        </Button>
        </Link>

    </Flex>

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
    >
    
        <Flex
            w='600px'
            minH='300px'
            borderRadius='50px'
            justifyContent='center'
            pt='30px'
        >
        <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={2}
            // align='stretch'
        >

        {pubsList.length ?
            pubsList.map((obj, index) => {
                // console.log(obj);
                return (
                    // <div>
                    //     <p>{obj.metadata.content}</p>
                    //     <p>by {obj.profile.handle}</p>
                    //     <p>{obj.stats.totalAmountOfCollects} collects</p>
                    //     <p>{obj.stats.totalAmountOfComments} comments</p>
                    //     <p>{obj.stats.totalAmountOfMirrors} mirrors</p>
                    // </div>

                    <Box 
                    borderRadius='20'
                    boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                    w='1000px'
                    px='20px'
                    py='5px'
                    >
                    <VStack
                    alignItems='flex-start'
                    spacing={6}
                    justifyContent='flex-start'
                    pt='5px'
                    pb='8px'
                    >
                        <Text  fontSize='xs'
                        color="primary.800"
                        opacity="0.6"
                        >{obj.profile.handle}</Text>
                        <Text>{obj.metadata.content}</Text>
                        <Text
                        fontSize='md'
                        color="primary"
                        opacity="0.6"
                        >{obj.stats.totalAmountOfCollects} collects &emsp; {obj.stats.totalAmountOfComments} comments &emsp; {obj.stats.totalAmountOfMirrors} mirrors</Text>
                    </VStack>
                    </Box>
                )
            })
        :
                <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='darkgreen'
                size='xl'
                mt='75px'
                w={10} h={10}
            />
        }

        </VStack>
    </Flex>
        
    {creatorList && creatorList.length && pubsList && pubsList.length ? 
        
          <Button
            bg="darkgreen"
            textColor="white"
            size='md'
            onClick={doGetPubs}
        >Fetch more pubs
        </Button>: null }

        
      </Stack>
        
    </>
    )
}



export async function getStaticProps({params}) {
    const response = await GetADocument(params.docId)
    let creatorList = [];
    let listTitle = 'No such list exists';

    if(response) {
        creatorList = response.creatorList;
        listTitle = response.title
    }
    
    return { props: { 
        creatorList,
        listTitle
    },
    revalidate: 10,
 }
}

export async function getStaticPaths() {
    const [lists, lists_keys, success] = await GetDocuments();
    const paths = lists_keys.map((elem ) => ({params : {docId : elem}}))
    return {
        // paths: [{params: {docId:'051PtCWYr5xS6OhRLBlH'}}],
        paths,
        fallback: false
    }
}