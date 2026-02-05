import { useState } from "react"
import './CSS/comments.css'
import './CSS/commonclass.css'
import { getAllPeople } from "./apicalls"
import { useAuth } from "./Auth/Authcontext"
import Spinner from "./spinnertest"

function DisplayComments({Comments, addComment, addToId, deleteComment, addToString = "" ,isFetching=false}){
    const [Comment, setComment] = useState("")
    const {user} = useAuth()



    return(
        <div id="comments-container">
            <h2 id="comments-header">Kommentarer</h2>
            <div id="add-comment-container" className="flex-column align-center">
                <input id="comment-input-field" type="text" onChange={(e)=>{setComment(e.target.value)}} autoComplete="off" />
                <button id="add-comment-button" onClick={()=>{
                    if(addToString == "wikipageID"){
                        addComment(user.token, {"wikipageID": addToId}, {"content": Comment})
                    }
                    else if(addToString != "wikipageID"){
                        addComment(user.token, {"blogpostID": addToId}, {"content": Comment})
                    }
                }}>Lägg till kommentar</button>
                {isFetching && <Spinner size={12} />}
            </div>
            {
                Comments.map(comment=>(
                <div key={comment.id} id="comment-container">
                    {comment.content}
                    <button onClick={()=>{deleteComment(user.token, comment.id)}}>Ta bort</button>
                </div>
                ))
            }
        </div>
    )
}


export default DisplayComments