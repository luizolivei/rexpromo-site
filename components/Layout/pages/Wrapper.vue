<template>
  <div class="content flex justify-content-between flex-wrap mt-5">
    <div class="left">
      <slot name="left" />
    </div>

    <div class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  > div {
    &:nth-child(1n) {
      @media (max-width: 768px) {
        width: 100%;
      }
    }
  }
  .left {
    width: 75%;
    @media (min-width: 1024px) {
      max-width: 964px;
    }

    @media (min-width: 769px) AND (max-width: 1400px) {
      width: 70%;
    }
  }
  .right {
    margin-top: 41px;
    width: 25%;
    @media (min-width: 1024px) {
      max-width: 300px;
    }
  }
}
</style>
