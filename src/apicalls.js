const API_BASE = "https://tp1.api.ntigskovde.se";

let cachedToken = null;
let loginPromise = null;


async function apiFetch(path, options = {}) {
  const { method = "GET", personToken, body, isFormData, skipAuth = false, signal } =
    options;

  const headers = {};
  
  if (!skipAuth) {
    const token = await getToken();
    headers["Authorization"] = "Bearer " + token;
  }

  if (personToken) headers["X-Person-Token"] = personToken;
  if (body && !isFormData) headers["Content-Type"] = "application/json";

  const res = await fetch(API_BASE + path, {
    method,
    headers,
    signal,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  return await res.json();
}



async function getToken() {
  // 1. If token already exists, return it instantly
  cachedToken=null;
  if (cachedToken) return cachedToken;

  // 2. If login is already happening, wait for it
  if (loginPromise) return loginPromise;

  // 3. Otherwise start login once
  loginPromise = login("simonelias", "simonelias")
    .then((res) => {
      cachedToken = res.token;
      return cachedToken;
    })
    .finally(() => {
      loginPromise = null; // cleanup after finished
    });

  return loginPromise;
}

//MARK:AUTH
/* ===================== AUTH ===================== */
const login = (username, password ,options = {}) =>
  apiFetch("/api/auth/login", {
    method: "POST",
    body: { username, password },
    skipAuth: true,
    ...options,
  });

  export const logout = () =>
    apiFetch("/api/auth/logout", { method: "POST" });
  

export function verifyToken(options = {}) {
  return apiFetch("/api/auth/verify", {
    method: "POST",
    ...options,
  });
}

//MARK:PEOPLE
/* ===================== PEOPLE ===================== */
export const personLogin = ( username, passwordhash, options = {}) =>
  apiFetch("/api/people/cred/login", { method: "POST",  body: { username, passwordhash } , ...options,});

export const personLogout = (personToken, options = {}) =>
  apiFetch("/api/people/cred/logout", { method: "POST", personToken , ...options,});

export const getAllPeople = ( personToken, includeBlocked = false, options = {}) =>
  apiFetch(`/api/people/get-all${includeBlocked ? "?include-blocked=1" : ""}`, {  personToken , ...options,});

export const getPerson = ( personToken, id, options = {}) =>
  apiFetch(`/api/people/get?id=${id}`, {  personToken , ...options,});

export const addPerson = ( personToken, fields, options = {}) =>
  apiFetch("/api/people/add", { method: "POST",  personToken, body: { fields } , ...options,});

export const editPerson = ( personToken, personID, fields, options = {}) =>
  apiFetch("/api/people/edit", { method: "POST",  personToken, body: { personID, fields } , ...options,});

export const deletePerson = ( personToken, personID, options = {}) =>
  apiFetch("/api/people/del", { method: "POST",  personToken, body: { personID } , ...options,});

//MARK:BLOG
/* ===================== BLOG ===================== */
export const getAllBlogs = (personToken, params = "", options = {}) =>
  apiFetch(`/api/blog/get-all${params}`, {personToken, ...options, });// allows signal, etc
  /* example
  const {
  data: blogs,
  loading,
  error,
} = useApi(({ signal }) => getAllBlogs(personToken, "?page=1", { signal }), [personToken], !!personToken);
  */ 

export const getBlog = (personToken, id, options = {}) =>
  apiFetch(`/api/blog/get?id=${id}`, {personToken, ...options,});

export const addBlog = ( personToken, personID, fields, options = {}) =>
  apiFetch("/api/blog/add", { method: "POST",  personToken, body: { personID, fields }, ...options, });

export const editBlog = ( personToken, blogID, fields, options = {}) =>
  apiFetch("/api/blog/edit", { method: "POST",  personToken, body: { blogID, fields }, ...options, });

export const deleteBlog = ( personToken, blogID, options = {}) =>
  apiFetch("/api/blog/del", { method: "POST",  personToken, body: { blogID } , ...options,});

export const getBlogPerms = ( personToken, blogID, options = {}) =>
  apiFetch(`/api/blog/perm/get-all?id=${blogID}`, {  personToken , ...options,});

export const editBlogPerm = ( personToken, blogID, personID, perms, options = {}) =>
  apiFetch("/api/blog/perm/edit", { method: "POST",  personToken, body: { blogID, personID, perms } , ...options,});
//MARK:SETTINGS
/* Blog Settings */
export const addBlogSetting = ( personToken, blogID, settings, options = {}) =>
  apiFetch("/api/blog/setting/add", { method: "POST",  personToken, body: { blogID, settings } , ...options,});

export const editBlogSetting = ( personToken, blogID, settings, options = {}) =>
  apiFetch("/api/blog/setting/edit", { method: "POST",  personToken, body: { blogID, settings } , ...options,});

export const deleteBlogSetting = ( personToken, blogID, keys, options = {}) =>
  apiFetch("/api/blog/setting/del", { method: "POST",  personToken, body: { blogID, settings: keys } , ...options,});

//MARK:BLOG POSTS
/* Blog Posts */
export const getBlogPosts = ( personToken, blogID, params = "", options = {}) =>
  apiFetch(`/api/blog/post/get-all?blogID=${blogID}${params}`, {  personToken , ...options,});

export const getBlogPost = ( personToken, id, options = {}) =>
  apiFetch(`/api/blog/post/get?id=${id}`, {  personToken , ...options,});

export const addBlogPost = ( personToken, blogID, fields, options = {}) =>
  apiFetch("/api/blog/post/add", { method: "POST",  personToken, body: { blogID, fields } , ...options,});

export const editBlogPost = ( personToken, blogpostID, fields, options = {}) =>
  apiFetch("/api/blog/post/edit", { method: "POST",  personToken, body: { blogpostID, fields } , ...options,});

export const deleteBlogPost = ( personToken, blogpostID, options = {}) =>
  apiFetch("/api/blog/post/del", { method: "POST",  personToken, body: { blogpostID } , ...options,});

//MARK:BLOG COMMENTS
/* Blog Comments */
export const addBlogComment = ( personToken, parent, fields, options = {}) =>
  apiFetch("/api/blog/post/comment/add", { method: "POST",  personToken, body: { parent, fields } , ...options,});

export const deleteBlogComment = ( personToken, commentID, options = {}) =>
  apiFetch("/api/blog/post/comment/del", { method: "POST",  personToken, body: { commentID } , ...options,});

//MARK:WIKI
/* ===================== WIKI ===================== */
export const getAllWikis = ( personToken, params = "", options = {}) =>
  apiFetch(`/api/wiki/get-all${params}`, {  personToken , ...options,});

export const getWiki = ( personToken, id, options = {}) =>
  apiFetch(`/api/wiki/get?id=${id}`, {  personToken , ...options,});

export const addWiki = ( personToken, personID, fields, options = {}) =>
  apiFetch("/api/wiki/add", { method: "POST",  personToken, body: { personID, fields } , ...options,});

export const editWiki = ( personToken, wikiID, fields, options = {}) =>
  apiFetch("/api/wiki/edit", { method: "POST",  personToken, body: { wikiID, fields } , ...options,});

export const deleteWiki = ( personToken, wikiID, options = {}) =>
  apiFetch("/api/wiki/del", { method: "POST",  personToken, body: { wikiID } , ...options,});

export const getWikiPerms = ( personToken, wikiID, options = {}) =>
  apiFetch(`/api/wiki/perm/get-all?id=${wikiID}`, {  personToken , ...options,});

export const editWikiPerm = ( personToken, wikiID, personID, perms, options = {}) =>
  apiFetch("/api/wiki/perm/edit", { method: "POST",  personToken, body: { wikiID, personID, perms } , ...options,});
//MARK:WIKI SETTINGS
/* Wiki Settings */
export const addWikiSetting = ( personToken, wikiID, settings, options = {}) =>
  apiFetch("/api/wiki/setting/add", { method: "POST",  personToken, body: { wikiID, settings } , ...options,});

export const editWikiSetting = ( personToken, wikiID, settings, options = {}) =>
  apiFetch("/api/wiki/setting/edit", { method: "POST",  personToken, body: { wikiID, settings } , ...options,});

export const deleteWikiSetting = ( personToken, wikiID, keys, options = {}) =>
  apiFetch("/api/wiki/setting/del", { method: "POST",  personToken, body: { wikiID, settings: keys } , ...options,});
//MARK: WIKI PAGES
/* Wiki Pages */
export const getWikiPages = ( personToken, wikiID, params = "", options = {}) =>
  apiFetch(`/api/wiki/page/get-all?wikiID=${wikiID}${params}`, {  personToken , ...options,});

export const getWikiPage = ( personToken, id, options = {}) =>
  apiFetch(`/api/wiki/page/get?id=${id}`, {  personToken , ...options,});

export const addWikiPage = ( personToken, wikiID, fields, options = {}) =>
  apiFetch("/api/wiki/page/add", { method: "POST",  personToken, body: { wikiID, fields } , ...options,});

export const editWikiPage = ( personToken, wikipageID, fields, options = {}) =>
  apiFetch("/api/wiki/page/edit", { method: "POST",  personToken, body: { wikipageID, fields } , ...options,});

export const deleteWikiPage = ( personToken, wikipageID, options = {}) =>
  apiFetch("/api/wiki/page/del", { method: "POST",  personToken, body: { wikipageID } , ...options,});
//MARK: WIKI COMMENTS
/* Wiki Comments */
export const addWikiComment = ( personToken, parent, fields, options = {}) =>
  apiFetch("/api/wiki/page/comment/add", { method: "POST",  personToken, body: { parent, fields } , ...options,});

export const deleteWikiComment = ( personToken, commentID, options = {}) =>
  apiFetch("/api/wiki/page/comment/del", { method: "POST",  personToken, body: { commentID } , ...options,});
//MARK: WIKI HISTORY
/* Wiki History */
export const getWikiHistory = ( personToken, wikipageID, params = "", options = {}) =>
  apiFetch(`/api/wiki/page/history/get-all?wikipageID=${wikipageID}${params}`, {  personToken , ...options,});

export const restoreWikiHistory = ( personToken, wikipageHistoryID, options = {}) =>
  apiFetch("/api/wiki/page/history/restore", { method: "POST",  personToken, body: { wikipageHistoryID } , ...options,});
//MARK: CALENDAR
/* ===================== CALENDAR ===================== */
export const getAllCalendars = ( personToken, options = {}) =>
  apiFetch("/api/cal/get-all", {  personToken , ...options,});

export const getCalendarSettings = ( personToken, options = {}) =>
  apiFetch("/api/cal/get", {  personToken , ...options,});

export const editCalendarSettings = ( personToken, settings, options = {}) =>
  apiFetch("/api/cal/edit", { method: "POST",  personToken, body: { settings } , ...options,});

export const getEvents = ( personToken, params = "", options = {}) =>
  apiFetch(`/api/cal/event/get-all${params}`, {  personToken , ...options,});

export const getEvent = ( personToken, id, options = {}) =>
  apiFetch(`/api/cal/event/get?id=${id}`, {  personToken , ...options,});

export const addEvent = ( personToken, calID, fields, options = {}) =>
  apiFetch("/api/cal/event/add", { method: "POST",  personToken, body: { calID, fields } , ...options,});

export const editEvent = ( personToken, calEventID, fields, options = {}) =>
  apiFetch("/api/cal/event/edit", { method: "POST",  personToken, body: { calEventID, fields } , ...options,});

export const deleteEvent = ( personToken, calEventID, options = {}) =>
  apiFetch("/api/cal/event/del", { method: "POST",  personToken, body: { calEventID } , ...options,});

export const getCalEventPerms = ( personToken, calEventID, options = {}) =>
  apiFetch(`/api/cal/event/perm/get-all?id=${calEventID}`, {  personToken , ...options,});

export const editCalEventPerm = ( personToken, calEventID, personID, perms, options = {}) =>
  apiFetch("/api/cal/event/perm/edit", { method: "POST",  personToken, body: { calEventID, personID, perms } , ...options,});
//MARK: MEDIA
/* ===================== MEDIA ===================== */
export const getAllMedia = ( personToken, options = {}) =>
  apiFetch("/api/media/get-all", {  personToken , ...options,});

export const fetchMedia = ( uuid, options = {}) =>
  fetch(`${API_BASE}/api/media/fetch?uuid=${uuid}`, {headers: { Authorization: "Bearer " + token }, ...options,});

export const uploadMedia = ( personToken, file, options = {}) => {
  const fd = new FormData();
  fd.append("media", file);
  return apiFetch("/api/media/upload", { method: "POST",  personToken, body: fd, isFormData: true , ...options,});
};

export const deleteMedia = ( personToken, uuid, options = {}) =>
  apiFetch("/api/media/del", { method: "POST",  personToken, body: { uuid } , ...options,});

export const linkMedia = ( personToken, payload, options = {}) =>
  apiFetch("/api/media/link", { method: "POST",  personToken, body: payload , ...options,});

export const unlinkMedia = ( personToken, payload, options = {}) =>
  apiFetch("/api/media/unlink", { method: "POST",  personToken, body: payload , ...options,});
//MARK:TAGS
/* ===================== TAGS ===================== */
export const linkTags = ( personToken, payload, options = {}) =>
  apiFetch("/api/tag/link", { method: "POST",  personToken, body: payload , ...options,});

export const unlinkTags = ( personToken, payload, options = {}) =>
  apiFetch("/api/tag/unlink", { method: "POST",  personToken, body: payload , ...options,});
