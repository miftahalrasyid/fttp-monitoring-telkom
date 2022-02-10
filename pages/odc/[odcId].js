import React,{useState,useEffect, useCallback} from 'react';
import { useRouter } from 'next/router';
import {END} from 'redux-saga';
import { connect } from 'react-redux'

import Layout from '../../components/Layout';
// import styles from '../../components/Distributor/distributor.module.css';
import style from '../../styles/Odc.module.css';
import Splitter from '../../components/Splitter';
import Eth from '../../components/Eth';
import Panel from '../../components/Panel';
// import panelStyles from '../../components/panel.module.css';
import Feeder from '../../components/Feeder';
import Distributor from '../../components/Distributor';
import {
    getCoreFeederInfo,
    updateCoreFeederInfo
} from '../../components/store/odcs/actions';
import { wrapper } from "../../components/store";
import Modal from '../../components/Modal';


const data = [
    {
        splitter:{
            id:1,
            capacity:18
        },
        odc:{
            id: 'odc-ktm-fs',
            capacity:{
                feeder: 24,
                distributor: 120
            },
            feeder:{
                capacity:24
            },
            odp:[
                {
                    id:1,
                    capacity:24,
                },
                {
                    id:2,
                    splitter: 1,
                    distribution:[{
                        id:1,
                        connectedTo:[1,2],
                    }],
                    capacity:24,
                },
                {
                    id:3,
                    splitter: 2,
                    distribution:[{
                        id:1,
                        connectedTo:[3,4,5,6],
                    }],
                    capacity:24,
                },
                {
                    id:4,
                    splitter: 3,
                    distribution:[
                        {
                            id:1,
                            connectedTo:[7,8,9],
                        },
                        {
                            id:2,
                            connectedTo:[1],
                        },
                    ],
                    capacity:24,
                },
                {
                    id:5,
                    splitter: 4,
                    distribution:[
                        {
                            id:1,
                            connectedTo:[10,11,12],
                        },
                        {
                            id:2,
                            connectedTo:[2],
                        },
                    ],
                    capacity:24,
                },
                {
                    id:6,
                    capacity:24,
                },
                {
                    id:7,
                    capacity:24,
                },
                {
                    id:8,
                    capacity:24,
                },
                {
                    id:9,
                    capacity:24,
                },
                {
                    id:10,
                    capacity:24,
                },
                {
                    id:11,
                    capacity:24,
                },
                {
                    id:12,
                    capacity:24,
                },
                {
                    id:13,
                    capacity:24,
                },
                {
                    id:14,
                    capacity:24,
                },
                {
                    id:15,
                    capacity:24,
                },
                {
                    id:16,
                    capacity:24,
                },
                {
                    id:17,
                    capacity:24,
                },
                {
                    id:18,
                    capacity:24,
                },
                {
                    id:19,
                    capacity:24,
                },
                {
                    id:20,
                    capacity:24,
                },
                {
                    id:21,
                    capacity:24,
                },
                {
                    id:22,
                    capacity:24,
                },
                {
                    id:23,
                    capacity:24,
                },
                {
                    id:24,
                    capacity:24,
                },
            ],
        },
    },
];
const distri = [
    {
        name: "NODE B BRS041-RANDEGAN",
        splitter: 1,
        passive_out: 1,
        // nomor rak (D)
        ds:1,
        id:1,

    },
    {
        name: "NODE B BRS041-RANDEGAN",
        splitter:1,
        passive_out:2,
        ds:1,
        id:2
    },
    {
        name: "ODP-KTM-FS/001",
        splitter:2,
        passive_out:1,
        ds:1,
        id:3
    },
    {
        name: "ODP-KTM-FS/002",
        splitter:2,
        passive_out:2,
        ds:1,
        id:4
    },
    {
        name: "ODP-KTM-FS/003",
        splitter:2,
        passive_out:3,
        ds:1,
        id:5
    },
    {
        name: "ODP-KTM-FS/004",
        splitter:2,
        passive_out:4,
        ds:1,
        id:6
    },
    {
        name: "ODP-KTM-FS/005",
        splitter:3,
        passive_out:1,
        ds:1,
        id:7
    },
    {
        name: "ODP-KTM-FS/006",
        splitter:3,
        passive_out:2,
        ds:1,
        id:8
    },
    {
        name: "ODP-KTM-FS/007",
        splitter:3,
        passive_out:3,
        ds:1,
        id:9
    },
    {
        name: "ODP-KTM-FS/008",
        splitter:3,
        passive_out:4,
        ds:2,
        id:1
    },
    {
        name: "ODP-KTM-FS/011",
        splitter:3,
        passive_out:1,
        ds:1,
        id:10
    },
    {
        name: "ODP-KTM-FS/012",
        splitter:3,
        passive_out:2,
        ds:1,
        id:11
    },
    {
        name: "ODP-KTM-FS/013",
        splitter:3,
        passive_out:3,
        ds:1,
        id:12
    },
    {
        name: "ODP-KTM-FS/009",
        splitter:3,
        passive_out:4,
        ds:2,
        id:2
    },
]

