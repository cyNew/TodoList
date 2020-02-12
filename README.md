# TodoList

This todolist powered by React and Koajs with TypeScript.

## Development

### server

- Install dependencies

```shell
yarn install
```

- start development server

You can edit `server/ormconfig.json` if necessary.

```shell
yarn start
```

The server will running on `http://127.0.0.1:9000`.

- build

Compile the `server/src` folder to `server/dist` folder

```shell
yarn build
```

### client

- Install dependencies

```shell
yarn install
```

- start

```shell
yarn start
```

The client will running on `http://127.0.0.1:3000`

- build

```shell
yarn build
```

## Deployment

Copy the `client/build` folder to `server/` folder, then

```shell
yarn serve
```
