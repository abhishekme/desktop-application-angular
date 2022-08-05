import { useEffect, useState } from "react";
import { requestLogin } from "../common/RestCall";
import { useHistory } from "react-router";
import SimpleReactValidator from 'simple-react-validator';
import styles from '../App.css'

const Login = () => {

    const[errorMessage, setErrorMessage]  = useState('');
    const[email, setEmail]                = useState('');
    const[password, setPassword]          = useState('');
    const[validator, setValidator]        = useState(new SimpleReactValidator({
        messages:{
            email:"Valid Email Required",
            password:"Password is Required",
            required:"This is a Required Field"
        }
    }));
    let history = useHistory();
    useEffect(()=>{
        //Component Hook
        console.log("Validator: ", validator);       
    },[]);

    const handleEmail = (e) =>{
        setEmail(e.target.value);
        validator.showMessages();
    }
    const handlePassword = (e) =>{
      setPassword(e.target.value);
      validator.showMessages();
    }

    const login = async() => {
        if (validator.allValid()) {
            const headers = {
              'Content-Type': 'application/json'
            };
            const postData = {};
            postData['login_name']     = email;
            postData['password']  = password;            
            try{
              let loginPost = await requestLogin(postData, headers);
              console.log("@Login error1111: ",  headers);
              if(typeof loginPost.data === 'object' && loginPost.data.authToken != undefined){
                localStorage.setItem('token', loginPost.data.authToken);
                history.push('/Dashboard');
              }
              if(typeof loginPost.data === 'object' && loginPost.data.message != undefined && !loginPost.data.status){
                setErrorMessage(loginPost.data.message)
              }
            }catch(err) {
              console.log("@Login error: ", err);
              if(typeof err.response == 'object' && err.response.data != undefined && typeof err.response.data == 'object'){
                  setErrorMessage(err.response.data.message)
              }else{
                setErrorMessage('')
              }
            }            
        }else{
            validator.showMessages();
        }
    }


    return (

        <div className="wrapper ">
        <div className="main-panel">
        <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header card-header-primary">
                  <h4 className="card-title">LOGIN</h4>
                  <p className="card-category">Please login to Admin Panel</p>
                </div>
                <div class="row">
                <div class="col-12">
                { errorMessage &&
                  <h3 className="error"> { errorMessage } </h3> 
                }
                </div>
              </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div class="form-group">
                        <label className="bmd-label-floating">Email....</label>
                        <input type="text" onChange={handleEmail} className="form-control"></input>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8">
                    {validator.message('email', email, 'required', { className: 'text-danger' })}
                  </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="bmd-label-floating">Password</label>
                        <input type="password" onChange={handlePassword} className="form-control"></input>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8">
                    {validator.message('password', password, 'required|min:6|max:15', { className: 'text-danger' })}
                  </div>
                  </div>
                  <button type="submit" onClick={login} class="btn btn-primary pull-right">Login</button>
                    <div className="clearfix"></div>
                </div>
              </div>
            </div>            
          </div>
        </div>
      </div>
      </div>
      </div>

  //     <div classNameName="hold-transition login-page">
   
  //   <div classNameName="login-box">
  //       <div classNameName="login-logo">
  //           <a href="javascript:void(0)"><b>ADMIN</b>LOGIN</a>
  //       </div>
        
  //       <div classNameName="card">
  //           <div classNameName="card-body login-card-body">
  //           <p classNameName="login-box-msg">Secure Login</p>
  //           <div classNameName="row">
  //         <div classNameName="col-12">
  //         { errorMessage &&
  //           <h3 classNameName="error"> { errorMessage } </h3> 
  //         }
  //         </div>
  //       </div>
  //       <div classNameName="input-group mb-3">
  //         <input type="email" onChange={handleEmail} classNameName="form-control" placeholder="Email"></input>
  //         <div classNameName="input-group-append">
  //           <div classNameName="input-group-text">
  //             <span classNameName="fas fa-envelope"></span>
  //           </div>
  //         </div>          
  //       </div>
  //       <div classNameName="row">
  //         <div classNameName="col-8">
  //         {validator.message('email', email, 'required|email', { classNameName: 'text-danger' })}
  //         </div>
  //       </div>
  //       <div classNameName="input-group mb-3">
  //         <input type="password" name="password" onChange={handlePassword} classNameName="form-control" placeholder="Password"></input>
  //         <div classNameName="input-group-append">
  //           <div classNameName="input-group-text">
  //             <span classNameName="fas fa-lock"></span>
  //           </div>
  //         </div>
  //       </div>
  //       <div classNameName="row">
  //         <div classNameName="col-12">
  //         {validator.message('password', password, 'required|alpha|min:6|max:8', { classNameName: 'text-danger' })}
  //         </div>
  //       </div>
  //       <div classNameName="row">
  //         <div classNameName="col-8">
  //           <div classNameName="icheck-primary">
  //             <input type="checkbox" id="remember"></input>
  //             <label for="remember">
  //               Remember Me
  //             </label>
  //           </div>
  //         </div>
  //         <div classNameName="col-4">
  //           <button type="submit" onClick={login} classNameName="btn btn-primary btn-block">LOGIN</button>
  //         </div>
  //       </div>      
  //   </div>
  // </div>
  //   </div>
  //   </div> 
    
    
    )
}

export default Login;