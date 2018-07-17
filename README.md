# Garden Manager

Node.js/MongoDB app for managing garden and gardeners information, with multiple beds.

LIVE DEMO: [https://garden.codyi.mobi](https://garden.codyi.mobi "Demo")

LIVE ADMIN DASHBOARD: [https://garden.codyi.mobi/admin/dashboard](https://garden.codyi.mobi/admin/dashboard "Admin")

Testing credentials for admin demo:
```
Username: cody
Password: 1234567890
```
![Screenshot](https://i.imgur.com/21Ttq5k.png "Screenshot")
![Screenshot](https://i.imgur.com/HCDOffM.png "Screenshot")
![Screenshot](https://i.imgur.com/jozrKpG.png "Screenshot")
![Screenshot](https://i.imgur.com/KLNLRyo.png "Screenshot")

## Getting Started

Clone repository, npm install, set admin password and populate database (through CLI or using Robo3T). Optional: add image of garden and map beds to endpoints.

### Prerequisites

NPM

```
NPM
```

### Installing

Clone or copy repository to server

```
git clone https://github.com/codyirving/gardenmanager.git
```

Run npm install to install dependencies.
```
npm install
```

Run mongod 
```
mongod
```

Run npm start to start application.
```
npm start
```

## Running the tests

```
npm test
```
### Break down into end to end tests

Endpoints tested using mocha/chai 

## Deployment

If deploying site publicly it is recommended to use a certificate to enable https.
Demo deployed with https://letsencrypt.org/ CA.

## Built With

* [Node](node.js)
* [Mongo](mongodb) 
* [Express](express)
* [jQuery](jQuery) 

## Authors

* **Cody Irving** - *Initial work* - [codyirving](https://github.com/codyirving)

See also the list of [contributors](https://github.com/codyirving/gardenmanager/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
