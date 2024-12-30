/*

When the server responds with a 304, it means the requested resource hasn't changed, 
so no updated data is sent. The client should use the cached version of the resource stored locally 
(e.g., in browser cache, Redux, or local state). If I’m managing state, I would ensure that when a 304 response is received, 
my application retrieves and uses the cached data instead of expecting a new response body from the server.

If they ask for an example:
"For instance, in a Redux setup, if I get a 304, 
I'll dispatch an action to use the existing data already stored in the state as the response for the request."



Best Practices:

Use Headers Smartly: Include conditional headers (If-Modified-Since, If-None-Match) to ensure the server validates your cache.

Centralize Caching Logic: If using Redux, centralize how caching is validated and updated.

Fallback: Always have a fallback for when cached data isn’t available or is invalid.
By managing 304 responses effectively, you can optimize performance and reduce redundant data fetching.


export const fetchData = () => async (dispatch, getState) => {
  const cachedData = getState().data; // Retrieve data from Redux
  const lastModified = cachedData.lastModified || '';

  try {
    const response = await fetch('/api/data', {
      headers: {
        'If-Modified-Since': lastModified,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      dispatch({ type: 'DATA_SUCCESS', payload: data });
    } else if (response.status === 304) {
      // Use cached data
      dispatch({ type: 'DATA_SUCCESS', payload: cachedData.data });
    }
  } catch (error) {
    dispatch({ type: 'DATA_FAILURE', error });
  }
};

const initialState = {
  data: null,
  lastModified: '',
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DATA_SUCCESS':
      return {
        ...state,
        data: action.payload,
        lastModified: action.payload.lastModified || state.lastModified,
      };
    case 'DATA_FAILURE':
      return { ...state, error: action.error };
    default:
      return state;
  }
};


*/