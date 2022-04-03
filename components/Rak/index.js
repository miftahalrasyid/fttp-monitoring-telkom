import React from 'react';
import Label from '../Label';
import feederStyles from '../Feeder/feeder.module.css';

function Rak(props) {
    const {children,level,datalen,type,last_feeder} = props;
    console.log("last feeder",last_feeder,datalen,level,last_feeder == level);
    const clickhandler = () =>{

    };

  return (
    <div className={`${feederStyles.feederDivider} ${last_feeder == level ? feederStyles.feederMark : ""}`}>
        <div className={`${feederStyles.feederWrapper}`}>
            {children}
        </div>
        <div className={`${feederStyles.feederLabel}`} onClick={clickhandler} >
            {<Label from={type} id={/*(type==="distribution")?level-last_feeder:*/level} columns={datalen}/>}
        </div>
    </div>
  )
}

export default Rak