import React from 'react'
import { Component } from 'react';

class checkCookie extends Component.React {
  constructor(){
    super()
    this.state({
      isLogin: false
    })
  }
  render (){
    if(this.state.isLogin == false){
      
    }

    return(
      <>
        {
          this.props.children
        }
      </>
    )
  }
}

export default checkCookie;