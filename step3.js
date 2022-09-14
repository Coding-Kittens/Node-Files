const fs = require("fs");
const axios = require("axios");

function cat(path, isLog) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(`Couldn't Read ${path}:\n ${err}`);
      process.exit(1);
    }
    if (isLog) {
      console.log(data);
    } else {
      writeFile(process.argv[3], data);
    }
  });
}


async function webCat(url, isLog) {
  try {
    res = await axios.get(url);
    if (isLog) {
      console.log(res);
    } else {
      writeFile(process.argv[3], res.data);
    }
  } catch (err) {
    console.log(`Error fetching ${url}:\n ${err}`);
    process.exit(1);
  }
}


function writeFile(path, data) {
  fs.writeFile(path, data, "utf8", (err) => {
    if (err) {
      console.log(`Couldn't write to ${path}:\n ${err}`);
      process.exit(1);
    }
  });
}



const regex = /http:/;
let num = 2;
let isLog = true;

if (process.argv[2] === "--out") {
  num = 4;
  isLog = false;
}

if (regex.test(process.argv[num])) {
  webCat(process.argv[num], isLog);
} else {
  cat(process.argv[num], isLog);
}
