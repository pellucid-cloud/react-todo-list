const cache = new Map();

export function fetchData(url) {
  if (!cache.has(url)) {
    cache.set(url, getData(url));
  }
  return cache.get(url);
}

async function getData(url) {
  if (url === '/getUser') {
    return await getUser();
  } else {
    throw Error('Not implemented');
  }
}

async function getUser() {
  await new Promise(resolve => {
    setTimeout(resolve, 3000);
  });

  return 'user';
}
