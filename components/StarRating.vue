<template>
    <ul class="list">
      <li
          v-for="star in maxStars"
          :key="star"
          class="list-default"
          :style="{ fontSize: size + 'px' }"
      >
        <button
          v-if="!disableClick"
          type="button"
          title="Avalie o anúncio"
          class="button-no-decoration"
          :class="chooseClass(star)"
          @click="rate(star)"
        />
        <span v-else :class="chooseClass(star)"/>
      </li>
    </ul>
</template>

<script>
export default defineComponent({
  name: "StarRating",
  data() {
    return {
      stars: this.rating,
    };
  },
  props: {
    rating: {
      type: Number,
    },
    maxStars: {
      type: Number,
      default: 5,
    },
    disableClick: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 35,
    },
  },
  methods: {
    rate(star) {
      if (star <= this.maxStars && star >= 0) {
        this.stars = this.stars === star ? star - 1 : star;
        this.$emit("changeRating", this.stars);
      }
    },
    chooseClass(star) {
      let starClass = "star-inactive";

      if (star <= this.stars) {
        starClass = "star-active";
      }

      if (star > this.stars && star < this.stars + 0.5) {
        starClass = "star-half";
      }

      if (!this.disableClick) {
        starClass = starClass + " hover-animation";
      }

      return starClass;
    },
  },
});
</script>
<style scoped lang="scss">
$star-inactive: "\f04d2";
$star-active: "\f04ce";
$star-half: "\f04d0";

.star-inactive::before {
  content: $star-inactive;
  color: #fec008;
}

.star-half::before {
  content: $star-half;
  color: #fec008;
}

.star-active::before {
  content: $star-active;
  color: #fec008;
}

.list-default {
  font-family: "guia-icons";
  display: inline-block;
}

.button-no-decoration {
  border: none;
  background-color: transparent;
  padding: 0;
}

.hover-animation:hover {
  transform: scale(1.45);
}

.list {
  white-space: nowrap;
  margin-bottom: 4px;
}
</style>
