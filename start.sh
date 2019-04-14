#!/bin/bash
cd client/
npm install 
cd src/
vue serve &
cd ../../server
npm install
node app.js &
