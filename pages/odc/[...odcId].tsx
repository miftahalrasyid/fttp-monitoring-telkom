import React, { useState, useCallback, useEffect, useRef, CSSProperties } from 'react';
import { useRouter } from 'next/router';
import withAuth from '../../components/Auth';
import dynamic from 'next/dynamic'
import Link from 'next/link';
import { END } from 'redux-saga';
import { connect, useDispatch } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
// import Layout from '../../components/Layout';
// import styles from '../../components/Distributor/distributor.module.css';
import styles from './odc.module.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import splitterStyle from '../../components/Splitter/splitter.module.css';
// import styles from '../../components/Feeder/feeder.module.css'
import Splitter from '../../components/Splitter';
import Eth from '../../components/Eth';
import ethStyles from '../../components/Eth/eth.module.css';
import Rak from '../../components/Rak';
import Panel from '../../components/Panel';
import { MdOutlineViewSidebar } from 'react-icons/md';
import Button from '@mui/material/Button';
import { ButtonProps, ThemeOptions } from '@mui/material'
import Dropzone from 'react-dropzone';
import { AiOutlineFile } from 'react-icons/ai';
import { BsDownload } from 'react-icons/bs';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
const Editor = dynamic(() => import("react-draft-wysiwyg").then(mod => mod.Editor), { ssr: false }) as any;

// import panelStyles from '../../components/panel.module.css';
// import Feeder from '../../components/Feeder';
// import Distributor from '../../components/Distributor';
// import {
//     MdInventory,
//     MdNfc,
//     MdSettingsInputComposite,
//     MdOutlineDateRange,
//     MdOpenInBrowser,
//     MdRemoveRedEye,
//     MdDeleteForever
//   } from 'react-icons/md';
// import {} from 'mui-datatables'
import { createTheme, MuiThemeProvider, styled } from "@material-ui/core/styles";
import { createTheme as customCreateTheme, ThemeProvider } from "@mui/material/styles";
const DynamicMUIDataTable = dynamic(() => import('mui-datatables'), { ssr: false }) as any;

import {
  getRegionList,
  getWitelList,
  getDatelList,
  getSTOList,
  getMerekList,
  getOcdSplitpanelStatus,
  getOcdSplitpanelDetail,
  updateODCData,
  setSelectedCoreFeeder,
  deleteSelectedCoreFeeder as IdeleteSelectedCoreFeeder,
  upsertODCFile,
  updateNotes,
  updateODCPort,
  getActivityLog,
  setTableRowsPerPage
} from '../../components/store/odcs/actions';
import { changePageTo as IchangePageTo } from '../../components/store/layouts/actions'
import { wrapper, makeStore } from "../../components/store";
// import store from '../../components/store'
import Modal from '../../components/Modal';
import {
  Modal as MuiModal,
  Box
} from '@mui/material';
import {
  MdOutlineClose,
} from 'react-icons/md';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import NativeSelect from '@mui/material/NativeSelect';
import {
  styled as styledCustom
} from "@mui/material/styles";
import { toast } from 'react-toastify';

declare module '@mui/material/styles' {
  // fix the type error when calling `createTheme()` with a custom theme option
  interface ThemeOptions {
    status?: {
      success?: string;
      primary?: string;
      darkgray?: string;
      warning?: string;
      info?: string;
    };
  }
}
// const CustomSelect = styledCustom(Select)(({theme})=>({
//     '.MuiList-root': {
//       display: "flex",
//       flexDirection: "column",
//     },
//   }))
const CustomButton = styledCustom(Button)<ButtonProps>(({ itemType }) => ({
  position: (itemType == "floating" ? "absolute!important" : itemType == "download" ? "absolute!important" : "unset!important") as any,
  bottom: itemType == "floating" ? "17%" : itemType == 'download' ? "10%" : "",
  backgroundColor: "#C7417F !important",
  color: "white !important"
}))
const CustomButtonModal = styledCustom(Button)<ButtonProps>(({ theme, btntype }) => ({
  background: btntype == 'submit' ? theme.status.success : btntype == 'cancel' ? "gray !important" : theme.status.primary,
}));
// const getMuiTheme = () =>
// createTheme({
//   CustomButtonActivityLog: {
//     primary: "#ee2d24!important",
//     darkgray: "darkgray!important"
//   },
//   overrides: {
//     MuiOutlinedInput:{
//       root:{
//         color: "#ee2d24!important"
//       }
//     },
//     MuiTableRow:{
//       color:"#ee2d24",
//     },
//     MuiInput:{
//       underline:{'&:after':{borderBottomColor:"#ee2d24!important"}}
//     },
//     MuiButton:{
//       textPrimary:{
//         color: "#ee2d24!important"
//       }
//     },
//     MuiCheckbox:{
//       colorPrimary:{
//         color:"#ee2d24!important"
//       }
//     },
//     MUIDataTableToolbar:{
//       icon:{'&:hover': {color: '#ee2d24'}},
//       iconActive:{color:'#ee2d24'}
//     },
//     MuiPaper:{
//       root:{
//         boxShadow:"none!important"
//       }
//     },
//     MUIDataTableBodyCell: {
//       root: {
//         whiteSpace: "nowrap"
//       },
//     },
//   },
// });

const getMuiTheme = () =>
  customCreateTheme({
    status: {
      success: "#009873!important",
      primary: "#B10040!important",
      darkgray: "darkgray!important"
    } as any,
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            // margin:"1rem 0",
            // background: 'rgba(255,255,255,0.3)',
            background: 'transparent',
            // padding:'0 1rem',
            boxShadow: "none",
            ".MuiList-root": {
              width: "100%"
            },
            ".MuiMenuItem-root": {
              width: "100%",
              display: "flex",
              paddingTop: "8px",
              paddingBottom: "8px",
            }
          }
        }
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            background: "white",
            boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
          }
        }
      },
      // MuiTable:{
      //   styleOverrides:{
      //     root:{
      //       width: "calc(100% - 2rem)",
      //       marginLeft: "1rem"
      //     }
      //   }
      // },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color: "#ee2d24!important"
          }
        }
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "'GothamRounded-Book' !important"
          }
        }
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            fontFamily: "'GothamRounded-Book' !important"
          }
        }
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            color: "#ee2d24",
            backgroundColor: "transparent"
            // background:"rgba(255,255,255,0.3)"
          },
          "head": {
            // backgroundImage:"linear-gradient(to right,rgba(178,98,98,0.3),rgb(255 228 228 / 30%))",
            backgroundImage: "linear-gradient(to right,rgb(237 167 88 / 30%),rgb(253 243 236 / 30%))",
          },
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            "span": {
              display: "flex",
              justifyContent: "center",
            },
          },
          head: {
            backgroundColor: "transparent !important",
          }
        }
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%) !important"
          },
          list: {
            background: "white",
          }
        }
      },
      MuiInput: {
        styleOverrides: {
          underline: { '&:after': { borderBottomColor: "#ee2d24!important" } }
        }
      },
      MuiButton: {
        styleOverrides: {
          textPrimary: {
            color: "#ee2d24!important"
          }
        }
      },
      MuiCheckbox: {
        styleOverrides: {
          colorPrimary: {
            color: "#ee2d24!important"
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            flex: " 0 0 auto !important",
            color: "rgba(0, 0, 0, 0.54) !important",
            padding: " 12px !important",
            overflow: "visible !important",
            fontSize: "1.5rem !important",
            textAlign: "center!important" as any,
            transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
            borderRadius: " 50% !important",
            '&:hover': { color: '#ee2d24 !important' },
            '&[class*="iconActive"]': {
              color: '#ee2d24 !important'
            }
          },

        }
      },
      MuiToolbar: {
        styleOverrides: {
          root: {

          },
        }
      },
    }
  });

