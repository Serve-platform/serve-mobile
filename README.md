# Subway Seat exchange Decentralized Application - ServeWay

This application is subway seat exchange dApp. There is missing information when people use public-transportation, especially subway. In ServeWay, people can deal the information - When the person in front gets off.

In Serve Way, User can get a seat **in two ways** :

- Real-time matching: If user click “request a seat concession” button,  it will send a push notification to other users who have registered their seats and  match.
- Find and request: If other users sitting on the seats registered there seats, you can find them on “Find" tab. and just send a request. when seat changed → transaction occurs

User wallet Registration[ERC-1271](https://mumbai.polygonscan.com/address/0x563699d8798A654ec60A8F7720Fe8a0037ce69ae#code) - Standard Signature Validation Method for Contracts
Serveway Token: SEAT [ERC-20, ERC-2612](https://mumbai.polygonscan.com/address/0xA6f00218efb6c0Fe4C53d01b2195e09A1E1a8523#code)

This project was built during ETHDenver 2023 BUIDLathon.

## Deployed demo version lives [here]()

## [3 minutes demo]()

## Overview

we publish custom library [react-native-phone=to-phone-ble](https://www.npmjs.com/package/react-native-ble-phone-to-phone) for send user uuid data through Bluetooth scan

## Setup

Requirements
Opct uses a number of ES6 features, so this project requires Node.js v4.0+ to be installed locally.

Installation
To get the project up and running, and view components in the browser, complete the following steps:

Download and install Node: https://nodejs.org/

Clone this repo: (HTTPS) https://github.com/Serve-platform/serve-mobile_ethDenver.git

or(SSH) git@github.com:Serve-platform/serve-mobile_ethDenver.git

Install project dependancies: yarn install

Start the development environment: yarn start

Run android

yarn run android

Run ios

yarn run ios

Creating a static build

To create a static instance of this project, run the following task:
yarn start

Deployment

To make this project publicly accessible, you can deploy a static instance by running the following task:

yarn android or yarn ios
