<script setup lang="ts">
const props = defineProps<{
  modelValue?: string
  placeholder?: string
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void
}>();

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <label
    inline-flex
    items-center
    justify-between
    gap-1
    p-3
    transition-colors
    duration-150
    ease-in-out
    bg-gray-100
    text-default
    border
    border-transparent
    focus-within="bg-white border border-gray-400"
    rounded-md
  >
    <textarea
      :value="modelValue"
      autocomplete="off"
      :placeholder="props.placeholder"
      flex-1
      bg-transparent
      placeholder:text-gray-400
      border-none
      outline-none
      min-w-10
      type="text"
      @change="onChange"
    />
  </label>
</template>
