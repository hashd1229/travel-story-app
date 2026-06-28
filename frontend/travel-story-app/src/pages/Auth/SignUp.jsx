import React from 'react'
import { useNavigate } from 'react-router-dom'
import signupBgImage from '../../assets/images/signup-bg-image.jpg'
import PasswordInput from '../../components/input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const SignUp = () => {

  const[name, setName] = React.useState("");
  const[email, setEmail] = React.useState("");
  const[password, setPassword] = React.useState("");
  const[error, setError] = React.useState(null);

  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!name){
      setError('Please enter your name');
      return;
    }
    if(!validateEmail(email)){
      setError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setError('Please enter the password');
      return;
    }
    setError("");

    //Sign Up API call
    try {const response = await axiosInstance.post("/create-account", {
      fullName: name,
      email: email,
      password: password
    });

    //Handle successful sign up
    if(response.data && response.data.accessToken){
      localStorage.setItem('token', response.data.accessToken);
      navigate('/dashboard');
    }
  }
  catch (error) {
    //Handle sign up error
    if (error.response && error.response.data && error.response.data.message) {
      setError(error.response.data.message);
    } else {
      setError('An error occurred during sign up. Please try again.');
    }
    }

  };

  return (
    <div className='min-h-screen bg-cyan-50 overflow-hidden relative'>
      <div className="login-ui-box right-10 -top-40 "/>
      <div className="login-ui-box bg-cyan-200 -bottom-40 right-1/2"/>
      
      <div className="container relative z-10 min-h-screen flex items-center justify-center px-6 lg:px-20 mx-auto">
        <div className="flex w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl lg:flex-row">
          <div
            className="flex min-h-[360px] items-end bg-cover bg-center p-10 lg:min-h-[80vh] lg:w-1/2"
            style={{ backgroundImage: `url(${signupBgImage})` }}
          >
          <div>
            <h4 className="text-5xl text-white font-semibold leading-[58px]">
              Join the <br/> Adventure
            </h4>
            <p className="text-[15px] text-white leading-6 pr-7 mt-4">
              Create an account to start documenting your travels and preserving your memories in a personal travel journal.
            </p>
          </div>
        </div>
          <div className="relative p-10 lg:w-1/2 lg:p-16">
            <form onSubmit={handleSignUp}> 
              <h4 className="text-2xl font-semibold mb-7">Sign Up</h4>

              <input type="text" placeholder="Full Name" className="input-box" 
              value={name}
              onChange={({target}) => {setName(target.value)}}
              />

              <input type="email" placeholder="Email" className="input-box" 
              value={email}
              onChange={({target}) => {setEmail(target.value)}}
              />

              <PasswordInput 
              value={password}
              onChange={({target}) => {setPassword(target.value)}}
              />

              {error && <p className="text-xs text-red-500 pb-1">{error}</p>}

              <button type="submit" className="btn-primary">
                CREATE ACCOUNT
              </button>

              <p className="text-xs text-slate-500 text-center my-4">Or </p>

              <button type="button" className="btn-primary btn-light" onClick={() => navigate('/login')}>
                HAVE AN ACCOUNT? LOGIN
              </button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp
