/*

If a .catch() block is provided:

The .catch() block will handle the promise rejection locally.
The global unhandledrejection event will NOT trigger for that promise.
This is the preferred way to handle specific promise errors.

If no .catch() block is provided:

The promise rejection will remain unhandled, and the global unhandledrejection event will trigger, if configured.
This is a safety net for tracking errors globally, but it's better to handle rejections locally where possible to ensure predictable behavior.


window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled promise rejection:", event.reason);
});


new Promise((resolve, reject) => {
    resolve("Step 1 Success");
})
    .then(() => {
        throw new Error("Error in Step 2"); // Error occurs here
    })
    .catch((err) => {
        console.error("Caught error:", err); // Handles "Error in Step 2"
    })
    .then(() => {
        throw new Error("Error in Step 3"); // Error occurs again
    });
// No `.catch()` here to handle the second error -> unhandled rejection


How It Works Automatically:

The JavaScript runtime (browser or Node.js) detects unhandled promise rejections.
If no .catch() is attached to the rejected promise (or the promise chain), the runtime automatically triggers the global unhandledrejection event.

When to Write the unhandledrejection Event Listener
You can optionally define the unhandledrejection event handler to log or react to unhandled rejections globally, but it is not required for the event to fire.



import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";

const App = () => {
    return (
        <Router>
            <GlobalErrorHandler>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </GlobalErrorHandler>
        </Router>
    );
};

// A component to handle global errors
const GlobalErrorHandler = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleUnhandledRejection = (event) => {
            console.error("Unhandled Promise Rejection:", event.reason);

            // Navigate to the home route if an unhandled rejection occurs
            navigate("/");
        };

        window.addEventListener("unhandledrejection", handleUnhandledRejection);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("unhandledrejection", handleUnhandledRejection);
        };
    }, [navigate]);

    return children;
};

export default App;

*/