function Odc({
  data: ODCData,
  userData,
  activityLog,
  activity_log_client,
  getActivityLog_odcSaga,
  viewOdcClient,
  deleteSelectedCoreFeeder,
  token,
  updateNotes_odcSaga,
  updateODCPort_odcSaga,
  setSelectedCoreFeeder_odcSaga,
  upsertODCFile_odcSaga,
  changePageTo,
  gotopage,
  ODCdetailDataClient
}: {
  getActivityLog_odcSaga: typeof getActivityLog,
  data: any,
  activityLog: any,
  activity_log_client: any,
  userData: any,
  viewOdcClient: any,
  deleteSelectedCoreFeeder: typeof IdeleteSelectedCoreFeeder,
  token: any,
  updateNotes_odcSaga: typeof updateNotes,
  updateODCPort_odcSaga: typeof updateODCPort,
  setSelectedCoreFeeder_odcSaga: typeof setSelectedCoreFeeder,
  upsertODCFile_odcSaga: typeof upsertODCFile
  ODCdetailDataClient: any,
  gotopage: string,
  changePageTo: typeof IchangePageTo
}) {
  // console.log("odcdetail data [...odcid]",ODCdetailDataClient)
  const notes = useRef(null);
  // console.log("ODC Data",ODCData)
  /**
   * variables for Selected ODC 
   */
  // console.log("data raw [...odcid]",ODCDataClient)
  const dispatch = useDispatch();
  // console.log("focus feeder",feederFocus)
  // choose saga datastream (server || client)
  /**
   * startpoint route /odc/odc-ktm-fs
   */
  const router = useRouter();
  const { odcId } = router.query;
  // console.log("editor", Editor);

  // console.log("odc_id",odcId)
  const {
    odc_name,
    capacity,
    merek,
    port_feeder_terminasi,
    rak_oa,
    panel_oa,
    kml_name,
    kml_size,
    kml_file,
    mc_name,
    mc_size,
    mc_file,
    notes: serverNotes,
    port,
    deployment_date,
    region_name,
    witel_name,
    datel_name,
    sto_name,
    // splitter={splitter:{position:[]},data:[],position:"top left"},panel={data:[],position:"top left"}} = ODCData;
    splitter = { splitter: { position: [] }, data: [], position: "top left" }, panel = { data: [], position: "top left" } } = (viewOdcClient || false) ? viewOdcClient : ODCData;
  const feederModal = useState({ type: "", status: false });
  // const [feederFocus,setFeederFocus] = useState(false); 
  const [newTableState, setNewTableState] = useState({ page: 0, rowsPerPage: 5, search_text: null, sort: { orderBy: null, direction: null }, filter: [] })
  const delay = useRef(null);
  const [feederFocus, setFeederFocus] = useState(
    {
      distribution: [
        {
          distribution_id: "",
          distribution_index: null,
          distribution_level: null,
          distribution_level_id: null
        }, {
          distribution_id: "",
          distribution_index: null,
          distribution_level: null,
          distribution_level_id: null
        }, {
          distribution_id: "",
          distribution_index: null,
          distribution_level: null,
          distribution_level_id: null
        }, {
          distribution_id: "",
          distribution_index: null,
          distribution_level: null,
          distribution_level_id: null
        }],

      distributionElm: [null, null, null, null],
      feeder: { feeder_id: '', feeder_index: null, feeder_level: null },
      feederElm: null,
      odpName: ['', '', '', ''],
      splitter: { splitter_id: '', splitter_index: null },
      splitterElm: null
    });
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
  }
  const panelClickHandler = useCallback((ev) => {
    /**
     * on feeder click start
     */
    /**if the feeder are idle */
    // console.log(ev.target.style.borderColor,hexToRgb("#75767e"), ev.target.parentNode.getAttribute("data-type")=="feeder")
    if (/bgray/.test(ev.target.className) && ev.target.parentNode.getAttribute("data-type") == "feeder") {
      // if(ev.target.children[1].getAttribute("fill")=="#75767e"){
      feederModal[1]({ type: "add", status: true });
      if (feederFocus && (ev.target.children[1] !== feederFocus)) {

        if (feederFocus.feederElm?.style) {
          feederFocus.feederElm.parentNode.classList.remove(ethStyles.active)
          feederFocus.feederElm.classList.remove(ethStyles.byellow);
          feederFocus.feederElm.classList.add(ethStyles[feederFocus.feederElm.parentNode.getAttribute("data-from")]);
          // feederFocus.feederElm.setAttribute("data-to","")
        }
        if (feederFocus.splitterElm?.style) {
          feederFocus.splitterElm.classList.remove(ethStyles.byellow);
          feederFocus.splitterElm.classList.add(ethStyles[feederFocus.splitterElm.parentNode.getAttribute("data-from")]);
        }
        feederFocus.distributionElm?.forEach(item => {
          if (item) {
            item.childNodes[0].classList.remove(ethStyles.byellow);
            item.childNodes[0].classList.add(ethStyles[item.childNodes[0].parentNode.getAttribute("data-from")]);
          }
        })
      }
      // console.log("feederFocus", feederFocus)
      setFeederFocus(() => {
        const [{ data = [{
          id: "",
          index: "",
          pass_through: "",
          status: "",
          passive_out: [],
        }], rak_index }] = panel.data.filter(pnl => pnl.rak_level.toString() == ev.target.parentNode.getAttribute('data-rak'));
        // console.log("feeder detail", data.filter(item => item.index == ev.target.parentNode.getAttribute('data-id')))
        const [{ id: feeder_id, index: feeder_index, rak_level: feeder_level }] = data.filter(item => item.index == ev.target.parentNode.getAttribute('data-id'))
        return {
          distribution: [
            {
              distribution_id: "",
              distribution_index: null,
              distribution_level: null,
              distribution_level_id: null
            }, {
              distribution_id: "",
              distribution_index: null,
              distribution_level: null,
              distribution_level_id: null
            }, {
              distribution_id: "",
              distribution_index: null,
              distribution_level: null,
              distribution_level_id: null
            }, {
              distribution_id: "",
              distribution_index: null,
              distribution_level: null,
              distribution_level_id: null
            }],

          distributionElm: [null, null, null, null],
          feeder: { feeder_id, feeder_index, feeder_level },
          feederElm: null,
          odpName: ['', '', '', ''],
          splitter: { splitter_id: '', splitter_index: null },
          splitterElm: null,
          portType: "idle"
        }
      })
    }

    /**if the feeder are used */
    // console.log(ev.target.children[1].getAttribute("fill"))
    else if ((/bblue/.test(ev.target.className) || /bpriority/.test(ev.target.className)) && ev.target.parentNode.getAttribute("data-type") == "feeder") {
      // else if(ev.target.children[1].getAttribute("fill")=="blue" && ev.target.getAttribute("data-type")=="feeder"){
      // ev.target.setAttribute("data-to","#ffda00")
      setFeederFocus(() => {

        /* ketika klik feeder used lainnya*/
        if (feederFocus && (ev.target.children[1] !== feederFocus)) {

          if (feederFocus.feederElm) {
            feederFocus.feederElm.parentNode.classList.remove(ethStyles.active)
            feederFocus.feederElm.classList.remove(ethStyles.byellow)
            feederFocus.feederElm.classList.add(ethStyles[feederFocus.feederElm.parentNode.getAttribute("data-from")]);
            // feederFocus.feederElm.style.borderColor = feederFocus.feederElm.parentNode.getAttribute("data-from");
            // feederFocus.feederElm.setAttribute("data-to","")
          }
          if (feederFocus.splitterElm) {
            feederFocus.splitterElm.classList.remove(ethStyles.byellow);
            feederFocus.splitterElm.classList.add(ethStyles[feederFocus.splitterElm.parentNode.getAttribute("data-from")]);
            // feederFocus.splitterElm.style.borderColor = feederFocus.splitterElm.parentNode.getAttribute("data-from");
          }
          feederFocus.distributionElm?.forEach(item => {
            if (item) {
              item.childNodes[0].classList.remove(ethStyles.byellow)
              item.childNodes[0].classList.add(ethStyles[item.childNodes[0].parentNode.getAttribute("data-from")])
              // item.childNodes[0].style.borderColor = item.childNodes[0].parentNode.getAttribute("data-from");

            }
          })
        }
        const [{ data = [{
          id: "",
          index: "",
          pass_through: "",
          status: "",
          passive_out: [],
        }], rak_index }] = panel.data.filter(pnl => pnl.rak_level.toString() == ev.target.parentNode.getAttribute('data-rak'));

        /**
         * data
         * {
         * id,
         * index,
         * passthrough,
         * passive_out:{
         *   distribution:{}
         *   feeder:{}
        *   name:
        *   po_index:
        *   splitter:{
        *     splitter_id:
        *     splitter_index
        * 
      *     }
         *   }
         * }
         */

        /** simpan data splitter,feeder, dan distributor didalam state setFeederFocus jika belum ada nilai data yang di fokus*/
        const [{
          passive_out = [{
            distribution: {
              distribution_id: "",
              distribution_index: "",
              distribution_level: ""
            },
            feeder: {
              feeder_id: "",
              feeder_index: "",
              feeder_level: ""
            },
            splitter: {
              splitter_id: "",
              splitter_index: "",
              splitter_level: ""
            }
          }]
          , pass_through, status, index: feederIndex }] = data.filter(rpnl => rpnl.index.toString() === ev.target.parentNode.getAttribute('data-id'));
        return passive_out.reduce((prevPa, currPa) => {
          // console.log("feeder on focus",status,prevPa)
          // return passive_out.reduce(pa=>{
          // console.log("rak children",document.querySelector(`[data-id="${pa.splitter.splitter_index}"][data-type="splitter"]`))
          /** change color from used to focused with pass_through condition for splitter*/
          /** kondisi jika tidak passthrough */
          const splitter = ((!pass_through) ? document.querySelector(`[data-id="${currPa.splitter.splitter_index}"][data-type="splitter"]`).children[0] as HTMLElement : null);
          if (!pass_through) {
            splitter.classList.remove(ethStyles.bblue);
            splitter.classList.add(ethStyles.byellow);
            // splitter.style.borderColor = "#ffda00";
          }
          const distribution = (currPa.distribution) ? document.querySelector(`[data-id="${currPa.distribution.distribution_index}"][data-rak="${currPa.distribution.distribution_level}"]`) : null;
          if (currPa.distribution) {
            // (distribution.childNodes[0] as HTMLElement).style.borderColor = "#ffda00";
            (distribution.childNodes[0] as HTMLElement).classList.remove(ethStyles.bblue);
            (distribution.childNodes[0] as HTMLElement).classList.add(ethStyles.byellow);
          }
          // splitter.style.borderColor = "#ffda00";
          // console.log("ethstyles",ethStyles)
          ev.target.parentNode.classList.add(ethStyles.active)
          ev.target.classList.remove(ethStyles.bblue);
          ev.target.classList.add(ethStyles.byellow);
          // ev.target.style.borderColor = "#ffda00";

          // console.log("prev pa",prevPa,currPa)
          // console.log("feeder elm",splitter,distribution)
          return {
            /** assign new data to either remove or add focused status */
            splitterElm: splitter,
            feederElm: ev.target,
            distributionElm: [...prevPa.distributionElm, distribution],
            /** input all passive out data for later Modal popup */
            odpName: [...prevPa.odpName, currPa.name],
            splitter: currPa.splitter,
            feeder: currPa.feeder,
            distribution: [...prevPa.distribution, currPa.distribution],
          }
        }, { splitterElm: null, feederElm: null, odpName: [], distributionElm: [], distribution: [] });
        /**
         * set splitter focused
         */
        //  document.querySelector(`[data-id="${splitter.splitter_index}"]`).children[1].style.fill="#ffda00"
        // console.log("selected feeder",passive_out,splitter,document.querySelector(`[data-id="${splitter.splitter_index}"]`))
      });
      // console.log("blue",ev.target.style.borderColor == "blue",hexToRgb("#ffda00"))
    }
    /**if the feeder already focused */
    // else if(((ev.target.getAttribute("data-to") || false) && hexToRgb(ev.target.getAttribute("data-to")))==hexToRgb("#ffda00") && ev.target.parentNode.getAttribute("data-type")=="feeder"){
    else if (/byellow/.test(ev.target.className) && ev.target.parentNode.getAttribute("data-type") == "feeder") {
      // else if(ev.target.children[1].getAttribute("fill")=="#ffda00" && ev.target.getAttribute("data-type")=="feeder"){
      // console.log("feederFocus",feederFocus,feederModal[0])
      setFeederFocus(() => {

        /* ketika klik feeder used lainnya*/
        if (feederFocus && (ev.target.children[1] !== feederFocus)) {

          if (feederFocus.feederElm?.style) {
            feederFocus.feederElm.parentNode.classList.remove(ethStyles.active)
            feederFocus.feederElm.classList.remove(ethStyles.byellow)
            feederFocus.feederElm.classList.add(ethStyles[feederFocus.feederElm.parentNode.getAttribute("data-from")])
            // feederFocus.feederElm.style.borderColor = feederFocus.feederElm.parentNode.getAttribute("data-from");
            // feederFocus.feederElm.setAttribute("data-to","")
          }
          if (feederFocus.splitterElm?.style) {
            feederFocus.splitterElm.classList.remove(ethStyles.byellow)
            feederFocus.splitterElm.classList.add(ethStyles[feederFocus.feederElm.parentNode.getAttribute("data-from")])
          }
          // feederFocus.splitterElm.style.borderColor = feederFocus.splitterElm.parentNode.getAttribute("data-from");
          feederFocus.distributionElm?.forEach(item => {
            if (item) {
              item.childNodes[0].classList.remove(ethStyles.byellow);
              item.childNodes[0].classList.add(ethStyles[item.childNodes[0].parentNode.getAttribute("data-from")]);
            }
          })
        }
        const [{ data = [{
          id: "",
          index: "",
          pass_through: "",
          status: "",
          passive_out: [],
        }], rak_index }] = panel.data.filter(pnl => pnl.rak_level.toString() == ev.target.parentNode.getAttribute('data-rak'));

        /**
         * data
         * {
         * id,
         * index,
         * passthrough,
         * passive_out:{
         *   distribution:{}
         *   feeder:{}
        *   name:
        *   po_index:
        *   splitter:{
        *     splitter_id:
        *     splitter_index
        * 
      *     }
         *   }
         * }
         */

        /** simpan data splitter,feeder, dan distributor didalam state setFeederFocus jika belum ada nilai data yang di fokus*/
        const [{
          passive_out = [{
            distribution: {
              distribution_id: "",
              distribution_index: "",
              distribution_level: ""
            },
            feeder: {
              feeder_id: "",
              feeder_index: "",
              feeder_level: ""
            },
            splitter: {
              splitter_id: "",
              splitter_index: "",
              splitter_level: ""
            }
          }]
          , pass_through, status, index: feederIndex }] = data.filter(rpnl => rpnl.index.toString() === ev.target.parentNode.getAttribute('data-id'));
        return passive_out.reduce((prevPa, currPa) => {
          // console.log("feeder on focus",status,prevPa)
          // return passive_out.reduce(pa=>{
          // console.log("rak children",document.querySelector(`[data-id="${pa.splitter.splitter_index}"][data-type="splitter"]`))
          /** change color from used to focused with pass_through condition for splitter*/
          /** kondisi jika tidak passthrough */
          const splitter = ((!pass_through) ? document.querySelector(`[data-id="${currPa.splitter.splitter_index}"][data-type="splitter"]`).children[0] as HTMLElement : null);
          if (!pass_through) {
            splitter.classList.remove(ethStyles.bblue);
            splitter.classList.add(ethStyles.byellow);
          }
          const distribution = (currPa.distribution) ? document.querySelector(`[data-id="${currPa.distribution.distribution_index}"][data-rak="${currPa.distribution.distribution_level}"]`) : null;
          if (currPa.distribution) {
            (distribution.childNodes[0] as HTMLElement).classList.remove(ethStyles.bblue);
            (distribution.childNodes[0] as HTMLElement).classList.add(ethStyles.byellow);
          }
          // splitter.style.borderColor = "#ffda00";
          // console.log("ethstyles",ethStyles)
          ev.target.parentNode.classList.add(ethStyles.active)
          feederFocus.feederElm.classList.remove(ethStyles.bblue)
          feederFocus.feederElm.classList.add(ethStyles.byellow)


          // console.log("prev pa",prevPa,currPa)
          // console.log("feeder elm",splitter,distribution)
          return {
            /** assign new data to either remove or add focused status */
            splitterElm: splitter,
            feederElm: ev.target,
            distributionElm: [...prevPa.distributionElm, distribution],
            /** input all passive out data for later Modal popup */
            odpName: [...prevPa.odpName, currPa.name],
            splitter: currPa.splitter,
            feeder: currPa.feeder,
            distribution: [...prevPa.distribution, currPa.distribution],
            portType: "used"
          }
        }, { splitterElm: null, feederElm: null, odpName: [], distributionElm: [], distribution: [] });
        /**
         * set splitter focused
         */
        //  document.querySelector(`[data-id="${splitter.splitter_index}"]`).children[1].style.fill="#ffda00"
        // console.log("selected feeder",passive_out,splitter,document.querySelector(`[data-id="${splitter.splitter_index}"]`))
      });
      feederModal[1]({ type: "edit", status: true });
      // console.log("feederFocus", feederFocus, feederModal[0])
    }
    else if (!/bgray/.test(ev.target.className) && ev.target.parentNode.getAttribute("data-type") == "distribution") {

      // else if(ev.target.children[1].getAttribute("fill")=="blue" && ev.target.getAttribute("data-type")=="distribution"){
      const [{ data: dataDist = [{
        id: "",
        index: "",
        pass_through: "",
        status: "",
        passive_out: [],
      }] }] = panel.data.filter(pnl => pnl.rak_level.toString() === ev.target.parentNode.getAttribute('data-rak'));
      // console.log('data dist',dataDist.filter(dt=>dt.index.toString()==ev.target.parentNode.getAttribute('data-id')))
      if (dataDist.filter(dt => dt.index.toString() == ev.target.parentNode.getAttribute('data-id'))[0].passive_out || false) {
        // const [{ passive_out: [{ name, po_index, splitter = { splitter_index: "" } }] }] = dataDist.filter(dt => dt.index.toString() == ev.target.parentNode.getAttribute('data-id'));
        // {name,po_index,splitter:{splitter_index}}
        // console.log("distribution port click data",passive_out);
        // alert("ODP Name: " + name + "\n" + "Splitter: " + splitter_index + "\nPassive Out: " + po_index)
      }
    }

    /**
     * on feeder click end
     */
    // console.log(ev.target)
    //   console.log("feeder click",feederModal[0])

  }, [feederModal, feederFocus, panel.data])
  // }, [feederModal, feederFocus, panel.data, viewOdcClient])
  // console.log("render again",viewOdcClient)
  /**
   * startpoint route /odc/odc-ktm-fs
   */

  /**
   * variables for status page
   * @param {*} values 
   */

  useEffect(() => {
    // console.log("feeder focus",feederFocus)
  }, [feederFocus])
  /**
   * variables for activity log page
   */
  const [datatable, setDatatable] = useState([[]]);
  useEffect(() => {
    setDatatable(activityLog?.data?.map(item => ([
      item.row_number,
      item.email,
      item.role_name,
      item.created_at,
      item.action
    ])))
  }, [activityLog])
  useEffect(() => {
    if (activity_log_client?.success || false)
      setDatatable(activity_log_client.data.map(item => ([
        item.row_number,
        item.email,
        item.role_name,
        item.created_at,
        item.action
      ])))
    // console.log("activity log client",activity_log_client)
    // console.log("re render data",(viewOdcClient || false)?viewOdcClient:ODCData)
  }, [activity_log_client])
  /** upload mc variables*/
  const [MCSelectedFiles, setMCSelectedFiles] = useState([])
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };
  const handleAcceptedMCFiles = files => {
    files.map((file, idx) => {
      // console.log("uploaded file", file, file.type, file.type.split("/")[1] !== ('png' || 'jpeg' || 'jpg'))
      let metadata: any = {};
      metadata.idx = idx;
      if (file.type.split("/")[1] !== ('png' || 'jpeg' || 'jpg'))
        metadata.preview = URL.createObjectURL(file)
      // else
      // metadata.thumbnail = (file.type.split("/")[1]!==('vnd.openxmlformats-officedocument.spreadsheetml.sheet'))
      metadata.formattedSize = formatBytes(file.size)
      return Object.assign(file, metadata)
    }
    );
    setMCSelectedFiles(files);
  };
  /** download mc variables */
  const handleMCDownload = async () => {
    fetch(mc_file).then(response => response.blob())
      .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = mc_name;
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove();  //afterwards we remove the element again         
      });
  }
  /** upload kml variables*/
  const [KMLSelectedFiles, setKMLSelectedFiles] = useState([])
  // console.log("kml ",kml_name,KMLSelectedFiles.length==0 && (kml_name || false))
  const handleAcceptedKMLFiles = files => {
    files.map((file, idx) => {
      // console.log("uploaded file",file,file.type,file.type.split("/")[1]!==('png' || 'jpeg' || 'jpg'))
      let metadata: any = {};
      metadata.idx = idx;
      // if(file.type.split("/")[1]!==('kml' || 'kmz'))
      if (file.type.split("/")[1] !== ('png' || 'jpeg' || 'jpg'))
        metadata.preview = URL.createObjectURL(file)
      // else
      // metadata.thumbnail = (file.type.split("/")[1]!==('vnd.openxmlformats-officedocument.spreadsheetml.sheet'))
      metadata.formattedSize = formatBytes(file.size)
      return Object.assign(file, metadata)
    }
    );
    setKMLSelectedFiles(files);
  };
  /** download kml variables */
  const handleKmlDownload = async () => {
    fetch(kml_file).then(response => response.blob())
      .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = kml_name;
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove();  //afterwards we remove the element again         
      });
  }

  /**
   * notes open
   */
  const [convertedContent, setConvertedContent] = useState(null);
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  }
  const convertContentToHTML = () => {
    // console.log("editor state", draftToHtml(convertToRaw(editorState.getCurrentContent())));
    // console.log("editor state", editorState.getCurrentContent());
    // console.log("current context",convertToHTML(editorState.getCurrentContent()));
    let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    // let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }
  const [notesModal, setNotesModal] = useState(false);
  const notesHandleClose = () => {
    setNotesModal(false)
  }
  useEffect(() => {
    const htmlToDraft = require('html-to-draftjs').default as any;
    // console.log("html to draft", htmlToDraft(serverNotes || ""))
    if (typeof window !== 'undefined') {

      const contentBlock = htmlToDraft(serverNotes || "");
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      setEditorState(EditorState.createWithContent(contentState))
      setConvertedContent(serverNotes || "");
    }
  }, [serverNotes])


  /** display odc panel */
  if (odcId.length == 1) {
    return <div className={`wrapper ${styles.odcIdWrapper}`}>
      {((viewOdcClient || false) ? viewOdcClient : ODCData) &&
        <div className={styles.odcWrapper}>
          <div className={`odcdetail row ${styles.odcDetail}`}>

            <div className={`row ${styles.alldetailItems}`}>
              <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                <Typography sx={{ whiteSpace: "nowrap" }}>Nama ODC : </Typography>
                <Typography sx={{ textTransform: "uppercase", whiteSpace: "nowrap" }}>{odc_name}</Typography>
              </div>
              <hr className={`${styles.hr}`} />
              <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                <Typography>Kapasitas : </Typography>
                <Typography>{capacity || ""}</Typography>
              </div>
              <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                <Typography>Merek : </Typography>
                <Typography>{merek || ""}</Typography>
              </div>
              <hr className={`${styles.hr}`} />
              <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                <Typography>Deployment Date : </Typography>
                <Typography>{deployment_date || ""}</Typography>
              </div>
              <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                <Typography>Port feeder terminasi : </Typography>
                <Typography>{port_feeder_terminasi || ""}</Typography>
              </div>
              <hr className={`${styles.hr}`} />
              <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                <Typography>Rak OA : </Typography>
                <Typography>{rak_oa || ""}</Typography>
              </div>
              <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                <Typography>Panel : </Typography>
                <Typography>{panel_oa || ""}</Typography>
              </div>
              <hr className={`${styles.hr}`} />
              <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                <Typography>Port : </Typography>
                <Typography>{port || ""}</Typography>
              </div>
              <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                <Typography>Regional : </Typography>
                <Typography>{region_name || ""}</Typography>
              </div>
              <hr className={`${styles.hr}`} />
              <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                <Typography>Witel : </Typography>
                <Typography>{witel_name || ""}</Typography>
              </div>
              <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                <Typography>Datel : </Typography>
                <Typography>{datel_name || ""}</Typography>
              </div>
              <hr className={`${styles.hr}`} />
              <div className={`${styles.odcItem} col-12 col-md-6 col-sm-12`}>
                <Typography>STO : </Typography>
                <Typography>{sto_name || ""}</Typography>
              </div>
            </div>
            <div>
            </div>

          </div>
          <div className={`${styles.odcpanel} row`}>
            <div className={styles.splitPanelWrapper}>
              {/* <div className={styles.splitPanelWrapper} style={{height:"1000px"}}> */}
              <div className={`${styles.grouper}`}>
                <Splitter x={splitter.position ? (splitter.position.split(" ")[1] == "left" ? "0" : "") : ""} y={splitter.position.split(" ")[0] == "top" ? "0" : ""}>
                  {splitter.data.map(s_item =>
                    <Eth from="splitter" key={"eth" + s_item.index} id={s_item.index} status={s_item.status}
                      columns={splitter.data.length} />
                  )}
                </Splitter>

                <div className={`${splitterStyle.videoWrapper}`} style={{ left: (splitter.position.split(" ")[1] == "left" ? "0px" : ""), top: (splitter.position.split(" ")[0] == "top" ? "" : "") }}>
                  {/* <div className={`${splitterStyle.videoWrapper}`} style={{left: (splitter.position.split(" ")[1]=="left"? "0px":""),top:(splitter.position.split(" ")[0]=="top"? "320px":"")}}> */}
                  {/* <div className={`${splitterStyle.splitWrapper}`} style={{top:"250px",left:"0px"}}> */}
                  <div className={`${splitterStyle.card}`}>
                    <div className={`${splitterStyle.cardHeader} ${splitterStyle.cardHeaderBlue}`} style={{ zIndex: "1" }}>


                      <h4 className={splitterStyle.cardTitle}>Video</h4>
                    </div>
                    <div className={`${splitterStyle.videoContainer}`}>
                      <iframe frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} width="315" height="auto"
                        // type="text/html"
                        src="https://www.youtube.com/embed/_cAIkgb5I0E?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=http://youtubeembedcode.com"></iframe>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
                <div className={`${splitterStyle.legendWrapper}`} style={{ left: (splitter.position.split(" ")[1] == "left" ? "0px" : ""), top: (splitter.position.split(" ")[0] == "top" ? "" : "") }}>
                  {/* <div className={`${splitterStyle.legendWrapper}`} style={{left: (splitter.position.split(" ")[1]=="left"? "0px":""),top:(splitter.position.split(" ")[0]=="top"? "600px":"")}}> */}
                  {/* <div className={`${splitterStyle.splitWrapper}`} style={{top:"250px",left:"0px"}}> */}
                  <div className={`${splitterStyle.card}`}>
                    <div className={`${splitterStyle.cardHeader} ${splitterStyle.cardHeaderPurple}`} style={{ zIndex: "1" }}>


                      <h4 className={splitterStyle.cardTitle} >Legends</h4>
                    </div>
                    <div className={`${splitterStyle.legendContainer}`}>

                      <div className='col-md-12 col-lg-12'>
                        <div className="row">
                          <div className='col-sm-12 col-md-6 col-lg-6'>
                            <div className='row'>
                              <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
                                focused
                              </div>
                              <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
                                <div className={styles.portBorder} style={{ borderColor: '#ffda00' }}>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-sm-12 col-md-6 col-lg-6'>
                            <div className='row'>
                              <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
                                priority
                              </div>
                              <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
                                {/* <MdOutlineViewSidebar fill='#ee2d24'/> */}
                                <div className={styles.portBorder} style={{ borderColor: '#ee2d24' }}>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* </div> */}
                        {/* <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'> */}
                        <div className="row">
                          <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                            <div className='row'>
                              <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
                                used
                              </div>
                              <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
                                {/* <MdOutlineViewSidebar fill='blue'/> */}
                                <div className={styles.portBorder} style={{ borderColor: 'blue' }}>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                            <div className='row'>
                              <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
                                idle
                              </div>
                              <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
                                {/* <MdOutlineViewSidebar /> */}
                                <div className={styles.portBorder} style={{ borderColor: 'gray' }}>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                            <div className='row'>
                              <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
                                broken
                              </div>
                              <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
                                {/* <MdOutlineViewSidebar fill='black'/> */}
                                <div className={styles.portBorder} style={{ borderColor: 'black' }}>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Panel x={splitter?.position.split(" ")[1] == "left" ? "" : ""} y={splitter.position.split(" ")[0] == "top" ? "0" : ""}>
                {/* <Panel x={splitter?.position.split(" ")[1] == "left" ? "375":""} y={splitter.position.split(" ")[0] == "top" ? "0":""}> */}
                {/* <Panel x={panel.position.left} y={panel.position.top}> */}
                {panel.data.map((r_item, idx) => {
                  // console.log("odc data panel",r_item.rak_index)
                  return <Rak key={'r' + r_item.rak_level} distributor_level_id={r_item.rak_index} last_feeder={panel.data.filter(item => item.type === "feeder").length} level={r_item.rak_level} type={r_item.type} datalen={12}>
                    {r_item.data.map(p_item =>
                      /** odd even to define 13-24 */
                      <Eth from={r_item.type} clickHandler={panelClickHandler} key={"port" + p_item.index} rak_level={r_item.rak_level} rak_index={r_item.rak_index} id={p_item.index} status={p_item.status} panel={panel}
                        // <Eth from={r_item.type} clickHandler={panelClickHandler} key={"port"+p_item.index} rak_level={r_item.rak_level} id={((idx+1)%2===0)?(p_item.index+12):p_item.index} status={p_item.status}
                        columns={r_item.data.length} />
                    )}
                  </Rak>

                })}
              </Panel>
            </div>
            {/* <div className={styles.odcFiles}> */}
            <Modal token={token} dispatchFn={{ setSelectedCoreFeeder: setSelectedCoreFeeder_odcSaga, deleteSelectedCoreFeeder }} open={feederModal[0].status} header={"Feeder " + feederFocus.feeder.feeder_index} splitterData={splitter.data} panelData={panel.data} feederModal={feederModal} feederFocus={feederFocus} setFeederFocus={setFeederFocus} />
            {/* <script async src="https://telegram.org/js/telegram-widget.js?18" data-telegram-login="miftah1112_bot"
                data-size="large" data-onauth="onTelegramAuth(user)" data-request-access="write"></script> */}


          </div>
          <div className={`download_upload_file ${styles.downupload} row`}>
            {/* <div className={`download_upload_file row ${styles.odcFiles}`}> */}

            <div className={`col-6 col-md-6 col-sm-12 ${styles.uploadContainer}`} style={{ position: "relative", minWidth: "370px" }}>
              {/* <div className={`${splitterStyle.splitWrapper}`} style={{top:"250px",left:"0px"}}> */}
              <div className={`${splitterStyle.card} ${styles.filesCard}`}>
                <div className={`${splitterStyle.cardHeader} ${splitterStyle.cardPinkish} ${splitterStyle.uploadCardStyle}`} style={{ zIndex: "1" }}>


                  <h4 className={splitterStyle.cardTitle}>KML Data</h4>
                </div>
                <div className={`${splitterStyle.splitContainer} ${splitterStyle.kmlCardContainer}`}>
                  <div className={styles.uploadFileWrapper}>
                    {/* <a target="_blank" href="https://icons8.com/icon/111876/xls">XLS</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */}

                    <Dropzone
                      accept={{
                        'application/vnd.google-earth.kml+xml': ['.kml', '.kmz'],
                        // 'application/vnd.google-earth.kml+xml': ['.kml','.kmz'],
                        // 'application/vnd.google-earth.kmz': ['.kmz'],
                      } as any}
                      // accept={'image/xls, image/xlsx' as any}
                      onDrop={acceptedFiles =>
                        handleAcceptedKMLFiles(acceptedFiles)
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className={`dropzone ${styles.dropzoneCustom}`} style={{ paddingBottom: KMLSelectedFiles.length !== 0 && "3rem" }}>
                          <div
                            className="dz-message needsclick"
                            // className="dz-message needsclick mt-2"
                            {...getRootProps()}
                          >
                            <div className={styles.dropzoneHotspot}>
                              <input {...getInputProps()} className="form-control" />
                              {/* <div className="mb-3">
                            <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
                        </div> */}
                              {KMLSelectedFiles.length == 0 && (kml_name == "" || kml_name == null) ? [<div key={"kml_downloadIcon"} className={styles.downloadIcon}>
                                <BsDownload />
                              </div>, <h6 key={"kml_subtitle"}>klik disini untuk upload file</h6>] :
                                KMLSelectedFiles.length == 0 && (kml_name || false) ? [<div key={"kml_fileSelected"} className={styles.fileSelected}>
                                  <AiOutlineFile />
                                </div>, <div className={styles.fileDetail} key={"kml_saved_kml"}>
                                  <span >{kml_name}</span>
                                  <span> {kml_size}</span>
                                </div>,
                                <h6 key={"kml_inst"} className={`${styles.inst}`}>
                                  klik area sekitar untuk memperbarui file
                                </h6>,
                                <div key={"kml_hr"} className={`${styles.hrLine}`}> <p>atau</p><hr ></hr></div>] :
                                  [<div key={"kml_fileSelected_2"} className={styles.fileSelected}>
                                    <AiOutlineFile />
                                  </div>, KMLSelectedFiles.map(item => <div className={styles.fileDetail} key={"kml" + item.idx}>
                                    <span>{item.name}</span>
                                    <span> {item.formattedSize}</span>
                                  </div>)]
                              }
                            </div>

                          </div>
                        </div>
                      )}
                    </Dropzone>
                    {KMLSelectedFiles.length !== 0 && <CustomButton itemType='floating' variant={'standard' as any} onClick={() => upsertODCFile_odcSaga(KMLSelectedFiles[0].name, odcId[0], token, toast, KMLSelectedFiles[0], setKMLSelectedFiles, null, null)}>Unggah</CustomButton>}
                    {(KMLSelectedFiles.length == 0 && kml_name) && <CustomButton itemType='download' variant={'standard' as any} onClick={handleKmlDownload}>Unduh</CustomButton>}

                  </div>
                </div>
              </div>
            </div>
            <div className={`col-6 col-md-6 col-sm-12 ${styles.uploadContainer}`} style={{ position: "relative", minWidth: "370px" }}>
              {/* <div className={`col-6 col-sm-12 ${splitterStyle.splitWrapper}`} style={{position:"relative",minWidth:"279px"}}> */}
              {/* <div className={`${splitterStyle.splitWrapper}`} style={{top:"250px",left:"0px"}}> */}
              <div className={`${splitterStyle.card} ${styles.filesCard}`}>
                <div className={`${splitterStyle.cardHeader} ${splitterStyle.cardPinkish} ${splitterStyle.uploadCardStyle}`}
                  style={{ zIndex: "1" }}>


                  <h4 className={splitterStyle.cardTitle}>MC Data</h4>
                </div>
                <div className={`${splitterStyle.splitContainer} ${splitterStyle.kmlCardContainer}`}>
                  <div className={styles.uploadFileWrapper}>
                    <Dropzone
                      accept={{
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx', '.xls'],
                        'application/vnd.ms-excel': ['.xls']
                      } as any}
                      onDrop={acceptedFiles =>
                        handleAcceptedMCFiles(acceptedFiles)
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className={`dropzone ${styles.dropzoneCustom}`} style={{ paddingBottom: MCSelectedFiles.length !== 0 && "3rem" }}>
                          <div
                            className="dz-message needsclick"
                            // className="dz-message needsclick mt-2"
                            {...getRootProps()}
                          >
                            <div className={styles.dropzoneHotspot}>

                              <input {...getInputProps()} className="form-control" />
                              {/* <div className="mb-3">
                            <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
                        </div> */}
                              {MCSelectedFiles.length == 0 && (mc_name == "" || mc_name == null) ? [<div key={"mc_downloadIcon"} className={styles.downloadIcon}>
                                <BsDownload />
                              </div>, <h6 key={"mc_subtitle"}>klik disini untuk upload file</h6>] :
                                MCSelectedFiles.length == 0 && (mc_name || false) ? [<div key={"mc_fileSelected"} className={styles.fileSelected}>
                                  <AiOutlineFile />
                                </div>, <div className={styles.fileDetail} key={"mc_saved_mc"}>
                                  <span >{mc_name}</span>
                                  <span> {mc_size}</span>
                                </div>,
                                <h6 key={"mc_inst"} className={`${styles.inst}`}>
                                  klik area sekitar untuk memperbarui file
                                </h6>,
                                <div key={"mc_hr"} className={`${styles.hrLine}`}> <p>atau</p><hr ></hr></div>] : [<div key={"mc_fileSelected_2"} className={styles.fileSelected}>
                                  <AiOutlineFile />
                                </div>,
                                MCSelectedFiles.map(item => <div className={styles.fileDetail} key={"mc" + item.idx}>
                                  <span>{item.name}</span>
                                  <span> {item.formattedSize}</span>


                                </div>)]
                              }

                            </div>

                          </div>
                        </div>
                      )}
                    </Dropzone>
                    {MCSelectedFiles.length !== 0 && <CustomButton itemType='floating' variant={'standard' as any} onClick={() => upsertODCFile_odcSaga(MCSelectedFiles[0].name, odcId[0], token, toast, null, null, MCSelectedFiles[0], setMCSelectedFiles)}>Unggah</CustomButton>}
                    {(MCSelectedFiles.length == 0 && mc_name) && <CustomButton itemType='download' variant={'standard' as any} onClick={handleMCDownload}>Unduh</CustomButton>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`row`}>
            <div className={`${styles.notesContainer}`}>
              Notes:
              {/* <textarea ref={notes} name="" id="" cols={30} rows={10} defaultValue={serverNotes}></textarea> */}
              <Button onClick={() => setNotesModal(true)} style={{ top: '-9px' }} variant={"outlined"}>Buka</Button>
              {/* <Button onClick={() => updateNotes_odcSaga(notes.current.value, odcId[0], token, toast)} variant={"outlined"}>Edit</Button> */}
              <MuiModal open={notesModal} onClose={notesHandleClose} aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <div >
                  <div className={styles.closebtn}>
                    <MdOutlineClose />
                  </div>
                  <Box itemRef='testing' sx={{
                    position: "absolute",
                    top: "48%",
                    left: "50%",
                    transition: 'all 0.3s ease-out',
                    transform: "translate(-50%, -50%)",
                    border: 0,
                    borderRadius: "6px",
                    color: "#333",
                    width: "90%",
                    maxWidth: "1000px",
                    // boxShadow: "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%)",
                    // boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
                  }} >
                    {/* }} className={` ${open && styles.modalActive}`}> */}
                    <div className={`${styles.card}  ${styles.cardStats}`}>
                      <div className={`${styles.cardHeader} ${styles.cardHeaderPrimary}`}>
                        <h4 className={styles.cardTitle}>{'Notes'.toUpperCase()}</h4>
                        <div className={styles.stats}>
                          isi notes untuk melengkapi keterangan detil odc
                        </div>
                      </div>
                      <div className={`${styles.cardBody} card-body row`} style={{ width: "100%" }}>
                        <Editor
                          editorStyle={{ height: "41vh", border: "1px solid #F1F1F1", maxWidth: "100%" } as any}
                          defaultContentState={<h1>testing</h1>}
                          editorState={editorState}
                          onEditorStateChange={handleEditorChange}
                          wrapperClassName="wrapper-class"
                          editorClassName="editor-class"
                          toolbarClassName="toolbar-class"
                        />
                      </div>
                      <div className={styles.actionContainer}>
                        <div className='row'>
                          <div className='col-md-12 col-lg-6'>
                            {
                              // (isSubmitting ? <CustomCircularProgress size={24} style={{ position: 'relative', top: 4, display: "flex", margin: "auto" }} />
                              // :
                              <CustomButtonModal onClick={() => updateNotes_odcSaga(convertedContent, odcId[0], token, toast)} btntype={'submit'} type={"submit"} variant="contained" color='primary' size="medium">
                                Submit
                              </CustomButtonModal>
                              // )
                            }

                          </div>
                          <div className='col-md-12 col-lg-6'>
                            {<CustomButtonModal btntype='cancel' onClick={() => notesHandleClose()} variant="contained" color='primary' size="medium">
                              {/* {<CustomButtonModal onClick={() => handleClose()} variant="contained" color='primary' size="medium"> */}
                              Cancel
                            </CustomButtonModal>}
                          </div>
                        </div>
                        <div>

                          {/* <CustomButtonModal style={{visibility: (values.tabs>0)?"hidden":"visible"}} onClick={(ev)=>(values.tabs>0)?handleOpen:handleOnChange(ev,values.tabs+1,setValues)}  variant="contained" color='primary' size="medium">
                   {(values.tabs<=0)? "Next":""}
                  </CustomButtonModal> */}
                        </div>
                      </div>
                    </div>
                  </Box>
                </div>
              </MuiModal>
            </div>
          </div>
        </div>
      }
    </div>
  }

  /**
   * status
   */
  else if (odcId[1] == "status") {
    return (<div className={styles.mainContent}>
      <div className={`container-fluid ${styles.content}`}>
        <div className='row'>
          <div className="col-lg-12 col-md-12">
            <div className={`${styles.card}`}>
              <div className={`${styles.cardHeader} ${styles.cardHeaderSuccess}`}>
                <h4 className={styles.cardTitle}>{`Panel Status`}</h4>
              </div>
              <div className="card-body table-responsive">
                <div className={styles.splitterStatusContainer}>
                  <Typography> Splitter </Typography>
                  {splitter.data.map((item, idx) => <FormControl key={"splitter" + item.id} variant="standard" sx={{ m: 1, minWidth: 132, marginTop: "0.5rem" }}>
                    <InputLabel id="demo-simple-select-standard-label">Splitter {item.index}</InputLabel>

                    <NativeSelect defaultValue={item.status == "used" ? 10 : item.status == 'priority' ? 20 : item.status == "broken" ? 30 : 40} onChange={(ev) => { /*console.log(splitter, item, ev.target.options[ev.target.selectedIndex].text); */return updateODCPort_odcSaga(odcId[0], item.id, 'splitter', ev.target.options[ev.target.selectedIndex].text, token, toast) }} inputProps={{
                      name: 'age',
                      id: 'uncontrolled-native',
                    }}>
                      {(item.status == "used" || item.status == "priority") && [{ status: "used", value: 10 }, { status: "priority", value: 20 }].map(item => <option key={"sp" + item.status} value={item.value}> {item.status}</option>)}
                      {/* {(item.status=="used" || item.status=="priority" || item.status=="broken") && [{status:"used",value:10},{status:"priority",value:20},{status:"broken",value:30}].map(item=><option key={"sp"+item.status} value={item.value}> {item.status}</option>)} */}
                      {(item.status == "idle" || item.status == "broken") && [{ status: "idle", value: 40 }, { status: "broken", value: 30 }].map(item => <option key={"sp" + item.status} value={item.value}> {item.status}</option>)}
                    </NativeSelect>
                  </FormControl>
                  )}
                </div>
                <div className={styles.feederStatusContainer}>
                  <Typography> Panel </Typography>
                  <div>
                    {panel.data.map((item, idx) => (<div key={"panel_container" + idx}>
                      {item.data.map(distFeed => {

                        return <FormControl key={"panel" + distFeed.index} variant="standard" sx={{ m: 1, minWidth: 97, marginTop: item.type == 'distribution' && item.rak_index == '1' && distFeed.index <= 12 ? "2rem" : "0.5rem" }}>
                          <InputLabel id="demo-simple-select-standard-label" className={styles.portLabel}> {(item.type == "feeder" ? "F" : "D") + item.rak_index + "-C" + distFeed.index}</InputLabel>
                          {/* <InputLabel id="demo-simple-select-standard-label" className={styles.portLabel}> { ((item.rak_level)%2===0)?item.type+item.rak_index+" "+(distFeed.index+12):item.type+item.rak_index+" "+distFeed.index }</InputLabel> */}
                          {/* {ODCData.panel.data.length}
                        {item.data.length} */}

                          <NativeSelect defaultValue={distFeed.status == "used" ? 10 : distFeed.status == 'priority' ? 20 : distFeed.status == "broken" ? 30 : 40} onChange={(ev) => {/* console.log(distFeed, item.type, ev.target.options[ev.target.selectedIndex].text); */return updateODCPort_odcSaga(odcId[0], distFeed.id, item.type, ev.target.options[ev.target.selectedIndex].text, token, toast) }} inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                          }}>
                            {/* (item.status=="used") ? ["used","priority"].map(item=><option key={"sp"+item} value={10}> {item}</option>) : ["idle","broken"].map(item=><option key={"sp"+item} value={10}> {item}</option>) */}
                            {(distFeed.status == "used" || distFeed.status == "priority") && [{ status: "used", value: 10 }, { status: "priority", value: 20 }].map(item => <option key={"pnl" + item.status} value={item.value}> {item.status}</option>)}
                            {/* {(distFeed.status=="used" || distFeed.status=="priority" || distFeed.status=="broken") && [{status:"used",value:10},{status:"priority",value:20},{status:"broken",value:30}].map(item=><option key={"sp"+item.status} value={item.value}> {item.status}</option>)} */}
                            {/* {(distFeed.status=="used" || distFeed.status=="priority") && [{status:"used",value:10},{status:"priority",value:20}].map(item=><option key={"sp"+item.status} value={item.value}> {item.status}</option>)} */}
                            {(distFeed.status == "idle" || distFeed.status == "broken") && [{ status: "idle", value: 40 }, { status: "broken", value: 30 }].map(item => <option key={"pnl" + item.status} value={item.value}> {item.status}</option>)}
                          </NativeSelect>
                        </FormControl>
                      })}
                    </div>)
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
  /** display user activity log */
  else if (odcId[1] == "activity log") {

    return (
      <div className={styles.mainContent}>
        <div className={`container-fluid`}>
          <div className='row'>
            <div className="col-lg-12 col-md-12">
              <div className={`${styles.card}`}>
                <div className={`${styles.cardHeader} ${styles.cardHeaderWarning}`}>
                  <h4 className={styles.cardTitle}>{`Activity Log`}</h4>
                  {/* <div className={styles.stats}>
                                  <MdOutlineDateRange width={16} height={"auto"} /> Last 24 Hours
                              </div> */}
                </div>
                <div className="card-body table-responsive">
                  {/* <MuiThemeProvider theme={getMuiTheme()}> */}
                  <ThemeProvider theme={getMuiTheme()}>
                    {datatable ? <DynamicMUIDataTable
                      // title={"Employee List"}
                      // options={options}

                      options={{
                        serverSide: true,
                        count: activityLog?.count,
                        // filter:false,
                        searchText: newTableState.search_text,
                        page: newTableState.page,
                        rowsPerPage: newTableState.rowsPerPage || 5,
                        rowsPerPageOptions: [5, 10, 25, 50, 100],
                        onTableInit: (test, tableState) => {
                          console.log("table init", tableState.rowsPerPage)
                          setTableRowsPerPage(tableState.rowsPerPage)
                          getActivityLog_odcSaga(odcId[0], tableState.page + 1, tableState.rowsPerPage, null, null, token, tableState.search_text, tableState.filter)
                        },
                        onTableChange: (action, tableState) => {
                          // console.log(action, tableState);

                          // a developer could react to change on an action basis or
                          // examine the state as a whole and do whatever they want
                          switch (action) {
                            case 'changeRowsPerPage':
                              setTableRowsPerPage(tableState.rowsPerPage)
                              // console.log("change page")
                              setNewTableState(prev => ({ ...prev, rowsPerPage: tableState.rowsPerPage }))
                              // getActivityLog_odcSaga(odcId[0],tableState.page+1,tableState.rowsPerPage,null,null,token)
                              getActivityLog_odcSaga(odcId[0], newTableState.page + 1, tableState.rowsPerPage, newTableState.sort.orderBy, newTableState.sort.direction, token, newTableState.search_text, newTableState.filter)
                              break;
                            case 'changePage':
                              setNewTableState(prev => ({ ...prev, page: tableState.page }))
                              // console.log("change page",tableState.sortOrder)
                              //changeODCPage(limit,offset,region,witel,datel,sto,sortby,direction,token,toast)
                              // getActivityLog_odcSaga(odcId[0],tableState.page+1,tableState.rowsPerPage,null,null,token)
                              getActivityLog_odcSaga(odcId[0], tableState.page + 1, newTableState.rowsPerPage, newTableState.sort.orderBy, newTableState.sort.direction, token, newTableState.search_text, newTableState.filter)
                              // this.changePage(tableState.page, tableState.sortOrder);
                              break;
                            case "search":
                              // console.log("activate search",tableState.searchText)
                              setNewTableState(prev => ({ ...prev, page: 0, search_text: tableState.searchText }))
                              clearTimeout(delay.current);
                              delay.current = setTimeout(() => {
                                getActivityLog_odcSaga(odcId[0], 0, newTableState.rowsPerPage, newTableState.sort.orderBy, newTableState.sort.direction, token, newTableState.search_text, newTableState.filter)
                              }, 500)
                              break;
                            case 'sort':
                              // console.log("sort",tableState.sortOrder)
                              let sortConvention = "";
                              // console.log("odc name sort",tableState.sortOrder.name.toLocaleLowerCase())
                              switch (tableState.sortOrder.name.toLocaleLowerCase()) {
                                case "no":
                                  // console.log("odc name")
                                  sortConvention = "row_number"
                                  break;
                                case "aksi":
                                  // console.log("odc name")
                                  sortConvention = "action"
                                  break;
                                case "tanggal":
                                  // console.log("odc name")
                                  sortConvention = "activity_log.created_at"
                                  break;
                                case "email":
                                  // console.log("odc name")
                                  sortConvention = "email"
                                  break;
                                case "role":
                                  // console.log("odc name")
                                  sortConvention = "role_name"
                                  break;

                                default:
                                  break;
                              }
                              setNewTableState(prev => ({ ...prev, page: 0, sort: { orderBy: sortConvention, direction: tableState.sortOrder.direction.toLocaleUpperCase() } }))
                              // getActivityLog_odcSaga(odcId[0],tableState.page+1,tableState.rowsPerPage,sortConvention, tableState.sortOrder.direction.toLocaleLowerCase(),token)
                              getActivityLog_odcSaga(odcId[0], 0, newTableState.rowsPerPage, sortConvention, tableState.sortOrder.direction, token, newTableState.search_text, newTableState.filter)
                              // this.sort(tableState.page, tableState.sortOrder);
                              break;
                            case 'filterChange':
                              setNewTableState(prev => ({ ...prev, page: 0, filter: tableState.filterList }));
                              getActivityLog_odcSaga(odcId[0], 0, newTableState.rowsPerPage, newTableState.sort.orderBy, newTableState.sort.direction, token, newTableState.search_text, tableState.filterList)
                              break;
                            default:
                              console.log('action not handled.');
                          }
                        },
                        selectableRows: false,
                        print: false,
                      }}
                      checkboxSelection={false}
                      data={datatable}
                      columns={[{
                        name: "No",
                        options: {
                          customBodyRender: (value, tableMeta, update) => {
                            // console.log("row render",tableMeta)
                            let rowIndex = tableMeta.rowData[0];
                            // let rowIndex = (tableMeta.rowData[1])?Number(tableMeta.rowIndex) + 1: "";
                            return (<span>{rowIndex}</span>)
                          },
                          filter: false
                        }
                      }, {
                        name: "Email",
                        options: {
                          customBodyRender: (value, tableMeta, update) => {
                            let newValue = tableMeta.rowData[1]
                            return (<span>{newValue}</span>)
                          },
                          filter: false,
                        }
                      }, {
                        name: "Role",
                        options: {
                          customBodyRender: (value, tableMeta, update) => {
                            let newValue = tableMeta.rowData[2]
                            return (<span>{newValue}</span>)
                          },
                          filter: true,
                          filterOptions: ['User', 'Admin']
                        }
                      }, {
                        name: "Tanggal",
                        options: {
                          customBodyRender: (value, tableMeta, update) => {
                            let newdate = new Date(tableMeta.rowData[3])
                            let newValue = newdate.toLocaleDateString().replaceAll("/", "-") + " " + newdate.toLocaleTimeString()
                            // let newValue = tableMeta.rowData[3]
                            return (<span>{newValue}</span>)
                          },
                          filter: false,
                        }
                      }, {
                        name: "Aksi",
                        options: {
                          customBodyRender: (value, tableMeta, update) => {
                            let newValue = tableMeta.rowData[4]
                            return (<span>{newValue}</span>)
                          },
                          sort: false,
                          filter: false
                        }
                      }]}
                    /> : null}

                  </ThemeProvider>
                  {/* </MuiThemeProvider> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export const getServerSideProps = async (props) => wrapper.getServerSideProps(store => async ({ req, res, ...etc }) => {
  // const { token } = /authUserToken=(?<token>\S+)/g.exec(req.headers.cookie)?.groups || {token: ""} ;
  // if(!req.cookies.token)
  // return {
  //   redirect:{
  //     permanent:false,
  //     destination: "/"
  //   }
  // }
  if (!req.cookies.token)
    return {
      notFound: true
    }
  const { params: { odcId = [] } } = props;
  // console.log("odc id req",req)
  // console.log("odc id",odcId[0])
  store.dispatch(getOcdSplitpanelStatus(odcId[0], req.cookies.token, toast));
  store.dispatch(getOcdSplitpanelDetail(odcId[0], req.cookies.token, toast));
  store.dispatch(getActivityLog(odcId[0], 1, 5, null, null, req.cookies.token, null, []))
  store.dispatch(getRegionList(req.cookies.token))
  store.dispatch(getWitelList(req.cookies.token))
  store.dispatch(getDatelList(req.cookies.token))
  store.dispatch(getSTOList(req.cookies.token))
  store.dispatch(getMerekList(req.cookies.token, toast)),
    store.dispatch(END)
  await store.sagaTask.toPromise();
  // console.log("activity log", store.getState().ODCs.activity_log_list)
  // console.log("req test:",req.url,res,etc)
  // console.log("store",store.getState().ODCs.selectedOdcSplitpanelStatus)
  const { ODCs: { selectedOdcSplitpanelStatus } } = store.getState();
  // const {ODCs:{odcsBox=[],splitterData=[],coreFeederData=[]}} = store.getState();

  // console.log("odc id", odcId, odcId.length)
  // if(odcId.length>1){
  if ((!selectedOdcSplitpanelStatus.success && (odcId[1] !== 'status' || odcId[1] !== 'activity log')) || odcId.length > 2) {
    // console.log("selected odc", selectedOdcSplitpanelStatus)
    // if(odcId.length!==0 && odcsBox.filter(item=>item?.odc?.id == odcId[0]).length==0){
    return {
      notFound: true
    }
  }
  else {
    return {
      props: {
        data: selectedOdcSplitpanelStatus,
        ODCdetailData: store.getState().ODCs.selectedOdcSplitpanelDetail.data,
        activityLog: store.getState().ODCs.activity_log_list,
        regionList: store.getState().ODCs.region_list || [{ id: 0, name: "" }],
        witelList: store.getState().ODCs.witel_list || [{ id: 0, region_id: 0, name: "" }],
        datelList: store.getState().ODCs.datel_list || [{ id: 0, region_id: 0, witel_id: 0, name: "" }],
        stoList: store.getState().ODCs.sto_list || [{ id: 0, region_id: 0, witel_id: 0, datel_id: 0, name: "" }],
        merekList: store.getState().ODCs.merek_list || [{ id: "", name: "", splitter_position: "", splitter_capacity: "" }],
        token: req.cookies.token
      },
      // props:{ data: odcsBox,splitterData,coreFeederData},
      // revalidate:60,
    }

  }
})(props);

const mapStateToProps = state => ({
  gotopage: state.Layout.goto,
  gotopageLoading: state.Layout.page_loading,
  ODCdetailDataClient: state?.ODCs.selectedOdcSplitpanelDetail?.data || [],
  dataClient: state?.ODCs?.odcsBox,
  activity_log_client: state?.ODCs?.activity_log_list,
  loading: state.ODCs.loading.get,
  selectedCoreFeeder: state.ODCs.client.selectedCoreFeeder,
  viewOdcClient: state.ODCs.selectedOdcSplitpanelStatus,
  coreFeederDataClient: state.ODCs.client.coreFeederData,
});
const mapFunctionToProps = {
  changePageTo: IchangePageTo,
  setSelectedCoreFeeder_odcSaga: setSelectedCoreFeeder,
  updateODCData, // used in navbar component
  deleteSelectedCoreFeeder: IdeleteSelectedCoreFeeder,
  upsertODCFile_odcSaga: upsertODCFile,
  updateNotes_odcSaga: updateNotes,
  updateODCPort_odcSaga: updateODCPort,
  getActivityLog_odcSaga: getActivityLog
}
export default connect(mapStateToProps, mapFunctionToProps)(withAuth(Odc));