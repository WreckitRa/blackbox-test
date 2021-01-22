This project was made as a test for Blackbox company, the project consists of two file:

1. Client file
2. Server file

On the server side, I eorked with nodeJs (the one I love the most haha), with express, and I chose mongoose and mongodb dor DB and schemas.

The file is divided into 4 main parts, app.js which is the core of the file, controller (where I stored all the queries), models (where I stored all the collection models) and the routes folder (where I stored all the routes).

I used some basic security functions, like json web tokens, morgan, helmet, cors and express validators.

To start the project, run:

npm install
npm start (will run using nodemon)
