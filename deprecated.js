/**
 * Created by Indyk on 30.05.14.
 */
var G = {

	ctx: null,
	scale: null,


	init: function (ctx, scale) {
		G.ctx = ctx;
		G.scale = scale;

		G.ctx.scale(G.scale, G.scale);

		P.init(0, 28);
		W.init();

		setTimeout(G.update, 1000 / 60);
		requestAnimationFrame(G.draw);
	},

	draw: function () {
		G.ctx.clearRect(0, 0, 32, 32);

		W.draw(G.ctx);
		P.draw(G.ctx);
		G.ctx.fillText(P.MEM_MOVED, 0, 10);
		requestAnimationFrame(G.draw);
	},

	update: function () {
		W.update();
		P.update();
		setTimeout(G.update, 1000 / 60);
	},


	reset: function () {

	}
};

var W = {

	gaps: [],

	init: function () {

		for (var i = 0; i <= 32; i++) {
			var rand = Math.floor((Math.random() * 10) + 1);
			if (i == 0) {
				W.gaps.push(0);
			} else {
				if (rand > 5) {
					W.gaps.push(1);
				} else {
					W.gaps.push(0);
				}
			}
		}

		/*
		 console.log(W.gaps);
		 G.ctx.fillStyle = 'lightblue';
		 for (var i = 0; i<= W.gaps.length; i++) {
		 console.log(W.gaps[i] != 0);
		 if (W.gaps[i] != 0) {

		 G.ctx.fillRect(i, 29, 1,1);
		 }
		 }
		 */
	},

	update: function () {
		if (P.MEM_LAST_MOVE != 0) {
			console.log("moved");
			for (var i = 0; i <= P.MEM_LAST_MOVE; i++) {
				var rand = Math.floor((Math.random() * 10) + 1);
				if (rand > 5) {
					W.gaps.push(1);
				} else {
					W.gaps.push(0);
				}
			}

			P.MEM_LAST_MOVE = 0;
			console.log(W.gaps.length);
		}
	},

	draw: function (ctx) {
		ctx.fillStyle = 'lightblue';
		ctx.fillRect(0, 0, 32, 32);
		ctx.fillStyle = 'green';
		ctx.fillRect(0, 29, 32, 3);

		ctx.fillStyle = 'lightblue';

		for (var i = P.MEM_MOVED; i <= W.gaps.length; i++) {
			console.log(i);
			//console.log(W.gaps[i]);
			if (W.gaps[i] != 0) {
				ctx.fillRect(i, 29, 1, 1);
			}
		}

	}
};

var P = {

	x: null,
	y: null,
	h: 1,
	w: 1,
	MEM_MOVED: 0,
	MEM_LAST_MOVE: 0,

	init: function (x, y) {
		P.x = x;
		P.y = y;

		$(window).keydown(P.input);
	},

	update: function () {
	},

	draw: function (ctx) {
		//console.log('p.draw');
		ctx.fillStyle = 'black';
		ctx.fillRect(P.x, P.y, P.w, P.h);
	},

	input: function (e) {
		//console.log(e.which);

		var move = 0;
		switch (e.which) {
			case 49:
				move = 1;
				break;
			case 50:
				move = 2;
				break;
			case 51:
				move = 3;
				break;
		}

		P.move(move);
	},

	move: function (val) {
		P.x += val;
		P.MEM_MOVED += val;
		P.MEM_LAST_MOVE = val;

		console.log(P.MEM_LAST_MOVE, 'P.MEM_LAST_MOVE');
	}
};
