const fs = require('fs');
const axios = require('axios');

function cat(path){
fs.readFile(path,'utf8',(err,data)=>{
if(err){
  console.log(err);
  process.exit(1);
}
console.log(data);

})
}


async function webCat(url) {
try {
  res = await axios.get(url);
  console.log(res);
} catch (e) {
  console.log(`Error fetching ${url}`,e);
}
}


let regex = /http:/;
if(regex.test(process.argv[2]))
{
webCat(process.argv[2]);
}
else{
  cat(process.argv[2]);
}