function Odc({data,loading,coreFeederData,updateCoreFeederInfo}) {
    // console.log("loading",loading)
    // console.log("coreFeederData",coreFeederData)
    // console.log("coreFeederData",updateCoreFeederInfo)
    const router = useRouter();
    const { odcId } = router.query
    const [feederState,setFeederState] = useState({inUsed:{ids:[]},isActive:{ids:[],elm:""}});
    const [distributeState,setDistributeState] = useState({inUsed:{ids:[]},isActive:{ids:[]}});
    const [splitterState,setSplitterState] = useState({inUsed:{ids:[]},isActive:{ids:[]}});
    const showModal = useState(false);
    // console.log("feed",data)
    const dist = data?.filter(item=>item?.odc?.id===odcId)
    useEffect(()=>{
        getCoreFeederInfo();
    },[])
    const onFeederUpdate = async(values) => {
        
        const data = await values
        // console.log("on submit",data)
        updateCoreFeederInfo(data)
    }
    useEffect(()=>{
        // console.log("isactive",feederState.isActive)
        // setFeederState(prev=>({...prev,isActive:{...prev.isActive,elm:""}}))
        // feederState.isActive.elm.setAttribute("isActive",false)
    },[feederState])
    useEffect(()=>{
        setFeederState((prev)=>({...prev,inUsed:{ids:dist[0]?.odc?.odp?.filter(item=>item.distribution || false).map(item=>{
            
            return item.id
        })}}))
        setSplitterState((prev)=>({...prev,inUsed:{ids:dist[0]?.odc?.odp?.filter(item=>item.splitter || false).map(item=>{
            
            return item.splitter
        })}}))
        setDistributeState((prev)=>({...prev,inUsed:{ids:dist[0]?.odc?.odp?.filter(item=>item.splitter || false).map(item=>item.distribution.reduce((newDistri,currDistri)=>{

                return [...newDistri,...currDistri.connectedTo.map(port=>24*(currDistri.id-1)+port)]

            },[])).flat()}}))
    },[])
  return <div className='wrapper'><h1>Distribute</h1>
  {dist?.map(
      item=>{
        const splitter = new Array(item?.splitter?.capacity);
        const feeder = new Array(item?.odc?.feeder?.capacity);
        const feederlabel = new Array(parseInt(item?.odc?.feeder?.capacity)/12)
        const distributor = new Array(item?.odc?.capacity?.distributor);
        for (let index = 0; index < splitter.length; index++) {
            splitter[index] = {id:(index+1)}
        }
        for (let index = 0; index < feeder.length; index++) {
            feeder[index] = {id:(index+1)}
        }
        for (let index = 0; index < feederlabel.length; index++) {
            feederlabel[index] = {id:(index+1)}
        }
        const arr = [];
        item?.odc?.odp?.forEach(item=>item?.distribution?.map(item2=>{
            if(arr.indexOf(item2.id)==-1){
                arr.push(item2.id)
                return arr
            }
            return false
        }))
        for (let index = 0; index < distributor.length; index++) {
            distributor[index] = {id:(index+1), arr}
        }
        // console.log("distributor",distributor)
        const feederClickHandler = (ev) =>{
            // console.log("click",feederRef.current,ev.target.parentNode.getAttribute("data-id"))
            if(ev.target.parentNode.getAttribute("data-id") && ev.target.parentNode != feederState.isActive.elm){
                // console.log("match",item?.odc?.odp.find(item1=>item1.id==ev.target.parentNode.getAttribute("data-id") && (item1.distribution || false)))
                if(item?.odc?.odp.find(item1=>{
                    if(item1.id==ev.target.parentNode.getAttribute("data-id") && (item1.distribution || false)){
                        // ev.target.parentNode.setAttribute("isActive",true);
                        setFeederState((prev)=>({...prev,isActive:{ids:[item1.id],elm:ev.target.parentNode}}))
                        setDistributeState((prev)=>({...prev,isActive:{ids:item1.distribution.reduce((newElm,elm) => {
                            // console.log(element,newaja)
                            // console.log("d"+element.id,element.connectedTo.map(port=>24*(element.id-1)+port))
                            return [...newElm,...elm.connectedTo.map(port=>24*(elm.id-1)+port)]
                        },[])}}));
                        setSplitterState((prev)=>({...prev,isActive:{ids:[item1.splitter]}}))
                        // console.log("newvalue",newvalue)
                    }
                    return item1.id==ev.target.parentNode.getAttribute("data-id") && (item1.distribution || false)
                })){
                    // ev.target.parentNode
                    
                }
            }
            console.log("feeder state",feederState?.isActive?.ids[0])
            if(ev.target.parentNode === feederState.isActive.elm)
            showModal[1](true);
        }
        const distributorClickHandler = (ev) => {
            if(ev.target.parentNode.getAttribute("data-id")){
                const id = parseInt(ev.target.parentNode.getAttribute("data-id"))
                // console.log("translate",ev.target.parentNode.getAttribute("data-id"))
                const {name,splitter,passive_out} = distri?.filter(item=>item.id==id%24 && item.ds==Math.ceil(id/24))[0] || {name:"",splitter:"",passive_out:""}
                if(name && splitter && passive_out)
                alert(`ODP : ${name} \nSPLITTER : ${splitter} \nPASSIF OUT : ${passive_out}`)
                
            }
        }

        // console.log("feeder",feederRef)

      return <div key={"dist"+item.id}>
        <Splitter key={"s"+item.id} x={0} y={0}>
            {splitter.map(item1=><Eth from="splitter" inUsed={splitterState.inUsed} isActive={splitterState.isActive} key={"splitter"+item1.id} id={item1.id} columns={item?.splitter?.capacity}/>)}
        </Splitter>
        <Panel key={"p",item.id} x={48} y={-11}>
                <Feeder clickhandler={feederClickHandler} columns={item?.odc?.feeder?.capacity}>
                    {feeder.map(item1=><Eth from={"feeder"} inUsed={feederState.inUsed} isActive={feederState.isActive} key={"feeder"+item1.id} id={item1.id} columns={item?.odc?.feeder?.capacity}/>)}
                </Feeder>

                <Distributor clickhandler={distributorClickHandler} columns={distributor.length} trayName={arr}>
                    {distributor.map(item1=><Eth from="distributor" inUsed={distributeState.inUsed} isActive={distributeState.isActive} key={"distributor"+item1.id} id={item1.id} columns={24}/>)}
                </Distributor>
        </Panel>
        </div>
      }
      )}
      <Modal onSubmit={onFeederUpdate} modalTitle={feederState?.isActive?.ids[0]} {...coreFeederData[feederState?.isActive?.ids[0]]} visible={showModal}/>
  </div>;
}

export async function getStaticPaths() {
    const paths = data.map(item=>{
        return { params:{odcId: item?.odc?.id}}})
    return {
        paths,
        fallback:true,
    }
}
export const getStaticProps = async (props) =>wrapper.getStaticProps(store => async ({req, res, ...etc}) => {
        console.log("store",props)
        // const { token } = /authUserToken=(?<token>\S+)/g.exec(req.headers.cookie)?.groups || {token: ""} ;
    
            store.dispatch(getCoreFeederInfo())
            store.dispatch(END)
        await store.sagaTask.toPromise();
        return {
            props:{ data: data.filter(item=>item?.odc?.id == props?.params?.odcId)},
            revalidate:1,
        } 
      })(props);

// export async function getStaticProps({params}) {
//     return {
//         props:{ data: data.filter(item=>item?.odc?.id == params?.odcId)},
//         revalidate:1,
//     }
// }
const mapStateToProps = state => ({
    loading: state.ODCs.loading.get,
    coreFeederData: state.ODCs.coreFeederData
});
const mapFunctionToProps = {
    getCoreFeederInfo,
    updateCoreFeederInfo,
}
export default connect(mapStateToProps,{getCoreFeederInfo,updateCoreFeederInfo})(Layout(Odc));
