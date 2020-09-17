<template>
  <div class="screen" v-on:mousemove="move">
    <div class="landscape"></div>
    <div class="filter"></div>
    <canvas id="canvas"></canvas>
    <div class="words_box">
      <div class="title">留言板</div>
      <div class="ground">
        <input type="text" class="words" v-model="message" />
      </div>
      <div class="but" @click="submit()">提交</div>
    </div>
    <div class="s_show">
      <div
        v-for="(item) in messageList"
        :key="item.id"
        class="magictime twisterInUp"
      >{{item.content}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
//星空类
function Star(id, x, y, ctx) {
  this.id = id;
  this.height = y;
  this.x = Math.floor(Math.random() * x);
  this.y = Math.floor(Math.random() * y);
  this.ctx = ctx;
  this.r = Math.floor(Math.random() * 2) + 1;
  var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
  this.color = "rgba(255,255,255," + alpha + ")";
}

Star.prototype.draw = function () {
  this.ctx.fillStyle = this.color;
  this.ctx.shadowBlur = this.r * 2;
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
  this.ctx.closePath();
  this.ctx.fill();
};

Star.prototype.move = function () {
  this.y -= 0.15;
  if (this.y <= -10) this.y = this.height + 10;
  this.draw();
};

Star.prototype.die = function () {
  stars[this.id] = null;
  delete stars[this.id];
};

function Dot(id, x, y, ctx, dots) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.ctx = ctx;
  this.dots = dots;
  this.r = Math.floor(Math.random() * 5) + 1;
  this.maxLinks = 2;
  this.speed = 0.5;
  this.a = 0.5;
  this.aReduction = 0.005;
  this.color = "rgba(255,255,255," + this.a + ")";
  this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";

  this.dir = Math.floor(Math.random() * 140) + 200;
}
//线条类
Dot.prototype.draw = function () {
  this.ctx.fillStyle = this.color;
  this.ctx.shadowBlur = this.r * 2;
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
  this.ctx.closePath();
  this.ctx.fill();
};

Dot.prototype.link = function () {
  if (this.id == 0) return;
  var previousDot1 = getPreviousDot(this.dots, this.id, 1);
  var previousDot2 = getPreviousDot(this.dots, this.id, 2);
  var previousDot3 = getPreviousDot(this.dots, this.id, 3);
  if (!previousDot1) return;
  this.ctx.strokeStyle = this.linkColor;
  this.ctx.moveTo(previousDot1.x, previousDot1.y);
  this.ctx.beginPath();
  this.ctx.lineTo(this.x, this.y);
  if (previousDot2 != false) this.ctx.lineTo(previousDot2.x, previousDot2.y);
  if (previousDot3 != false) this.ctx.lineTo(previousDot3.x, previousDot3.y);
  this.ctx.stroke();
  this.ctx.closePath();
};
Dot.prototype.move = function () {
  this.a -= this.aReduction;
  if (this.a <= 0) {
    this.die();
    return;
  }
  this.color = "rgba(255,255,255," + this.a + ")";
  this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";
  (this.x = this.x + Math.cos(degToRad(this.dir)) * this.speed),
    (this.y = this.y + Math.sin(degToRad(this.dir)) * this.speed);

  this.draw();
  this.link();
};

