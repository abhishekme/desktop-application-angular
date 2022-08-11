import React,{ useEffect, useState, useRef } from "react";
import {Button} from '@material-ui/core';
import  {Notifications, Search}  from '@material-ui/icons';
import Table from '@material-ui/core/Table';
//import  MaterialTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination  from './Pagination';

const DataGrid = (props) => {

    useEffect(()=>{
       ///props.onPageLoad(); 
       setTimeout(()=>{
        console.log("@@...Child Grid Get: ", props.gridFields, " :: ", props.gridData)
       }, 1)        
               
    }, [])

    const getColValue = (index, title) => {
        let getValue = props.gridData[index][title]['value'];
        console.log("@@...Get row Value: ", index, " :: ", title, " -- ", props.gridData[index][title]['value']);
        return getValue;
        
    }

    return(

       <div>
         {/* ----------------------------------- Grid Table -------------------------------- */}
         <TableContainer>
            <Table aria-label="simple table">
                <TableHead>                    
                        <TableRow>
                            {props.gridFields.length > 0 &&
                                props.gridFields.map((field) => 
                                <TableCell  width="20">{field.value}</TableCell> 
                            )}    
                            <TableCell align="left" width="20">Action</TableCell>                   
                        </TableRow>
                </TableHead>
                <TableBody>
                    {props.gridData.length > 0 &&
                        props.gridData.map((item, key) => 
                            <TableRow>
                                {/* <TableCell align="left" width="20">....{JSON.stringify(item[key])}</TableCell> */}
                                {props.gridFields.length > 0 &&
                                    props.gridFields.map((fieldVal) =>
                                    <TableCell align="left" width="20">{getColValue(key,fieldVal.title)}</TableCell>                                
                                )}  
                                <TableCell align="left" width="20">....</TableCell>                            
                            </TableRow>
                    )}                                        
                </TableBody>
            </Table>
        </TableContainer>
        {/* --------------------------------------- Grid Table ----------------------------------- */}
        <div className="card-body" style={{'text-align':'center', 'margin': '10px', 'width':'100%'}}>
        <div className="row">
        {props.dataCount >0 &&
        <Pagination limit={props.limit} page={props.page} dataCount={props.dataCount} onPageLoad={props.onPagination}/>
        }
        </div>
                            </div>
       </div>
    )
}

export default DataGrid;