$(function () {
	//在页面中添加十六张卡牌
	const imgArr = ['Bat.png', 'Bones.png', 'Cauldron.png',
		'Dracula.png', 'Eye.png', 'Ghost.png',
		'Pumpkin.png', 'Skull.png'];
	let htmls = imgArr.map(img =>
		`<div class="card">
	        <div class="card-back card-face">
		        <img class="cob-web cob-web-top-left" src="img/Cobweb.png">
		        <img class="cob-web cob-web-top-right" src="img/Cobweb.png">
		        <img class="cob-web cob-web-bottom-left" src="img/Cobweb.png">
		        <img class="cob-web cob-web-bottom-right" src="img/Cobweb.png">
		        <img class="spider" src="img/Spider.png">
	        </div>
	        <div class="card-front card-face">
		        <img class="cob-web cob-web-top-left" src="img/CobwebGrey.png">
		        <img class="cob-web cob-web-top-right" src="img/CobwebGrey.png">
		        <img class="cob-web cob-web-bottom-left" src="img/CobwebGrey.png">
		        <img class="cob-web cob-web-bottom-right" src="img/CobwebGrey.png">
		        <img class="card-value" src="img/${img}">
	        </div>
	    </div>`);
	let hs = [...htmls, ...htmls];
	// 动态渲染数据，将其追加到id为gc的div中
	$('#gc').append(hs.join(''))
	//初始化游戏界面
	//获取到页面中所有class="card"的元素，并且转换成dom数组
	let cards = Array.from($('.card'))
	let game = new MixOrMatch(100, cards)



	//给开始 结束游戏 绑定点击事件，点击之后，移除掉visible类
	$('.overlay-text').on('click', function () {
		$(this).removeClass('visible')
		game.startGame()
	})

})
class MixOrMatch {
	//totalTime:倒计时的秒数
	//cards:卡片数组（16张卡片全部在这个数组中）
	constructor(totalTime, cards) {
		//将倒计时间和卡片数组添加到当前的对象中
		this.totalTime = totalTime;
		this.cardsArray = cards;
		//倒计时剩余的时间
		this.timeRemaining = totalTime;
		//获取页面中id为time-remaining的元素并且 保存到对象的timer属性中
		this.timer = $('#timer-remaining');
		//已经匹配成功的牌的数量
		this.ticker = $('#flips');
	}
	startGame() {
		//点击次数
		this.totalClicks = 0;
		//恢复倒计时为默认时间
		this.timeRemaining = this.totalTime;
		//需要匹配的翻开的第一张卡片
		this.cardToCheck = null;
		//已经匹配成功的卡片
		this.machedCards = [];
		//用来控制同一时间只能翻两张牌的变量
		this.busy = true;
		//游戏开始500毫秒以后执行
		setTimeout(() => {
			// 打乱卡牌的顺序
			this.shuffleCards(this.cardsArray);
			//控制计时器的时间慢慢减少
			this.countDown = this.startCountDown();

		}, 500);


	}
	//定义一个打乱卡片顺序的方法
	shuffleCards(cards) {
		for (let i = cards.length - 1; i >= 0; i--) {
			// 生成一个0-15的随机数
			let randIndex = Math.floor(Math.random() * (i + 1));
			// 交换两张卡牌的顺序
			[cards[i], cards[randIndex]] = [cards[randIndex], cards[i]];
		}
		//对每张卡片做一个标记，设置每张卡片的order属性，按照order的大小顺次排列
		cards.map((card, index) => {
			$(card).attr('order', index);
		})

	}
	startCountDown(){
		
	}
}