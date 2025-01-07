<template>
  <div class="container-fluid">
    <slot />
  </div>
</template>

<script>
export default {
  name: "ContainerFluid",
};
</script>

<style lang="scss" scoped>
.container-fluid {
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
  @media (min-width: 1400px) {
    max-width: 1320px;
  }

  @media (max-width: 992px) {
    padding: 0;
  }
}
</style>
