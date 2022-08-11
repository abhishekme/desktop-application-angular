import React,{ useEffect, useState, useRef } from "react";
import {Button} from '@material-ui/core';
import  {Notifications, Search}  from '@material-ui/icons';
import { UserContext} from '../../components/Dashboard/UserManage/userContext';

const Pagination = (props) => {

   //const[newCounter, setNewCounter] = useState(props.counter);
   const[totalCount, setTotalCount] = useState(props.dataCount);
   const[totalLimit, setTotalLimit] = useState(props.limit);
   const[currentPage, setCurrentPage] = useState(1);
   const[totalPage, setTotalPage] = useState(0);

   //Disabled Button
   const[firstDisabled, setFirstDisabled] = useState(true);
   const[lastDisabled, setLastDisabled] = useState(false);
   const[prevDisabled, setPrevDisabled] = useState(true);
   const[nextDisabled, setNextDisabled] = useState(false);

   const buttonNextRef = useRef();

    useEffect(()=>{
        //props.onPageLoad(props.page);       
        const totalPageIndex = Math.ceil(totalCount / totalLimit)
        setTotalPage(totalPageIndex);        
    }, [])


    const pagination = (params) => {
        switch(params){

            case 'first':
                    props.onPageLoad(1);
                //setCurrentPage(1)
                setPrevDisabled(true);
                setFirstDisabled(true);
                setNextDisabled(false);
                setLastDisabled(false);
            break;

            case 'last':
                    props.onPageLoad(3);
               // setCurrentPage(totalPage)
                setPrevDisabled(false);
                setFirstDisabled(false);
                setNextDisabled(true);
                setLastDisabled(true);
            break;

            case 'prev':
                    setNextDisabled(false);
                    setLastDisabled(false);                
                if((props.page-1) <= 1){
                    setFirstDisabled(true);
                    setPrevDisabled(true);                    
                }
                //setCurrentPage(prev => prev-1);
                props.onPageLoad(props.page-1);
            break;

            case 'next':
                    setFirstDisabled(false);
                    setPrevDisabled(false);
                if((props.page+1) >= totalPage){
                    setNextDisabled(true);
                    setLastDisabled(true);
                }
                props.onPageLoad(props.page+1);                    
            break;
        }
    }

    return(

       <div>
            <div style={{'border':'1px dotted #000', 'padding-top':'20px','margin-left':'5px','background-color':'#eee', 'text-align':'center'}}>
                <Button  onClick={() => pagination('first')}  disabled={firstDisabled}  class="btn btn-primary" > |&lt; </Button>
                <Button onClick={() => pagination('prev')}  class="btn btn-primary" disabled={prevDisabled}> &lt;&lt;  </Button>
                &nbsp;&nbsp;Page [ {props.page} ] of [ {totalPage} ]&nbsp;&nbsp;&nbsp;
                <Button  onClick={() => pagination('next')}  class="btn btn-primary"  disabled={nextDisabled}> &gt;&gt; </Button>
                <Button onClick={() => pagination('last')}  class="btn btn-primary" disabled={lastDisabled}> &gt;| </Button>
                <hr/>
                    {/* {(totalLimit)} || {(totalCount)} || {(currentPage)}  */}
                
            </div>
            
       </div>
    )
}

export default Pagination;