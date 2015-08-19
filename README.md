# Nusforums
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

#Forums part of this NusForum

## Screenshots

[<img src="http://i.imgur.com/FLOUuIqb.png" />](http://i.imgur.com/FLOUuIq.png)&nbsp;[<img src="http://i.imgur.com/Ud1LrfIb.png" />](http://i.imgur.com/Ud1LrfI.png)&nbsp;[<img src="http://i.imgur.com/ZC8W39ab.png" />](http://i.imgur.com/ZC8W39a.png)&nbsp;[<img src="http://i.imgur.com/o90kVPib.png" />](http://i.imgur.com/o90kVPi.png)&nbsp;[<img src="http://i.imgur.com/AaRRrU2b.png" />](http://i.imgur.com/AaRRrU2.png)&nbsp;[<img src="http://i.imgur.com/LmHtPhob.png" />](http://i.imgur.com/LmHtPho.png)&nbsp;[<img src="http://i.imgur.com/paiJPJkb.jpg" />](http://i.imgur.com/paiJPJk.jpg)&nbsp;[<img src="http://i.imgur.com/ZfavPHDb.png" />](http://i.imgur.com/ZfavPHD.png)&nbsp;[<img src="http://i.imgur.com/8OLssij.png" />](http://i.imgur.com/8OLssij.png)&nbsp;[<img src="http://i.imgur.com/JKOc0LZ.png"/>](http://i.imgur.com/JKOc0LZ.png)


## Requirements

Development for this forums requires the following software to be installed:

* A version of Node.js at least 0.10 or greater
* Redis, version 2.6 or greater **or** MongoDB, version 2.6 or greater
* nginx, version 1.3.13 or greater (**only if** intending to use nginx to proxy requests to a NodeBB)

## Installation

[MAC OSX](https://github.com/SeanNguyen/nusforums/wiki/Setting-thing-up---Mac-OSX)

[WINDOWS](https://github.com/SeanNguyen/nusforums/wiki/Setting-thing-up---Windows-8)

[UBUNTU] (https://github.com/SeanNguyen/nusforums/wiki/Setting-thing-up----Ubuntu)

## Securing (TODO)

It is important to ensure that your NodeBB and database servers are secured. Bear these points in mind:

1. While some distributions set up Redis with a more restrictive configuration, Redis by default listens to all interfaces, which is especially dangerous when a server is open to the public. Some suggestions:
    * Set `bind_address` to `127.0.0.1` so as to restrict access  to the local machine only
    * Use `requirepass` to secure Redis behind a password (preferably a long one)
    * Familiarise yourself with [Redis Security](http://redis.io/topics/security)
2. Use `iptables` to secure your server from unintended open ports. In Ubuntu, `ufw` provides a friendlier interface to working with `iptables`.
    * e.g. If your NodeBB is proxied, no ports should be open except 80 (and possibly 22, for SSH access)

About the oringinal nodeBB
**NodeBB Forum Software** is powered by Node.js and built on either a Redis or MongoDB database. It utilizes web sockets for instant interactions and real-time notifications. NodeBB is compatible down to IE8 and has many modern features out of the box such as social network integration and streaming discussions.

## License

NodeBB is licensed under the **GNU General Public License v3 (GPL-3)** (http://www.gnu.org/copyleft/gpl.html)
