const mysql = require('mysql');
let conn = mysql.createConnection({ // 创建数据库连接 ES6 let	
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'music_web',
});
conn.connect();

function login(req, callback) { // 管理员登陆方法	
	let sql = "SELECT id, admin_account FROM admin WHERE admin_account = ? AND admin_password = ?"; // 根据管理员用户名和密码获取id和用户名
	conn.query(sql, [req.body["admin_account"], req.body["admin_password"]], function(error, result) { // 参数分别为SQL语句、查询参数（管理员用户名、密码）、回调函数（返回数据集）		
		if (result[0] == null || result[0] == "") { // 若返回数据集为空，返回操作错误信息			
			callback(undefined); // 执行回调函数		}else{			
			callback(result); // 执行回调函数 返回数据集		
		}
	})
};

exports.login = login; // 定义管理员登陆方法

