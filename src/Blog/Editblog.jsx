import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { getBlog, linkTags, editBlog } from "../apicalls";
import '../CSS/commonclass.css'
import '../CSS/editblog.css'
import { useAuth } from "../Auth/Authcontext";
import { useApi } from "../hooks/useApi";
import LoadingAndErrorHandler from "../LoadingAndErrorhandler";


function DisplayEditContainer() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { blogid } = useParams();

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  // Fetch blog 
  const fetchBlog = async ({ signal }) => {
    return await getBlog(user.token, blogid, signal);
  };

  const { data, loading, error } = useApi(fetchBlog, [user], !!user?.token);

  // When blog fetched fill form
  useEffect(() => {
    if (data) {
      setTitle(data.fields.title);
      setDescription(data.fields.description);
      setIsPublic(data.fields.public);
    }
  }, [data]);

  // Save handler
  const handleSave = async () => {
    await editBlog(user.token, blogid, {
      title,
      description,
      public: isPublic,
    });

    navigate(-1);
  };


  if (loading || error) return <LoadingAndErrorHandler Loading={loading} Error={error} />

  return (
    <div>
      
      <EditBlogMenu title={title} setTitle={setTitle} description={description} setDescription={setDescription} isPublic={isPublic} setIsPublic={setIsPublic} onSave={handleSave}/>
    </div>
  );
}

function EditBlogMenu({title, setTitle, description, setDescription, isPublic, setIsPublic, onSave}) {

  return (
    <form id="edit-post-input-container" className="align-center flex-column"
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
    }}>
      <input id="edit-post-title-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <textarea id="edit-post-content-input" value={description} onChange={(e) => setDescription(e.target.value)}/>
      <label>
        Public
        <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)}/>
      </label>
      <button type="submit">Spara ändringar</button>
    </form>
  );
}


function EditBlog(){
  const navigate = useNavigate()
  return (
    <div>
      <button id="back-arrow-button" onClick={() => navigate(-1)}>←</button>
      <DisplayEditContainer />
    </div>
  )
}

export default EditBlog