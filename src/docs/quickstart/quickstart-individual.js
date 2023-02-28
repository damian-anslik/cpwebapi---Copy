const quickstartIndividual = `

### Step One: Create a free Interactive Brokers account
      
In order to use Client Portal API an active Interactive Brokers account is required. If you do not have an account, you can [create one for free](https://www.interactivebrokers.com/en/index.php?f=46380#open-account).
Free trial accounts are not currently supported, however support for free trial accounts is coming soon. 

**Note:** The account creation process may take up to 48 hours to complete.

---

### Step Two: Download and unzip the Client Portal API Gateway

Individual clients using Client Portal API will need to use a Java-based API gateway in order to access protected endpoints.
The gateway is responsible for routing requests to the backend and ensuring that the brokerage session is authenticated.
The Client Portal API gateway can be downloaded <a href="https://www.interactivebrokers.com/en/index.php?f=5041" target="_blank">here</a>, or, by clicking on the Gateway card in the Downloads section of this page.

**Note:** Once a new version of the Client Portal API Gateway is released, it is recommended that you download this new version.

Details about new Gateway releases can be found in the <a href="./changelog">Changelog</a>.

---

### Step Three: Download and install Java

As the Client Portal API Gateway was built using Java, a working installation of the Java Runtime Environment (JRE) is required. The minimum requirement is Java 8 update 192.
In order to check if you have a working installation of Java, open a terminal and run the following command:

\`\`\` bash
java --version
\`\`\`

If you do not have a working installation of Java, you can download it [from the official website](https://www.java.com/en/download/).

---

### Step Four: Configure the Client Portal API Gateway

If Java is installed and correctly configured you should see information about the currently installed version, otherwise an error is raised. An example response is the following:

\`\`\`bash
java 17.0.1 2021-10-19 LTS
\`\`\`

If you don't currently have Java installed you can download it by clicking on the Java card in the Downloads section of this page.

---
### Step Four: Run the API Gateway

Using the terminal, navigate to the directory where the gateway has been unzipped. For example:

\`\`\`bash
cd C:/Users/Example/Desktop/Cp Gateway
\`\`\`

On Windows, launch the gateway using the following command:

\`\`\`bash
bin\\run.bat root\\conf.yaml
\`\`\`

And in the case of Unix systems:

\`\`\`bash
bin/run.sh root/conf.yaml
\`\`\`

---

### Step Five: Authenticate the brokerage session

Once the gateway is running, you will need to authenticate the session. In order to do so, navigate to <a href="https://localhost:5000">https://localhost:5000</a> on your local network and enter
your username and password. The message 'Client Login Succeeds' is displayed if the login was successful.

**Tip:** By default, the gateway will listen on port 5000. To change this update the conf.yaml file found in the 'root' directory of the gateway.

---

### Where to go from here?

Ensure your session is authenticated by following the tips and tricks on the [Authentication](./authentication) page.

Once you are successful in authenticating, review the available endpoints on the [Endpoints](./endpoints) page.

Websockets can retrieve and deliver streaming data. For more information on how to use websockets, see the [Websockets](./websockets) page.

Once you have reviewed pages above, go through the [Use Cases](./use-cases) page to understand the use cases.

**Good luck! 🍀**

---
`

export default quickstartIndividual;