import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [currentState, setCurrentState] = useState('Login');
  const { navigate, backendURL, setRefreshToken, refreshToken, accessToken, setAccessToken, } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {

      // register user API
      if (currentState === 'Sign Up') {

        const response = await axios.post(`${backendURL}/api/user/register`, { name, email, password });
        console.log(response.data);
        if (response.data.success) {
          // const { accessToken } = response.data.accessToken;
          // const { refreshToken } = response.data.refreshToken;

          setAccessToken(response.data.accessToken);
          setRefreshToken(response.data.refreshToken);


          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
        } else {
          toast.error(response.data.message)
        }
        // Login User API
      } else {


        const response = await axios.post(`${backendURL}/api/user/login`, { email, password });
        // console.log(response);

        if (response.data.success) {
          toast.success("Login Successful");
          // setRefreshToken(response.data.refreshToken);
          setAccessToken(response.data.accessToken);

          localStorage.setItem('accessToken', response.data.accessToken)
        } else {
          toast.error(response.data.message);
        }

      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  useEffect(() => {
    if (accessToken) {
      navigate('/');

    }
  }, [accessToken])


  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="w-full px-3 py-2 border border-gray-800" placeholder="Name" required />
      }
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="w-full px-3 py-2 border border-gray-800" placeholder="E-mail" required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="w-full px-3 py-2 border border-gray-800" placeholder="Password" required />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot Your Password?</p>
        {
          currentState === "Login"
            ? <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">Create Account</p>
            : <p onClick={() => setCurrentState('Login')} className="cursor-pointer">Login Here</p>
        }
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">{currentState === "Login" ? "Sign In" : "Sign Up"}</button>

    </form>
  )
}

export default Login