async function fetchFunction() {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await request.json();
  delete data.USDT;
  return data;
}

export default fetchFunction;
