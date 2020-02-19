# TodoList

This todolist powered by React and Koajs with TypeScript.

## Development

### server

- Install dependencies

```shell
yarn install
```

- Start development server

You can edit `server/ormconfig.json` if necessary.

```shell
yarn start
```

The server will run on `http://127.0.0.1:9000`.

- Build

Compile the `server/src` folder to `server/dist` folder

```shell
yarn build
```

### client

- Install dependencies

```shell
yarn install
```

- Start

```shell
yarn start
```

The client will run on `http://127.0.0.1:3000`

- Build

```shell
yarn build
```

## Deployment

Copy the `client/build` folder to `server` folder, then in `server` folder

```shell
yarn build
yarn serve
```

The app will run on `http://127.0.0.1:9000`
