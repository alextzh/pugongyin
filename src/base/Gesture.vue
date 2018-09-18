<template>
  <div class="gesture">
    <h4 ref="gestureTitle" class="gestureTitle">{{tip}}</h4>
    <canvas ref="canvas" style="background-color:#fff; display: inline-block;width: 320px; height: 320px;"></canvas>
  </div>
</template>

<script>
/* eslint-disable */
import {getPwd} from 'common/js/tool'

const THEME_COLOR = '#fe7527'

export default {
  name: 'Guesture',
  props: {
    tip: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      ctx: '',
      width: 0,
      height: 0,
      devicePixelRatio: 0,
      chooseType: '',
      r: '',  // 公式计算
      lastPoint: [],
      arr: [],
      restPoint: [],
      canvas: '',
      count: ''
    }
  },
  mounted() {
    this.setChooseType(3);
  },
  methods: {
    // 初始化解锁密码面板 小圆圈
    drawCle(x, y) {
      this.ctx.strokeStyle = '#e8e8e8'; // 密码的点点默认的颜色
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.r, 0, Math.PI * 2, true);
      this.ctx.closePath();
      this.ctx.stroke();
    },

    // 初始化圆心
    drawPoint(style) {
      for (let i = 0; i < this.lastPoint.length; i++) {
        this.ctx.fillStyle = style;
        this.ctx.beginPath();
        this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r / 2, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
      }
    },

    // 初始化状态线条
    drawStatusPoint(type) {
      for (let i = 0; i < this.lastPoint.length; i++) {
        this.ctx.strokeStyle = type;
        this.ctx.beginPath();
        this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.stroke();
      }
    },

    //style:颜色 解锁轨迹
    drawLine(style, po, lastPoint) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = style;
      this.ctx.lineWidth = 3;
      this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y);
      for (let i = 1; i < this.lastPoint.length; i++) {
        this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
      }
      this.ctx.lineTo(po.x, po.y);
      this.ctx.stroke();
      this.ctx.closePath();
    },

    // 创建解锁点的坐标，根据canvas的大小来平均分配半径
    createCircle() {
      var n = this.chooseType;
      var count = 0;
      this.r = this.ctx.canvas.width / (2 + 4 * n);// 公式计算
      this.lastPoint = [];
      this.arr = [];
      this.restPoint = [];
      var r = this.r;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          count++;
          var obj = {
            x: j * 4 * r + 3 * r,
            y: i * 4 * r + 3 * r,
            index: count
          };
          this.arr.push(obj);
          this.restPoint.push(obj);
        }
      }
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      for (let i = 0; i < this.arr.length; i++) {
        this.drawCle(this.arr[i].x, this.arr[i].y);
      }
      //return arr;
    },

    // 获取touch点相对于canvas的坐标
    getPosition(e) {
      let rect = e.currentTarget.getBoundingClientRect();
      let po = {
        x: (e.touches[0].clientX - rect.left) * this.devicePixelRatio,
        y: (e.touches[0].clientY - rect.top) * this.devicePixelRatio
      };
      return po;
    },

    // 核心变换方法在touchmove时候调用
    update(po) {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      // 每帧先把面板画出来
      for (let i = 0; i < this.arr.length; i++) {
        this.drawCle(this.arr[i].x, this.arr[i].y);
      }

      this.drawPoint(THEME_COLOR);  // 每帧花轨迹
      this.drawStatusPoint(THEME_COLOR);  // 每帧花轨迹
      this.drawLine(THEME_COLOR, po, this.lastPoint); // 每帧画圆心

      for (let i = 0; i < this.restPoint.length; i++) {
        if (Math.abs(po.x - this.restPoint[i].x) < this.r && Math.abs(po.y - this.restPoint[i].y) < this.r) {
          this.drawPoint(this.restPoint[i].x, this.restPoint[i].y);
          this.lastPoint.push(this.restPoint[i]);
          this.restPoint.splice(i, 1);
          break;
        }
      }
    },
    // 检测密码
    checkPass(psw1, psw2) {
      let p1 = ''
      let p2 = ''
      for (let i = 0; i < psw1.length; i++) {
        p1 += psw1[i].index + psw1[i].index;
      }
      for (let i = 0; i < psw2.length; i++) {
        p2 += psw2[i].index + psw2[i].index;
      }
      return p1 === p2;
    },

    // touchend结束之后对密码和状态的处理
    storePass(psw) {
      if (this.pswObj.step == 1) {
        if (this.checkPass(this.pswObj.fpassword, psw)) {
          this.pswObj.spassword = psw;
          let gesturePwd = getPwd(psw)
          let userInfo = {
            userPassword: gesturePwd,
            userId: localStorage.getItem('userId')
          }
          this.$store.dispatch('UpdateGesture', userInfo).then((res) => {
            if (res.code === 0) {
              this.$toast(res.msg, 'warn')
              return
            }
            localStorage.setItem('chooseType', this.chooseType)
            localStorage.setItem('passwordxx', JSON.stringify(this.pswObj.spassword))
            this.pswObj.step = 2;
            this.domStyle('#698B22', '密码保存成功')
            this.$emit('onSuccess')
          }).catch(err => {
            console.log(err)
            this.$toast('网络异常', 'error')
          })
        } else {
          this.domStyle('#e71f19', '两次不一致，重新输入')
          delete this.pswObj.step;
        }
      } else if (this.pswObj.step == 2) {
        //TODO
        if (this.checkPass(this.pswObj.spassword, psw)) {
          let gesturePwd = getPwd(psw)
          let userInfo = {
            phoneNo: localStorage.getItem('mobile'),
            userPassword: gesturePwd
          }
          this.$store.dispatch('GestureLogin', userInfo).then((res) => {
            if (res.code === 0) {
              this.$toast(res.msg, 'warn')
              return
            }
            const result = res.result
            this.$store.commit('SET_USERID', result.userId)
            this.domStyle('#698B22', '解锁成功')
            this.$emit('onUnLock')
          }).catch(err => {
            console.log(err)
            this.$toast('网络异常', 'error')
          })
        } else if (psw.length < 4) {
          this.domStyle('#e71f19', '请连接4个点')
        } else {
          let n = localStorage.getItem('wrongNum') || 5
          n--
          if (n > 0) {
            localStorage.setItem('wrongNum', n)
            this.domStyle('#e71f19', `密码错误，您还可以输入${n}次`)
          } else if(n == 0) {
            localStorage.setItem('wrongNum', 0)
            this.domStyle('#e71f19', '密码错误5次，账号被锁定1分钟')
          } else {
            this.unBindEvent()
            this.lockGesture()
          }
        }
      } else {
        if (psw.length < 4) {
          this.domStyle('#e71f19', '请连接至少4个点')
          delete this.pswObj.step;
        } else {
          this.pswObj.step = 1;
          this.$store.commit('SET_STEP', 1)
          this.pswObj.fpassword = psw;
          this.$refs.gestureTitle.innerHTML = '再次输入';
          this.$refs.gestureTitle.style.color = '#666666'
        }
      }
    },

    // 倒计时
    lockGesture() {
      var that = this
      const TIMES = 60
      if (!this.timer) {
        that.count = TIMES
        this.timer = setInterval(() => {
          if (that.count > 0 && that.count <= TIMES) {
            that.count--
            let gestureTitle = this.$refs.gestureTitle;
            gestureTitle.style.color = '#e71f19';
            gestureTitle.innerHTML = `休息一下，${this.count} s后可再次解锁`;
          } else {
            localStorage.setItem('wrongNum', 5)
            that.bindEvent()
            let gestureTitle = this.$refs.gestureTitle;
            gestureTitle.style.color = '#666';
            gestureTitle.innerHTML = '请输入手势密码';
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },

    // 提示样式和轨迹样式封装
    domStyle(color, text) {
      var that = this
      that.drawStatusPoint(color);
      that.drawPoint(color);
      that.drawLine(color, that.lastPoint[that.lastPoint.length-1], that.lastPoint);
      let gestureTitle = that.$refs.gestureTitle;
      gestureTitle.style.color = color;
      gestureTitle.innerHTML = text;
    },

    // 通过step的值改变样式
    makeState() {
      var gestureTitle = this.$refs.gestureTitle
      if (this.pswObj.step == 2) {
      } else if (this.pswObj.step == 1) {
      } else {
      }
    },

    // 重置手势密码
    updatePassword() {
      window.localStorage.removeItem('passwordxx')
      window.localStorage.removeItem('chooseType');
      window.localStorage.removeItem('wrongNum');
      this.pswObj = {};
      this.reset();
      var gestureTitle = this.$refs.gestureTitle
      gestureTitle.style.color = "#666";
      gestureTitle.innerHTML = '';
    },

    // 设置初始类型
    setChooseType(type) {
      this.chooseType = type;
      this.init();
    },

    // 初始化Dom
    initDom() {
      this.chooseType = Number(window.localStorage.getItem('chooseType')) || 3;
      this.devicePixelRatio = window.devicePixelRatio || 1;
      if (this.devicePixelRatio === 3) {
        this.devicePixelRatio = 2
      }
      var canvas = this.$refs.canvas;
      var width = this.getCanvasWidth(window.screen.availWidth) || 320;
      var height = this.getCanvasWidth(window.screen.availWidth) || 320;
      // 高清屏锁放
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      canvas.height = height * this.devicePixelRatio;
      canvas.width = width * this.devicePixelRatio;
    },

    getCanvasWidth(size) {
      if (size >= 414) {
        return 414
      } else {
        return size
      }
    },

    // 初始化canvas
    init() {
      this.initDom();
      this.pswObj = window.localStorage.getItem('passwordxx') ? {
        step: 2,
        spassword: JSON.parse(window.localStorage.getItem('passwordxx'))
      } : {};
      this.lastPoint = [];
      this.makeState();
      this.touchFlag = false;
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext('2d');
      this.createCircle();
      this.bindEvent();
    },

    // 重置画布
    reset() {
      this.makeState();
      this.createCircle();
    },

    // 绑定事件
    bindEvent() {
      this.canvas = this.$refs.canvas;
      this.canvas.addEventListener("touchstart", this.handleTouchStart, false);
      this.canvas.addEventListener("touchmove", this.handleTouchMove, false);
      this.canvas.addEventListener("touchend", this.handleTouchEnd, false);
    },
    unBindEvent() {
      this.canvas = this.$refs.canvas;
      this.canvas.removeEventListener("touchstart", this.handleTouchStart, false);
      this.canvas.removeEventListener("touchmove", this.handleTouchMove, false);
      this.canvas.removeEventListener("touchend", this.handleTouchEnd, false);
    },
    handleTouchStart(e) {
      e.preventDefault();// 某些android 的 touchmove不宜触发 所以增加此行代码
      var po = this.getPosition(e);
      for (let i = 0; i < this.arr.length; i++) {
        if (Math.abs(po.x - this.arr[i].x) < this.r && Math.abs(po.y - this.arr[i].y) < this.r) {
          this.touchFlag = true;
          this.drawPoint(this.arr[i].x, this.arr[i].y);
          this.lastPoint.push(this.arr[i]);
          this.restPoint.splice(i, 1);
          break;
        }
      }
    },
    handleTouchMove(e) {
      if (this.touchFlag) {
        this.update(this.getPosition(e));
      }
    },
    handleTouchEnd(e) {
      if (this.touchFlag) {
        this.touchFlag = false;
        this.storePass(this.lastPoint);
        setTimeout(() => {
          this.reset();
        }, 500)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.gesture
  text-align: center
  display: flex
  flex-direction: column
  .gestureTitle
    min-height: 0.28rem
    font-size: 0.28rem
    color: #666
  .gesture-canvas
    background: #fff
</style>


