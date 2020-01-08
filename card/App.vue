<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.display_column {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.display_row {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.red {
		color: red;
	}
	
	.ccc {
		color: #999999;
	}
	
	.bule {
		color: #4D95E5;
	}
	
	.black {
		color: #555555;
	}
	
	.btn {
		font-size: 36upx;
		overflow: hidden;
		color: #fff;
		box-shadow: 2upx 6upx 10upx rgba(255,92,56,.25);
		white-space: nowrap;
		vertical-align: middle;
		cursor: pointer;
		border-radius: 60upx;
	}
</style>
