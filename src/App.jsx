import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import{verifyToken} from './apicalls'
import './CSS/App.css'
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, Outlet } from 'react-router-dom';
import { sha256 } from 'js-sha256'

import Login from './Login'
import Home from './Home'
import HomeHeader from './Homeheader'

import Blogmeny from './Blog/Blogmeny'
import Blog from './Blog/Blog'
import BlogPost from './Blog/Blogpost'
import EditBlogPost from './Blog/Editblogpost'
import EditBlog from './Blog/Editblog'
import BlogContainer from './Blog/Blogcontainer'
import AddBlogPost from './Blog/Addblogpost'
import AddBlog from './Blog/AddBlog'

import Calendar from './Calendar/Calendar'
import CalendarContainer from './Calendar/Calendarcontainer'

import Wikimeny from './Wiki/Wikimeny'
import Wiki from './Wiki/Wiki'
import EditWiki from './Wiki/Editwiki'
import EditWikiPage from './Wiki/Editwikipage'
import WikiPage from './Wiki/Wikipage'
import WikiPageHistory from './Wiki/Wikipagehistory'
import WikiContainer from './Wiki/Wikicontainer'
import AddWiki from './Wiki/Addwiki'

import Adminpanel from './Adminpanel'

import { AuthProvider } from './Auth/Authcontext'
import { RequireAuth } from './Auth/Requireauth'
import { useApi } from './hooks/useApi'
import AddWikiPage from './Wiki/Addwikipage'





function App() {
  const [count, setCount] = useState(0)
  const [i, ia] = useState(0)
  const [UserInfo, setUserInfo]= useState([])
  console.log(sha256("admin1"))
  // const testuseapi=useApi(() => verifyToken(), []);
  // if(testuseapi.loading){return <div>Loading</div>}
  // if(testuseapi.data){
  //   return(<div>{testuseapi.data?.newExpiresAt}</div>)
  // }



  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeHeader/>}>
          <Route index element={<Home />} />

          <Route path='Blog' element={<BlogContainer/>}>
            <Route index element={<Blogmeny />} />
            <Route path=':blogid' element={<Blog />}></Route>
            <Route path="blog/:blogpostid" element={<BlogPost/>} />
            <Route path="blog/edit/:blogpostid" element={<EditBlogPost/>}/>
            <Route path="edit/:blogid" element={<EditBlog/>}/>
            <Route path="add" element={<AddBlog/>}/>
            <Route path="addpost/:blogid" element={<AddBlogPost/>}/>
          </Route>

          <Route path='Wiki' element={<WikiContainer/>}>
            <Route index element={<Wikimeny />}></Route>
            <Route path=":wikiid" element={<Wiki />} />
            <Route path="page/:wikipageid" element={<WikiPage/>} />
            <Route path="edit/:wikiid" element={<EditWiki/>}/>
            <Route path="edit/page/:wikipageid" element={<EditWikiPage/>}/>
            <Route path="add" element={<AddWiki/>}/>
            <Route path="addpost/:wikiid" element={<AddWikiPage/>}/>
          </Route>


          <Route path='Calendar' element={<RequireAuth roles={["user","admin"]}><CalendarContainer/></RequireAuth>}>
            <Route index element={<Calendar UserInfo={UserInfo}/>} />
          </Route>

          <Route path='admin' element={<Adminpanel/>}>

          </Route>

          <Route path='User' element={<Blog/>}></Route>

        </Route>


        <Route path='/Login' element={<Login setUserInfo={setUserInfo}/>}/>
        <Route path='/unauthorized' element={<Unauthorized/>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    
  )
}
function Unauthorized(){
  return <h2>UNAUTHORIZED</h2>
}

export default App
