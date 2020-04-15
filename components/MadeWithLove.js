import React from 'react'
import { Text, Link } from "@chakra-ui/core";


export default({...rest})=>{

    return(
        <Text color="grey" align="center" {...rest}>
        {'A music playlist built with love using '}
       
        <Link href="https://nextjs.org/" target='_blank' color="teal.500">
  next.js
        </Link> 
        , <Link  href="https://www.prisma.io/" target='_blank' color="orange.500">
        prisma
        </Link> and {" "}
        <Link href="https://www.nexusjs.org/#/components/schema/plugins/prisma" target='_blank' color="pink.500">
         
          nexus
         
        </Link>
        {' team.'}
      </Text>
    )
}

