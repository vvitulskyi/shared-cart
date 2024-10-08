# Shared Cart

Demo link: [http://ec2-13-48-147-66.eu-north-1.compute.amazonaws.com/](http://ec2-13-48-147-66.eu-north-1.compute.amazonaws.com/)

## Basic:

1. Clone the project to your device.
2. Make sure you have the latest version of node.js installed.
3. Create account and new DB on [https://www.mongodb.com/](https://www.mongodb.com/)

## Starting localhost:

1. Install the necessary packages using the command `npm install`.
2. Install in a global `pm2` dependency using command `npm install pm2 -g`
3. Create a file named `.env` in the project and add the variables `PORT`, `MONGODB_URL`, `LINK_SECRET_KEY` and `SECRET_KEY` for storing authentication data.
   Example:

```
PORT=8080
MONGODB_URL=mongodb+srv://<userName>:<password>@sharedcart.pz4jdiu.mongodb.net/<NameDB>?retryWrites=true&w=majority&appName=sharedcart
SECRET_KEY=secret_key
LINK_SECRET_KEY=secret_key
```

4. From the project root, navigate to the `client` folder using the command `cd client`
5. Install the necessary packages using the command `npm install`.
6. Start the localhost using the command `npm run start` from the project root
7. Use command `npm run drop:server` for stop server

If you have any problems with starting the project, please contact me at v.vitulskyi@gmail.com
