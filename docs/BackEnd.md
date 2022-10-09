# Install the Amplify CLI
curl -sL https://aws-amplify.github.io/amplify-cli/install-win -o install.cmd && install.cmd.

## Pre-requisites for installation
1. Verify that you are running at least Node.js version 12.x by running node -v in a terminal/console window.
2. Verify that you are running npm version 6.x or greater by running npm -v in a terminal/console window.
3. The REST API category can be used for creating signed requests against Amazon API Gateway when the API Gateway Authorization is set to AWS_IAM. Hence need an IAM user account with correct privileges.

## Configure the Amplify CLI
### To set up the Amplify CLI on your local machine, you have to configure it to connect to your AWS account

1. Configure Amplify by running the following command:
    1. amplify configure
    2. Command in step 1 above will ask you to sign into the AWS Console
    3. Once you're signed in, Amplify CLI will ask you to create an IAM user (Use user account credentials provided by Carl).
    4. Amazon IAM (Identity and Access Management) enables you to manage users and user permissions in AWS.
    5. Respond to terminal prompts for the following: *Specify the AWS Region  
? region:  # Your preferred region  
Specify the username of the new IAM user:  
? user name:  # User name for Amplify IAM user*    
    6. Connect user to the AWS console.  
    7. Ensure user has AdministratorAccess-Amplify to provision AWS resources for you like AppSync, Cognito etc.
    8. For selected user, Amplify CLI will ask you to provide the accessKeyId and the secretAccessKey to connect Amplify CLI with IAM user.
    9. Respond to terminal prompts for the following:   
    *Enter the access key of the newly created user:  
? accessKeyId:  # YOUR_ACCESS_KEY_ID  
? secretAccessKey:  # YOUR_SECRET_ACCESS_KEY  
This would update/create the AWS Profile in your local machine  
? Profile Name:  # (default)  
Successfully set up the new user.*  

## Work within your frontend project
1. After you install the CLI, navigate to a JavaScript, iOS, or Android project root. 
2. Create project with React as below:
    1. npx create-react-app amplify-demo-app to create-react-app
    2. cd into folder & do the following:
        1. cd amplify-demo-app
        2. npm start 
        3. Prompts should be like below:
        ? Enter a name for the project (amplifydemoapp) 
        ? Enter a name for the project amplifydemoapp  
        The following configuration will be applied:

Project information
| Name: amplifydemoapp
| Environment: dev
| Default editor: Visual Studio Code
| App type: javascript
| Javascript framework: react
| Source Directory Path: src
| Distribution Directory Path: build
| Build Command: npm.cmd run-script build
| Start Command: npm.cmd run-script start

? Initialize the project with the above configuration? (Y/n)y
sing default provider  awscloudformation
? Select the authentication method you want to use: AWS access keys
? accessKeyId:  ********************
? secretAccessKey:  ****************************************
? region:  us-east-1
Adding backend environment dev to AWS Amplify app: dh4g2iynbzgxm
3. Initialize AWS Amplify in the new directory by running "amplify init".  
4. Use "amplify help" at any time to see the overall command structure.  
5. To add a feature, run "amplify add api"
6. As show below select "REST" as the service type.  
*? Please select from one of the below mentioned services
  GraphQL  
❯ REST*
7. The CLI will prompt several options to create your resources. With the provided options you can create:

    1. REST endpoints that triggers Lambda functions  
    2. REST endpoints which enables CRUD operations on an Amazon DynamoDB table.
7. During setup you can use existing Lambda functions and DynamoDB tables or create new ones by following the CLI prompts.  
Ensure settings are as below:  
*? Select from one of the below mentioned services: REST  
? Provide a friendly name for your resource to be used as a label for this category in the project: » apid217a389  
√ Provide a path (e.g., /book/{isbn}): · /customers/{customerId}  
Only one option for [Choose a Lambda source]. Selecting [Create a new Lambda function].  
? Provide an AWS Lambda function name: CustomerHandler  
? Choose the runtime that you want to use: NodeJS  
? Choose the function template that you want to use: (Use arrow keys)  
  CRUD function for DynamoDB (Integration with API Gateway)  
  GraphQL Lambda Authorizer  
  > Hello World  
  Lambda trigger
  Serverless ExpressJS function (Integration with API Gateway)  
select no on remaining steps*

Update lambda function (/amplify/backend/function/src/index.js) & save

8. After your resources have been created update your backend with the push command as shown below:
    1. amplify push
9. A configuration file called aws-exports.js will be copied to your configured source directory, for example ./src


