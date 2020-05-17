[VIDEO DEMO](https://www.youtube.com/watch?v=wY1-5v7cFGg&feature=youtu.be "Video Demo")

## Inspiration
Deep Learning has recently been at the forefront of creating effective solutions that we didn't think were even possible 5 years ago. Especially their advance in computer vision and even their capability for beating Machine Learning models at regression most instances. With around [20 % of the global population](https://www.theguardian.com/world/2020/mar/24/nearly-20-of-global-population-under-coronavirus-lockdown "Reference") on lockdown, there has yet to be an effective tool to help not just hospitals but also individuals who are at risk. We decided to take on both.

## What it does
Our web app combines both aspects of serving individuals and hospitals during this crisis by providing two separate tools to help us see those at risk. The individual-centered app helps evaluate individuals risks by predicting their chance of death if infected with COVID-19; while on the other half of the app, providing hospitals in areas where the testing kits are low to assist doctors in detecting if a patient has COVID-19, Pneumonia, or is Healthy based on their chest X-Ray. *The regression model has a precision of 81% and the cloud-hosted computer vision model has a precision of 94%*

## How we built it
The patient risk-analysis model was trained on Jupyter using Keras/Tensorflow on data gathered from Mexico. The model was then hosted on a Node.js back-end and served in-browser. The X-Ray detection model was trained, hosted, and deployed via Google Cloud's AutoML API; while the prediction part of the application went through our back-end to AutoML. The web application is hosted on Heroku with Node.js as a back-end with no external libraries other than tensorflow.js on the front-end. 

## Challenges we ran into
Gathering and preparing data takes up the most time for any ML/DL project and due to the nature of privacy most countries do not release data on incoming patients and their pre-existing conditions. However, Mexico does release this info, so that was our source for the tabulated data. A publically available dataset for COVID-19 positive X-Rays was used for the source of the image data. Preparing the data for the tabulated data took significantly longer than expected due to issues having to translate and research the classes as they were in Spanish and the model being overfitted due to the small number of patients who had those pre-existing conditions. Apart from that everything else was smooth sailing.

## Accomplishments that we're proud of
We are proud of completing something that can help to assist doctors in making predictions of their patients. What we are most proud of is creating a tool that hasn't been developed that gives individuals the ability to asses their own risks and make their own independent decisions that could indirectly save lives in just a few clicks. 

## What we learned
We learned that no task is too challenging and that even a small tool could possibly affect the lives of many.

## What's next for COVI-DL
We are planning on converting the cloud-hosted model to be hosted on our own back-end so that we can have the app up and running for the duration of the pandemic while at the same time reaching out within our communities and public forums to spread the awareness of our technology. In addition to this, we will be making the tabulated dataset from Mexico available in English on popular data platforms such as Kaggle as many are unaware that such data exists allowing others to contribute to making this tool better. 