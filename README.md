# IoT based Indoor Farming

IoT based Indoor Farming Web App created to control the environment of the IoT device. The project was to create find solution to farm where farming conditions aren't met. With today's technology, it is possible to simulate an environment to meet those conditions. We created a device to support indoor farming using vertical farming, light based and few other technologies and implemented IoT Principles to the device so as to control the settings and environment from anywhere.


## Demo Can be found [here](https://indoorfarming-cfb49.web.app/)

### Register and Login for testing

Use **192-168-0-108** for IP address field while registeration
*or*
Use **test** for username and **123456** for password in login


## Run this project on your device

Install All the packages and Ionic Global CLI
```sh
npm i
npm install -g @ionic/cli
```

Login to your firebase account and create a new project then create a web application then copy the config and follow the below instructions

Create a firebaseConfig.ts file in src folder and paste the following

```jsx
const config = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PRODUCT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID
  
}

export default config
```

## Tech Stack used
- Software
    - Ionic React
    - Firebase Auth
    - Firebase Realtime Database
    - Firebase Cloud Firestore
    - Typescript
- Hardware
    - Firebase Realtime Database
    - NodeMCU ESP8266
    - Arduino Editor
    - Temperature Sensor
    - Moisture Sensor
    - Water Pump using Motor
    - Exhaust Fan using Motor
    - RGB LED Lights

## This was a wonderful project to learn about IoT and its implementation on a web app using simplest and most secure way possible