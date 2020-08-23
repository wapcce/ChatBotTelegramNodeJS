const YouTube = require('youtube-node');
const keyYoutube = require('./tokens/Key.json');

const youtube = new YouTube();
youtube.setKey(keyYoutube.apiYoutube);

function searchVideoURL(message1, message, queryText) {
  //console.log(`Esta e mensagem ${message} e esta é a queryText ${queryText}`);
  return new Promise((resolve, reject) => {
    youtube.search(` ${message1} ${queryText}`, 2, (error, result) => {
      if (!error) {
        const videoIds = result.items
          .map((item) => item.id.videoId)
          .filter((item) => item);
        const youTubeLinks = videoIds.map(
          (videoId) => `https://www.youtube.com/watch?v=${videoId}`
        );
        //resolve(`${message} ${youTubeLinks.join(',/n')}`);
        resolve(`${message} \n${youTubeLinks.join('\nE\n')}`);
        //console.log(youTubeLinks[0]);
        //resolve(`${message} \n${youTubeLinks[0]}\nE\n${youTubeLinks[1]}`);
      } else {
        //console.log(JSON.stringify(result, null, 2));
        reject('Deu erro!');
      }
    });
  });
}

module.exports.searchVideoURL = searchVideoURL;
