import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import { URL } from "url";

const question = [
  {
    type: "input",
    name: "URL",
    message: "Type in your URL: ",
  },
];

inquirer
  .prompt(question)
  .then((answers) => {
    const url = answers.URL;
    const newUrl = new URL(answers.URL);
    const hostname = newUrl.hostname;
    const domain = hostname.replace("www.", "").replace(".com", "");
    
    var qr_img = qr.image(url, { type: "png" });
    qr_img.pipe(fs.createWriteStream(`${domain}.png`));

    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("The file has been saved");
    });
  })
  .catch((error) => {
    console.log("Invalid URL");
  });
