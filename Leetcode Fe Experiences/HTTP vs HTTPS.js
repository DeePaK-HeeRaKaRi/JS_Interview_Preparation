/*

HTTP (Hypertext Transfer Protocol):
--------------------------------
Definition: HTTP is the protocol used to transfer data over the web. It enables communication between a web browser (client) and a server.
Process:
When you enter a URL, the browser sends an HTTP request to the server.
The server processes the request and sends back an HTTP response, which includes the requested data (like a webpage).
HTTP operates over TCP/IP, making the communication connection reliable.
Characteristics: HTTP is stateless, meaning each request is independent, and not encrypted, so data is transmitted in plain text.

--------------------------------

HTTPS (Hypertext Transfer Protocol Secure):

Definition: HTTPS is an extension of HTTP, but it includes encryption using SSL/TLS (Secure Sockets Layer/Transport Layer Security).
Process:

The browser connects to the server via HTTPS, initiating a secure connection.
The server and browser perform a handshake where they exchange keys to establish an encrypted channel.
All data transferred between the client and the server is encrypted, preventing eavesdropping and data tampering.

Characteristics:
HTTPS ensures confidentiality (encryption), integrity (prevents data modification), and authentication (verifies server identity using certificates).
It operates on port 443, while HTTP uses port 80.
In summary, HTTP transfers data in plain text, while HTTPS encrypts the data to ensure security during transmission.



*/