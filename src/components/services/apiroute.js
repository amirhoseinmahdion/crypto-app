const BaseUrl = "https://api.coingecko.com/api/v3";
const ApiKey = "CG-cc88b1N3xBTqvBgxFWVN4Yu9";

const GetCoinList = (page, currency) => {
  return `${BaseUrl}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&sparkline=false&locale=en&x_cg_demo_api_key=${ApiKey}`;
};
const GetCoinSearch = (search) => {
  return `${BaseUrl}/search?query=${search}&sparkline=false&locale=en&x_cg_demo_api_key=${ApiKey}`;
};
const GetCoinById = (coin) => {
  return `${BaseUrl}/coins/${coin}/market_chart?vs_currency=usd&days=7`;
};
const MarkChart = (coin) => {
  return `${BaseUrl}/coins/${coin}/market_chart?vs_currency=usd&days=1`;
};
export { GetCoinList, GetCoinSearch, GetCoinById, MarkChart };
