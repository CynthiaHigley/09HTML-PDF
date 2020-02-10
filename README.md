# Unit 09 Node.js and ES6+ Homework: Developer Profile Generator
This is a terminal app used to take the github name from the user and their color preference 

from there the user name is sent to github to retrieve the data and stars which is then 
combined with the user's color preference which is sent to the html file to format it then puppeteer is used 
to send the data to a pdf 

in order to see the pdf user  needs to open it in a pdf reader. 

in the images file you will find both the termial and the pdf output generated 

index.html is the formatting document which has the html creating the structure in the head, then as you can see based upon the input added the api is sent to the html fields and are populated for puppeteer to grab and put into a pdf 

index.js is where the code is used for the app 
it requires the user to fire run on command line enter npm i then npm install inquirer fs-extra util axios puppeteer 
the users enters their name for github which returns username 
then the user selects using the arrow and enter keys which color of background they want in their pdf this returns color 

the username is then sent to the github api to return data and gitStars
then a function is turn using awaits to asynchonously get the user name, color, git starts which will be sent to the html file 
when successful message lets user know their index.html was created 
then puppeteer uses the data to launch this into a pdf file. 
another message lets the user know their pdf can be read in a reader 
the function init() is called 

the index.js is more or less the structure of the document to be used for the pdf 
but the pulling from the api the information for the document are pulled in the populateHTML.js 

