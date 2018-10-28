import React from 'react';
// import { Button } from 'antd';
import '../containers/App/global.css'


export default ({ submit }) => {

  return (
    	 <a onClick={submit} className="float">
		    <i className="fa fa-envelope fa-2x my-float"></i>
		 </a>
  );
};






