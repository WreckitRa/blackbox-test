This project was made as a test for Blackbox company, the project consists of two file:

1. Client file
2. Server file

On the client side, I decided to work with NextJs, which I think is the best technology arround ReactJs, in addition to tailwind CSS, that I also think is one of the best packages for styling.

For the style, honestly I was lost, I didn't know if I should follow the framer design without any change, or build my own style (as for the responsive components).

This projects consists of a login page, or create user, an email verification will be sent after user creation, the password could be reset by email, anytime, the user can upload videos, and see all the videos uploaded on the server, and also he can add some of the videos as his featured, the featured videos are linked to his account, can be accessed by any device, once uploaded, a thumbnail of the video will be shown on the home page, and a link will be provided to be able to watch the video.

I used some basic security functions, like setting cookies and json web tokens.

To start the project, run:

yarn add || npm install
yarn dev (for development)
yarn build -> yarn start (for production)
