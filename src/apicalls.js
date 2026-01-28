const API_BASE = "https://tp1.api.ntigskovde.se";

let cachedToken = null;
let loginPromise = null;


async function apiFetch(path, options = {}) {
  const { method = "GET", personToken, body, isFormData, skipAuth = false } =
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
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  return await res.json();
}



async function getToken() {
  // 1. If token already exists, return it instantly
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
const login = (username, password) =>
  apiFetch("/api/auth/login", {
    method: "POST",
    body: { username, password },
    skipAuth: true,
  });

export const verifyToken = () =>
  apiFetch("/api/auth/verify", { method: "POST" });

export const logout = () =>
  apiFetch("/api/auth/logout", { method: "POST" });

//MARK:PEOPLE
/* ===================== PEOPLE ===================== */
export const personLogin = ( username, passwordhash) =>
  apiFetch("/api/people/cred/login", { method: "POST",  body: { username, passwordhash } });

export const personLogout = (personToken) =>
  apiFetch("/api/people/cred/logout", { method: "POST", personToken });

export const getAllPeople = ( personToken, includeBlocked = false) =>
  apiFetch(`/api/people/get-all${includeBlocked ? "?include-blocked=1" : ""}`, {  personToken });

export const getPerson = ( personToken, id) =>
  apiFetch(`/api/people/get?id=${id}`, {  personToken });

export const addPerson = ( personToken, fields) =>
  apiFetch("/api/people/add", { method: "POST",  personToken, body: { fields } });

export const editPerson = ( personToken, personID, fields) =>
  apiFetch("/api/people/edit", { method: "POST",  personToken, body: { personID, fields } });

export const deletePerson = ( personToken, personID) =>
  apiFetch("/api/people/del", { method: "POST",  personToken, body: { personID } });

//MARK:BLOG
/* ===================== BLOG ===================== */
export const getAllBlogs = ( personToken, params = "") =>
  apiFetch(`/api/blog/get-all${params}`, {  personToken });

export const getBlog = ( personToken, id) =>
  apiFetch(`/api/blog/get?id=${id}`, {  personToken });

export const addBlog = ( personToken, personID, fields) =>
  apiFetch("/api/blog/add", { method: "POST",  personToken, body: { personID, fields } });

export const editBlog = ( personToken, blogID, fields) =>
  apiFetch("/api/blog/edit", { method: "POST",  personToken, body: { blogID, fields } });

export const deleteBlog = ( personToken, blogID) =>
  apiFetch("/api/blog/del", { method: "POST",  personToken, body: { blogID } });

export const getBlogPerms = ( personToken, blogID) =>
  apiFetch(`/api/blog/perm/get-all?id=${blogID}`, {  personToken });

export const editBlogPerm = ( personToken, blogID, personID, perms) =>
  apiFetch("/api/blog/perm/edit", { method: "POST",  personToken, body: { blogID, personID, perms } });
//MARK:SETTINGS
/* Blog Settings */
export const addBlogSetting = ( personToken, blogID, settings) =>
  apiFetch("/api/blog/setting/add", { method: "POST",  personToken, body: { blogID, settings } });

export const editBlogSetting = ( personToken, blogID, settings) =>
  apiFetch("/api/blog/setting/edit", { method: "POST",  personToken, body: { blogID, settings } });

export const deleteBlogSetting = ( personToken, blogID, keys) =>
  apiFetch("/api/blog/setting/del", { method: "POST",  personToken, body: { blogID, settings: keys } });

//MARK:BLOG POSTS
/* Blog Posts */
export const getBlogPosts = ( personToken, blogID, params = "") =>
  apiFetch(`/api/blog/post/get-all?blogID=${blogID}${params}`, {  personToken });

export const getBlogPost = ( personToken, id) =>
  apiFetch(`/api/blog/post/get?id=${id}`, {  personToken });

export const addBlogPost = ( personToken, blogID, fields) =>
  apiFetch("/api/blog/post/add", { method: "POST",  personToken, body: { blogID, fields } });

export const editBlogPost = ( personToken, blogpostID, fields) =>
  apiFetch("/api/blog/post/edit", { method: "POST",  personToken, body: { blogpostID, fields } });

export const deleteBlogPost = ( personToken, blogpostID) =>
  apiFetch("/api/blog/post/del", { method: "POST",  personToken, body: { blogpostID } });

//MARK:BLOG COMMENTS
/* Blog Comments */
export const addBlogComment = ( personToken, parent, fields) =>
  apiFetch("/api/blog/post/comment/add", { method: "POST",  personToken, body: { parent, fields } });

export const deleteBlogComment = ( personToken, commentID) =>
  apiFetch("/api/blog/post/comment/del", { method: "POST",  personToken, body: { commentID } });

//MARK:WIKI
/* ===================== WIKI ===================== */
export const getAllWikis = ( personToken, params = "") =>
  apiFetch(`/api/wiki/get-all${params}`, {  personToken });

export const getWiki = ( personToken, id) =>
  apiFetch(`/api/wiki/get?id=${id}`, {  personToken });

export const addWiki = ( personToken, personID, fields) =>
  apiFetch("/api/wiki/add", { method: "POST",  personToken, body: { personID, fields } });

export const editWiki = ( personToken, wikiID, fields) =>
  apiFetch("/api/wiki/edit", { method: "POST",  personToken, body: { wikiID, fields } });

export const deleteWiki = ( personToken, wikiID) =>
  apiFetch("/api/wiki/del", { method: "POST",  personToken, body: { wikiID } });

export const getWikiPerms = ( personToken, wikiID) =>
  apiFetch(`/api/wiki/perm/get-all?id=${wikiID}`, {  personToken });

export const editWikiPerm = ( personToken, wikiID, personID, perms) =>
  apiFetch("/api/wiki/perm/edit", { method: "POST",  personToken, body: { wikiID, personID, perms } });
//MARK:WIKI SETTINGS
/* Wiki Settings */
export const addWikiSetting = ( personToken, wikiID, settings) =>
  apiFetch("/api/wiki/setting/add", { method: "POST",  personToken, body: { wikiID, settings } });

export const editWikiSetting = ( personToken, wikiID, settings) =>
  apiFetch("/api/wiki/setting/edit", { method: "POST",  personToken, body: { wikiID, settings } });

export const deleteWikiSetting = ( personToken, wikiID, keys) =>
  apiFetch("/api/wiki/setting/del", { method: "POST",  personToken, body: { wikiID, settings: keys } });
//MARK: WIKI PAGES
/* Wiki Pages */
export const getWikiPages = ( personToken, wikiID, params = "") =>
  apiFetch(`/api/wiki/page/get-all?wikiID=${wikiID}${params}`, {  personToken });

export const getWikiPage = ( personToken, id) =>
  apiFetch(`/api/wiki/page/get?id=${id}`, {  personToken });

export const addWikiPage = ( personToken, wikiID, fields) =>
  apiFetch("/api/wiki/page/add", { method: "POST",  personToken, body: { wikiID, fields } });

export const editWikiPage = ( personToken, wikipageID, fields) =>
  apiFetch("/api/wiki/page/edit", { method: "POST",  personToken, body: { wikipageID, fields } });

export const deleteWikiPage = ( personToken, wikipageID) =>
  apiFetch("/api/wiki/page/del", { method: "POST",  personToken, body: { wikipageID } });
//MARK: WIKI COMMENTS
/* Wiki Comments */
export const addWikiComment = ( personToken, parent, fields) =>
  apiFetch("/api/wiki/page/comment/add", { method: "POST",  personToken, body: { parent, fields } });

export const deleteWikiComment = ( personToken, commentID) =>
  apiFetch("/api/wiki/page/comment/del", { method: "POST",  personToken, body: { commentID } });
//MARK: WIKI HISTORY
/* Wiki History */
export const getWikiHistory = ( personToken, wikipageID, params = "") =>
  apiFetch(`/api/wiki/page/history/get-all?wikipageID=${wikipageID}${params}`, {  personToken });

export const restoreWikiHistory = ( personToken, wikipageHistoryID) =>
  apiFetch("/api/wiki/page/history/restore", { method: "POST",  personToken, body: { wikipageHistoryID } });
//MARK: CALENDAR
/* ===================== CALENDAR ===================== */
export const getAllCalendars = ( personToken) =>
  apiFetch("/api/cal/get-all", {  personToken });

export const getCalendarSettings = ( personToken) =>
  apiFetch("/api/cal/get", {  personToken });

export const editCalendarSettings = ( personToken, settings) =>
  apiFetch("/api/cal/edit", { method: "POST",  personToken, body: { settings } });

export const getEvents = ( personToken, params = "") =>
  apiFetch(`/api/cal/event/get-all${params}`, {  personToken });

export const getEvent = ( personToken, id) =>
  apiFetch(`/api/cal/event/get?id=${id}`, {  personToken });

export const addEvent = ( personToken, calID, fields) =>
  apiFetch("/api/cal/event/add", { method: "POST",  personToken, body: { calID, fields } });

export const editEvent = ( personToken, calEventID, fields) =>
  apiFetch("/api/cal/event/edit", { method: "POST",  personToken, body: { calEventID, fields } });

export const deleteEvent = ( personToken, calEventID) =>
  apiFetch("/api/cal/event/del", { method: "POST",  personToken, body: { calEventID } });

export const getCalEventPerms = ( personToken, calEventID) =>
  apiFetch(`/api/cal/event/perm/get-all?id=${calEventID}`, {  personToken });

export const editCalEventPerm = ( personToken, calEventID, personID, perms) =>
  apiFetch("/api/cal/event/perm/edit", { method: "POST",  personToken, body: { calEventID, personID, perms } });
//MARK: MEDIA
/* ===================== MEDIA ===================== */
export const getAllMedia = ( personToken) =>
  apiFetch("/api/media/get-all", {  personToken });

export const fetchMedia = ( uuid) =>
  fetch(`${API_BASE}/api/media/fetch?uuid=${uuid}`, {
    headers: { Authorization: "Bearer " + token },
  });

export const uploadMedia = ( personToken, file) => {
  const fd = new FormData();
  fd.append("media", file);
  return apiFetch("/api/media/upload", { method: "POST",  personToken, body: fd, isFormData: true });
};

export const deleteMedia = ( personToken, uuid) =>
  apiFetch("/api/media/del", { method: "POST",  personToken, body: { uuid } });

export const linkMedia = ( personToken, payload) =>
  apiFetch("/api/media/link", { method: "POST",  personToken, body: payload });

export const unlinkMedia = ( personToken, payload) =>
  apiFetch("/api/media/unlink", { method: "POST",  personToken, body: payload });
//MARK:TAGS
/* ===================== TAGS ===================== */
export const linkTags = ( personToken, payload) =>
  apiFetch("/api/tag/link", { method: "POST",  personToken, body: payload });

export const unlinkTags = ( personToken, payload) =>
  apiFetch("/api/tag/unlink", { method: "POST",  personToken, body: payload });
