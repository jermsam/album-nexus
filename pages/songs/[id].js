import React from 'react';
import Link from 'next/link'
import {getSong,findSongs} from 'pages/api'
import {Box,Heading,Text,Button} from '@chakra-ui/core'
import {Container} from 'semantic-ui-react'


export async function getStaticProps({params:{id}}) {
  const {youtubeId,name} = await  getSong(Number(id))
  return {
    props: {
        name,
        youtubeId
      
    }
  };
}

export async function getStaticPaths() {
  const songs= await findSongs()
  return {
    paths: songs.map((song) => ({
      params: {
        id: song.id.toString()
      }
    })),
    fallback: false
  };
}

export default ({ youtubeId,name ,artist}) => (
  <Container text>
    <Box mt={8}>
    <Heading color="grey" fontWeight="800">{name}</Heading>
   { artist&&<Text color="grey.700" mb={4}>
      {artist}
    </Text>}
    <iframe
    title={youtubeId}
      width="100%"
      height="315"
      src={`https://www.youtube.com/embed/${youtubeId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
    <Link href="/">
      <Button as="a" mt={4} leftIcon="arrow-back">
        Back
      </Button>
    </Link>
  </Box>
  </Container>
);