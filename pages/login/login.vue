<template>
	<view class="container">
		<image src="../../static/logo.png" class="logo" />
		<form>
			<input type="text" v-model="username" placeholder="Username" />
			<input type="password" v-model="password" placeholder="Password" />
			<radio-group v-model="role">
				<label>
					<radio value="student">Student</radio>
				</label>
				<label>
					<radio value="admin">Admin</radio>
				</label>
			</radio-group>
			<button type="submit" @click="submitForm">Login</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				role: 'student'
			}
		},
		methods: {
			submitForm() {
				// Submit form data to server
				uni.navigateTo({
					url: '/pages/index/index'
				})
				console.log(111);
			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	.logo {
		width: 120px;
		height: 120px;
		margin-bottom: 20px;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
		background-color: white;
		border-radius: 10px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	input {
		width: 100%;
		height: 40px;
		padding: 10px;
		margin-bottom: 20px;
		border: 1px solid #ddd;
		border-radius: 5px;
		font-size: 14px;
	}

	button[type="submit"] {
		width: 100%;
		height: 40px;
		padding: 10px;
		background-color: blue;
		color: white;
		border-radius: 5px;
		font-size: 14px;
		cursor: pointer;
	}
</style>
