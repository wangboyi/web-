const mysql = require('mysql');
let conn = mysql.createConnection({ // 创建数据库连接 ES6 let	
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'music_web',
});
conn.connect();

let crypto = require("crypto"); // 加载crypto原生模块

// 获得token MD5
let getToken = function(id){
	let md5 = crypto.createHash('md5'); // 创建MD5加密算法
	md5.update(id); // 传入初始值
	return md5.digest('hex'); // 返回加密值
}

exports.getToken = getToken; // 定义获得token方法

function register(req, callback) { // 用户注册方法
	let sql = "SELECT id FROM user WHERE user_account = ?"; // 查询用户名是否已经存在
	conn.query(sql, [req.body["user_account"]], function(error, result) { // 参数分别为SQL语句、查询参数（用户用户名、密码）、回调函数（返回数据集）		
		if (result[0] == null || result[0] == "") { // 若返回数据集为空，返回操作错误信息			
			let sql = "INSERT INTO user(user_account, user_password, email) VALUES(?, ?, ?);"; // 插入注册用户数据
			conn.query(sql, [req.body["user_account"], req.body["user_password"],req.body["email"]], function(error, result) { // 参数分别为SQL语句、查询参数（用户用户名、密码）、回调函数（返回数据集）		
				if (error) { // 插入操作失败			
					callback(undefined); // 执行回调函数		
				}else{			// 插入操作成功		
					callback(result); // 执行回调函数 	
				}
			})		
		}else{			
			callback(undefined); // 执行回调函数	
		}
	})
	
};

function login(req, callback) { // 用户登陆方法	
	let sql = "SELECT id, user_account FROM user WHERE user_account = ? AND user_password = ?"; // 根据用户用户名和密码获取id和用户名
	conn.query(sql, [req.body["user_account"], req.body["user_password"]], function(error, result) { // 参数分别为SQL语句、查询参数（用户用户名、密码）、回调函数（返回数据集）		
		console.log(result);
		if (result[0] == null || result[0] == "") { // 若返回数据集为空，返回操作错误信息			
			callback(undefined); // 执行回调函数		
		}else{			
			// 登录成功，设置 session
			let token = md5.getToken(result[0].id.toString()); // 获取token
			req.session.userToken = result[0].id.toString(); // 保存信息到session
			callback(result, {"token":token}); // 执行回调函数 返回数据集、token	
		}
	})
};
exports.register = register; // 定义用户注册方法
exports.login = login; // 定义用户登陆方法

