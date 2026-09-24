const fs = require('fs');
const path = require('path');

const eventTsxPath = path.join(__dirname, 'src', 'components', 'Event', 'Event.tsx');
let content = fs.readFileSync(eventTsxPath, 'utf8');

const links = {
  "Sarau": "https://www.youtube.com/watch?v=ji7yZ3GKUYM",
  "Acantonamento": "https://www.youtube.com/watch?v=czZUSLN9rVQ",
  "Desafio RDN": "https://www.youtube.com/watch?v=84Y3k3VAtns",
  "Feira de<br/>CiǦncias": "https://www.youtube.com/watch?v=dfFNCqdnPn0",
  "Festa dos<br/>Aprovados": "https://www.youtube.com/watch?v=Tg548DH-JMI",
  "Rodin<br/>Cultural": "https://www.youtube.com/watch?v=3tCMBDbcRf0",
  "TED": "https://www.youtube.com/watch?v=mg2Dk1yBCwA"
};

for (const [titleKeyword, link] of Object.entries(links)) {
  // Find the block for this title
  const titleIndex = content.indexOf(titleKeyword);
  if (titleIndex !== -1) {
    const videoUrlIndex = content.indexOf('videoUrl: "#"', titleIndex);
    if (videoUrlIndex !== -1 && videoUrlIndex < titleIndex + 500) {
      content = content.substring(0, videoUrlIndex) + 'videoUrl: "' + link + '"' + content.substring(videoUrlIndex + 13);
    }
  }
}

fs.writeFileSync(eventTsxPath, content);
console.log('Links updated in Event.tsx');
