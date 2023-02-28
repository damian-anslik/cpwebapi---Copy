const frequentlyAskedQuestions = [
    {
        title: 'How to use this guide?',
        content: `
        <p>
          The aim of this guide is to provide a general overview of the functionalities available to Interactive Brokers clients using Client Portal API. 
          It also provides answers to most common questions and issues encountered while working with the API.
        </p>
        `,
    },
    {
        title: 'How does Client Portal API differ from TWS API?',
        content: `
        <p>
          Client Portal API is a REST based API, that is, requests to the IBKR backend are sent over the internet. 
          In comparison, TWS API is designed to programatically interact with the Trader Workstation software. 
          In order to use Client Portal API, a lightweight API gateway, or in the case of institutional clients, OAuth or a dedicated connection, is required, whereas for TWS API, a working installation of TWS is required.          
        </p>
        `
    },
    {
        title: 'Are there any additional fees for using Client Portal API?',
        content: `
        <p>
          There are no additional fees associated with the use of Client Portal API. In addition, there are no minimum funding requirements for accounts. 
          Funding may be required where clients wish to receive real time market data. 
          For more information on market data fees and choosing the correct market data subscription, please see the <a href="./use-cases">Use Cases</a> page of this guide.
        </p>
        <p>
          <b>Note: </b> Minimum commision requirements apply in the case of clients wishing to connect to Client Portal API via a dedicated connection.
        </p>
        `
    },
    {
        title: 'What are the account requirements?',
        content: `
        <p>
          All fully opened Interactive Brokers' accounts are eligible to use Client Portal API.
        </p>
        `
    },
    {
        title: 'Can I use the Client Portal API with a paper account?',
        content: `
        <p>
          Client Portal API supports both paper and live accounts. We recommend using the paper account for initial testing and development, and only switching to live once you are happy with the results.
        </p>  
        `
    },
    {
        title: 'Can I use the Client Portal API with a free trial account?',
        content: `
        <p>
          Free trial accounts are not currently eligible for use with Client Portal API. Support for free trial accounts will be added in late Q3 2022.        
        </p>
        `
    }
]

export { frequentlyAskedQuestions }