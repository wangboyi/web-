const express = require("express");
const app = express();
//app.get('/',(req,res)=>res.send('hello!'));
const bodyParser = require("body-parser");
const admin = require("./routes/admin.route.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use("/admins", admin);
app.use(express.static('views'));

let print = function(req, res, next) { // ES6 let	
	console.log("请求路径:" + req.path); // 每次请求输出请求路径	
	if (req.method == "GET") {
		console.log("请求数据:" + JSON.stringify(req.query)); // 把JSON数据转成字符串，每次请求，输出GET请求数据	
	} else {
		console.log("请求数据:" + JSON.stringify(req.body)); // 每次请求，输出非GET请求数据	
	}
	console.log("请求类型:" + req.method); // 每次请求，输出请求类型	
	console.log("当前时间:" + new Date()); // 每次请求，输出当前时间	
	console.log("----------分割线----------");
	next(); // 执行下一个中间件
}
app.use(print); // 加载自定义中间件

app.listen(3000);

console.log("express success listen at port 3000");
