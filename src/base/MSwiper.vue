<template>
  <div class="wrapper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(img, index) in imgs" :key="index">
        <img :src="img.imgUrl">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  export default{
    name: 'MSwiper',
    props: {
      imgs: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        // 轮播config
        swiperOption: {
          loop: true,
          autoplay: 3000,
          slidesPerView: 'auto',
          centeredSlides: true,
          pagination: '.swiper-pagination'
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.wrapper >>> .swiper-pagination-bullet{
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 3px rgba(0,0,0,.75);
  opacity: 1;
  width: 6px;
  height: 6px;
}

.wrapper >>> .swiper-pagination-bullet-active{
  width: 12px;
  border-radius: 50px;
  background: $color-theme;
  box-shadow: 0 0 3px rgba(249,136,80,1);
}

.wrapper{
  width:100%;
  height:3.32rem;
  overflow: hidden;
}
.swiper-slide{
  width:100%;
  height:3.32rem;
  box-shadow: 0.968px 3.881px 32px 0px rgba(0, 0, 0, 0.17)
}
.swiper-slide img{
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 3.32rem;
  transition: all 0.3s ease 0s;
}
.swiper-slide-active img{
  margin-top: 0;
  width: 100%;
  height: 100%;
}
</style>