'use strict';
exports.main = async (event, context) => {
	//1.判断是否重复
	const { zh, mm } = event;
	var db = uniCloud.database();
	let res = await db.collection('user').where({zh}).get();
	//2.重复报错
	if (res.affectedDocs>=1) return {msg:'账号重复',statue:'fail'};
	//3.不重复插入数据库
	const userId = await db.collection('user').add({zh,mm});
	return {msg:'注册成功',statue:'success',data:userId};
};
