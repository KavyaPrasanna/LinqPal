# LinqPal
External User Form

# Stack used
MEAN stack(MongoDB, ExpressJS, AngularJS, NodeJS)

#Installation
npm install

#command to start app
node index.js

1. Open browser with URL http://localhost:8088/#!/welcome
2. Choose Admin or External user option
3. Choosing Admin takes to Login page. Use these credentials to login
     email : kavyakp89@gmail.com
     password : tomato
   Used Json Web token for authentication.     
4. After successfully logging in the token is stored in localstorage and lands to a page where the list of all External users is displayed(which is a protected route) with encrypted SSN
5. Choosing External user takes you to the Form to enter all the user details.
6. Once all the details are entered the user is successfully added to the database(mongodb-mLab)
7. Client-side form validations are done
8. Server-side validations are also done.
