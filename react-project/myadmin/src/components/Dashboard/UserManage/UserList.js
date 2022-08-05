import { useEffect, useState, useContext, React } from "react";
import Sidebar from '../../partial/Sidebar'
import Header from '../../partial/Header';
import Footer from '../../partial/Footer';

//import Welcome  from '../../shared/Welcome';
import Pagination  from '../../shared/Pagination';
import { userList } from "../../../common/RestCall";
//import {Button} from '@material-ui/core';
// Table
import Table from '@material-ui/core/Table';
//import  MaterialTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//import {MaterialTableProps} from 'material-table';

const UserList = () => {

    //Declare State objects
    const[token, setToken]                  = useState();
    const[page, setPage]                    = useState(1);
    const[newpage, setNewPage]              = useState(1);
    const[userData, setUserData]            = useState({});
    const[userListCount, setUserListCount]  = useState(-1);

    const[pageLimit, setPageLimit]          = useState(2);
    const[pageNumber, setPageNumber]        = useState(1);

    const userContext       =   React.createContext();

    useEffect(()=>{
        //Component Hook 
        setPageNumber(1);
        getUserList();

    },{});

   const getUserList = async() => {
    const getToken = localStorage.getItem('token');
   
    const paramData             = {};
    paramData['op']             = 'all';
    paramData['limit']          = pageLimit;
    paramData['page']           = pageNumber;
    console.log("@@Get User List:....@Page>>> ", pageNumber);
    try{
      let dataRecord =  await userList(paramData, getToken);
      console.log("@@Get User List: ", dataRecord);
      if(typeof dataRecord === 'object' && typeof dataRecord.data.data === 'object' && dataRecord.data.data.length > 0){
            setUserData(dataRecord.data.data);
            setUserListCount(dataRecord.data.totalCount)
            
      }
      
    }catch(err) {
      console.log("@Login error: ", err);
      if(typeof err.response == 'object' && err.response.data != undefined && typeof err.response.data == 'object'){
          //setErrorMessage(err.response.data.message)
      }else{
       //setErrorMessage('')
      }
    }
    
    console.log("@Params Data: ", " :: ", paramData.toString());
    return;
    
   }

    const handlePagination = (changePage) => {

        setPageNumber(changePage);
        //alert("Page...");
        
        console.log("@@Get Parent Data:...", changePage, " :: ", pageNumber);
        getUserList();
    }

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
                            
                            {/* -------------------- Table ----------------------- */}
                            <TableContainer>
                            <Table aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell align="left">Last Name</TableCell>
                                    <TableCell align="left">Email ID</TableCell>
                                    <TableCell align="left">Mobile</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    </TableRow>
                                    <TableRow>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    </TableRow>                                
                                </TableBody>
                            </Table>
                            </TableContainer>
                            {/* ----------------- */}
                            
                            


                            {/* -------------------- Table ----------------------- */}
                            @Parent: {pageNumber} || {userListCount}

                            <div className="card-body">
                            <div className="row">
                                {/* {userListCount} */}
                            {JSON.stringify(userData)}
                                
                                {/* // <Pagination limit={pageLimit} page={pageNumber} dataCount={userListCount} onPageLoad={handlePagination}/> */}
                                
                                <userContext.Provider value={pageNumber}>
                                        <Pagination/>
                                </userContext.Provider>
                                
                                
                                
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
export {useContext}