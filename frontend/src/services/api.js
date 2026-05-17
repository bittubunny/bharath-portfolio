import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";


// =============================
// HOME
// =============================

export const getHomeContent = async () => {

  const response = await axios.get(
    `${BASE_URL}/home-content`
  );

  return response.data;
};

export const updateHomeContent = async (data) => {

  const response = await axios.put(
    `${BASE_URL}/home-content`,
    data
  );

  return response.data;
};


// =============================
// PROJECTS
// =============================

export const getProjects = async () => {

  const response = await axios.get(
    `${BASE_URL}/projects`
  );

  return response.data;
};

export const getProjectById = async (id) => {

  const response = await axios.get(
    `${BASE_URL}/projects/${id}`
  );

  return response.data;
};

export const createProject = async (data) => {

  const response = await axios.post(
    `${BASE_URL}/projects`,
    data
  );

  return response.data;
};

export const updateProject = async (
  id,
  data
) => {

  const response = await axios.put(
    `${BASE_URL}/projects/${id}`,
    data
  );

  return response.data;
};

export const deleteProject = async (id) => {

  const response = await axios.delete(
    `${BASE_URL}/projects/${id}`
  );

  return response.data;
};


// =============================
// ABOUT
// =============================

export const getAbout = async () => {

  const response = await axios.get(
    `${BASE_URL}/about`
  );

  return response.data;
};

export const updateAbout = async (
  id,
  data
) => {

  const response = await axios.put(
    `${BASE_URL}/about/${id}`,
    data
  );

  return response.data;
};


// =============================
// RESUME
// =============================

export const getResume = async () => {

  const response = await axios.get(
    `${BASE_URL}/resume`
  );

  return response.data;
};

export const updateResume = async (
  id,
  data
) => {

  const response = await axios.put(
    `${BASE_URL}/resume/${id}`,
    data
  );

  return response.data;
};


// =============================
// BLOG
// =============================

export const getBlog = async () => {

  const response = await axios.get(
    `${BASE_URL}/blog`
  );

  return response.data;
};

export const getBlogById = async (id) => {

  const response = await axios.get(
    `${BASE_URL}/blog/${id}`
  );

  return response.data;
};

export const createBlog = async (data) => {

  const response = await axios.post(
    `${BASE_URL}/blog`,
    data
  );

  return response.data;
};

export const updateBlog = async (
  id,
  data
) => {

  const response = await axios.put(
    `${BASE_URL}/blog/${id}`,
    data
  );

  return response.data;
};

export const deleteBlog = async (id) => {

  const response = await axios.delete(
    `${BASE_URL}/blog/${id}`
  );

  return response.data;
};


// =============================
// CONTACT
// =============================

export const getContact = async () => {

  const response = await axios.get(
    `${BASE_URL}/contact`
  );

  return response.data;
};

export const updateContact = async (data) => {

  const response = await axios.put(
    `${BASE_URL}/contact`,
    data
  );

  return response.data;
};


// =============================
// PORTFOLIO AI
// =============================

export const askPortfolioAI = async (
  question
) => {

  const response = await axios.post(
    `${BASE_URL}/portfolio-ai`,
    {
      message: question,
    }
  );

  return response.data;
};