import React from 'react';

import MadeWithLove from 'components/MadeWithLove'
import ProTip from 'components/ProTip';
import { Box,Divider } from "@chakra-ui/core";
import {SongForm, SongList} from 'components/songs'

import { Container } from 'semantic-ui-react';


export default()=> {
  return (
    <Container text>
      <Divider/>
    <Box >
  
      <ProTip margin={{bottom:'none'}}/>
      <MadeWithLove margin={{top:'none',bottom:"large"}}/>

    </Box>
    <SongForm/>
    <SongList/>
  </Container>
    
  );
}


