const authenticationInstitutional = `

### Session based authentication

Similarly to individual clients, institutional clients can also use session based authentication. For instructions on how to set up session-based authentication using the Client Portal API Gateway please refer to the Quickstart guide for individual clients.

A downside to this approach is that it requires a GUI to be present on the machine where the client is running to facilitate authentication. Nonetheless, this approach is a good starting point for testing and prototyping.

---

### OAuth based authentication

In addition to session based authentication via the API Gateway, Interactive Brokers also supports headless Client Portal API authentication via the modified [OAuth 1.0a](https://oauth.net/core/1.0a/) protocol. 
This allows you to authenticate your application with the IBKR backend without having to run the gateway and provides more flexible deployment opportunities.

Authenticating Client Portal API with OAuth is currently only available to institutional clients. It has been successfully used to develop web and mobile apps, 
as well as to integrate with third-party solutions.

---

### Getting access to OAuth at Interactive Brokers

To use OAuth authentication, you will need to register your application with Interactive Brokers. Currently only institutional clients, organizational account types, can register their applications. Retail clients with an individual account type are not eligible to use OAuth.

Depending on the type of application developed, clients will need to either send a request ticket via IBKR Client Portal Support Center, if the API client is developed in-house, or by 
emailing the Web API Onboarding team if the client application is being developed by a third-party.

#### For apps developed in-house

In order to apply for OAuth access for applications developed in-house, or by a legal affiliate to the account, clients will need to send a request ticket via IBKR Client Portal Support Center. To speed up the process,
please include the following information in your request:

- A confirmation that the application is being developed in-house
- A list of accounts that will be used with the application
- The main purpose of the application

Once the request has been received our development team will process it accordingly. We may ask for additional details at this stage. Once approved, a confirmation message outlining next steps, including access to our Github repository, where the API demo can be found, and access to the self-service OAuth portal will be sent out.
The OAuth portal makes it easy for clients to register their applications, and to manage their OAuth credentials.

#### For apps developed by a third-party

Apps developed by a third-party to the account will need to be registered by the account owner. 
In order to apply for OAuth access for applications developed by a third-party, clients will need to log a request in Client Portal’s Support Center. Further instructions will be provided as a response.

---

### Next steps

Depending on whether your application is being developed in-house or by a third-party, you will need to follow slightly different steps in order to integrate OAuth with your client application. 
Approved applications developed in-house will be provided with the self-service portal. This allows clients to register their consumer key, upload encryption and signature keys, and manage their access tokens. 
In the case of third-party apps, this information will be provided by the account owner as part of the onboarding process. In each case a demo environment along with detailed instructions on how to integrate OAuth will be provided.

---
`

export default authenticationInstitutional;