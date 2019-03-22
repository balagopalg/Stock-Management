## Stock management Transaction Processor 

# Brief Description about TP

1.	There are two different JavaScript files are included in process folder.

2.	index.js: The firstone is index.js file which is used to:

    Adding handler, 
    The registration of the Transaction Processor,
    Registering the transaction processor to a particular validator is done here and the Transaction Processor is started.

3. stockprocessor.js: stockmanagementhandler operations are done in this file with 
 Respect to written importing variables 

4. Define the hashing functions, the family name, prefix, addressing schemes, encoding and decoding functions.

5. After this all process, make Functions for depositing the supply,requesting the transaction,verifying and accepting the transaction.

6. After this the handler for encoded payloads and the apply function is defined. And correspond payload call the Action

# Workflow


1. Workflow in between retailagent and wholesaleagent 

2. The client is the retail agent who is initiating transaction for stock exchange.

3. client defined a payload subject to an action and payload will be sent to the validator via the REST-API, which validator passes on to the    Transaction Processor

4. The Transaction Processor upon receiving the payload checks whether it is in correct or not.

5. If its correct then the validater will extract the action from the payload and calls the appropriate function  with the necessary variables.

6.Programm will be executed.

## Client


# Brief Description

1. stockclient.js and index.js are two JavaScript file used to defined client process 

2.index.js:  index.js is a express file used to route into frontend 

3. stockclient.js: In this we have defined set and get state operations and creating public and private key pairs for users and the Action functions used to defined those are deposit,request and approve.

#  Workflow


1.retailer can login to their account using the username admin and password admin

2.after login,retailer can initiate a request transaction by enttering the agentId and quantity required.

3.The retailer can also check the stock available with him

4.The wholesale agent can also login to their account and can verify the request

5.After verifying ,the agent can approve the request by entering their agentId and quantity.

6.Then the stock will be transfered to the retailer in blockchain network

7.The wholesale agent can also check their stock balance
