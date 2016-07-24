import React from 'react';
import {render} from 'react-dom';

export default class Header extends React.Component {
   
  render () {   
    return (<div className="header-row">
       		     <div className="left-items">
       		     	 <div className="icon home"> </div>
       		     	 <div className="app-name">|&nbsp;&nbsp;Biiling Example</div>
       		     </div>
       		   </div> 
      );
  }
}