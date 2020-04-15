import React from 'react'

import Link from 'next/link'

export const MyAnchor= React.forwardRef(({children,...rest}, ref) => (
    <a
    style={{textDecoration: 'none'}} 
    ref={ref}
    {...rest}
    >
      {children}
    </a>
    
  ));




export const MyLink= React.forwardRef(({children,href,...rest}, ref) => (
    <Link {...{href,ref}} >
        <a {...rest} >
            {children}
        </a>
    </Link>
    
  ));


