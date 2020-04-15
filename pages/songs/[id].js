import React from 'react';
import Link from 'next/link'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {Box,Flex,Heading,Text,Button} from '@chakra-ui/core'
import {Container} from 'semantic-ui-react'
import Router,{ useRouter } from 'next/router'
import {SongQuery,DeleteSongMutation} from 'pages/api/apollo'

export default () => {


  const songId =Number( useRouter().query.id)
  const { loading, error, data } = useQuery(SongQuery, {
    variables: { songId },
  })

  const [deleteSong] = useMutation(DeleteSongMutation)

  if (loading) {
    console.log('loading')
    return <div>Loading ...</div>
  }
  if (error) {
    console.log('error')
    return <div>Error: {error.message}</div>
  }

  console.log(`response`, data)

  const{ name,youtubeId,} = data.song
  
  const artistName = data.song.Artist ? data.song.Artist.name : 'Unknown artist'
  return(
    <Container text>
      <Box mt={8}>
      <Heading color="grey" fontWeight="800">{name}</Heading>
     <Text color="grey.700" mb={4}>
        {artistName}
      </Text>
      <iframe
      title={youtubeId}
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${youtubeId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <Flex>
      <Flex marginTop='1rem' marginRight='1rem'>
      <Link href="/">
        <Button as="a" mt={4} leftIcon="arrow-back" >
          Back
        </Button>
      </Link>
      </Flex>
      <Flex margin='1rem'>
   
        <Button as="a" mt={4} leftIcon="delete" 
         onClick={async () => {
          await deleteSong({
            variables: {
              songId,
            },
          })
         Router.push('/')
        }}
        >
          Delete Song
        </Button>
       
      </Flex>
      </Flex>
      
    </Box>
    </Container>
  );
}