Dot.prototype.die = function () {
  this.dots[this.id] = null;
  delete this.dots[this.id];
};
function degToRad(deg) {
  return deg * (Math.PI / 180);
}
function getPreviousDot(dots, id, stepback) {
  if (id == 0 || id - stepback < 0) return false;
  if (typeof dots[id - stepback] != "undefined") return dots[id - stepback];
  else return false;
}
import { getMessageList, insertMessage } from "~/api/articlelist";
export default {
  name: "Message",
  data() {
    return {
      message: "",
      WIDTH: 0,
      HEIGHT: 0,
      mouseMoving: false,
      mouseX: 0,
      mouseY: 0,
      stars: [],
      mouseMoveChecker: null,
      initStarsPopulation: 80,
      dots: [],
      dotsMinDist: 2,
      maxDistFromCursor: 50,
      messageList: [],
    };
  },
  created() {
    this._getMessageList();
  },
  mounted() {
    this.setCanvasSize();
    this.init();
  },
  watch: {
    messageList() {
      this.$nextTick(() => {
        var aShowList = document.querySelectorAll(".s_show div"); //获取元素 H5
        for (var i = 0; i < aShowList.length; i++) {
          this.initMessage(aShowList[i]); //执行初始化函数
        }
      });
    },
  },
  computed: {
    canvas() {
      return document.getElementById("canvas");
    },
    ctx() {
      return canvas.getContext("2d");
    },
  },
  methods: {
    //获取留言
    _getMessageList() {
      getMessageList().then((res) => {
        this.messageList = res.result.data;
      });
    },
    //提交留言
    submit() {
      if (this.message.length == 0 || this.message.length > 50) {
        this.$message({
          message: "留言不能为空且最多50字！",
          type: "warning",
        });
        return;
      } else {
        insertMessage(this.message).then((res) => {
          if (res.result.msg) {
            this.$message({
              message: "感谢你宝贵的意见！",
              type: "success",
            });
            this._getMessageList();
            this.message = "";
            //不能实时加入留言，后面还需优化
            // this.messageList.push
            // var oShow = document.querySelector('.s_show');
            // var oDiv = document.createElement("div"); //创建div
            // oDiv.innerHTML = this.message; //添加弹幕内容
            // oDiv.className = "magictime twisterInUp"; //弹幕特效
            // oShow.appendChild(oDiv); //添加一个子节点
            // this.initMessage(oDiv); //初始化
          } else {
            this.$message.error("提交失败，发生异常了未知错误");
          }
        });
      }
    },
    //鼠标移动
    move(e) {
      this.mouseMoving = true;
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      clearInterval(this.mouseMoveChecker);
      this.mouseMoveChecker = setTimeout(function () {
        this.mouseMoving = false;
      }, 100);
    },
    setCanvasSize() {
      this.WIDTH = document.documentElement.clientWidth;
      this.HEIGHT = document.documentElement.clientHeight * 0.938;

      this.canvas.setAttribute("width", this.WIDTH);
      this.canvas.setAttribute("height", this.HEIGHT);
    },
    init() {
      this.ctx.strokeStyle = "white";
      this.ctx.shadowColor = "white";
      for (var i = 0; i < this.initStarsPopulation; i++) {
        this.stars[i] = new Star(i, this.WIDTH, this.HEIGHT, this.ctx);
      }
      this.ctx.shadowBlur = 0;
      this.animate();
    },
    animate() {
      this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

      for (var i in this.stars) {
        this.stars[i].move();
      }
      for (var i in this.dots) {
        this.dots[i].move();
      }
      this.drawIfMouseMoving();
      requestAnimationFrame(this.animate);
    },
    drawIfMouseMoving() {
      if (!this.mouseMoving) return;

      if (this.dots.length == 0) {
        this.dots[0] = new Dot(
          0,
          this.mouseX,
          this.mouseY,
          this.ctx,
          this.dots
        );
        this.dots[0].draw();
        return;
      }

      var previousDot = this.getPreviousDot(this.dots.length, 1);
      var prevX = previousDot.x;
      var prevY = previousDot.y;

      var diffX = Math.abs(prevX - this.mouseX);
      var diffY = Math.abs(prevY - this.mouseY);

      if (diffX < this.dotsMinDist || diffY < this.dotsMinDist) return;

      var xVariation = Math.random() > 0.5 ? -1 : 1;
      xVariation =
        xVariation * Math.floor(Math.random() * this.maxDistFromCursor) + 1;
      var yVariation = Math.random() > 0.5 ? -1 : 1;
      yVariation =
        yVariation * Math.floor(Math.random() * this.maxDistFromCursor) + 1;
      this.dots[this.dots.length] = new Dot(
        this.dots.length,
        this.mouseX + xVariation,
        this.mouseY + yVariation,
        this.ctx,
        this.dots
      );
      this.dots[this.dots.length - 1].draw();
      this.dots[this.dots.length - 1].link();
    },
    getPreviousDot(id, stepback) {
      if (id == 0 || id - stepback < 0) return false;
      if (typeof this.dots[id - stepback] != "undefined")
        return this.dots[id - stepback];
      else return false;
    },
    //留言移动
    moveMessage(k, obj, maxLeft) {
      var speed = k; //控制速度的变量
      maxLeft -= speed; //往左移动
      const that = this;
      if (maxLeft > -obj.offsetWidth) {
        obj.style.left = maxLeft + "px";
        requestAnimationFrame(function () {
          that.moveMessage(k, obj, maxLeft);
        }); //H5新增的动画函数
      } else {
        this.initMessage(obj); //重新初始化 营造循环弹幕效
      }
    },
    //随机颜色
    randomColor() {
      return "#" + Math.random().toString(16).slice(-6); //一行简化版截取后六位
    },
    initMessage(obj) {
      //确定top值的随机区间
      var header = document.querySelector(".v-header"); //获取头部
      var screenHeight = document.documentElement.clientHeight; //获取屏幕可视高度
      var maxTop = screenHeight - header.offsetHeight - obj.offsetHeight; //高度差范围
      obj.style.top = maxTop * Math.random() + "px";
      //控制left值
      var screenWidth = document.documentElement.clientWidth; //获取可视宽度
      var maxLeft = screenWidth - obj.offsetWidth; /* - Math.random() * 800 */ //随机宽度差
      obj.style.left = maxLeft + "px";
      obj.style.color = this.randomColor();
      this.moveMessage(Math.random() * 5 + 1, obj, maxLeft);
    },
  },
};
</script>

