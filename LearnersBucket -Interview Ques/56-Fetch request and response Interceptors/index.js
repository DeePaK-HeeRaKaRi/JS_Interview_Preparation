// INterceptors works as a wall b/w client and server
// in request INterceptor when a req is sent by client to server the req is intercepted and ww can do diff types of processing and 
// we want to change anything and we want to update the headers we can do all those things and these will carry to server

// similarly in the response Inter once we get resp from server we can process it , we can check status and diff types of action
// and return back to client

// before sendng it to the server we have to process it in request Interceptor

// here overiding the original fetch method

const originalFetch = window.fetch

window.requestInterceptor=(args) =>{
    // perform all actions
    console.log('Iam in request interceptor')
    console.log(args)
    if(args.length == 0){
        throw new Error('Request cannot be sent')
    }
    
    return args
}

window.responseInterceptor = (response) => {
    console.log('Iam in response interceptor',response.status)
    //perform all types of action like check status
    if(response.status == 200){
        return response.json();
    }
    throw new Error("unable to fetch");
    
}
window.fetch=async(...args) => {
    console.log('-------args',args)
    const updatedRequest = requestInterceptor(args)
    console.log("updated", updatedRequest);
    const response = await originalFetch(updatedRequest);

    const updatedResponse=responseInterceptor(response)

    return updatedResponse
}

// fetch("https://jsonplaceholder.typicode.com/todos/1")
//   .then((response) => response.json())
//   .then((json) => console.log(json));

fetch("https://jsonplaceholder.typicode.com/todos/1")
.then(json => console.log(json))