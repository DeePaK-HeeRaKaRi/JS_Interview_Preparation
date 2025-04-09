/*
const data = await fetch("api");
const div = document.getElementById("todo");
div.innerHTML = data;



 Security Issue: XSS (Cross-Site Scripting)
If the data returned from the "api" endpoint contains any malicious HTML or JavaScript,
and you insert it directly using innerHTML, you're giving an attacker a chance to inject and run arbitrary scripts.

 >>>>>> Security Issue: XSS (Cross-Site Scripting)
If the data returned from the "api" endpoint contains any malicious HTML or JavaScript, 
and you insert it directly using innerHTML, you're giving an attacker a chance to inject and run arbitrary scripts.

const data = await fetch("api").then(res => res.text());
const div = document.getElementById("todo");
div.textContent = data; // Safe: renders as plain text

>>>>>>>>> Sanitize the HTML using libraries like DOMPurify.

import DOMPurify from 'dompurify';

const data = await fetch("api").then(res => res.text());
const div = document.getElementById("todo");
div.innerHTML = DOMPurify.sanitize(data); // Removes scripts and harmful content


*/