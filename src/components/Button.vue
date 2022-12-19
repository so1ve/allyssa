<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean
}>();
</script>

<template>
  <button
    h-9
    px-4.5
    rounded-md
    inline-flex
    flex-shrink-0
    whitespace-nowrap
    items-center
    gap-2
    transition-colors
    duration-150
    ease-in-out
    leading-none
    border-1
    cursor-pointer
    border-primary
    bg-primary
    text-white
    :disabled="props.disabled"
    :class="{
      'opacity-50 cursor-not-allowed': props.disabled,
      'hover:color-primary hover:bg-white': !props.disabled,
    }"
  >
    <slot />
  </button>
</template>
