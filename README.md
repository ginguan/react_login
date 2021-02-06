# react_login

## Installation:
      
      git clone https://github.com/ginguan/react_login.git
      
In server folder:

      npm install
      node server.js
      
In client folder:

      npm install
      npm start
      
## Screenshots:

### Page 1 = Login.
  - Links to mongo atlas to authenticate with email and password

  <img src="img/login.gif" width="100%" height="100%"/>
  
  - if no user found or wrong password entered
  <div class="col">
  <img src="img/wrong_user.gif" width="45%" height="45%" />
  <img src="img/wrong_password.gif" width="40%" height="40%" />
</div>
  
 
### Page 2 = Create User
  - Create a user with fields: Email, Password, username and attach an image.
  - Supports User Authentication (Registation, Login) & Authorization with JSONWebToken (JWT)
  
  - Once you upload the profile image, it will display on the page
  <img src="img/same_user.gif" width="100%" height="100%"/>
   <img src="img/upload_img.gif" width="100%" height="100%"/>
   
  - if using same email, it will fail to to sign up
  <img src="img/upload_img.gif" width="100%" height="100%"/>
  <img src="img/signup.gif" width="100%" height="100%"/>
  

### Page 3 = Authenticated
  - Display the associated image and username, email on this page.
  <img src="img/profile.png" width="100%" height="100%"/>
  - Press logout link to logout
  <img src="img/logout.gif" width="100%" height="100%"/>
  

