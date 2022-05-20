const TABLE_SIZE = 640;
const TABLE_BACKGROUND_COLOR= "#090";
const TABLE_LINE_COLOR = "#000";
const TABLE_BLACK_COLOR = "#000";
const TABLE_WHITE_COLOR = "#EEE";
const EMPTY = 0;
const BLACK = 1;
const WHITE = 2;

let canvas;
let header;
let ctx;
let table;
let next;
let canPutIndexes;


function drawTable(table){
	let i,j,x,y;
	
	//背景を描画する
	ctx.fillStyle = TABLE_BACKGROUND_COLOR;
	ctx.fillRect(0,0,TABLE_SIZE,TABLE_SIZE);
	//枠を描画する
	ctx.strokeStyle = TABLE_LINE_COLOR;
	for(i = 0;i < 7;i++){
		x = TABLE_SIZE/8.0*(i+1);
		//縦線
		ctx.beginPath();
		ctx.moveTo(x,0);
		ctx.lineTo(x,TABLE_SIZE);
		ctx.stroke();
		//横線
		ctx.beginPath();
		ctx.moveTo(0,x);
		ctx.lineTo(TABLE_SIZE,x);
		ctx.stroke();
	}
	//コマを描画する
	for(i = 0;i < 8;i++){
		y = TABLE_SIZE/8.0*(i+0.5);
		for(j = 0;j < 8;j++){
			x = TABLE_SIZE/8.0*(j+0.5);
			if(table[i*8+j] != EMPTY){
				//見た目を立体的にするために、下の色を描画する
				if(table[i*8+j] == BLACK){
					ctx.fillStyle = TABLE_WHITE_COLOR;
				}else if(table[i*8+j] == WHITE){
					ctx.fillStyle = TABLE_BLACK_COLOR;
				}
				ctx.beginPath();
				ctx.arc(x,y+2,TABLE_SIZE/20.0,TABLE_SIZE/20.0,0,2*Math.PI,false);
				ctx.closePath();
				ctx.fill();
				//上の色を描画する
				if(table[i*8+j] == BLACK){
					ctx.fillStyle = TABLE_BLACK_COLOR;
				}else if(table[i*8+j] == WHITE){
					ctx.fillStyle = TABLE_WHITE_COLOR;
				}
				ctx.beginPath();
				ctx.arc(x,y,TABLE_SIZE/20.0,TABLE_SIZE/20.0,0,2*Math.PI,false);
				ctx.closePath();
				ctx.fill();
			}
		}
	}
}


function xy2index(x,y){
	return y*8+x;
}


function getCanPutIndexes(table,color){
	let i,j,k,x,y,tmpPoints,points;
	let enemyColor = color%2+1;
	let canPutIndexes = [];

	//空いている場所に置いたときのポイントを計算する
	for(i = 0;i < 8;i++){
		for(j = 0;j < 8;j++){
			points = [];
			if(table[xy2index(j,i)]==EMPTY){ //空いている場所で
				//左上方向
				tmpPoints = [];
				for(k = 1;k < 8;k++){
					x = j-k;
					y = i-k;
					if(0 <= x && x < 8 && 0 <= y && y < 8){
						if(table[xy2index(x,y)] == color){
							if(tmpPoints != 0){
								points = points.concat(tmpPoints);
							}
							break;
						}else if(table[xy2index(x,y)]==enemyColor){
							tmpPoints.push(xy2index(x,y));
						}else if(table[xy2index(x,y)] == EMPTY){
							break;
						}
					}
				}
				//上方向
				tmpPoints = [];
				for(k = 1;k < 8;k++){
					x = j;
					y = i-k;
					if(0 <= x && x < 8 && 0 <= y && y < 8){
						if(table[xy2index(x,y)] == color){
							if(tmpPoints != 0){
								points = points.concat(tmpPoints);
							}
							break;
						}else if(table[xy2index(x,y)]==enemyColor){
							tmpPoints.push(xy2index(x,y));
						}else if(table[xy2index(x,y)] == EMPTY){
							break;
						}
					}
				}
				//右上方向
				tmpPoints = [];
				for(k = 1;k < 8;k++){
					x = j+k;
					y = i-k;
					if(0 <= x && x < 8 && 0 <= y && y < 8){
						if(table[xy2index(x,y)] == color){
							if(tmpPoints != 0){
								points = points.concat(tmpPoints);
							}
							break;
						}else if(table[xy2index(x,y)]==enemyColor){
							tmpPoints.push(xy2index(x,y));
						}else if(table[xy2index(x,y)] == EMPTY){
							break;
						}
					}
				}
				//右方向
				tmpPoints = [];
				for(k = 1;k < 8;k++){
					x = j+k;
					y = i;
					if(0 <= x && x < 8 && 0 <= y && y < 8){
						if(table[xy2index(x,y)] == color){
							if(tmpPoints != 0){
								points = points.concat(tmpPoints);
							}
							break;
						}else if(table[xy2index(x,y)]==enemyColor){
							tmpPoints.push(xy2index(x,y));
						}else if(table[xy2index(x,y)] == EMPTY){
							break;
						}
					}
				}
				//右下方向
				tmpPoints = [];
				for(k = 1;k < 8;k++){
					x = j+k;
					y = i+k;
					if(0 <= x && x < 8 && 0 <= y && y < 8){
						if(table[xy2index(x,y)] == color){
							if(tmpPoints != 0){
								points = points.concat(tmpPoints);
							}
							break;
						}else if(table[xy2index(x,y)]==enemyColor){
							tmpPoints.push(xy2index(x,y));
						}else if(table[xy2index(x,y)] == EMPTY){
							break;
						}
					}
				}
				//下方向
				tmpPoints = [];
				for(k = 1;k < 8;k++){
					x = j;
					y = i+k;
					if(0 <= x && x < 8 && 0 <= y && y < 8){
						if(table[xy2index(x,y)] == color){
							if(tmpPoints != 0){
								points = points.concat(tmpPoints);
							}
							break;
						}else if(table[xy2index(x,y)]==enemyColor){
							tmpPoints.push(xy2index(x,y));
						}else if(table[xy2index(x,y)] == EMPTY){
							break;
						}
					}
				}
				//左下方向
				tmpPoints = [];
				for(k = 1;k < 8;k++){
					x = j-k;
					y = i+k;
					if(0 <= x && x < 8 && 0 <= y && y < 8){
						if(table[xy2index(x,y)] == color){
							if(tmpPoints != 0){
								points = points.concat(tmpPoints);
							}
							break;
						}else if(table[xy2index(x,y)]==enemyColor){
							tmpPoints.push(xy2index(x,y));
						}else if(table[xy2index(x,y)] == EMPTY){
							break;
						}
					}
				}
				//左方向
				tmpPoints = [];
				for(k = 1;k < 8;k++){
					x = j-k;
					y = i;
					if(0 <= x && x < 8 && 0 <= y && y < 8){
						if(table[xy2index(x,y)] == color){
							if(tmpPoints != 0){
								points = points.concat(tmpPoints);
							}
							break;
						}else if(table[xy2index(x,y)]==enemyColor){
							tmpPoints.push(xy2index(x,y));
						}else if(table[xy2index(x,y)] == EMPTY){
							break;
						}
					}
				}
			}
			if(points.length != 0){
				canPutIndexes.push([xy2index(j,i),points]);
			}
		}
	}
	return canPutIndexes;
}


