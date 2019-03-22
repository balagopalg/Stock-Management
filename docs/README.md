# SAWTOOTH-STOCK MANAGEMENT
A simple sawtooth "stock management" transaction family example (processor + client)


# INTRODUCTION

This is a minimal example of a sawtooth 1.0 application. This example demonstrates, a common usecase, where the stock management system between wholesale agent and retail agents are demonstrated.

The system works as: 

* A retail agent can request for te required quantity of items to the wholesale agent.There may have many number of retail agents under one wholesale agent.So each agent have aunique ID

*The wholesaler can manually add or update the stock available with him using the agentId

*The wholesale agent can view and verify their request for the stock.And he can accept or denay the request

*Upon accepting,the quantity of stock required will be transferred from the wholesale agent's account and will be credited in the specific retail agent's account.

*In real world scenario,the items will be transferred manually,but the transaction will be marked in the blockchain network.

*Each agent will have a unique ID will be used for requesting and verifying the request.

*The retailer and wholesaler can also check the quatity of stock left with their account.


# Components

The application is built in two parts:
1. The client application written in js, written in: stockclient.js file. 

2. The Transaction Processor is written in js using javascript-sawtooth-sdk. 


**JAVASCRIPT CLIENT NOTE**

The client is written in Javascript using node.js. The `app.js` is the main javascript file from where the `main` function call occurs. Handlebars are used for templating, client related CSS and JavaScript code is written in public folder and server related files are written in `router/` folder.

 
How to use the stockmanagement UI:

1. Build and start the Docker containers:

`docker-compose -f stock.yaml up

2. Create userId for retailer and Wholesaler:

`sawtooth keygen ret889 && sawtooth keygen whol454`

3. Open new browser tab and go to `http://localhost:3000`

4.login the retailer or wholesaler account using username : admin and password: admin

5. Use the userId created to initiate request or to verify and accept the request

7.The customer can also check the stock available by clicking the stock button
------


# Pre-requisites

This example uses docker-compose and Docker containers. If you do not have these installed please follow the instructions here: https://docs.docker.com/install/

**NOTE:**
The preferred OS environment is Ubuntu 16.04.3 LTS x64. Although, other linux distributions which support Docker should work. 
If you have Windows please install [Docker Toolbox for Windows](https://docs.docker.com/toolbox/toolbox_install_windows/) or [Docker for Windows](https://docs.docker.com/docker-for-windows/), based on your OS version.

**NOTE:**
The minimum version of Docker Engine necessary is 17.03.0-ce. Linux distributions often ship with older versions of Docker.

[Here's a gist](https://gist.github.com/askmish/76e348e34d93fc22926d7d9379a0fd08) detailing steps on installing docker and docker-compose.

### Working with proxies


You can locate the right Docker client container name using `docker ps`.


------
