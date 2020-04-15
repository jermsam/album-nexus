import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from 'graphql-tag'
import fetch from 'node-fetch';
// import auth0 from 'auth0-js'
/** configure apollo client */

const uri=`${process.env.URL}/api`

const cache = new InMemoryCache();
const link = new HttpLink({
    uri, 
    fetch
});


/*
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      authorization: token ,
    }
  }
});

link= authLink.concat(link)

*/

const client =new ApolloClient({
  cache,
  link
});

/*
const webAuth = new auth0.WebAuth({
  clientID: process.env.CLIENT_ID,
  domain: process.env.DOMAIN,
  redirectUri: process.env.REDIRECT_URI,
  responseType: 'token id_token',
  scope: 'openid email profile'
});
*/



export default client // {client,webAuth}

export const SongQuery = gql`
query SongQuery($songId: Int!){
  song(where:{id:$songId}){
    id,
    name,
    youtubeId,
    artistId,
    albumCoverUrl,
    Artist{
      id,
      name
    }
  }
}
`

export const SongsQuery = gql`
query SongsQuery{
  songs{
    id,
    name,
    youtubeId,
    artistId,
    albumCoverUrl,
    Artist{
      id,
      name
    }
  }
}
`
export const CreateSongMutation = gql`
  mutation CreateSongMutation($artist:String!,$name:String!,$albumCoverUrl:String!,$youtubeId:String!) {
    
    createOneArtist(
    data: {
    name: $artist
      Song: {
        create: [
          {
           name:$name,
           albumCoverUrl:$albumCoverUrl,
            youtubeId:$youtubeId
          }
        ]
      }
    }
  ) {
    id
    name,
    Song{
      id,
      name,
      youtubeId,
      artistId,
      albumCoverUrl
    }
  }

  }
`


export const DeleteSongMutation = gql`
  mutation DeleteSongMutation($songId: Int!) {
    
deleteOneSong(where:{id:$songId}){
  id,
    name,
    youtubeId,
    artistId,
    albumCoverUrl,
    Artist{
      id,
      name
    }
}
    


  }
`