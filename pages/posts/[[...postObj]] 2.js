import React from 'react'
import {useRouter} from 'next/router';
import Link from 'next/link';
import {getODCsBox} from '../../components/store/odcs/actions';
import {connect} from 'react-redux';

function Posts({odcBox,getODCsBox}) {
    const router = useRouter();
    const {postObj = []} = router.query;
    const [odcStateBox, setOdcStateBox] = React.useState([]);
    console.log("odcStateBox",odcStateBox)
    // console.log("props",props)
    React.useEffect(()=>{
        console.log("postobj",postObj)
        console.log("odcBox",odcBox)
        getODCsBox();
    },[])
    React.useEffect(()=>{
        setOdcStateBox([...odcBox,{test:"test"}]);
    },[odcBox])
    React.useEffect(()=>{
        console.log("odcStateBox",odcStateBox)

    },[odcStateBox])
    switch (postObj.length) {
        case 1:
            return (<>
                <div>Posts {postObj[0]}</div>
                <Link href={"/posts/2/review"}>
                    <a>
                        go to post review
                    </a>
                </Link>
            </>)
            break;
        case 2:
            return (
                <div>Posts {`${postObj[0]} ${postObj[1]}`}</div>
            
              )
            break;
    
        default:
            break;
    }
    return <div>
        <Link href={"/posts/2"}>
            <a>
                go to post 2
            </a>
        </Link>
    </div>
  
}
const mapStateToProps = state => ({
    odcBox: state.ODCs.odcsBox
})

export default connect(mapStateToProps,{getODCsBox})(Posts)