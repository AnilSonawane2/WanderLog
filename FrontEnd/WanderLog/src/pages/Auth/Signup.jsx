import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!name){
      setError("Please enter your name");
      return;
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }

    if(!password){
      setError("Please enter the password");
      return;
    }
    setError("");

    // SignUp API Call
    try{
      const response = await axiosInstance.post("/create-account",{
        fullName: name,
        email: email,
        password: password,
      });

      if(response.data && response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken);
        navigate("/dashboard");
      }
    }
    catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }
      else{
        setError("An Unexpected Error occured. Please try again");
      }
    }
  };

  return (
    <div className='h-screen bg-cyan-50 overflow-hidden relative'>

      <div className="login-ui-box right-10 -top-40"/>
      <div className="login-ui-box bg-cyan-200 -bottom-40 right-1/2"/>

      <div className='container h-screen flex items-center justify-center px-20 mx-auto'>
        <div className="hidden md:flex w-2/4 h-[90vh] flex items-end bg-signup-bg-img bg-cover bg-center rounded-lg p-10 z-50">
          <div>
            <h4 className="text-5xl text-white font-semibold leading-[58px" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)' }}>
              Join the <br /> Adventure
            </h4>
            <p className="text-[15px] text-white leading-6 pr-7 mt-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 2)' }}>
              Create an account to start documenting your travels and preserving
              your memories in your personal Journal.
            </p>
          </div>
        </div>

        <div className='w-full md:w-2/4 h-auto md:h-[75vh] bg-white rounded-lg md:rounded-r-lg relative p-10 md:p-16 shadow-lg shadow-cyan-200/20'>
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl font-semibold mb-7">Sign Up</h4>
            <input type="text" placeholder='Full Name' className='input-box' 
              value={name}
              onChange={({target}) => {
                setName(target.value);
              }}
            />
            <input type="text" placeholder='Email' className='input-box' 
              value={email}
              onChange={({target}) => {
                setEmail(target.value);
              }}
            />

            <PasswordInput 
              value={password}
              onChange={({target}) => {
                setPassword(target.value);
              }}
            />

              {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className='btn-primary'>
              CREATE ACCOUNT
            </button>
            <p className="text-xs text-slate-500 text-center my-4">Or</p>
            <button
              type="submit"
              className="btn-primary btn-light"
              onClick={() => {
                navigate("/login") 
              }}
            >LOGIN</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup