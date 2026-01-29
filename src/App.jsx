import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import{verifyToken} from './apicalls'
import './CSS/App.css'
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, Outlet } from 'react-router-dom';

import Login from './Login'
import Home from './Home'
import HomeHeader from './Homeheader'

import Blog from './Blog/Blog'
import BlogPost from './Blog/Blogpost'
import EditBlogPost from './Blog/Editblogpost'
import BlogContainer from './Blog/Blogcontainer'

import Calendar from './Calendar/Calendar'

import Wiki from './Wiki/Wiki'
import EditWiki from './Wiki/Editwiki'
import EditWikiPage from './Wiki/Editwikipage'
import WikiPage from './Wiki/Wikipage'
import WikiPageHistory from './Wiki/Wikipagehistory'
import WikiContainer from './Wiki/Wikicontainer'


async function verifyapi() {
    const data = await verifyToken();
    console.log(data);
  
}

function App() {
  const [count, setCount] = useState(0)
  const [i, ia] = useState(0)
  const [userInfo, setUserInfo] = useState([])

  useEffect(()=>{
    verifyapi()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeHeader/>}>
          <Route index element={<Home />} />

          <Route path='Blog' element={<BlogContainer/>}>
            <Route index element={<Blog />} />
            <Route path=":blogpostid" element={<BlogPost/>} />
            <Route path="edit/:blogpostid" element={<EditBlogPost/>}/>
          </Route>

          <Route path='Wiki' element={<WikiContainer/>}>
            <Route index element={<Wiki />} />
            <Route path="page/:wikipageid" element={<WikiPage/>} />
            <Route path="edit/:wikipageid" element={<EditWiki/>}/>
            <Route path="edit/page/:wikipageid" element={<EditWikiPage/>}/>
            <Route path="historik/:wikipageid" element={<WikiPageHistory/>}/>
          </Route>

          <Route path='Calendar' element={<Calendar/>}>

          </Route>
          <Route path='User' element={<Blog/>}></Route>

        </Route>


        <Route path='/Login' element={<Login userInfo={userInfo} setUserInfo={setUserInfo}/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
