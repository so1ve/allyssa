<script setup lang="ts">
const props = defineProps<{
  names: string[]
}>();
</script>

<template>
  <div mt-3 grid lt-md="!grid-cols-1" gap-3>
    <Item v-for="name in props.names" :key="name" :name="name" />
  </div>
</template>
