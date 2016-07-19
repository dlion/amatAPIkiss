# Amat API Kiss

### I made this just for fun, don't use it in production

## Install

```sh
git clone https://github.com/dlion/amatAPIkiss
cd amatAPIkiss
npm install
```

## Convert databases

```sh
cd db
unzip amat_feed_gtfs_v8.zip
node convert.js
```

## Run

```
node index.js
```

The sever will be started on `127.0.0.1:3000`

## Peculiarity

Just for fun I chose to use [lowdb](https://github.com/typicode/lowdb) so I don't use any type of Dbs, the json files in the db directory are enough. (I repeat, I made this just for fun)

So if you want to update your db or add a new routes you can do it adding a json file in the `db` directory.

The routes names are the name of the dbs present on the `db` directory so for example, if you have a `stocazzo.txt.json` file you will have a route called `/stocazzo`.

## Finder
Now you can find values using a key/value parameter; do you want to find shape_id "1010" in the shapes dataset ?   
You can:
```sh
curl 127.0.0.1:3000/shapes/shape_id/1010
```


## Example

Do you want to find stops that has wheelchair on board ?

```sh
curl 127.0.0.1:3000/stops/wheelchair_boarding/1
```

## Author

[Domenico Luciani](https://domenicoluciani.com)

## License
MIT
