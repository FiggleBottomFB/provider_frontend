import { useState, useEffect } from "react";
import { addWikiComment, deleteWikiComment, getBlogPost, getWikiPage } from "../apicalls";
import { useParams, useNavigate } from "react-router";
import { addBlogComment, deleteBlogComment } from "../apicalls";
import '.././CSS/blogpost.css'
import '.././CSS/commonclass.css'
import DisplayComments from "../Comments";
import WikiPageHistory from "./Wikipagehistory";


function DisplayWikiPage({WikiPage, setWikiPage, Comments, setComments}){
  const navigate = useNavigate()
  let params = useParams();
  const pageid = params.wikipageid

  useEffect(()=>{
    const fetchPost = async () =>{ 
      const wikiPageData = await getWikiPage(window.sessionStorage.getItem("token"), pageid)
      setBlogPost(wikiPageData.fields)
      setComments(wikiPageData.fields.comments)
    }
    fetchPost()
  }, [])

  const handleAddComment = async (token, body, content) => {
    await addWikiComment(token, body, content)
  
    const wikiPageData = await getWikiPage(token, pageid)
    setBlogPost(wikiPageData.fields)
    setComments(wikiPageData.fields.comments)
  }
  
  const handleDeleteComment = async (token, commentId) => {
    await deleteWikiComment(token, commentId)
  
    const wikiPageData = await getWikiPage(token, pageid)
    setWikiPage(wikiPageData.fields)
    setComments(wikiPageData.fields.comments)
  }


  return(
    <div id="wiki-page-container">
      <button id="back-arrow-button" onClick={()=>{navigate(-1)}}>←</button>
      <div id="wiki-page-info-container">
        <div id="wiki-page-display-container" className="flex-column align-center">
          <h1>{WikiPage.title}</h1>
          <div>
            {/* {
              WikiPage.tags.map((tag, index)=>(
                <p>{tag}</p>
              ))
            } */}
          </div>
          {WikiPage.content}
        </div>
      <DisplayComments Comments={Comments} addComment={handleAddComment} addToId={WikiPage.id} deleteComment={handleDeleteComment}/>

      <WikiPageHistory WikiPage={WikiPage}/>
      </div>
    </div>
  )
}

function WikiPage(){
  const [WikiPage, setWikipage] = useState([])
  const [Comments, setComments] = useState([])
  return (
    <div>
      <DisplayWikiPage WikiPage={WikiPage} setWikipage={setWikipage} Comments={Comments} setComments={setComments}/>
    </div>
  )
}

export default WikiPage
