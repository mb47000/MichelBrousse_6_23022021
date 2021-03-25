"use strict";

const fs = require("fs");

const data = JSON.parse(fs.readFileSync("data.json"));
const getName = (media,type) => {
	const fileName = media[type].replace(/_|-/g, " ");
	const indexExtension = fileName.indexOf(".");
	const indexName = fileName.indexOf(" ");
	const name = fileName.substring(indexName, indexExtension);
	return name;
};
for (let media of data.media) {
	if (media.hasOwnProperty("video")) {
		media.alt = getName(media,"video"); 
	} else {
		media.alt = getName(media, "image"); 
	}
}
console.log(data);
fs.writeFileSync("file.json", JSON.stringify(data, null, 4));
