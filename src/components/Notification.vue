<script setup lang="ts">
const props = defineProps<{
  type?: "success" | "error"
}>();

const classes = $computed(() => {
  switch (props.type) {
    case "error":
      return "bg-red border-red";
    case "success":
    default:
      return "bg-green border-green";
  }
});
</script>

<template>
  <div
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
    :class="classes"
    text-white
  >
    <slot />
  </div>
</template>