function updateCanPutIndexes(){
	let i,text;
	let blackCount = 0;
	let whiteCount = 0;

	//ゲームが終了している場合は無視
	if(next == EMPTY){
		return;
	}

	canPutIndexes = getCanPutIndexes(table,next);
	if(canPutIndexes.length == 0){ //おける場所がない
		next = next%2+1;
		canPutIndexes = getCanPutIndexes(table,next);
		if(canPutIndexes.length == 0){ //おける場所がない
			//ゲーム終了
			for(i = 0;i < 64;i++){
				if(table[i] == BLACK){
					blackCount++;
				}else if(table[i] == WHITE){
					whiteCount++;
				}
			}
			text = "黒:"+blackCount+" 白:"+whiteCount+"　　";
			if(blackCount > whiteCount){
				text += "黒の勝ち";
			}else if(whiteCount > blackCount){
				text += "白の勝ち";
			}else{
				text += "引き分け";
			}
			header.innerHTML = text;
			next = EMPTY;
			return;
		}
		if(next == WHITE){
			header.innerHTML = "黒のおける場所がありません。白の番です";
		}else if(next == BLACK){
			header.innerHTML = "白のおける場所がありません。黒の番です";
		}
	}else{
		if(next == BLACK){
			header.innerHTML = "黒の番です";
		}else if(next == WHITE){
			header.innerHTML = "白の番です";
		}
	}

	return canPutIndexes;
}


function clickTable(e){
	let clickX,clickY,tableX,tableY;
	let i,j;
	let enemyColor = next%2+1;

	//クリックされた座標を調べる
	clickX = e.clientX-e.target.getBoundingClientRect().left;
	clickY = e.clientY-e.target.getBoundingClientRect().top;
	//クリックされたテーブルの座標を調べる
	tableX = Math.floor(clickX/(TABLE_SIZE/8.0));
	tableY = Math.floor(clickY/(TABLE_SIZE/8.0));

	//おける場所があったら置く
	for(i = 0;i < canPutIndexes.length;i++){
		if(canPutIndexes[i][0] == xy2index(tableX,tableY)){
			for(j = 0;j < canPutIndexes[i][1].length;j++){
				table[canPutIndexes[i][1][j]] = next;
			}
			table[xy2index(tableX,tableY)] = next;
			break;
		}
	}
	if(i == canPutIndexes.length){ //おけない場所だった
		return;
	}
	drawTable(table);

	next = enemyColor;
	updateCanPutIndexes();
}




window.addEventListener("load",function(){
	let i;

	//キャンバスを取得
	canvas = document.getElementsByTagName("canvas")[0];
	ctx = canvas.getContext("2d");
	//ヘッダーを取得
	header = document.getElementsByTagName("h1")[0];
	//クリックイベントを登録
	canvas.addEventListener("click",clickTable,false);
	//テーブルを初期化
	table = [];
	for(i = 0;i < 64;i++){
		table[i] = EMPTY;
	}
	table[xy2index(4,3)] = BLACK;
	table[xy2index(3,4)] = BLACK;
	table[xy2index(3,3)] = WHITE;
	table[xy2index(4,4)] = WHITE;

	//初期状態を描画
	drawTable(table);
	//次打つ人は黒
	next = BLACK;
	//おける場所を判定する
	updateCanPutIndexes();
},false);
