// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  // Set up Axios interceptors
  useEffect(() => {
    // Request Interceptor
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // Simulate adding an Authorization token
        config.headers.Authorization = 'Bearer fakeToken123';
        console.log('Request Intercepted:', config);
        return config;
      },
      (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response Interceptor
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        // Handle successful response
        console.log('Response Intercepted:', response);
        return response;
      },
      (error) => {
        // Handle error globally
        if (error.response && error.response.status === 404) {
          setError('Resource not found!');
        } else if (error.response && error.response.status === 401) {
          setError('Unauthorized! Redirecting to login...');
        } else {
          setError('Something went wrong!');
        }
        return Promise.reject(error);
      }
    );

    // Cleanup the interceptors when the component unmounts
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Posts</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
