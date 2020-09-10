
const ONLINEHOST = "http://***.***.***.***:8000", LOGINHOST = "http://***.***.***.***:8001", HOUSEONLINEHOST = "http://***.***.***.***:8002", INTERFACES = {}, SINGLOGIN = {}, HOUSEINTERFACES = {};
const APILIST = {

  homeSlideshow: "/index/getIndexData",          //首页轮播图
  newsList: "/index/getNewList",            //首页新闻
}

const HANDLEAPI = function () {
  screen
  let api = {};
  for (let k in APILIST) { api[k] = ONLINEHOST + APILIST[k]; }
  return api;
}

const LOGINAPI = function () {
  screen
  let api = {};
  for (let k in APILIST) { api[k] = LOGINHOST + APILIST[k]; }
  return api;
}

const HOUSEHANDLEAPI = function () {
  screen
  let api = {};
  for (let k in APILIST) { api[k] = HOUSEONLINEHOST + APILIST[k]; }
  return api;
}

module.exports = {
  INTERFACES: HANDLEAPI(),
  SINGLOGIN: LOGINAPI(),
  HOUSEINTERFACES: HOUSEHANDLEAPI()
}