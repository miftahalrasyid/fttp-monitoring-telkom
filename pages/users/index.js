import React from 'react'
import withAuth from '../../components/Auth';
import { createTheme, MuiThemeProvider,styled } from "@material-ui/core/styles";
import dynamic from 'next/dynamic';
const DynamicMUIDataTable = dynamic(() => import('mui-datatables'),{ ssr: false });
import {
  MdOutlineDateRange,
} from 'react-icons/md';
import odcStyles from '../odc/odc.module.css';
const getMuiTheme = () =>
createTheme({
  status: {
    primary: "#ee2d24!important",
    darkgray: "darkgray!important"
  },
  overrides: {
    MuiOutlinedInput:{
      root:{
        color: "#ee2d24!important"
      }
    },
    MuiTableRow:{
      color:"#ee2d24",
    },
    MuiInput:{
      underline:{'&:after':{borderBottomColor:"#ee2d24!important"}}
    },
    MuiButton:{
      textPrimary:{
        color: "#ee2d24!important"
      }
    },
    MuiCheckbox:{
      colorPrimary:{
        color:"#ee2d24!important"
      }
    },
    MUIDataTableToolbar:{
      icon:{'&:hover': {color: '#ee2d24'}},
      iconActive:{color:'#ee2d24'}
    },
    MuiPaper:{
      root:{
        boxShadow:"none!important"
      }
    },
    MUIDataTableBodyCell: {
      root: {
        whiteSpace: "nowrap"
      },
    },
  },
});

function User() {
  const [datatable, setDatatable] = React.useState([[]])
  return (<div className={odcStyles.mainContent}>
    <div className={`container-fluid`}>
      <div className='row'>
        <div className="col-lg-12 col-md-12">
          <div className={`${odcStyles.card}`}>
            <div className={`${odcStyles.cardHeader} ${odcStyles.cardHeaderPrimary}`}>
              <h4 className={odcStyles.cardTitle}>User Management</h4>
              {/* <div className={odcStyles.stats}>
                <MdOutlineDateRange width={16} height={"auto"} /> Last 24 Hours
              </div> */}
            </div>
            
            <div className="card-body table-responsive">
            <MuiThemeProvider theme={getMuiTheme()}>
              {datatable ? <DynamicMUIDataTable 
                options={{
                  selectableRows:false,
                  print: false,
                }} 
                checkboxSelection={false} 
                data={datatable} 
                columns={[{ 
                  name: "No" , 
                  options:{
                    customBodyRender:(value, tableMeta, update)=> {
                      let rowIndex = (tableMeta.rowData[1])?Number(tableMeta.rowIndex) + 1: "";
                      return ( <span>{rowIndex}</span> )
                    }
                  }
                },{
                  name: "ODC ID",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[0]
                      return ( <span>{newValue}</span> )
                    }
                  }
                },{
                  name: "Kapasitas",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[1]
                      return ( <span>{newValue}</span> )
                    }
                  }
                },{
                  name: "Feeder",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[2]
                      return ( <span>{newValue}</span> )
                    }
                  }
                },{
                  name: "Distribusi",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[3]
                      return ( <span>{newValue}</span> )
                    }
                  }
                },{
                  name: "Aksi",
                  options:{
                    customBodyRender:(value, tableMeta, update) => {
                      let newValue = tableMeta.rowData[4]
                      return ( <span>{newValue}</span> )
                    }
                  }
                }]}
                />:null}

                {/* </ThemeProvider> */}
            </MuiThemeProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default withAuth(User)