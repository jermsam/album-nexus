import React from 'react'
import { Text } from "@chakra-ui/core";
import {MyAnchor} from 'components/navigation'

export default({...rest})=>{

    return(
        <Text color="grey" align="center" {...rest}>
        {'A music playlist built with love using '}
        <MyAnchor href="https://nextjs.org/" target='_blank'>
          next.js
        </MyAnchor> and <MyAnchor color='teal' href="https://www.prisma.io/" target='_blank'>
          prisma
        </MyAnchor>
        {' team.'}
      </Text>
    )
}

