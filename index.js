// first run on command line enter npm i then npm install inquirer fs-extra util axios puppeteer 
const inquirer = require("inquirer");
const fs = require("fs-extra");
const util = require("util");
const axios = require("axios");
const puppeteer = require("puppeteer");
const populateHTML = require("./populateHTML");
const writeFileAsync = util.promisify(fs.writeFile);

//the user enters their github name and it's set to username for the API
function userNamePrompt() {
    const username = inquirer.prompt({
        type: "input",
        name: "username",
        message: "What is your Github username?"
    });
    return username;
}
//this function takes the user's color choice and it will be used as the background on pdf 
function userColorPrompt() {

    const color = inquirer.prompt({
        type: "list",
        name: "color",
        message: "What color would you like your PDF to be?",
        choices: ["Green", "Blue", "Pink", "Red"]
    });
    return color;
}
//the username is set to github API to retrieve the info 
function githubAPICall(username) {
    let data = axios.get(`https://api.github.com/users/${username}`)
    return data;
}
function githubAPIStar(username) {
    let gitStars = axios.get(`https://api.github.com/users/${username}/starred`)
    return gitStars
}


//function used to retrieve specific api info which will be used to generate the html for pdf 
async function init() {
    //try test for errors that are within the block
    try {
        // a wait is set while the function is run using username 
        let { username } = await userNamePrompt();
        // a wait is set while function is run to retrive the color and set to constant
        const { color } = await userColorPrompt();
        //the user name allows the api data and gitstars to be retrived from github api based upon user name then length is obtained
        let { data } = await githubAPICall(username);
        let gitStars = await githubAPIStar(username);
        let gitStarsLength = gitStars.data.length
        //the color for the html is established after the data 
        data.color = color;
        data.gitStarsLength = gitStarsLength;
        const html = populateHTML(data);
        writeFileAsync("index.html", html).then(function () {
            //once the file has been written to index.html a success message sent to the user
            console.log("Successfully wrote to index.html");



        });
        //puppeteer was used to create the pdf 
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(html);
        await page.emulateMedia("screen");
        await page.pdf({
            path: `${username}.pdf.pdf`,
            format: "A4",
            printBackground: true

        });
        //message saying the pdf file was completed sent 
        console.log("PDF is created, please view in a PDF viewer to see.");
        await browser.close();
        process.exit();
    }
    //if the error is outside of the try block it would trip catch
    catch (err) {
        console.log(err);
    }
}
init();