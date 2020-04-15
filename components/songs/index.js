/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Button, Icon,
    List, ListItem,  Image, Flex, Text, Stack, Heading 
} from "@chakra-ui/core";
import debounce from 'lodash.debounce'
import {Search,  Container } from 'semantic-ui-react';
import Link from 'next/link'
import YoutubeSearch from 'youtube-api-search';
import { useMutation,useQuery } from "@apollo/react-hooks";

import {SongsQuery,CreateSongMutation} from 'pages/api/apollo'


const key = process.env.YOUTUBE_KEY;




export const Song = ({ name, Artist, albumCoverUrl }) => {

 

  return(
    
    
      <Flex>
       <Image
          size="100px"
          borderTopLeftRadius={4}
          borderBottomLeftRadius={4}
          objectFit="cover"
          src={albumCoverUrl||"imgs/imgpchd.png"}
          alt={name}
          mr={4}
        />
        <Stack mt={4}>
          <Heading size="lg" fontWeight="500">
            {name}
          </Heading>
          {Artist&&<Text fontSize="lg" color="gray.700">{Artist.name}</Text>}
        </Stack>
      </Flex>
   
)
  
}
  
  

export const SongList= () => {

  const [songs,setSongs]=React.useState([])
const { data,loading,error  } =useQuery(SongsQuery);

React.useEffect(
  ()=>{
    if(data){
      console.log(data)
    setSongs(data.songs)
    }
  },[data]
)


  return(

    <List>
      {loading&&<ListItem>


... loading ...

</ListItem>}
      {songs.map(({ name, Artist, albumCoverUrl,id }) => (
         
         <ListItem
         key={id}
          border="1px solid"
          borderColor="gray.200"
          borderRadius={4}
          my={2}
          bg="white"
        >
          <Link 
         href={`/songs/${id}`} as={`/songs/${id}`}>
           <a>
           <Song   {...{ name,Artist, albumCoverUrl,id }} />
           </a>
         </Link>
        
       
    </ListItem>
    
      ))}
      {error&&<ListItem>

... unkown Error! ...

</ListItem>}
    </List>
  );

}
  
  
  const resultRenderer = (song) => <Song {...song}/>

export const SongForm =()=>{
    const [isLoading,setIsLoading] = React.useState(false)
    const [results,setResults] = React.useState([])
    const [value,setValue] = React.useState('')
    const [isSubmitting,setIsSubmitting] = React.useState(false)
    const [selected,setSelected] = React.useState(null)
    const [createSong] = useMutation(CreateSongMutation);

    const handleSearchChange =(e, target) => {

            const term = target.value || '';
            
            const part = 'id,snippet';
            const type = 'video';
            setValue(term);
           
       
        setIsLoading(true)
        setValue(target.value)
            console.log(target)
            YoutubeSearch({ key, term, part, type }, (videos) => {
             
                try {
                  if (videos) {
                     const items = videos.map(
                         ({id:{videoId},snippet:{title,thumbnails:{default:{url}},channelId,channelTitle}})=>({
                          id:videoId, 
                          name:title, 
                          Artist:{
                              id:channelId,
                              name:channelTitle
                          }, 
                          albumCoverUrl:url||"imgs/imgpchd.png",  
                         })
                     )
                    
              
              setIsLoading(false)
             setResults(items)
                     console.log(items)
                  }
                 
                } catch ({ data: { error: { message } } }) {
                  console.log('err: ', message);
                //  getError(message);
                }
              });
           
          }

   

    const onSubmit =React.useCallback(
        async ()=>{
           if(selected){
            setIsSubmitting(true)
            const {Artist,albumCoverUrl,id,name}=selected
            const variables= {
              artist:Artist.name,
              name,
              albumCoverUrl,
              youtubeId:id
            }
        
            await createSong({ variables });

            setIsSubmitting(false)
              setValue('')
           }
            window.location.reload()
        },[selected,createSong]
    )

    const onResultSelect = (e, { result }) => {
        setValue(result.name)
        setSelected(result)
    }

    

    return(
       
           <Flex flex marginTop='3rem' marginBottom='2rem' justify='center' >

         <Container style={{minWidth:'36clear0px'}}>
         <Search
         style={{ borderRadius: "0px !important"}}
           fluid
            placeholder='Search for a video from youtube'
            icon={<div/>}
            input={{ fluid: true }}
           size='huge'
                    loading={isLoading}
                  
                    onSearchChange={debounce(handleSearchChange, 500, {
                      leading: true,
                    })}
                   {...{results,value,resultRenderer,onResultSelect}}
                   
                   
                  />
         </Container>
            <Flex flex flexDirection='row'  marginLeft='1rem'  align='center' >
            <Button
              mt={4}
              variantColor="teal" 
              variant="outline"
              isLoading={isSubmitting}
              marginTop='0'
              onClick={onSubmit}
              size="lg"
              type='submit'
            >
             <Icon name='add' /> 
            </Button>
            </Flex>

           </Flex>
         
    )
}  

export const SongVideo =({youtubeId})=>{

    return  <iframe
    title={youtubeId}
    width="100%"
    height="315"
    src={`https://www.youtube.com/embed/${youtubeId}`}
    frameBorder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
}