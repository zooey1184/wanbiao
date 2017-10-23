<template>
  <div class="">
    <div class="title">
      {{title}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: Object,
      default: '图片太大，是否重新上传？'
    }
  }
}
</script>

<style lang="css">
</style>
