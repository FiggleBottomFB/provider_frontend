import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { getBlogPost, linkTags, editBlogPost } from "../apicalls";
import '../CSS/commonclass.css'
import '../CSS/editblog.css'
import { useApi } from "../hooks/useApi";
import { useAuth } from "../Auth/Authcontext";


function DisplayEditContainer({}){
  const [BlogPost, setBlogPost] = useState([])
  const [Tags, setTags] = useState([])
  const [Title, setTitle] = useState("")
  const [Content, setContent] = useState("")
  const [Settings, setSettings] = useState([])
  const navigate = useNavigate()
  let params = useParams();
  const postid = params.blogpostid
  const {user}=useAuth();

  // useEffect(()=>{
  //   const fetchPost = async () =>{ 
  //     const blogPostData = await getBlogPost(window.sessionStorage.getItem("token"), postid)
  //     setBlogPost(blogPostData.fields)
  //     setTitle(blogPostData.fields.title)
  //     // setTags(blogPostData.fields.tags)
  //     setContent(blogPostData.fields.content)
  //     setSettings(blogPostData.fields.settings)
  //   }
  //   fetchPost()
  // }, [])


    // Fetch post 
    const fetchBlogPost = async ({ signal }) => {
      return await getBlogPost(user.token, postid, signal);
    };
  
    const { data, loading, error } = useApi(fetchBlogPost, [user], !!user?.token);
  
    // When blog fetched fill form
    useEffect(() => {
      if (data) {
        setBlogPost(data.fields)
        setTitle(data.fields.title)
        // setTags(data.fields.tags)
        setContent(data.fields.content)
        setSettings(data.fields.settings)
      }
    }, [data]);
  

    // Save handler
    const handleSave = async () => {
      await editBlogPost(user.token, BlogPost.id, {"title": Title, "content": Content});
      navigate(-1);
    };

    if (error) return <p>Error loading blog: {error}</p>;
    if (loading) return <p>Loading... </p>;
    

  return(
    <div>
      <EditBlogPostMenu Title={Title} setTitle={setTitle} Content={Content} setContent={setContent} onSave={handleSave}/>
    </div>
  )
}



function EditBlogPostMenu({Title, setTitle, Content, setContent, onSave}) {

  return (
    <form id="edit-post-input-container" className="align-center flex-column"
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
    }}>
      <input id="edit-post-title-input" type="text" value={Title} onChange={(e) => {setTitle(e.target.value)}} autoComplete="off"/>
      <textarea name="" value={Content} id="edit-post-content-input" onChange={(e)=>{setContent(e.target.value)}}></textarea>
      <button type="submit" >Spara ändringar</button>
    </form>
  );
}


function EditBlogPost(){
  const navigate = useNavigate()

  return (
    <div>
      <button id="back-arrow-button" onClick={()=>{navigate(-1)}}>←</button>
      <DisplayEditContainer />
    </div>
  )
}

export default EditBlogPost