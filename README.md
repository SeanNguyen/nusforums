# nusforums
A financial information forums under NUS, Singapore

###Development:
- make sure you have mysql install on your computer and a copy of the sample database with the correct database name and username and rights. For detail plz have a look at this link.
- make sure you have nodejs, python 2.7 and git install
- make sure you have bower, grunt-cli install globally for nodejs, if not type this in the command line: `npm install -g bower grunt-cli`
- then navigate to the project folder then run `npm install` to get all the packages for development and nodejs server to run
- run `bower install` to get all the packages for front-end
- run `grunt serve` to start the web server 
- open a browser and go to `localhost:9000` to see the project in action.

###Deployment:
- do all the step above except the last step
- run `grunt build` to minify all the javascript, css
- all the production code is deployed to folder 'dist'
