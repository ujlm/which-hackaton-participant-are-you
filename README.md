# AFT Online Quiz
This repo contains a basic NextJS setup for quickly deploying fun quizzes to promote AFT events. This example project contains a quiz to determine which type of hackacton participant you are. It was used to promote the Hackaton event.
A live demo can be found [here.](https://which-hackaton-participant-are-you.vercel.app/)

# How to run locally?

Clone this repo by creating a folder, opening a cmd window and run

    git clone https://github.com/ujlm/which-hackaton-participant-are-you.git

Then install dependencies by navigating to your cloned folder and running npm install or use the recommended way using yarn:

    yarn

Then run the project npm start or

    yarn dev

## How to customize?

Questions and answers can be added in quizData.json.
Note that some sentences are hardcoded in index.tsx (bad design choices, but this project is overall quick & dirty, I'm sorry --> feel free to make it better!) so you might want to edit some sentences there as well. Backgrounds and styles can be edited, for example the [NYC SST quiz](https://github.com/ujlm/aft-nyc).

## How to deploy

Create a new github repo and push your cloned local repo to this remote origin. Create a Vercel account and deploy the project. That was easy!

## Need help?

Feel free to create an issue in this repo if something doesn't work.

![AFT logo transparent](https://www.aftleuven.be/wp-content/uploads/2021/09/cropped-cropped-Logo_Text_White-2-2048x682.png)
