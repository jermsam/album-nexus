import React from 'react'
import {Button, Icon,
    List, ListItem,  Image, Flex, Text, Stack, Heading 
} from "@chakra-ui/core";
import debounce from 'lodash.debounce'
import { Search,  } from 'semantic-ui-react'
import Link from 'next/link'
import YoutubeSearch from 'youtube-api-search';


const key = 'AIzaSyCT5YNj0WpEUrt_4K8b3GZ6NoBZTOImXMA';



export const Song = ({ name, artist, albumCoverUrl,...rest }) => (
    
        <Flex {...rest}>
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
            {artist&&<Text fontSize="lg" color="gray.700">{artist.name}</Text>}
          </Stack>
        </Flex>
     
  );
  
  

export const SongList= ({ songs }) => (
    <List>
      {songs.map((song) => (
          <ListItem
          key={song.id}
          border="1px solid"
          borderColor="gray.200"
          borderRadius={4}
          my={2}
          bg="white"
        >
          <Link href={`/songs/${song.id}`} as={`/songs/${song.id}`} passHref>
        <Song as='a'  {...song} />
        </Link>
    </ListItem>
      ))}
    </List>
  );

  
  
  const resultRenderer = (song) => <Song {...song}/>

export const SongForm =()=>{
    const [isLoading,setIsLoading] = React.useState(false)
    const [results,setResults] = React.useState([])
    const [value,setValue] = React.useState('')
    const [isSubmitting,setIsSubmitting] = React.useState(false)
    const [selected,setSelected] = React.useState(null)

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
                          artist:{
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
            const {artist,albumCoverUrl,id,name}=selected
            const res= await fetch('http://localhost:3000/api/artists', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        name:artist.name
                    }
                ),
              });
              console.log(res)

            const song ={
               artistId:res.id,
                albumCoverUrl,
                youtubeId:id,
                name
            }
            console.log(song)

          await fetch('http://localhost:3000/api/songs', {
                method: 'POST',
                body: JSON.stringify(
                   song
                ),
              });

            setIsSubmitting(false)
              setValue('')
           }
            
        },[selected]
    )

    const onResultSelect = (e, { result }) => {
        setValue(result.name)
        setSelected(result)
    }

    

    return(
       
           <Flex margin='1rem' >

           <Flex marginTop='.4rem'>
           <Search
           fluid
            placeholder='search youtube'
            icon={<div/>}
             
           size='huge'
                    loading={isLoading}
                  
                    onSearchChange={debounce(handleSearchChange, 500, {
                      leading: true,
                    })}
                   {...{results,value,resultRenderer,onResultSelect}}
                   
                   
                  />
            </Flex>
            <Flex  marginLeft='1rem' >
            <Button
              mt={4}
              variantColor="teal" 
              variant="outline"
              isLoading={isSubmitting}
              type="submit"
              onClick={onSubmit}
              size="lg"
            >
             <Icon name='add' /> add to play list
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