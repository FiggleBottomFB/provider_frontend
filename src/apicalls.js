const API_BASE = "https://tp1.api.ntigskovde.se";

async function apiFetch(path, { method = "GET", token, personToken, body, isFormData } = {}) {
  const headers = {};
  if (token) headers["Authorization"] = "Bearer " + token;
  if (personToken) headers["X-Person-Token"] = personToken;
  if (body && !isFormData) headers["Content-Type"] = "application/json";

  const res = await fetch(API_BASE + path, {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  return res.json();
}
//MARK:AUTH
/* ===================== AUTH ===================== */
export const login = (username, password) =>
  apiFetch("/api/auth/login", { method: "POST", body: { username, password } });

export const verifyToken = (token) =>
  apiFetch("/api/auth/verify", { method: "POST", token });

export const logout = (token) =>
  apiFetch("/api/auth/logout", { method: "POST", token });

//MARK:PEOPLE
/* ===================== PEOPLE ===================== */
export const personLogin = (token, username, passwordhash) =>
  apiFetch("/api/people/cred/login", { method: "POST", token, body: { username, passwordhash } });

export const personLogout = (token) =>
  apiFetch("/api/people/cred/logout", { method: "POST", token });

export const getAllPeople = (token, personToken, includeBlocked = false) =>
  apiFetch(`/api/people/get-all${includeBlocked ? "?include-blocked=1" : ""}`, { token, personToken });

export const getPerson = (token, personToken, id) =>
  apiFetch(`/api/people/get?id=${id}`, { token, personToken });

export const addPerson = (token, personToken, fields) =>
  apiFetch("/api/people/add", { method: "POST", token, personToken, body: { fields } });

export const editPerson = (token, personToken, personID, fields) =>
  apiFetch("/api/people/edit", { method: "POST", token, personToken, body: { personID, fields } });

export const deletePerson = (token, personToken, personID) =>
  apiFetch("/api/people/del", { method: "POST", token, personToken, body: { personID } });

//MARK:BLOG
/* ===================== BLOG ===================== */
export const getAllBlogs = (token, personToken, params = "") =>
  apiFetch(`/api/blog/get-all${params}`, { token, personToken });

export const getBlog = (token, personToken, id) =>
  apiFetch(`/api/blog/get?id=${id}`, { token, personToken });

export const addBlog = (token, personToken, personID, fields) =>
  apiFetch("/api/blog/add", { method: "POST", token, personToken, body: { personID, fields } });

export const editBlog = (token, personToken, blogID, fields) =>
  apiFetch("/api/blog/edit", { method: "POST", token, personToken, body: { blogID, fields } });

export const deleteBlog = (token, personToken, blogID) =>
  apiFetch("/api/blog/del", { method: "POST", token, personToken, body: { blogID } });

export const getBlogPerms = (token, personToken, blogID) =>
  apiFetch(`/api/blog/perm/get-all?id=${blogID}`, { token, personToken });

export const editBlogPerm = (token, personToken, blogID, personID, perms) =>
  apiFetch("/api/blog/perm/edit", { method: "POST", token, personToken, body: { blogID, personID, perms } });
//MARK:SETTINGS
/* Blog Settings */
export const addBlogSetting = (token, personToken, blogID, settings) =>
  apiFetch("/api/blog/setting/add", { method: "POST", token, personToken, body: { blogID, settings } });

export const editBlogSetting = (token, personToken, blogID, settings) =>
  apiFetch("/api/blog/setting/edit", { method: "POST", token, personToken, body: { blogID, settings } });

export const deleteBlogSetting = (token, personToken, blogID, keys) =>
  apiFetch("/api/blog/setting/del", { method: "POST", token, personToken, body: { blogID, settings: keys } });

//MARK:BLOG POSTS
/* Blog Posts */
export const getBlogPosts = (token, personToken, blogID, params = "") =>
  apiFetch(`/api/blog/post/get-all?blogID=${blogID}${params}`, { token, personToken });

export const getBlogPost = (token, personToken, id) =>
  apiFetch(`/api/blog/post/get?id=${id}`, { token, personToken });

export const addBlogPost = (token, personToken, blogID, fields) =>
  apiFetch("/api/blog/post/add", { method: "POST", token, personToken, body: { blogID, fields } });

export const editBlogPost = (token, personToken, blogpostID, fields) =>
  apiFetch("/api/blog/post/edit", { method: "POST", token, personToken, body: { blogpostID, fields } });

export const deleteBlogPost = (token, personToken, blogpostID) =>
  apiFetch("/api/blog/post/del", { method: "POST", token, personToken, body: { blogpostID } });

//MARK:BLOG COMMENTS
/* Blog Comments */
export const addBlogComment = (token, personToken, parent, fields) =>
  apiFetch("/api/blog/post/comment/add", { method: "POST", token, personToken, body: { parent, fields } });

export const deleteBlogComment = (token, personToken, commentID) =>
  apiFetch("/api/blog/post/comment/del", { method: "POST", token, personToken, body: { commentID } });

//MARK:WIKI
/* ===================== WIKI ===================== */
export const getAllWikis = (token, personToken, params = "") =>
  apiFetch(`/api/wiki/get-all${params}`, { token, personToken });

export const getWiki = (token, personToken, id) =>
  apiFetch(`/api/wiki/get?id=${id}`, { token, personToken });

export const addWiki = (token, personToken, personID, fields) =>
  apiFetch("/api/wiki/add", { method: "POST", token, personToken, body: { personID, fields } });

export const editWiki = (token, personToken, wikiID, fields) =>
  apiFetch("/api/wiki/edit", { method: "POST", token, personToken, body: { wikiID, fields } });

export const deleteWiki = (token, personToken, wikiID) =>
  apiFetch("/api/wiki/del", { method: "POST", token, personToken, body: { wikiID } });

export const getWikiPerms = (token, personToken, wikiID) =>
  apiFetch(`/api/wiki/perm/get-all?id=${wikiID}`, { token, personToken });

export const editWikiPerm = (token, personToken, wikiID, personID, perms) =>
  apiFetch("/api/wiki/perm/edit", { method: "POST", token, personToken, body: { wikiID, personID, perms } });
//MARK:WIKI SETTINGS
/* Wiki Settings */
export const addWikiSetting = (token, personToken, wikiID, settings) =>
  apiFetch("/api/wiki/setting/add", { method: "POST", token, personToken, body: { wikiID, settings } });

export const editWikiSetting = (token, personToken, wikiID, settings) =>
  apiFetch("/api/wiki/setting/edit", { method: "POST", token, personToken, body: { wikiID, settings } });

export const deleteWikiSetting = (token, personToken, wikiID, keys) =>
  apiFetch("/api/wiki/setting/del", { method: "POST", token, personToken, body: { wikiID, settings: keys } });
//MARK: WIKI PAGES
/* Wiki Pages */
export const getWikiPages = (token, personToken, wikiID, params = "") =>
  apiFetch(`/api/wiki/page/get-all?wikiID=${wikiID}${params}`, { token, personToken });

export const getWikiPage = (token, personToken, id) =>
  apiFetch(`/api/wiki/page/get?id=${id}`, { token, personToken });

export const addWikiPage = (token, personToken, wikiID, fields) =>
  apiFetch("/api/wiki/page/add", { method: "POST", token, personToken, body: { wikiID, fields } });

export const editWikiPage = (token, personToken, wikipageID, fields) =>
  apiFetch("/api/wiki/page/edit", { method: "POST", token, personToken, body: { wikipageID, fields } });

export const deleteWikiPage = (token, personToken, wikipageID) =>
  apiFetch("/api/wiki/page/del", { method: "POST", token, personToken, body: { wikipageID } });
//MARK: WIKI COMMENTS
/* Wiki Comments */
export const addWikiComment = (token, personToken, parent, fields) =>
  apiFetch("/api/wiki/page/comment/add", { method: "POST", token, personToken, body: { parent, fields } });

export const deleteWikiComment = (token, personToken, commentID) =>
  apiFetch("/api/wiki/page/comment/del", { method: "POST", token, personToken, body: { commentID } });
//MARK: WIKI HISTORY
/* Wiki History */
export const getWikiHistory = (token, personToken, wikipageID, params = "") =>
  apiFetch(`/api/wiki/page/history/get-all?wikipageID=${wikipageID}${params}`, { token, personToken });

export const restoreWikiHistory = (token, personToken, wikipageHistoryID) =>
  apiFetch("/api/wiki/page/history/restore", { method: "POST", token, personToken, body: { wikipageHistoryID } });
//MARK: CALENDAR
/* ===================== CALENDAR ===================== */
export const getAllCalendars = (token, personToken) =>
  apiFetch("/api/cal/get-all", { token, personToken });

export const getCalendarSettings = (token, personToken) =>
  apiFetch("/api/cal/get", { token, personToken });

export const editCalendarSettings = (token, personToken, settings) =>
  apiFetch("/api/cal/edit", { method: "POST", token, personToken, body: { settings } });

export const getEvents = (token, personToken, params = "") =>
  apiFetch(`/api/cal/event/get-all${params}`, { token, personToken });

export const getEvent = (token, personToken, id) =>
  apiFetch(`/api/cal/event/get?id=${id}`, { token, personToken });

export const addEvent = (token, personToken, calID, fields) =>
  apiFetch("/api/cal/event/add", { method: "POST", token, personToken, body: { calID, fields } });

export const editEvent = (token, personToken, calEventID, fields) =>
  apiFetch("/api/cal/event/edit", { method: "POST", token, personToken, body: { calEventID, fields } });

export const deleteEvent = (token, personToken, calEventID) =>
  apiFetch("/api/cal/event/del", { method: "POST", token, personToken, body: { calEventID } });

export const getCalEventPerms = (token, personToken, calEventID) =>
  apiFetch(`/api/cal/event/perm/get-all?id=${calEventID}`, { token, personToken });

export const editCalEventPerm = (token, personToken, calEventID, personID, perms) =>
  apiFetch("/api/cal/event/perm/edit", { method: "POST", token, personToken, body: { calEventID, personID, perms } });
//MARK: MEDIA
/* ===================== MEDIA ===================== */
export const getAllMedia = (token, personToken) =>
  apiFetch("/api/media/get-all", { token, personToken });

export const fetchMedia = (token, uuid) =>
  fetch(`${API_BASE}/api/media/fetch?uuid=${uuid}`, {
    headers: { Authorization: "Bearer " + token },
  });

export const uploadMedia = (token, personToken, file) => {
  const fd = new FormData();
  fd.append("media", file);
  return apiFetch("/api/media/upload", { method: "POST", token, personToken, body: fd, isFormData: true });
};

export const deleteMedia = (token, personToken, uuid) =>
  apiFetch("/api/media/del", { method: "POST", token, personToken, body: { uuid } });

export const linkMedia = (token, personToken, payload) =>
  apiFetch("/api/media/link", { method: "POST", token, personToken, body: payload });

export const unlinkMedia = (token, personToken, payload) =>
  apiFetch("/api/media/unlink", { method: "POST", token, personToken, body: payload });
//MARK:TAGS
/* ===================== TAGS ===================== */
export const linkTags = (token, personToken, payload) =>
  apiFetch("/api/tag/link", { method: "POST", token, personToken, body: payload });

export const unlinkTags = (token, personToken, payload) =>
  apiFetch("/api/tag/unlink", { method: "POST", token, personToken, body: payload });
