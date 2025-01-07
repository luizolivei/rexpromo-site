<template>
  <dialog ref="target"
          class="animate-fade z-20 border-0 min-h-[314px] fixed top-[50%] -translate-y-[50%] overflow-hidden"
          v-bind="$attrs" :open="isOpen"
  >
    <button type="button"
            class="z-20 bg-white hover:bg-gray-300 w-[30px] h-[30px] flex items-center justify-center absolute right-2 lg:right-5 top-2 text-[18px] rounded-full border border-gray-300"
            @click="emit('update')"
    >
      <i class="guia-icons guia-icon-close close"/>
    </button>
    <div class="flex justify-center items-center h-full">
      <slot/>
    </div>
  </dialog>
</template>
<script setup>
import {onClickOutside} from '@vueuse/core'

const props = defineProps({
  isOpen: {type: Boolean, default: false}
})

const emit = defineEmits(['update'])

const target = ref(null)

const updateOverlay = () => {
  if (!process.client) return

  const overlay = document.querySelector('.overlay-components');

  if (props.isOpen) {
    if (!overlay) {
      const overlayDiv = document.createElement('div');
      overlayDiv.className = 'overlay-components';
      document.body.appendChild(overlayDiv);
      document.body.style.overflow = 'hidden'
    }
  } else {
    if (overlay) {
      overlay.remove();
      document.body.style.overflow = 'auto'
    }
  }
};

onClickOutside(target, event => {
  emit('update')
})

watch(() => props.isOpen, updateOverlay, {immediate: true})
</script>
