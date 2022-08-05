import { useEffect, useState } from "react";
import {Button} from '@material-ui/core';
import  {Notifications, Search}  from '@material-ui/icons';

const Welcome = (props) => {

   const[newCounter, setNewCounter] = useState(props.counter);
    useEffect(()=>{
    }, [])

   const incremPage = (count)=> {
        let getCounter = count;
        getCounter++;
        setNewCounter(getCounter)
        //set output event
        setTimeout(()=>{
            props.onCounterChange(getCounter)
        },1100)
    }

    return(

        <div style={{color:'blue'}}>
            <hr/>          

                <div>
                    <Button  class="btn btn-primary" onClick={() => incremPage(newCounter)}>Increment<Search></Search></Button>;
                   
                </div>
                Child: {newCounter} 
        </div>
    )
}

export default Welcome;