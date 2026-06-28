import React from 'react'
import { useNavigate } from 'react-router-dom'
import loginBgImage from '../../assets/images/bg-image.jpg'
import PasswordInput from '../../components/input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {

  const[email, setEmail] = React.useState("");
  const[password, setPassword] = React.useState("");
  const[error, setError] = React.useState(null);

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    if(!validateEmail(email)){
      setError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setError('Please enter the password');
      return;
    }
    setError("");

    //Login API call
    try {const response = await axiosInstance.post("/login", {
      email: email,
      password: password
    });

    //Handle successful login
    if(response.data && response.data.accessToken){
      localStorage.setItem('token', response.data.accessToken);
      navigate('/dashboard');
    }
  }
  catch (error) {
    //Handle login error
    if (error.response && error.response.data && error.response.data.message) {
      setError(error.response.data.message);
    } else {
      setError('An error occurred during login. Please try again.');
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
            style={{ backgroundImage: `url(${loginBgImage})` }}
          >
          <div>
            <h4 className="text-5xl text-white font-semibold leading-[58px]">
              Capture Your <br/> Journeys
            </h4>
            <p className="text-[15px] text-white leading-6 pr-7 mt-4">
              Record your travel experiences and memories in your personal travel journal.
            </p>
          </div>
        </div>
          <div className="relative p-10 lg:w-1/2 lg:p-16">
            <form onSubmit={handleLogin}> 
              <h4 className="text-2xl font-semibold mb-7">Login</h4>

              <input type="text" placeholder="Email" className="input-box" 
              value={email}
              onChange={({target}) => {setEmail(target.value)}}
              />

              <PasswordInput 
              value={password}
              onChange={({target}) => {setPassword(target.value)}}
              />

              {error && <p className="text-xs text-red-500 pb-1">{error}</p>}

              <button type="submit" className="btn-primary">
                Login
              </button>

              <p className="text-xs text-slate-500 text-center my-4">Or </p>

              <button type="button" className="btn-primary btn-light" onClick={() => navigate('/signup')}>
                CREATE ACCOUNT
              </button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login
