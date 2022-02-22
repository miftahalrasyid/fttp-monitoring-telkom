import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import {END} from 'redux-saga';
import { connect, useDispatch } from 'react-redux';

import Layout from '../../components/Layout';
// import styles from '../../components/Distributor/distributor.module.css';
// import style from '../../styles/Odc.module.css';
import Splitter from '../../components/Splitter';
import Eth from '../../components/Eth';
import Panel from '../../components/Panel';
// import panelStyles from '../../components/panel.module.css';
import Feeder from '../../components/Feeder';
import Distributor from '../../components/Distributor';
import {
    getCoreFeederInfo,
    updateCoreFeederInfo,
    getODCsBox,
    getSplitterData
} from '../../components/store/odcs/actions';
import { wrapper,makeStore } from "../../components/store";
import store from '../../components/store'
import Modal from '../../components/Modal';


function Odc({data,loading,coreFeederData,coreFeederDataClient,splitterData,updateCoreFeederInfo}) {
    const dispatch = useDispatch();
    // console.log("loading",loading)
    // console.log("coreFeederData",coreFeederData)
    // console.log("coreFeederDataClient",coreFeederDataClient)
    
    const router = useRouter();
    const { odcId } = router.query;
    const [feederState,setFeederState] = useState({inUsed:{ids:[]},isActive:{ids:[],elm:""}});
    const [distributeState,setDistributeState] = useState({inUsed:{ids:[]},isActive:{ids:[]}});
    const [splitterState,setSplitterState] = useState({inUsed:{ids:[]},isActive:{ids:[]}});
    const showModal = useState(false);

    const onFeederUpdate = async(values) => {
        
        const data = await values
        // console.log("on submit",data)
        updateCoreFeederInfo(data)
    }
    useEffect(()=>{
        // console.log("data",data)
        // console.log("splitterData",splitterData)
        // getCoreFeederInfo();
        // if(window!==undefined)
        dispatch(getCoreFeederInfo())
        // dispatch(getSplitterData())
    },[])
    useEffect(()=>{
        setFeederState((prev)=>({...prev,inUsed:{ids:data[0]?.odc?.odp?.filter(item=>item.distribution || false).map(item=>{
            
            return item.id
        })}}))
        setSplitterState((prev)=>({...prev,inUsed:{ids:data[0]?.odc?.odp?.filter(item=>item.splitter || false).map(item=>{
            
            return item.splitter
        })}}))
        setDistributeState((prev)=>({...prev,inUsed:{ids:data[0]?.odc?.odp?.filter(item=>item.splitter || false).map(item=>item.distribution.reduce((newDistri,currDistri)=>{

                return [...newDistri,...currDistri.connectedTo.map(port=>24*(currDistri.id-1)+port)]

            },[])).flat()}}))
    },[])
  return <div className='wrapper'>
      <h1>Distribute</h1>
  {data?.map(
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
            // console.log("feeder state",feederState?.isActive?.ids[0])
            if(ev.target.parentNode === feederState.isActive.elm)
            showModal[1](true);
        }
        const distributorClickHandler = (ev) => {
            if(ev.target.parentNode.getAttribute("data-id")){
                const id = parseInt(ev.target.parentNode.getAttribute("data-id"))
                // console.log("translate",ev.target.parentNode.getAttribute("data-id"))
                const {name,splitter,passive_out} = splitterData?.filter(item=>item.id==id%24 && item.ds==Math.ceil(id/24))[0] || {name:"",splitter:"",passive_out:""}
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
      <Modal onSubmit={onFeederUpdate} modalTitle={feederState?.isActive?.ids[0]} {...(JSON.stringify(coreFeederData)!==JSON.stringify(coreFeederDataClient))? coreFeederDataClient[feederState?.isActive?.ids[0]]:coreFeederData[feederState?.isActive?.ids[0]]} visible={showModal}/>
  </div>;
}
// const getStore = async () => {
//     store = makeStore();
//     store.dispatch(getODCsBox())
//     store.dispatch(getCoreFeederInfo())
//     store.dispatch(END)
//     await store.sagaTask.toPromise();
//     return store.getState();
// }
export const getStaticPaths = async() => {
    store = makeStore();
    store.dispatch(getODCsBox())

    store.dispatch(getCoreFeederInfo())
    store.dispatch(END)
    await store.sagaTask.toPromise();
    // store = await getStore();
    // console.log("static props rtest",store)
    // console.log("static props rtest",store.getState().ODCs)
    const paths = store.getState().ODCs.odcsBox.map(item=>{
        return { params:{odcId: item?.odc?.id}}})
    return {
        paths,
        fallback:'blocking',
    }
}
// export const getStaticPaths = async(props) => wrapper.getInitialPageProps(store => async ({req, res, ...etc}) => {
//     // const { token } = /authUserToken=(?<token>\S+)/g.exec(req.headers.cookie)?.groups || {token: ""} ;
//     console.log("static props rtest",this)

//     // console.log("store",store.getState().ODCs.odcsBox,req,res)
//     const paths = data.map(item=>{
//         return { params:{odcId: item?.odc?.id}}});
//     return {
//         paths,
//         fallback:true,
//     }
//       });
export const getStaticProps = async (props) => wrapper.getStaticProps(store => async ({req, res, ...etc}) => {
    // const { token } = /authUserToken=(?<token>\S+)/g.exec(req.headers.cookie)?.groups || {token: ""} ;
    store.dispatch(getODCsBox())
    store.dispatch(getSplitterData())
    store.dispatch(getCoreFeederInfo())
    store.dispatch(END)
    await store.sagaTask.toPromise();
    console.log("static props",store.getState())
    // console.log("store",store.getState().ODCs.odcsBox,req,res)
    const {params:{odcId}} = props;
    const {ODCs:{odcsBox=[],splitterData=[],coreFeederData=[]}} = store.getState();
    // console.log("store",odcsBox.filter(item=>item?.odc?.id == odcId))
    // console.log("store",splitterData)
    // console.log("core feeder",coreFeederData)
        if(odcsBox.filter(item=>item?.odc?.id == odcId).length==0){
            return {
                notFound: true
            }
        }
        else{
            return {
                props:{ data: odcsBox.filter(item=>item?.odc?.id == odcId),splitterData,coreFeederData},
                revalidate:60,
            } 

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
    coreFeederDataClient: state.ODCs.client.coreFeederData,
});
const mapFunctionToProps = {
    getSplitterData,
    getCoreFeederInfo,
    updateCoreFeederInfo,
    getODCsBox
}
export default connect(mapStateToProps,mapFunctionToProps)(Layout(Odc));
