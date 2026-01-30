import { useState } from "react"
import './CSS/comments.css'
import './CSS/commonclass.css'
import { getAllPeople } from "./apicalls"

function DisplayComments({Comments, addComment}){
    const [Comment, setComment] = useState("")
    
    return(
        <div id="comments-container">
            <h2 id="comments-header">Kommentarer</h2>
            <div id="add-comment-container" className="flex-column align-center">
                <input id="comment-input-field" type="text" onChange={(e)=>{setComment(e.target.value)}} />
                <button id="add-comment-button" onClick={()=>{
                    addComment(window.sessionStorage.getItem("token"), {"blogpostID": BlogPost.id}, {"content": Comment})
                }}>Lägg till kommentar</button>
            </div>
            {
                Comments.map((comment, commentindex)=>(
                <div key={commentindex} id="comment-container">
                    {comment.content}
                </div>
                ))
            }
        </div>
    )
}


export default DisplayComments