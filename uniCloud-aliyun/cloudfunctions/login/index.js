'use strict';
exports.main = async (event, context) => {
	//1.判断是否存在账号和密码匹配
	//2.成功返回用户数据
	//3.失败提示错误
	const { zh,mm,type } = event;
	var db = uniCloud.database();
	let res = await db.collection('user').where({zh,mm,type}).get();
	return res.affectedDocs>=1 ? {statue:'success',msg:'登录成功',data:res.data} : {statue:'fail',msg:'账号密码错误'}
};
