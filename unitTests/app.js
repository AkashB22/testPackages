const axios = require('axios');

module.exports = {
  getUser(username) {
    co();
    return axios
      .get(`https://api.github.com/users/${username}`);
  }
};
