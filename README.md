# Szkocka

# Installation
To use this project as is, first clone the repo from GitHub, then run:

$ cd front-end/ <br>
$ npm install<br>
$ gulp - creates "dev" folder<br>

# Running localy

Install Python<br>
$ cd front-end/dev<br>
$ py -m http.server [port] (or 'python -m SimpleHTTPServer [port]' - for Mac)<br>
Run watcher:<br>
$ cd front-end<br>
$ gulp watch<br>
Open in browser: http://localhost:[port]<br>

# Build for production

$ cd front-end/<br>
Open: "Gulpfile.js"<br>
Uncomment: //environments.current(production); <br>
run: $ gulp <br>
zip "release" folder<br>
