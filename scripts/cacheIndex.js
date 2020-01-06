"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var axios_1 = require("axios");
axios_1["default"].defaults.baseURL = 'https://oxfordunichess.github.io/oucc-backend/';
function getIndex() {
    return axios_1["default"]({
        url: 'index.json',
        params: {
            sessionID: Math.random().toString(16).slice(2)
        }
    })
        .then(function (res) { return res.data; })["catch"](function (e) {
        console.error(e);
        return {};
    });
}
getIndex()
    .then(function (index) { return fs.writeFileSync(path.join('src', 'assets', 'index.json'), JSON.stringify(index, null, 4)); });
