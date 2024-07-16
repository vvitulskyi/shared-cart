# Shared Cart

## Basic:

1. Clone the project to your device.
2. Make sure you have the latest version of node.js installed.
3. Create account and new DB on [https://www.mongodb.com/](https://www.mongodb.com/)

## Start server:

1. From the project root, navigate to the `server` folder using the command `cd server`
2. Install the necessary packages using the command `npm install`.
3. Create a file named `.env` in the project and add the variables `PORT`, `MONGODB_URL`, `LINK_SECRET_KEY` and `SECRET_KEY` for storing authentication data.
   Example:

```
PORT=9999
MONGODB_URL=mongodb+srv://<userName>:<password>@sharedcart.pz4jdiu.mongodb.net/<NameDB>?retryWrites=true&w=majority&appName=sharedcart
SECRET_KEY=secret_key
LINK_SECRET_KEY=secret_key
```

4. Start server using the command `npm run start`

## Satrt client:

1. From the project root, navigate to the `client` folder using the command `cd client`
2. Install the necessary packages using the command `npm install`.
3. Start client using the command `npm run dev`

If you have any problems with starting the project, please contact me at v.vitulskyi@gmail.com
