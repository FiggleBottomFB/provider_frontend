import { useState } from "react";
import { useNavigate, useParams } from "react-router";

function DisplayBlogPosts({Posts, setPosts}){
    let params = useParams();
    const blogid = params.id
}


function Blog(){
    const [Posts, setPosts] = useState([])

    return(
        <div>
            <DisplayBlogPosts Posts={Posts} setPosts={setPosts}/>
        </div>
    )
}

export default Blog