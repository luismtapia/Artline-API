const jwt = require("express-jwt");
const secret = require("../config").secret;

function getTokenFromHeader(req) {
  if (
    req.headers.authorization &&
    (req.headers.authorization.split(" ")[0] === "Token" ||
      (req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"))
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}


function getTokenFromLocalStorage (){
  const infoUser = localStorage.getItem("user");
  console.log("HOOLAA");
  console.log(infoUser);
}

const auth = {
  requerido: jwt({
    secret: secret,
    algorithms: ["HS256"],
    userProperty: "usuario",
    getToken: getTokenFromHeader,
    // getToken: getTokenFromLocalStorage
  }),
  opcional: jwt({
    secret: secret,
    algorithms: ["HS256"],
    userProperty: "usuario",
    credentialsRequired: false,
    getToken: getTokenFromHeader,
    // getToken: getTokenFromLocalStorage
  }),
};

module.exports = auth;
