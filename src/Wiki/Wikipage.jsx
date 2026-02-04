import { useState, useEffect } from "react";
import { addWikiComment, deleteWikiComment, getWikiPage, getWikiPages } from "../apicalls";
import { useParams, useNavigate } from "react-router";
import { addBlogComment, deleteBlogComment } from "../apicalls";
import '.././CSS/wiki.css'
import '.././CSS/commonclass.css'
import DisplayComments from "../Comments";
import WikiPageHistory from "./Wikipagehistory";
import { useAuth } from "../Auth/Authcontext";

function linkWikiContent(content, WikiPages) {
  let parts = [content];
  const navigate = useNavigate()

  WikiPages.forEach(page => {
    if (page.title === WikiPage.title) return;

    parts = parts.flatMap(part => {
      if (typeof part !== "string") return part;

      const split = part.split(page.title);
      if (split.length === 1) return part;

      return split.flatMap((chunk, index) =>
        index < split.length - 1
          ? [
              chunk,
              <span
                key={`${page.id}-${index}`}
                className="wiki-link"
                onClick={() => {navigate(`/wiki/page/${page.id}`)}}
                style={{ cursor: "pointer", display: "inline", color: "blue" }}
              >
                {page.title}
              </span>
            ]
          : chunk
      );
    });
  });

  return parts;
}

function DisplayWikiPage({}){
  const navigate = useNavigate()
  let params = useParams();
  const pageid = params.wikipageid
  const {user} = useAuth()
  const [WikiPage, setWikiPage] = useState([])
  const [Comments, setComments] = useState([])
  const [WikiPages, setWikiPages] = useState([])
  const [WikiId, setWikiId] = useState(0)


  useEffect(()=>{
    const fetchPost = async () =>{ 
      const wikiPageData = await getWikiPage(user.token, pageid)
      setWikiPage(wikiPageData.fields)
      setComments(wikiPageData.fields.comments)
      setWikiId(wikiPageData.fields.wikiID)
    }
    fetchPost()
  }, [pageid])


  useEffect(()=>{
    const fetchPosts = async () =>{ 
      console.log(WikiId)
      if(WikiId != 0){
        const wikiPagesData = await getWikiPages(user.token, WikiId)
        setWikiPages(wikiPagesData.pages)
      }
    }
    fetchPosts()
  }, [pageid, WikiId])

  const handleAddComment = async (token, body, content) => {
    await addWikiComment(token, body, content)
  
    const wikiPageData = await getWikiPage(user.token, pageid)
    setWikiPage(wikiPageData.fields)
    setComments(wikiPageData.fields.comments)
  }
  
  const handleDeleteComment = async (token, commentId) => {
    await deleteWikiComment(token, commentId)
  
    const wikiPageData = await getWikiPage(user.token, pageid)
    setWikiPage(wikiPageData.fields)
    setComments(wikiPageData.fields.comments)
  }
  console.log(WikiPage)
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
          <p id="wiki-content-container">{linkWikiContent(WikiPage.content, WikiPages)}</p>
        </div>
      <DisplayComments Comments={Comments} addComment={handleAddComment} addToId={pageid} deleteComment={handleDeleteComment} addToString={"wikipageID"}/>

      <WikiPageHistory />
      </div>
    </div>
  )
}

function WikiPage(){
  return (
    <div>
      <DisplayWikiPage />
    </div>
  )
}

export default WikiPage
