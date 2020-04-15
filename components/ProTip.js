import React from 'react';
import { Heading, Icon,
} from "@chakra-ui/core";




export default function ProTip({...rest}) {
 
  return (
    <Heading  color="grey" {...rest}>
      <Icon name='info'/>
     Pro Ziki
    </Heading>
  );
}
