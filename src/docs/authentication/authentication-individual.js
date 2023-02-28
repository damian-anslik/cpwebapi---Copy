const authenticationIndividual = `
### Session Authentication

An authenticated brokerage session is necessary to access order information, place orders, or receive market data via Client Portal API.
Individual clients using Client Portal API are required to use the API Gateway in order to establish a brokerage session. There is currently
no official workaround for this requirement.
Other Interactive Brokers' trading applications such as TWS or IBKR Mobile also utilize a brokerage session.

**Note:** A given username can only create a single brokerage session at any given time. Launching TWS, IBKR mobile, logging in to Client Portal, or establishing a connection via third-party software using your Interactive Brokers' credentials, will disconnect the current Client Portal API brokerage session, and vice versa.

---

### How can I tell if my brokerage session is authenticated?
      
The endpoint **/iserver/auth/status** can be used to determine the current authentication status of the session. 
Once you have logged in using the Client Portal API Gateway, you can make a POST request to this endpoint to determine if your session is fully authenticated.
If the session is fully authenticated, the response from this endpoint will contain the following JSON object:
        
\`\`\` json
{
    'authenticated': true, 
    'connected': true, 
    'competing': false
}
\`\`\`

---

### How long does a session remain authenticated?

To ensure client account security, Interactive Brokers' trading solutions were designed with the need for the user to manually reauthenticate with the backend
on a daily basis. As such, the maximum period of time that a Client Portal API session can remain authenticated is 24 hours.

Daily maintenance of IBKR's servers could result in a disconnect earlier than the 24 hour period mentioned above.
We advise disconnecting your session from your gateway and restarting it after the maintenance time to minimize any potential problems that may arise.
Information on server reset times and system status updates can be found on the [System Staus](https://www.interactivebrokers.com/en/software/systemStatus.php) page.
        
---

### How can I prevent the session from timing out?

A Client Portal API brokerage session will timeout if no requests are received within a period of 5 minutes. In order to prevent the session from timing out, the 
endpoint **/tickle** should be called on a regular basis. It is recommended to call this endpoint approximately every
minute. 

If the brokerage session has timed out but the session is still connected to the IBKR backend, the response to **/auth/status** returns 'connected':true and 'authenticated':false.
Calling the **/reauthenticate** endpoint will start a new brokerage session.

---

### Can I automate the Client Portal API authentication process?

There is currently no mechanism available on Interactive Brokers' end to permit individual clients to automate the
brokerage session authentication process when using Client Portal API.

---

### Can I use a third-party solution to automate the brokerage session authentication process?

Interactive Brokers does not recommend the use of third-party solutions to establish a brokerage
session. This can put your account at risk from potentially malicious projects. 

**Note:** Interactive Brokers is unable to provide support for third-party wrappers.

---

### Is it possible to authenticate a live brokerage session without the use of a Two Factor Authentication (2FA) device?

The login process to the Client Portal API Gateway is the same as to Client Portal. As the Client Portal has access to sensitive information and 
banking functionalities, two-factor authentication is mandatory for login.

---
`

export default authenticationIndividual;