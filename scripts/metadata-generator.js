const prompt = require("prompt");
const fs = require("fs");

prompt.start();

prompt.get(
  ["name", "image", "description", "external_url"],
  function (err, result) {
    if (err) {
      return onErr(err);
    }

    console.log(result.name);
    var obj = new Object();
    obj.name = result.name;
    obj.image = result.image;
    obj.description = result.description;
    obj.external_url = result.external_url;

    //convert object to json string
    var string = JSON.stringify(obj);

    fs.writeFile("nft-metadata.json", string, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("NFT-metadata.json was created");
    });
  }
);

function onErr(err) {
  console.log(err);
}
