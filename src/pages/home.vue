<template>
 <div class="container">
   <div class="nowNum">当前星币数量：<span>{{myFlowers}}</span></div>
   <div class="payBox">
      <div :class="[item.isCommend?'list animated pulse infinite':'list']" v-for="(item,index) in payList"  :key="index" @click="pays(item.flower_num)">
         <div>
          <img :src="xbSrc" alt="">
          <span>{{item.flower_num}}</span>
          <span style="color:#f54b6f">{{item.extra_flower_num == '0'?'':'（赠送'+item.extra_flower_num+'）'}}</span>
         </div>
         <div>{{item.rmb}}元</div>
      </div>
   </div>
 </div>
</template>

<script>
import { charge,pay } from "../service/getData.js";
export default {
  data() {
    return {
      xbSrc: require("../assets/images/xb.png"),
      myFlowers:'',
      payList:[]
    };
  },
  methods: {
    pays(e){
      let that = this;
      pay('ios',e).then(
          res => {
            if (res.data.code == "SUCCESS") {
              that.onBridgeReady(
                res.data.data.appId,
                res.data.data.nonceStr,
                res.data.data.paySign,
                res.data.data.package,
                res.data.data.timeStamp,
                res.data.data.signType
              );
            } else {
              that.$dialog.toast({
                mes: `${res.resultdata}`,
                timeout: 2000
              });
            }
          },
          err => {
            that.$dialog.toast({
              mes: "唤起支付失败！",
              timeout: 2000
            });
          }
        );
    },
     onBridgeReady(_appId, _nonceStr, _paySign, _prepayId, _timeStamp,_signType) {
      let that = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: _appId, //公众号名称，由商户传入
          timeStamp: _timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: _nonceStr, //随机串
          package: _prepayId,
          signType: _signType, //微信签名方式：
          paySign: _paySign //微信签名
        },
        function(res) {
          console.log(res)
          if (res.err_msg == "get_brand_wcpay_request:ok") {
              that.$dialog.toast({
                mes: "支付成功",
                timeout: 2000
              });
               charge().then(res => {
                    that.myFlowers = res.data.data.myFlowers;
                    that.payList = res.data.data.lists;
                })
          }else{
            that.$dialog.toast({
              mes: "支付失败",
              timeout: 2000
            });
          }
        }
      );
    }
  },
  mounted(){
    let that = this;
    charge().then(res => {
        that.myFlowers = res.data.data.myFlowers;
        that.payList = res.data.data.lists;
    })
  }
};
</script>

<style lang="scss">
  @import "../assets/styles/animate.css";
  .container{
    min-height: 100%;
    box-sizing: border-box;
    background: url("https://image-1257827636.cos.ap-shanghai.myqcloud.com/listbg20181022094912.png")
    repeat;
  }
  .nowNum{
    height: 1rem;
    line-height: 1rem;
    text-align: left;
    color: #fff;
    font-size: .36rem;
    padding-left: .3rem;
  }
  .payBox{
    padding:0 .3rem;
  }
  .list{
    box-shadow:0 5px 5px 0 rgba(106, 86, 225, 0.42);
    border-radius: 3px;
    height: 1.6rem;
    line-height: 1.6rem;
    background: #fff;
    margin-bottom: .1rem;
    display: flex;
    padding: .2rem;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    font-size: .36rem;
    img{
      height: .4rem;
      width: .4rem;
      margin-top: -.1rem;
      margin-right: .2rem;
    }
  }
</style>
