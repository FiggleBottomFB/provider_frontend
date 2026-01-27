import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Testfetch from './Test'
import './App.css'
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

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
    </BrowserRouter>
  )
}

export default App
