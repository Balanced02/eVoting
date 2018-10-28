import React from 'react';
import {Icon} from 'antd';

export default () => {
  return (
    <div className="app">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          height: '100vh',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Icon type="loading" style={{ color: 'rgba(40,40,40,40)', fontSize: "80px"}}/>
        <h4>Loading... Please Wait...</h4>
      </div>
    </div>
  );
};
