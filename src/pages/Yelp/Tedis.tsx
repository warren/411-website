import * as React from 'react';
import * as NodeCache from 'node-cache';

const Cache: React.SFC<{}> = () => {
    const myCache = new NodeCache();
    const obj = { my: "Special", variable: 42 };
    myCache.set( "myKey", obj, function( err, success ){
      if( !err && success ){
        console.log( success );
        // true
        // ... do something ...
      }
    });
  
  
    const handleClick = () => {
      myCache.get( "myKey", function( err, value ){
        if( !err ){
          if(value == undefined){
            // key not found
          }else{
            console.log( value );
            //{ my: "Special", variable: 42 }
            // ... do something ...
          }
        }
      });
    }
    return (
        <>
            <button onClick={handleClick}> CLICK ON ME </button>
        </>
    );
}

export default Cache;

