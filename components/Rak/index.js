import React from 'react';
import Label from '../Label';
import feederStyles from '../Feeder/feeder.module.css';

function Rak(props) {
    const {children,level,distributor_level_id,datalen,type,last_feeder} = props;
    console.log("last feeder",last_feeder,datalen,level,last_feeder == level);
    console.log("rak type",type,distributor_level_id,level);
    const clickhandler = () =>{

    };

  return (
    <div className={`${feederStyles.feederDivider} ${last_feeder == level ? feederStyles.feederMark : ""}`}>
        <div className={`${feederStyles.feederWrapper}`}>
            {children}
        </div>
        <div className={`${feederStyles.feederLabel}`} onClick={clickhandler} >
            {<Label from={type} id={(type==="distribution")?distributor_level_id:level} columns={datalen}/>}
        </div>
    </div>
  )
}

export default Rak