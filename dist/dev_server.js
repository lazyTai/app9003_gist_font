var http = require('http');
var express = require('express')
var app = express();
var path = require("path")
var fs = require("fs")
var history = require('connect-history-api-fallback');


/*开代理 解决跨域问题*/
// 代理插件
var proxy = require('http-proxy-middleware');
var cors = require('cors')
app.use(cors())
// 设置代理
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



/*build*/
app.use('/api', proxy({
    target: 'http://www.liumingtai.com:9002',
    changeOrigin: true
}));

/* 设置静态目录 */
app.use(express.static('./'));

const router = express.Router()
const indexRoute = router.get('/', (req, res, next) => {
    res.status(200).render("index")
})
var ejs = require('ejs');
app.set('views', path.join(__dirname, './'))
app.set('view engine', 'html')
app.engine('html', ejs.__express)

app.use(history({
    index: '/index.html',
    rewrites: [
        {from: /^\/[\s\S]/, to: '/'}
    ],
    verbose: true
}))
app.get('/', indexRoute)

console.log("界面在 localhost:" + 9003)
http.createServer(app).listen(9003);