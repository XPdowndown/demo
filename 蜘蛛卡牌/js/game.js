//js/game.js
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
	//...(Spread，Rest)
	let hs = [...htmls, ...htmls];
	$('#gc').append(hs.join(''));

	//初始化游戏界面
	//获取到页面中所有class="card"的元素，并且转换成dom数组

	let cards = Array.from($('.card'));
	console.log(cards);
	console.log($('.card'));

	const game = new MixOrMatch(10, cards);
	//给页面中所有的class="overlay-text"的元素
	$('.overlay-text').click(function () {
		//移除掉当前div的visible样式类
		$(this).removeClass('visible');
		game.startGame();
	});
	//给页面中所有的class="card"的div绑定点击事件
	$(".card").click(function () {
		//进行翻牌的操作
		game.flipCard(this);
	});
});
//音效控制类
class AudioController {
	constructor() {
		//游戏背景音乐
		this.bgMusic = new Audio('sound/creepy.mp3');
		this.bgMusic.volume = 0.5;
		//设置背景音乐循环播放
		this.bgMusic.loop = true;
		//翻牌的音效
		this.flipSound = new Audio('sound/flip.wav');
		//当两张牌匹配成功的声音
		this.matchSound = new Audio('sound/match.wav');
		//游戏胜利的音乐
		this.victorySound = new Audio('sound/victory.wav');
		//游戏失败的音乐
		this.gameOverSound = new Audio('sound/10.wav');
	}
	//游戏开始时播放音乐的方法
	startMusic() {
		//播放背景音乐
		this.bgMusic.play();
		//如果游戏失败的音乐正在播放的话
		if (this.gameOverSound.play) {
			//暂停游戏失败的音乐
			this.gameOverSound.pause();
			//重置游戏失败的音乐
			this.gameOverSound.currentTime = 0;
		}
	}
	//游戏结束时播放音乐的方法
	stopMusic() {
		//暂停游戏背景音乐
		this.bgMusic.pause();
		//重置游戏背景音乐
		this.bgMusic.currentTime = 0;
	}
	//翻牌时的音效
	flip() {
		this.flipSound.play();
	}
	//两张牌匹配时的音效
	match() {
		this.matchSound.play();
	}
	//游戏胜利时的音效
	victory() {
		//停止背景音乐
		this.stopMusic();
		this.victorySound.play();
	}
	//游戏失败的音乐
	gameOver() {
		//停止背景音乐
		this.stopMusic();
		this.gameOverSound.play();
	}
}
//游戏核心翻牌判定
class MixOrMatch {
	//totalTime:倒计时的秒数
	//cards:卡片数组（16张卡片全部在这个数组中）
	constructor(totalTime, cards) {
		//将倒计时间和卡片数组添加到当前的对象中
		this.cardsArray = cards;
		this.totalTime = totalTime;
		//倒计时剩余的时间
		this.timeRemaining = totalTime;
		//获取页面中id为time-remaining的元素并且 保存到对象的timer属性中
		this.timer = $('#time-remaining');
		//已经匹配成功的牌的数量
		this.ticker = $('#flips');
		//创建一个音效控制对象
		this.audioController = new AudioController();
	}

