const websocketsIndividual = `
### Getting Started

#### Connection Guide

The websocket endpoint is available at [wss://localhost:5000/v1/api/ws](./endpoints). Once connected, 
the session needs to be authorized. This can be achieved in two ways:

##### From a browser

Include the cookies from the 'set-cookie' headers from previous API requests. If you are using a browser to
test API functionality, this will generally be done automatically by the browser.

##### From your client application

Request the sessionId from the **/tickle** endpoint and send it to the websocket endpoint in the following format:

\`\`\`json
{
    'session': 'sessionId'
}
\`\`\`

##### Sample Response

If the request is successful one of the following responses will be returned:

\`\`\`json
{
    'topic': 'sts', 
    'args': {
        'authenticated': true
    }
}
\`\`\`

or: 

\`\`\`json
{
    'topic': 'system', 
    'success': 'username'
}
\`\`\`

---

#### Websocket Messages

There are two types of messages used by the websocket:

- **Solicited messages:** messages that have been explicitly sent by the client
- **Unsolicited messages:** messages that have been sent by the server, either as a response to a request or containing information about the connected session

In order to receive streaming data from the websocket, the relevant topic must be subscribed to. In order to do so,
a message of the format: **TOPIC+{ARGUMENTS}** must be sent to the websocket endpoint, where:

- **TOPIC** represents the request that is being sent via the websocket
- The plus symbol **+** is used as the message separator
- **{ARGUMENTS}** contains a list of arguments passed as part of the request. An empty list {} needs to be passed if no arguments are required

Solicited message topics are generally three characters in length and start with either an **s**, if the topic
is being subscribed to, or an **u** if unsubscribing from a topic.

---

### Market Data

#### Streaming Data

Streaming, top-of-the-book market data is available for all instruments using Client Portal API's websocket endpoint. For streaming data the following message needs to be sent to the endpoint:

\`\`\` json
smd+conId+{
    arguments
}
\`\`\`

The conId is the instrument's unique contract identifier within Interactive Brokers' database. 

Contracts requested via this topic use SMART routing by default. If you wish to specify the exchange explicitly, 
the passed contract identifier should be modified into the format **conId@EXCHANGE**, where EXCHANGE is the exchange on which the contract trades.

**Tip:** The contract ID for a particular instrument can be found using the endpoint **/iserver/secdef/search**.

In order to unsubscribe from market data for the specified contract ID, the following message needs to be sent to the endpoint:

\`\`\` json
umd+conId+{}
\`\`\`

##### Example: Requesting streaming close price and daily percent change for APPL stock

In order to request streaming market data, a subscription request must first be sent for the specific contract. In this case, we know that the APPL@NASDAQ contract
has a contract ID of 265598. In addition, we must also specify the fields that should be returned. In this case we are interested in fields 31 - close price, and 83 - the % change, or difference between the last price and the close price for the previous day.

For a list of available tags please see the swagger documentation for the [/marketdata/snapshot](./endpoints#operations-tag-Market_Data) endpoint.  

\`\`\` json
smd+265598+{
    'fields':['31','83']
}
\`\`\`

---

#### Historical Data

For streaming historical data, the topic **smh+Id** is used. There are also optional parameters available in JSON format. 
If no parameters are specified, the empty parameters array **{}** can be passed. 
Incorrectly specified parameters are ignored and the default (empty) response is returned. 
To unsubscribe, the topic is **umh+serverId** can be used, where **serverID** is the server ID associated with the request.

**NOTE:** Only a max of 5 concurrent historical data request available at a time.

The historical market data request takes the following parameters:

<div class='scrollable-table-container'>
    <table class='styled-table'>
        <thead>
            <tr>
                <th>Parameter</th>
                <th>Description</th>
                <th>Valid Values</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>exchange: String</td>
                <td>Contract exchange</td>
                <td>Valid exchange on which the contract trades</td>
            </tr>
            <tr>
                <td>period: String</td>
                <td>Request duration</td>
                <td>
                    <ul>
                        <li>{1-30}min</li>
                        <li>{1-8}h</li>
                        <li>{1-1000}d</li>
                        <li>{1-792}w</li>
                        <li>{1-182}m</li>
                        <li>{1-15}y</li>
                </td>
            </tr>
            <tr>
                <td>bar: String</td>
                <td>Request bar size</td>
                <td>
                    <ul>
                        <li>1min</li>
                        <li>2min</li>
                        <li>3min</li>
                        <li>5min</li>
                        <li>10min</li>
                        <li>15min</li>
                        <li>30min</li>
                        <li>1h</li>
                        <li>2h</li>
                        <li>3h</li>
                        <li>4h</li>
                        <li>8h</li>
                        <li>1d</li>
                        <li>1w</li>
                        <li>1m</li>
                </td>
            </tr>
            <tr>
                <td>outsideRTH: Boolean</td>
                <td>Request data outside trading hours</td>
                <td>
                    true/false
                </td>
            </tr>
            <tr>
                <td>source: String</td>
                <td>Type of date requested</td>
                <td>
                    <ul>
                        <li>midpoint</li>
                        <li>trades</li>
                        <li>bid_ask</li>
                        <li>bid</li>
                        <li>ask</li>
                </td>
            </tr>
            <tr>
                <td>format: String</td>
                <td>Historical values returned</td>
                <td>
                    <ul>
                        <li>%o - open</li>
                        <li>%c - close</li>
                        <li>%h - high</li>
                        <li>%l - low</li>
                </td>
            </tr>
        </tbody>
    </table>
</div>

##### Example: Requesting mutltiple historical values in a single request

Multiple historical values can be requested using a single request by separating the fields to be returned with a forward slash, for example:

\`\`\` json
smh+265598+{
    'period': '1d',
    'bar': '1min', 
    'source': 'trades', 
    'format': '%o/%c/%h/%l'
}
\`\`\`

returns the open, close, high, and low trades prices for the last day with one minute bars.

##### Example: Request AAPL historical trade high data for past 2 hours with 5 mins bars

\`\`\` json
smh+265598+{
    'exchange':'ISLAND',
    'period':'2h',
    'bar':'5min',
    'outsideRth':false,
    'source':'trades',
    'format':'%h/%l'
}
\`\`\`

The following response will be returned:

\`\`\` json
{
    'serverId': '341115',
    'symbol': 'AAPL',
    'text': 'AAPLE INC',
    'priceFactor': 100,
    'startTime': '20210317-18:00:00',
    'high': '12586/14469/65',
    'low': '12283/34103/0',
    'timePeriod': '7200s',
    'barLength': 300,
    'mdAvailability': 'S',
    'mktDataDelay': 0,
    'outsideRth': false,
    'volumeFactor': 1,
    'priceDisplayRule': 1,
    'priceDisplayValue': '2',
    'negativeCapable': false,
    'messageVersion': 2,
    'data': [...],
    'points': 23, 
    'topic': 'smh+265598',
}
\`\`\`

Note the server ID associated with the subscription. In order to unsubscribe from the topic, we send the unsubscription message with the server ID:

\`\`\` json
umh+{serverId}
\`\`\`

#### Market Depth Data

To subscribe to deep book, market depth data, the topic **sbd** can be sent along with the requesting account id, the contract id and, optionally, the exchange source for market depth data (a valid market data subscription is required). 
If no exchange is specified, all available deep exchanges are assumed.
An example of a market depth subscription message is:

\`\`\` json
sbd+{acctId}+{conId}+{exchange}
\`\`\`

In order to unsubscribe from market dapth, the topic **ubd** can be sent along with the account id. An example of an unsubscribe message is:

\`\`\` json
ubd+{acctId}
\`\`\`

##### Example: Requesting market depth from ARCA

The following request will return market depth data from the ARCA exchange for account id DU12345 and contract id 265598:

\`\`\` json
sbd+DU12345+265598+ARCA
\`\`\`

The response will continously return market depth data for the specified contract until the subscription is cancelled. An example of a market depth response is:

\`\`\` json
{
    'topic': 'sbd',
    'data': [
        {
            'row': 0,
            'focus': 1,
            'price': 123.45
        },
        {
            'row': 1,
            'focus': 0,
            'price': 123.44,
            'ask': 200
        },
        {
            'row': 2,
            'focus': 0,
            'price': 120.00,
            'bid': 400
        }
    ],
}
\`\`\`

Where, **row** is the row number of the market depth data, **focus** indicates the last price for the contract, **price** is the price for the current row, 
and **ask** and **bid** are the ask and bid sizes, respectively.

---

### Order & Positions Operations

#### Live Order Updates

As long as an order is active, it is possible to retrieve it using Client Portal API. Live streaming orders can be requested by subscribing to the **sor** topic. 
Once live orders are requested we will start to relay back when there is an update. 
To receive all orders for the current day the endpoint **/iserver/account/orders** can be used. 
It is advised to query all orders for the current day first before subscribing to live orders. 

\`\`\` json
sor+{}
\`\`\`

Which returns the following sample response:

\`\`\` json
{
    'topic': 'sor' ,
    'args': [
        {
            'acct': 'DU1234',
            'conid': 265598,
            'orderId': 922048212,
            'cashCcy': 'USD',
            'sizeAndFills': '0/1',
            'orderDesc': 'Buy 100 Limit 372.00 GTC',
            'description1': 'AAPL',
            'ticker': 'AAPL',
            'secType': 'STK',
            'listingExchange': 'NASDAQ.NMS',
            'remainingQuantity': 100.0,
            'filledQuantity': 0.0,
            'companyName': 'APPLE INC',
            'status': 'Submitted',
            'origOrderType': 'LIMIT',
            'supportsTaxOpt': '1',
            'lastExecutionTime': '200708173551',
            'lastExecutionTime_r': 1594229751000,
            'orderType': 'Limit',
            'side': 'BUY',
            'timeInForce': 'GTC',
            'price': 372,
            'bgColor': '#000000',
            'fgColor': '#00F000'
        }
    ]
}
\`\`\`

To unsubscribe from streaming order updates, the topic **uor** needs to be sent to the websocket endpoint.

\`\`\` json
uor+{}
\`\`\`

When there is an update to your order only the change to the order is relayed back along with the orderId. Most commonly this would involve status changes and partial fills. 

An example of a status change is:

\`\`\` json
{
    'topic': 'sor' ,
    'args': [
        {
            'acct': 'DU1234',
            'orderId': 352055828,
            'status': 'PendingSubmit',
            'fgColor': '#3399CC'
        },
        {
            'acct': 'DU1234',
            'orderId': 352055828,
            'status': 'PreSubmitted',
            'bgColor': '#FFFFFF',
            'fgColor': '#0000CC'
        },
        {
            'acct': 'DU1234',
            'orderId': 352055828,
            'status': 'Submitted',
            'bgColor': '#000000',
            'fgColor': '#00F000'
        }
    ]
}
\`\`\`

And an example of a partial fill is:

\`\`\` json
{
    'topic': 'sor' ,
    'args': [
        {
            'acct': 'DU1234',
            'orderId': 352055828,
            'sizeAndFills': '100/622',
            'remainingQuantity': 622.0,
            'filledQuantity': 100.0,
            'avgPrice': '382.45',
        },
        {
            'acct': 'DU1234',
            'orderId': 352055828,
            'sizeAndFills': '700/22',
            'remainingQuantity': 22.0,
            'filledQuantity': 700.0,
        },
        {
            'acct': 'DU1234',
            'orderId': 352055828,
            'sizeAndFills': '722',
            'orderDesc': 'Sold 722 Limit 382.40 GTC',
            'remainingQuantity': 0.0,
            'filledQuantity': 722.0,
            'status': 'Filled',
            'timeInForce': 'GTC',
            'price': 382.4,
            'bgColor': '#FFFFFF',
            'fgColor': '#000000'
        }
    ]
}
\`\`\`

---

#### Trades

To review a list of your trades for the current and previous six days, the topic **str** can be sent to the websocket endpoint.
In addition to the trades history, this topic will also return trade updates as they become available.

\`\`\` json
str+{}
\`\`\`

Which returns the following, sample, response:

\`\`\` json
{
    'topic': 'str' ,
    'args': [
        {
            'execution_id': '0000e0d5.60cf1bd1.01.01',
            'symbol': 'AAPL',
            'supports_tax_opt': '1',
            'side': 'B',
            'order_description': 'Bot 1 @ 130.64 on ISLAND',
            'trade_time': '20210408-22:10:01',
            'trade_time_r': 1617919801000,
            'size': 1,
            'price': '130.64',
            'order_ref': '66807500',
            'submitter': 'apara428',
            'exchange': 'ISLAND',
            'commission': '0.35',
            'net_amount': 130.64,
            'account': 'DU26214',
            'accountCode': 'DU26214',
            'company_name': 'APPLE INC',
            'contract_description_1': 'AAPL',
            'sec_type': 'STK',
            'listing_exchange': 'NASDAQ.NMS',
            'conid': '265598',
            'conidex': '265598',
            'clearing_id': 'IB',
            'clearing_name': 'IB',
            'liquidation_trade': '0'
        }]
    }
}
\`\`\`

To unsubscribe from trades, the topic **utr** needs to be sent.                

\`\`\` json
utr+{}
\`\`\`


##### Example: Request real-time trade updates only

To receive new trade updates only and no previous trades details, the 'realtimeUpdatesOnly' parameter can be passed as part of the **str** message as follows: 

\`\`\` json
str+{
    'realtimeUpdatesOnly': true
}
\`\`\`

##### Example: Request trade history for a specified number of days

If trades are required for less than 7 days the 'days' parameter can be passed with integer value corresponding to the number of days needed (1 represents today and value can be up to 7). 

\`\`\` json 
str+{
    'days': 1
}
\`\`\`

---

#### Profit & Loss Updates

For existing positions it is possible to receive Profit & Loss updates via Client Portal API using the topic **spl**. 
As part of the response the daily profit and loss (abbreviated as dpl) and unrealized profit and loss (upl) are received as a total value for all positions. 
Position profit and loss updates are relayed back to the client as quickly as possible, usually once per second during market hours, but can vary based on market activity.                

\`\`\` json
spl+{}
\`\`\`

Which returns the following, sample, response. You can see the account number, the daily profit and loss and the unrealized profit and loss.

\`\`\` json
{
    'topic': 'spl' ,
    'args': {
        'DU1234.Core': {
        'rowType':1,
        'dpl':-57520.0,
        'upl':972100.0
        }
    }
}
\`\`\`

In order to unsubscribe from further updates, the topic **upl** is sent.

\`\`\` json
upl+{}
\`\`\`

---


### Miscellaneous Operations

#### Echo

To maintain an active websocket connection the topic **ech** is used to send a hearbeat with the argument hb. It is advised to send a heatbeat at least once per minute.

\`\`\` json
ech+hb
\`\`\`

---

#### Ping Session

To maintain a session for accessing **/iserver** or **/ccp** endpoints use the topic **tic**. It is advised to ping the session at least once per minute.

**Note:** It is still required to send a request to the **/tickle** endpoint every few minutes or when the session expires (**/sso/validate** is returning a 0). 

\`\`\` json
tic
\`\`\`

---

### Unsolicited Messages

#### System Connection Messages

When initially connecting to websocket the topic system relays back a confirmation with the corresponding username. 
While the websocket is connecting every 10 seconds there after a heartbeat with corresponding unix time (in millisecond format) is relayed back. An example response is:

\`\`\` json
{
    'topic': 'system' ,
    'success': 'user123'
}
\`\`\`

---

#### Authentication Status

When initially connecting to the websocket endpoint, the topic **sts** will relay back the current authentication status of the user. 
Authentication status updates, for example those resulting from competing sessions, are also relayed back to the websocket client via this topic.

\`\`\` json
{
    'topic': 'sts' ,
    'args': {
        'authenticated': true
    }
}
\`\`\`

---

#### Notifications

If there is a brief message regarding trading activity the topic ntf will be sent.

\`\`\` json
{
    'topic': 'ntf',
    'args': {
        'id': 'INDICATIVE_DATA_SUGGESTION',
        'text': 'CFD quotes reference the trade, volume and bid-ask market data on the underlying STK',
        'title': 'Warning',
        'url': 'https://interactivebrokers.com/'
    }
}
\`\`\`

---

#### Bulletins

If there are urgent messages concerning exchange issues, system problems and other trading information the topic **blt** 
is sent along with the message argument.

\`\`\` json
{
    'topic': 'blt' ,
    'args': {
        'id': '' ,
        'message': '' 
    }
}
\`\`\`

---
`

export default websocketsIndividual;