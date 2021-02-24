import JsonFetcher from './JsonFetcher'

const jsonFetcher = new JsonFetcher('./src/data/data.json');

const data = await jsonFetcher.fetchData();

console.log(data);

