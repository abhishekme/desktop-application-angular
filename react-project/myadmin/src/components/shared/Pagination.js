import { useEffect, useState, useContext } from "react";
import {Button} from '@material-ui/core';
import  {Notifications, Search}  from '@material-ui/icons';
import { userContext} from '../Dashboard/UserManage';

const Pagination = () => {

   //const[newCounter, setNewCounter] = useState(props.counter);
//    const[totalCount, setTotalCount] = useState(props.dataCount);
//    const[totalLimit, setTotalLimit] = useState(props.limit);
//    const[currentPage, setCurrentPage] = useState(props.page);

    const[totalCount, setTotalCount] = useState(5);
   const[totalLimit, setTotalLimit] = useState(2);
   const[currentPage, setCurrentPage] = useContext(userContext);

   const[totalPage, setTotalPage] = useState(1);

   //Disabled Button
   const[firstDisabled, setFirstDisabled] = useState(true);
   const[lastDisabled, setLastDisabled] = useState(false);
   const[prevDisabled, setPrevDisabled] = useState(true);
   const[nextDisabled, setNextDisabled] = useState(false);

    useEffect(()=>{
        console.log("@@Total page: ", totalPage, " :: ", totalCount, " :: ", totalLimit)
        const totalPageIndex = Math.ceil(totalCount / totalLimit)
        setTotalPage(totalPageIndex)  
        
    }, [])

   const incremPage = (count)=> {  
        // let getCounter = count;
        // getCounter++;
        // setNewCounter(getCounter)
        // //set output event
        // setTimeout(()=>{
        //     props.onCounterChange(getCounter)
        // },1100)
    }

    const pagination = (params) => {
        let curPage = currentPage;
        switch(params){

            case 'first':
                    setCurrentPage(1)
                    setPrevDisabled(true);
                    setFirstDisabled(true);
                    setNextDisabled(false);
                    setLastDisabled(false);
            break;

            case 'last':
                    setCurrentPage(totalPage)
                    setPrevDisabled(false);
                    setFirstDisabled(false);
                    setNextDisabled(true);
                    setLastDisabled(true);
            break;

            case 'prev':
                curPage--;
                    setNextDisabled(false);
                    setLastDisabled(false);                
                if(curPage == 1){
                    setFirstDisabled(true);
                    setPrevDisabled(true);                    
                }
                    setCurrentPage(curPage)
               
                //props.onPageLoad(curPage)

            break;

            case 'next':
                curPage++;
                    setFirstDisabled(false);
                    setPrevDisabled(false);
                if(curPage == totalPage){
                    setNextDisabled(true);
                    setLastDisabled(true);
                }
                    setCurrentPage(curPage); 
                
                console.log("@@Get Child Data:...", curPage);
                //props.onPageLoad(curPage)
            break;

        }
    }

    return(

       <div>
                @Child: {currentPage} || {totalPage}
            <div style={{'border':'4px solid #000', 'padding':'3px','background-color':'#eee'}}>

                <Button onClick={() => pagination('first')}  class="btn btn-primary" disabled={firstDisabled}> |&lt; </Button>;
                <Button onClick={() => pagination('prev')}  class="btn btn-primary" disabled={prevDisabled}> &lt;&lt;  </Button>;
                <Button onClick={() => pagination('next')}  class="btn btn-primary" disabled={nextDisabled}> &gt;&gt; </Button>;
                <Button onClick={() => pagination('last')}  class="btn btn-primary" disabled={lastDisabled}> &gt;| </Button>;
                <hr/>
                    {(totalLimit)} || {(totalCount)} || {(currentPage)} 
                
            </div>
            
       </div>
    )
}

export default Pagination;