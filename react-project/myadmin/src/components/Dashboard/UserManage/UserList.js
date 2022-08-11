import { useEffect, useState, useContext, React, useCallback } from "react";
import Sidebar from '../../partial/Sidebar'
import Header from '../../partial/Header';
import Footer from '../../partial/Footer';

//import Welcome  from '../../shared/Welcome';
import Pagination  from '../../shared/Pagination';
import DataGrid  from '../../shared/DataGrid';

import { userList } from "../../../common/RestCall";
import { allowFields, titleCase, isEmtyObject } from "../../../common/Utility";
//import {Button} from '@material-ui/core';
// Table
import Table from '@material-ui/core/Table';
//import  MaterialTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Button} from '@material-ui/core';
import { UserContext}  from './userContext'

//import {MaterialTableProps} from 'material-table';

const UserList = () => {

    //Declare State objects
    const[token, setToken]                      = useState();
    const[page, setPage]                        = useState(1);
    const[newpage, setNewPage]                  = useState(1);
    const[userData, setUserData]                = useState({});
    const[userListCount, setUserListCount]      = useState(0);

    const[pageLimit, setPageLimit]              = useState(2);
    const[pageNumber, setPageNumber]            = useState(1);
    const[changeValue, setChangeValue]          = useState(1);

    const[userDataValue, setUserDataValue]      = useState([]);
    const[userDataFields, setUserDataFields]    = useState([]);

    useEffect(()=>{
        ////console.log("@@Get Parent Init Hook: ", pageNumber);
        getUserList();
        console.log("@@...Field Values: 2", userDataFields, " == ", userDataValue) 
       // buildDataFieldsValues(userData)

    },[pageNumber ]);

    ///////////////////////////////////////////////////////////////////////////////
    const buildDataFieldsValues = async(dataRec) => {
        let dataValue   = [];
        let dataFields  = [];
               
        let rec         = dataRec[0];
        let data        = dataRec;
        let allowShow   = allowFields.userList.show;
    
        //Make dataFields
        for(let key in rec){ 
            if(allowShow.hasOwnProperty(key) && allowShow[key] === true){
                dataValue[key] = {};
                dataFields.push({title:key, value:titleCase(key)});                
            }
        }
        //Make dataValues
        for(let key in data){
            dataValue[key] = {};
            for(let keyVal in data[key]){
                if(allowShow.hasOwnProperty(keyVal) && allowShow[keyVal] === true){
                    dataValue[key][keyVal] = {
                        title:keyVal, value:data[key][keyVal]
                    }
                }
                if(keyVal != '' && dataValue[keyVal]) {
                    delete dataValue[keyVal];
                }
            }
        }
        console.log("@@...Field Values: ", dataFields, " == ", dataValue)
        setUserDataValue(dataValue);
        setUserDataFields(dataFields);
    }

    ///////////////////////////////////////////////////////////////////////
    const getUserList = async() => {
    const getToken = localStorage.getItem('token');
   
    const paramData             = {};
    paramData['op']             = 'all';
    paramData['limit']          = pageLimit;
    paramData['page']           = pageNumber;
    
    try{
      let dataRecord        =  await userList(paramData, getToken);
      if(typeof dataRecord === 'object' && typeof dataRecord.data.data === 'object' && dataRecord.data.data.length > 0){
        setUserData(dataRecord.data.data);
        setUserListCount(dataRecord.data.totalCount);
        buildDataFieldsValues(dataRecord.data.data);
      }
      
    }catch(err) {
      if(typeof err.response == 'object' && err.response.data != undefined && typeof err.response.data == 'object'){
          //setErrorMessage(err.response.data.message)
      }else{
       //setErrorMessage('')
      }
    }    
    return;    
   }

    const handlePagination = (newVal) => {
        setPageNumber(newVal);
        getUserList();
     };



    return (
        <div class="wrapper ">
            <Sidebar/>
            <div class="main-panel">
                <Header/>
                {/* ------- Content Section ------------ */}
                <div class="content">
                <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title">User List</h4>
                                <p className="card-category">User management</p>
                            </div>

                            <hr/>
                            {/* {JSON.stringify(userDataFields)} || {JSON.stringify(userDataValue)} */}
                            {userDataValue.length >0 && userDataFields.length >0 &&
                            <DataGrid gridFields={userDataFields} gridData={userDataValue} 
                            limit={pageLimit} page={pageNumber} dataCount={userListCount} onPagination={handlePagination}/>
}
                            
                            <hr/>
                            
                            {/* -------------------- Table ----------------------- */}
                            {/* <TableContainer>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell  width="20">First Name</TableCell>
                                            <TableCell align="left" width="20">Last Name</TableCell>
                                            <TableCell align="left" width="20">Email ID</TableCell>
                                            <TableCell align="left" width="20">Mobile</TableCell>
                                            <TableCell align="left" width="20">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {userData.length > 0 &&
                                            userData.map((item) => 
                                                <TableRow>
                                                    <TableCell align="left" width="20">{item.first_name}</TableCell>
                                                    <TableCell align="left" width="20">{item.last_name}</TableCell>
                                                    <TableCell align="left" width="20">{item.email}</TableCell>
                                                    <TableCell align="left" width="20">{item.mobile}</TableCell>
                                                    <TableCell align="left" width="20"></TableCell>
                                                </TableRow>
                                            )
                                        }                                        
                                    </TableBody>
                                </Table>
                            </TableContainer> */}
                            {/* ----------------- */}
                            
                            


                            {/* -------------------- Table ----------------------- */}
                            {/* @Parent: {pageNumber} || {userListCount} == {changeValue} */}

                            <div className="card-body">
                            <div className="row">

                            {/* {JSON.stringify(userData)} */}
                            {/* {userListCount >0 &&
                                <Pagination limit={pageLimit} page={pageNumber} dataCount={userListCount} 
                                onPageLoad={handlePagination}/>

                            } */}
                                {/* <UserContext.Provider value={{pageNumber, setPageNumber}}>
                                        <Pagination/>
                                </UserContext.Provider> */}
                                
                                {/* @{userListCount} */}
                                {/* <div className="col-md-12">
                                    List
                                    <Welcome counter={page} onCounterChange={handleCounter}/>
                                    <hr/>
                                        Parent: {page} 
                                    
                                </div> */}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                </div>
                </div>
                <Footer/>
            </div>
        </div>
    
    )
}

export default UserList
