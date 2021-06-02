import jwt from 'jsonwebtoken';

// after the user is signed in, they get a specific JWToken. Here we check if its valid, and they are allowed to like, post, etc
const auth = async (req, res, next) => {
  try {
    // gets the token from the front-end
    const token = req.headers.authorization.split(" ")[1];
    // checks if its our log-in or googles oAuth
    const isCustomAuth = token.length < 500;

    let decodedData; //the data we want to get from the token itself

    //this gets the user ID if we are using our own token
    if(token && isCustomAuth) {
      decodedData = jwt.verify(token, 'test');

      req.userId = decodedData?.indexOf;
    } else { 
        // this gets the user ID if its Googles
        decodedData = jwt.decode(token);

        req.userId = decodedData?.sub; //sub is what Google calls its user IDs
    }

    next();
    
  } catch (error) {
    console.log(error);
  }
}

export default auth;