# Setting up the development environment

Follow the below steps to setup the development environment which you need before  contributing to the project

## Prerequesites

The main libraries used in the project are ReactJS,NextJS and NodeJS,NPM as the dependency management tool.

Inorder to run the project locally these tools need to be installed on your machine.

1. [Node](https://nodejs.org/en/) >= 8.10 
2. [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  >= 5.6 

## Installation

NB:The istructions are written assuming that the developer is using ubuntu operating system

1. For the [dynamic learning](https://github.com/dynamic-learning/dynamic-learning) repository into your github account.
2. Clone the repo into you systme using   
 ```git clone <git@github.com:<YOUR USERNAME>/dynamic-learning.git ```
3. Navigate to the root directory of the project.
4. Checkout to the the branch that has the latest version of the project  
  ```git checkout <LATEST-BRANCH-NAME>```
5. The root directory consists of two folders 
    1. Client (User interface related  code)
    2. Server (Server related code)
6. To start the development server for the user interface. Navigate to the client folder and run the command   
   ```npm install```  
to install the required dependencies.
7. Once the installation is over run the command ```npm run dev``` to start the development server fot the user interface.
8. The port 3000 is used by default and can see check the application working by navigating to ```http://localhost:3000 ``` on your browser.
   




