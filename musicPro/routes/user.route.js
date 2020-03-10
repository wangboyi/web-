let express = require("express"); // 加载express模块 ES6 let
let router = express.Router(); // 实例化路由处理程序 ES6 let
let user = require("../module/user.module.js");

let jsonWrite = function(res, ret, add) { // ES6 let
	if (typeof ret === "undefined") { // 判断数据是否存在
		res.json({ // 返回数据
			state: "500", // 状态码			
			msg: "操作失败", // 提示消息		
		});
	} else {
		res.json({ // 返回数据			
			state: "200", // 状态码			
			msg: "操作成功", // 提示消息			
			data: ret,
			extra: add
		});
	}
};

router.post("/user/register",(req, res) => { 
	user.register(req, function(data, add){
		jsonWrite(res, data, add); 
	})
});

router.post("/user/login",(req, res) => { 
	user.login(req, function(data, add){
		jsonWrite(res, data, add); 
	})
});

module.exports = router;
