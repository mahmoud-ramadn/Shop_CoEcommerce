<template>
  <div ref="lottieContainer" class="lottie-animation"></div>
</template>

<script>
import lottie from 'lottie-web'

export default {
  props: {
    animationData: {
      type: Object,
      required: true
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      anim: null
    }
  },
  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.lottieContainer,
      renderer: 'svg',
      loop: this.loop,
      autoplay: this.autoplay,
      animationData: this.animationData
    })
  },
  beforeDestroy() {
    if (this.anim) {
      this.anim.destroy()
    }
  }
}
</script>

<style>
.lottie-animation {
 
  height: 500px;
  width: 300px;
}
</style>