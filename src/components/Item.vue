<script setup lang="ts">
const props = defineProps<{
  name: string
}>();
</script>

<template>
  <div flex items-center justify-between gap-3 p="x-5 y-0" rounded-lg border="~ gray-300/80" hover="border-gray-500/80" transition-colors duration-200>
    <RouterLink block flex-1 py-5 :to="`/edit/${name}`">
      <h2>
        <strong text-base leading-tight font-medium align-middle>
          {{ props.name }}
        </strong>
      </h2>
    </RouterLink>
  </div>
</template>
