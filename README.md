## Refurn 





#### Refurn is a mock furniture resell business, built using - Node.Js, Express, Axios, MongoDB, GoogleCloud Storage, React, React-Router, Passport, and Bootstrap.  
Link: https://refurn.herokuapp.com/landing  


![Refurn Screenshot](https://i.imgur.com/aee6rH8.png)
  
### IMPORTANT!
In order to showcase this app's features, I have disabled all route security, thus allowing anyone access to API endpoints. Endpoints can be secured at any point using
authRoutes.js as middleware.
  
### Features
- Auth solution saves User data to MongoDB
- Allows User to create a listing, uploading image to GC Storage, and form data and img link to MongoDB.
- User can see the status of their listing in /dashboard
- Admin can either approve or deny the listing, which notifies the user of the status.

### Future Development:
- Sort Admin listings by date uploaded.
- Add toast notification to header.
- Add dummy store feature in /availiblefurniture.
- Impliment dummy payment feature


### Installation
1) Download and install node.js from https://nodejs.org/en/download/
2) Clone or download the git repository
3) Unzip and CD in project directory
4) Get required keys for MongoDB, Firebase-admin(Google Cloud Storage), Google OAuth, and create cookie-session key.
5) Set keys.
6) Run `npm install`
7) Run `npm run dev` to initialize local server

