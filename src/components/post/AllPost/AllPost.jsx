import React from 'react'
import { useState, useEffect } from 'react'
import { IndividualPost } from './IndividualPost/IndividualPost'
export const AllPost = (props) => {
  return (
    <div>
        {props.allPost.length > 0 ? props.allPost.map((post)=>{
            return <IndividualPost/>
        }) : null}
    </div>
  )
}
