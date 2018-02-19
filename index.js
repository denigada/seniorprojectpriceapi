var bittrex = require('node-bittrex-api');
const binance = require('node-binance-api');
var moment = require('moment');
var express = require('express');
var http = require('http');
var admin = require("firebase-admin");
var app = express();

var serviceAccount = require("./serviceAccountKey.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tickerapi-f1456.firebaseio.com"
});

var data = [];

binance.websockets.chart("BTCUSDT", "1m", (symbol, interval, chart) => {
    let tick = binance.last(chart);
    const last = chart[tick].close;
    //console.log(chart);
    // Optionally convert 'chart' object to array:
    // let ohlc = binance.ohlc(chart);
    // console.log(symbol, ohlc);
    let date = moment();
    let newPriceData = {
        market: symbol,
        date: date,
        price: last
    };
    console.log(newPriceData.market + "'s price is " + newPriceData.price + " on " + newPriceData.date.format('MMMM Do YYYY, h:mm:ss a'));
});








// ISSUES WE NEED TO TAKE CARE OF:
    // -libraries might be taking memory and slowing down the process
    // because they were designed to do more things


    // when we are not able to get data, save it in some way that the machine learning algorithm on the
    // trading software will not include that part when predicting the market
