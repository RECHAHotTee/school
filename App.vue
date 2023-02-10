<script>
	export default {
		globalData: {
			userInfo: null,
			tabBar: ['/pages/index'],
			homePage: '/pages/index',
			pages: ['/pages/index', '/pages/login/login', '/pages/study/study', '/pages/profile/profile', '/pages/relax/relax', '/pages/manage/manage'],
			userData: {}
		}
	};
</script>
<style lang="scss">
	@import 'common/custom-ui/iconfont.scss';
	@import 'common/custom-ui/index.scss';

	@import './uni_modules/diy-uview-ui/index.scss';
	@import 'common/custom-ui/uview.scss';
</style>