	startGame() {
		//点击次数
		this.totalClicks = 0;
		//恢复倒计时为默认时间
		this.timeRemaining = this.totalTime;
		//需要匹配的翻开的第一张卡片
		this.cardToCheck = null;
		//已经匹配成功的卡片
		this.matchedCards = [];
		//用来控制同一时间只能翻两张牌的变量
		this.busy = true;
		//游戏开始500毫秒以后执行
		setTimeout(() => {
			//播放背景音乐
			this.audioController.startMusic();
			//打乱卡片的顺序
			this.shuffleCards(this.cardsArray);
			//控制计时器的时间慢慢减少
			this.countDown = this.startCountdown();
			//只有当busy=false时候才能将牌翻开
			this.busy = false;
		}, 500);
		//初始化游戏
		//将所有的卡片翻回去
		this.cardsArray.forEach(card => {
			//移除掉所有卡片的visible和matched样式类
			$(card).removeClass('visible').removeClass('matched');
		});
		//重置倒计时和点击次数
		this.timer.html(this.timeRemaining);
		this.ticker.html(this.totalClicks);
	}
	//定义一个打乱卡片顺序的方法
	shuffleCards(cards) {
		//对数组进行遍历，下标从cards.length - 1开始
		for (let i = cards.length - 1; i > 0; i--) {
			//随机产生一个0到16之间的索引
			let randIndex = Math.floor(Math.random() * (i + 1));
			//将下标为i的元素和下标为randIndex的元素交换位置
			[cards[i], cards[randIndex]] = [cards[randIndex], cards[i]];
		}
		//对每张卡片做一个标记，设置每张卡片的order属性，按照order的大小顺次排列
		cards = cards.map((card, index) => {
			$(card).css('order', index);
		});
	}
	//定义一个计时的方法
	startCountdown() {
		//每隔1秒钟，剩余时间减少1秒
		return setInterval(() => {
			this.timeRemaining--;
			//将id为time-remaining的元素的内部的数字刷新
			this.timer.html(this.timeRemaining);
			//当this.timeRemaining=0时，倒计时结束，那么游戏结束
			if (this.timeRemaining === 0) {
				//停止当前的interval
				clearInterval(this.countDown);
				//播放游戏失败的音乐
				this.audioController.gameOver();
				//弹出游戏失败的提示框
				$('#gameOverText').addClass('visible');
			}
		}, 1000);
	}
	//翻牌逻辑
	//card就是点中的class="card"的div
	flipCard(card) {
		//判断是否能够翻开这张卡片
		if (this.canFlipCard(card)) {
			//播放翻牌的音效
			this.audioController.flip();
			//计算翻牌的次数
			this.totalClicks++;
			this.ticker.html(this.totalClicks);
			//将这张牌翻过来（给div添加visible样式类）
			$(card).addClass('visible');
			//判断是否匹配
			if (this.cardToCheck) {//表示翻开了第二张牌
				//用当前点击这张卡片card跟this.cardToCheck进行匹配
				this.checkForCardMatch(card);
			} else {//表示翻开了第一张牌
				this.cardToCheck = card;
			}
		}
	}
	//判断牌是否能翻开的方法
	//card就是点中的class="card"的div
	canFlipCard(card) {
		//! this.busy表示只有当busy为false时才能够翻开这张牌
		//card !== this.cardToCheck表示不能够重复的翻开同一张牌
		//! this.matchedCards.include(card)表示不能够再去翻已经匹配成功的卡片
		return !this.busy && card !== this.cardToCheck
			&& !this.matchedCards.includes(card);
	}
	//判断两张卡片是否匹配
	//card就是点中的class="card"的div
	checkForCardMatch(card) {
		//获取card中class="card-value"的img标签的src属性
		let s1 = $(card).find('img.card-value').attr('src');
		//获取前面那张卡片的src属性
		let s2 = $(this.cardToCheck).find('img.card-value').attr('src');
		if (s1 === s2) {//匹配成功
			this.cardMatch(card, this.cardToCheck);
		} else {//匹配失败
			this.cardMismatch(card, this.cardToCheck);
		}
		//匹配结束后，将this.cardToCheck设置为空
		this.cardToCheck = null;
	}
	//匹配失败后运行的代码
	cardMismatch(c1, c2) {
		//当setTimeout函数中的代码执行完毕以后，才可以翻开卡片
		this.busy = true;
		//等待1秒钟后将两张牌都返回去
		setTimeout(() => {
			//移除c1和c2的visible样式类
			$(c1).removeClass('visible');
			$(c2).removeClass('visible');
			//只有当两张不匹配的卡片还原的时候，才允许继续翻其他的牌
			this.busy = false;
		}, 1000);
	}
	//匹配成功后运行的代码
	cardMatch(c1, c2) {
		//将匹配成功的卡片都放到this.matchedCards数组中
		this.matchedCards.push(c1);
		this.matchedCards.push(c2);
		//给匹配成功的卡片添加dance动画效果
		$(c1).addClass('matched');
		$(c2).addClass('matched');
		//播放匹配成功的音效
		this.audioController.match();
		//判断所有的卡片是否都已经匹配完成
		if (this.cardsArray.length === this.matchedCards.length) {
			//播放游戏胜利的音效
			this.audioController.victory();
			//停止倒计时
			clearInterval(this.countDown);
			//弹出游戏胜利的提示框
			$('#victoryText').addClass('visible');
		}
	}
}
