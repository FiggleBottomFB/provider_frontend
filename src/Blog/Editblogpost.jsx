import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { getBlogPost, linkTags, editBlogPost, unlinkTags } from "../apicalls";
import '../CSS/commonclass.css'
import '../CSS/editblog.css'
import { useApi } from "../hooks/useApi";
import { useAuth } from "../Auth/Authcontext";
import LoadingAndErrorHandler from "../LoadingAndErrorhandler";


function DisplayEditContainer({}){
  const [BlogPost, setBlogPost] = useState([])
  const [Title, setTitle] = useState("")
  const [Content, setContent] = useState("")
  const [Settings, setSettings] = useState([])
  const navigate = useNavigate()
  let params = useParams();
  const postid = params.blogpostid
  const {user}=useAuth();


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

    if (loading || error) return <LoadingAndErrorHandler Loading={loading} Error={error} />
    

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
      <textarea name="" value={Content} id="edit-post-content-input" onChange={(e)=>{setContent(e.target.value)}} rows={15} cols={100}></textarea>
      <Handletags/>
      <button type="submit" >Spara ändringar</button>
    </form>
  );
}

function Handletags(){
  const [Tags, setTags] = useState([])
  const [Tag, setTag] = useState("")
  const {user} = useAuth()
  let param = useParams()
  const postid = param.blogpostid

  const fetchBlogPost = async ({ signal }) => {
    return await getBlogPost(user.token, postid, signal);
  };

  const fetchTags = useApi(fetchBlogPost, [user], !!user?.token);

  useEffect(() => {
    if (fetchTags.data) {
      setTags(fetchTags.data.fields.tags)
    }
  }, [fetchTags.data]);
  return(
    <div>
      <div>
          <h3>Lägg till en tagg</h3>
          <input id="add-title-input" type="text" value={Tag} onChange={(e)=>{setTag(e.target.value)}} autoComplete="off" />
          <button type="button" onClick={async()=>{setTags(prev => [...prev, Tag]); await linkTags(user.token, {"blogpostID": postid, "tags": [Tag]})}}>Lägg till tagg</button>
      </div>
      <div>
        {
          Tags.map((tag, index)=>(
            <div key={index} className="flex-row align-center">
              <p>{tag}</p>
              <button type="button" id="delete-tag-button" onClick={async ()=>{
                await unlinkTags(user.token, {"blogpostID": postid, "tags": [tag]})
            }}>x</button></div>
          ))
        }
      </div>
    </div>
  )
}

function EditBlogPost(){
  const navigate = useNavigate()

  return (
    <div id="edit-blogpost-full-container">
      <button id="back-arrow-button" onClick={()=>{navigate(-1)}}>←</button>
      <DisplayEditContainer />
    </div>
  )
}

export default EditBlogPost