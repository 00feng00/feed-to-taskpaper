const Twitter = require('twitter');
const { twitterConfig, twitterScreenName } = require('../config');

// https://developer.twitter.com/en/apps/14736122
const client = new Twitter(twitterConfig);

module.exports = function() {
  return new Promise((resolve, reject) => {
    client.get('favorites/list', {
      screen_name: twitterScreenName,
    }, (err, tweets) => {
      if (err) {
        reject(err);
      } else {
        resolve(tweets);
      }
    });
  });
}