import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Set base URL
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = 'Bearer fakeToken123';
    console.log('Request Intercepted:', config);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 404) {
        return Promise.reject(new Error('Resource not found!'));
      }
      if (error.response.status === 401) {
        return Promise.reject(new Error('Unauthorized! Redirecting to login...'));
      }
    }
    return Promise.reject(new Error('Something went wrong!'));
  }
);

export default axiosInstance;

// ===============================================================
// Now reuse the axios instance globally

// import React, { useEffect, useState } from 'react';
// import axiosInstance from './axiosInstance';

// function App() {
//   const [posts, setPosts] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get('/posts'); // Uses baseURL from axiosInstance.js
//         setPosts(response.data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="App">
//       <h1>Posts</h1>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <ul>
//         {posts.map((post) => (
//           <li key={post.id}>
//             <strong>{post.title}</strong>
//             <p>{post.body}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
