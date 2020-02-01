// $ npm install -g html-pdf
//$ npm intall inquirer
// $ npm install axios

const axios = require("axios");
var inquirer = require("inquirer");
var fs = require('fs');

inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is your github name?"
    },
    {
        type: "list",
        message: "What is your favorite color",
        name: "color",
        choices: [
            "red",
            "yellow",
            "blue"
        ]


    }

]).then(answers => {
    console.log(answers);

    // var filename = data.name.toLowerCase().split(' ').join('') + ".json";

    // fs.writeFile(filename, JSON.stringify(data, null, '\t'), function (err) {

    //     if (err) {
    //         return console.log(err);
    //     }

    //     console.log("Success!");

    // });
    axios.get("https://api.github.com/users/" + answers.name).then(function (res) {
console.log(res)

     });
 
});



// module.exports = data;  
