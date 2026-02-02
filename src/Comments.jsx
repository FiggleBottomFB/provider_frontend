import { useState } from "react"
import './CSS/comments.css'
import './CSS/commonclass.css'
import { getAllPeople } from "./apicalls"

function DisplayComments({Comments, addComment, addToId, deleteComment}){
    const [Comment, setComment] = useState("")
    
    return(
        <div id="comments-container">
            <h2 id="comments-header">Kommentarer</h2>
            <div id="add-comment-container" className="flex-column align-center">
                <input id="comment-input-field" type="text" onChange={(e)=>{setComment(e.target.value)}} autoComplete="off" />
                <button id="add-comment-button" onClick={()=>{
                    addComment(window.sessionStorage.getItem("token"), {"blogpostID": addToId}, {"content": Comment})
                }}>Lägg till kommentar</button>
            </div>
            {
                Comments.map(comment=>(
                <div key={comment.id} id="comment-container">
                    {comment.content}
                    <button onClick={()=>{deleteComment(window.sessionStorage.getItem("token"), comment.id)}}>Ta bort</button>
                </div>
                ))
            }
        </div>
    )
}


export default DisplayComments