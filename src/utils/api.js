import axios from 'axios';

const baseURL = 'https://orvionar-backend.vercel.app/api';  // Ensure this URL points to your backend
const noAuthUrl = 'https://orvionar-backend.vercel.app'; // URL for no auth routes

// Authentication Routes
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const signup = async (fullName, email, password, phoneNumber, college) => {
  try {
    const response = await axios.post(`${baseURL}/auth/signup`, { fullName, email, password, phoneNumber, college });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const requestResetPassword = async (email) => {
  try {
    const response = await axios.post(`${baseURL}/auth/request-reset-password`, { email });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${baseURL}/auth/reset-password/${token}`, { newPassword });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

// Courses Routes

// Add a new course
export const addCourse = async (courseData) => {
  try {
    const response = await axios.post(`${baseURL}/course`, courseData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

// Get all courses
export const getAllCourses = async () => {
  try {
    const response = await axios.get(`${baseURL}/course`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}



// Get all courses by domain
export const getCoursesByDomain = async (domain) => {
  try {
    const response = await axios.get(`${baseURL}/course?domain=${domain}`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

// Get course by ID
export const getCourseById = async (courseId) => {
  try {
    const response = await axios.get(`${baseURL}/course/${courseId}`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

// Update course by ID
export const updateCourse = async (courseId, updatedCourseData) => {
  try {
    const response = await axios.put(`${baseURL}/course/${courseId}`, updatedCourseData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

// Delete course by ID
export const deleteCourse = async (courseId) => {
  try {
    const response = await axios.delete(`${baseURL}/course/${courseId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

// Video Routes

// Add a new video to a course
export const addVideo = async (videoData) => {
  try {
    const response = await axios.post(`${baseURL}/video`, videoData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

// Get all videos for a course
export const getAllVideos = async () => {
  try {
    const response = await axios.get(`${baseURL}/video`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    return response.data.videos;
  } catch (error) {
    throw error.response.data;
  }
}

// Get video by ID
export const getVideoById = async (videoId) => {
  try {
    const response = await axios.get(`${baseURL}/video/${videoId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

// Update video by ID
export const updateVideo = async (videoId, videoData) => {
  try {
    const response = await axios.put(`${baseURL}/video/${videoId}`, videoData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}



// Delete video by ID
export const deleteVideo = async (videoId) => {
  try {
    const response = await axios.delete(`${baseURL}/video/${videoId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

// Get videos by course ID
export const getVideosByCourseId = async (courseId) => {
  try {
    const response = await axios.get(`${baseURL}/videos/course/${courseId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    return response.data.videos; // Assuming the response contains the video list
  } catch (error) {
    throw error.response.data;
  }
}

//get profile of user
export const getUserProfile= async(id)=>{
  try {
    const response = await axios.get(`${baseURL}/profile/?id=${id}`,{
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    return response.data.profile;
  } catch (error) {
    throw error.response.data;
  }
}

export const getUserByMail= async(emailId)=>{
  try {
    const response = await axios.get(`${baseURL}/profile/?email=${emailId}`,{
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    return response.data.profile;
  } catch (error) {
    throw error.response.data;
  }
}
export const addUserToCourse = async (courseId, userId) => {
  try {
    const response = await axios.post(
      `${baseURL}/add/course`,
      {
        courseId,
        userId
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const removeUserFromCourse = async (courseId, userId) => {
  try {
    const response = await axios.post(
      `${baseURL}/remove/course`,
      {
        courseId,
        userId
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};



//without auth get all courses
export const getAllCoursesWithoutAuth = async () => {
  try {
    const response = await axios.get(`${noAuthUrl}/noauth/courses`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
//without auth get course by id
export const getCourseByIdWithoutAuth = async (courseId) => {
  try {
    const response = await axios.get(`${noAuthUrl}/noauth/course/${courseId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

// Get all courses by domain
export const getCoursesByDomainWithoutAuth = async (domain) => {
  try {
    const response = await axios.get(`${noAuthUrl}/noauth/courses/?domain=${domain}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
