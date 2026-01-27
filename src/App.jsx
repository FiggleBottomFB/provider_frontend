import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Testfetch from './Test'
import './App.css'
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, Outlet } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)
  const [i, ia] = useState(0)
  return (
    <BrowserRouter>
      <Testfetch/>
      HELLO WORLD!!
      <button onClick={()=>ia(prev=> prev+1)}>
        {i}
      </button>
      <Routes>
        <Route path='/Base' element={<Home/>}>
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
    <Outlet />
  </div>
}
function Login(){
  return <div>LOGIN</div>
}
function Blog(){
  return <div>Blog</div>
}