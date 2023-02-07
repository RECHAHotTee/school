'use strict';
exports.main = async (event, context) => {
	//1.头像，姓名，性别，院系，专业，学号
	const { id,headImg,name,sex,department,major,stuNumber } = event;
	//2.获取用户头像，判断是否更新
	//2.根据用户id，更新上面信息
	var db = uniCloud.database();
	return await db.collection('user').doc(id).update({headImg,name,sex,department,major,stuNumber})
};
