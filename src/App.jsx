import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Testfetch, Testfetch2, VerifyToken} from './Test'
import{login} from './apicalls'
import './App.css'
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, Outlet } from 'react-router-dom';

async function GetToken(){
  const data = await Testfetch2();
  console.log(data.token);
  const verify = await VerifyToken(data.token)
  console.log(verify)
}
async function Loginapi() {
    const data = await login("simonelias","simonelias");
    console.log(data);
  
}

function App() {
  const [count, setCount] = useState(0)
  const [i, ia] = useState(0)

  useEffect(()=>{
    Loginapi()
  }, [])

  return (
    <BrowserRouter>
      HELLO WORLD!!
      <button onClick={()=>ia(prev=> prev+1)}>
        {i}
      </button>
      <Routes>
        <Route path='/' element={<HomeHeader/>}>
          <Route index element={<Home />} />
          <Route path='Blog' element={<Blog/>}>

          </Route>
          <Route path='Wiki' element={<Blog/>}>

          </Route>
          <Route path='Calandar' element={<Blog/>}>

          </Route>
          <Route path='User' element={<Blog/>}></Route>

        </Route>


        <Route path='/Login' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

function Home(){
  return <div>home
  </div>
}
function Login(){
  return <div>LOGIN</div>
}
function Blog(){
  return <div>Blog</div>
}
function HomeHeader(){
  return <div>
    <h1>HEADER MAYBE HERE</h1>
    <Outlet />
  </div>
}