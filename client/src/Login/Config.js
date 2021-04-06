const configs = {
    development: {
      SERVER_URI: 'localhost:5000',
    },
    production: {
      SERVER_URI: 'https://charge-point.herokuapp.com',
    },
  };
  // trying to confugure the routing from here with URI but seems it isnt working yet
  module.exports.config = configs[process.env.NODE_ENV];