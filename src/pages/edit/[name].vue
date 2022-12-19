<script setup lang="ts">
import type { AllyssaDocument } from "@/types";

const route = useRoute();
const name = $computed(() => route.params.name as string);

let doc = $ref({} as AllyssaDocument);

const fetchDocument = async() => {
  doc = await getDocument(name);
};
onMounted(fetchDocument);
</script>

<template>
  <div flex="~ gap-3 wrap" class="edit">
    <RouterLink group sm="!flex" items-center gap-2 to="/">
      <div group flex items-center gap-2 cursor-pointer>
        <span flex items-center justify-center w-5 h-5 border="1 gray-300/80" rounded text-gray-400 group-hover="text-gray-500 border-gray-400/80" transition-colors>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 13L5.5 8L10.5 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <span text-sm text-gray-500 group-hover:text-gray-900 transition-colors>
          Back
        </span>
      </div>
    </RouterLink>
    <Editor v-model:phrases="doc.phrases" v-model:sentences="doc.sentences" />
    Sentences:
    <ol>
      <li v-for="sentence in doc.sentences" :key="sentence">
        {{ sentence }}
      </li>
    </ol>
    Phrases:
    <ol>
      <li v-for="phrase in doc.phrases" :key="phrase">
        {{ phrase }}
      </li>
    </ol>
  </div>
</template>

<style>
.edit {
  word-break: break-all;
}
</style>
