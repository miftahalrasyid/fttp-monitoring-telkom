import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
// import styles from '../../components/Distributor/distributor.module.css';
import style from '../../styles/Odc.module.css';
import Splitter from '../../components/Splitter';
import Eth from '../../components/Eth';
import Panel from '../../components/Panel';
// import panelStyles from '../../components/panel.module.css';
import Feeder from '../../components/Feeder';
import Distributor from '../../components/Distributor';

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

function Odc({data}) {
    const router = useRouter();
    const { odcId } = router.query
    const [feederState,setFeederState] = useState({elm:"",odp:""});
    const [distributeState,setDistributeState] = useState({inUsed:{ids:[]},isActive:{ids:[]}});
    const [splitterState,setSplitterState] = useState({inUsed:{ids:[]},isActive:{ids:[]}});
    console.log("feed",data)
    const dist = data?.filter(item=>item?.odc?.id===odcId)
    useEffect(()=>{
        console.log("feederState",feederState)
        if(feederState?.elm || false){
            // feederState.elm.style.background = "yellow"
            feederState.elm.querySelector("svg").setAttribute("fill","yellow");
            // console.log("rig",feederState.elm.querySelector("svg"));
        }
    },[feederState,distributeState,splitterState])
    useEffect(()=>{
        setSplitterState((prev)=>({...prev,inUsed:{ids:dist[0]?.odc?.odp?.filter(item=>item.splitter || false).map(item=>{
            
            // })))
            return item.splitter
        })}}))
        setDistributeState((prev)=>({...prev,inUsed:{ids:dist[0]?.odc?.odp?.filter(item=>item.splitter || false).map(item=>item.distribution.reduce((newDistri,currDistri)=>{
            // setDistributeState(item.distribution.map((item=>{
                console.log("setDistributeState",currDistri)
            //     return item.connectedTo.reduce((newConnectedTo,currConnectedTo)=>{
            //         return [...newConnectedTo,...item.connectedTo]
            //     },[])
                return [...newDistri,...currDistri.connectedTo.map(port=>24*(currDistri.id-1)+port)]
                // return [...newDistri,...currDistri.connectedTo.map(item=>{
                // return [...newDistri,...currDistri.connectedTo.reduce((newConnectedTo,currConnectedTo)=>{
                // console.log("currConnectedTo is not a function",item)
                    // return [...newDistri,item]
                    // return [...newConnectedTo,currConnectedTo]
                    // return item.connectedTo
                // },[])]
            },[])).flat()}}))
    },[])
  return <div className='wrapper'><h1>Distribute</h1>
  {/* {data.map(item=><Splitter key={item.id} >
  {arr.map(item1=><Eth key={item1.id} id={item1.id} columns={item?.splitter?.capacity}/>)}</Splitter>)} */}
  {dist?.map(
      item=>{
        const splitter = new Array(item?.splitter?.capacity);
        const feeder = new Array(item?.odc?.feeder?.capacity);
        const feederlabel = new Array(parseInt(item?.odc?.feeder?.capacity)/12)
        const distributor = new Array(item?.odc?.capacity?.distributor);
        for (let index = 0; index < splitter.length; index++) {
            splitter[index] = {id:(index+1)}
            console.log("splitter odcid",splitter)
        }
        for (let index = 0; index < feeder.length; index++) {
            feeder[index] = {id:(index+1)}
        }
        for (let index = 0; index < feederlabel.length; index++) {
            feederlabel[index] = {id:(index+1)}
        }
        for (let index = 0; index < distributor.length; index++) {
            distributor[index] = {id:(index+1)}
        }
        // const inUsed = {ids:item?.odc?.odp.filter(item1=>item1.distribution || false)};
        const inUsed = {ids:item?.odc?.odp?.filter(item1=>item1.distribution || false).map(item1=>item1.id)};
        console.log(inUsed)
        const feederClickHandler = (ev) =>{
            // setFeederState(ids:item?.odc?.odp)
            // console.log("click",feederRef.current,ev.target.parentNode.getAttribute("data-id"))
            if(ev.target.parentNode.getAttribute("data-id")){
                // console.log("match",item?.odc?.odp.find(item1=>item1.id==ev.target.parentNode.getAttribute("data-id") && (item1.distribution || false)))
                if(item?.odc?.odp.find(item1=>{
                    if(item1.id==ev.target.parentNode.getAttribute("data-id") && (item1.distribution || false)){
                        if(feederState?.elm || false){
                            feederState.elm.style.background = "#6abd7c";
                            feederState.elm.querySelector("svg").setAttribute("fill","blue");
                        }
                        setFeederState({elm:ev.target.parentNode,odp:{id:item1.id,connectedTo:item1.distribution}});
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
        // feederRef?.current?.addEventListener("click",function(){
        //     console.log("click",feederRef.current)
        // })
      return <div key={"dist"+item.id}>
        <Splitter key={"s"+item.id} x={0} y={0}>
            {splitter.map(item1=><Eth from="splitter" inUsed={splitterState.inUsed} isActive={splitterState.isActive} key={"splitter"+item1.id} id={item1.id} columns={item?.splitter?.capacity}/>)}
        </Splitter>
        <Panel key={"p",item.id} x={48} y={-11}>
            {/* <div className={`${panelStyles.panelDivider}`}> */}
                <Feeder clickhandler={feederClickHandler} columns={item?.odc?.feeder?.capacity}>
                    {feeder.map(item1=><Eth from={"feeder"} inUsed={inUsed} key={"feeder"+item1.id} id={item1.id} columns={item?.odc?.feeder?.capacity}/>)}
                </Feeder>
                {/* <div>
                    {feederlabel.map(item1=><Eth inUsed={inUsed} key={"feeder"+item1.id} id={item1.id} columns={item?.odc?.feeder?.capacity}/>)}
                </div>
            </div> */}
                <Distributor clickhandler={distributorClickHandler} columns={distributor.length}>
                    {distributor.map(item1=><Eth from="distributor" inUsed={distributeState.inUsed} isActive={distributeState.isActive} key={"distributor"+item1.id} id={item1.id} columns={24}/>)}
                </Distributor>
        </Panel>
        </div>
      }
  )}
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

export async function getStaticProps({params}) {
    return {
        props:{ data: data.filter(item=>item?.odc?.id == params?.odcId)},
        revalidate:1,
    }
}

export default Layout(Odc);