<style scoped lang="scss" rel="stylesheet/stylus">
.screen {
  overflow: hidden;
  position: relative;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  cursor: none;
  background: black;
  background: linear-gradient(to bottom, #000000 0%, #5788fe 100%);
  .words_box {
    width: 600px;
    height: 200px;
    margin: auto;
    position: absolute;
    top: 30%;
    left: 0px;
    right: 0px;
    z-index: 110;
    .title {
      height: 100px;
      width: 100%;
      box-sizing: border-box;
      line-height: 100px;
      font-size: 40px;
      color: white;
    }
    .ground {
      width: 450px;
      height: 50px;
      background: -webkit-linear-gradient(
        left,
        red,
        blue
      ); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, red, blue); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right, red, blue); /* Firefox 3.6 - 15 */
      background: linear-gradient(
        to right,
        rgb(97, 40, 141),
        rgb(45, 191, 155)
      ); /* 标准的语法 */
      overflow: hidden;
      border-radius: 25px;
      box-shadow: 0px 10px 10px rgb(30, 30, 30);
      float: left;
      margin-top: 50px;
      // cursor: pointer;
      .words {
        width: 440px;
        height: 40px;
        outline: none;
        border: 0px;
        display: block;
        margin: auto;
        margin-top: 5px;
        border-radius: 20px;
        background-color: rgb(49, 45, 51);
        padding-left: 20px;
        padding-right: 20px;
        box-sizing: border-box;
        color: white;
        box-shadow: inset 0px 3px 4px rgba(0, 0, 0, 0.8),
          0px 2px 0px rgba(255, 255, 255, 0.2);
      }
    }
    .but {
      margin-top: 50px;
      width: 120px;
      margin-left: 30px;
      float: left;
      height: 50px;
      border-radius: 25px;
      border: 2px solid #2dbe9b;
      box-shadow: inset 0px 3px 4px rgba(0, 0, 0, 0.8),
        0px 10px 10px rgb(30, 30, 30);
      color: #2dbe9b;
      text-align: center;
      line-height: 50px;
      font-size: 18px;
      cursor: pointer;
      transition: all 0.5s;
      box-sizing: border-box;
    }
  }
  .s_show div {
    position: absolute;
    font-size: 18px;
    font-weight: bold;
  }

  .filter {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #fe5757;
    animation: colorChange 30s ease-in-out infinite;
    animation-fill-mode: both;
    mix-blend-mode: overlay;
  }
  @keyframes colorChange {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 0.9;
    }
  }
  .landscape {
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 100%;
    // background-image: url("img/xkbg.png");
    background-size: 1000px 250px;
    background-repeat: repeat-x;
    background-position: center bottom;
  }
}
@media screen and (max-device-width: 460px) {
  .screen {
    .words_box {
      top:10%;
      width: 350px;
      height: 250px;
      .ground {
        width: 350px;
        margin-top: 10px;
        .words {
          width: 340px;
        }
      }
      .but {
        margin-top: 40px;
        margin-left: 0px;
      }
    }
  }
}
</style>
