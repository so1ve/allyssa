<script setup lang="ts">
const props = defineProps<{
  sentences?: string[]
  phrases?: string[]
  placeholder?: string
}>();

const emit = defineEmits<{
  (e: "update:sentences", value: string[]): void
  (e: "update:phrases", value: string[]): void
}>();

let sentence = $ref("");
const sentences = reactive([] as string[]);
let phrase = $ref("");
const phrases = reactive([] as string[]);

const onAddSentence = () => {
  if (!sentence) { return; }
  sentences.push(sentence);
  sentence = "";
};
const onAddPhrase = () => {
  if (!phrase) { return; }
  phrases.push(phrase);
  phrase = "";
};
const onSentencesChange = () => {
  emit("update:sentences", sentences);
};
watch(sentences, onSentencesChange);
const onPhrasesChange = () => {
  emit("update:phrases", phrases);
};
watch(phrases, onPhrasesChange);
</script>

<template>
  <div flex="~ gap-3 wrap">
    <TextArea v-model="sentence" w-full />
    <Button w-full justify-center @click="onAddSentence">
      <span i-carbon-add />
      Add Sentence
    </Button>
    <Input v-model="phrase" w-full />
    <Button w-full justify-center @click="onAddPhrase">
      <span i-carbon-add />
      Add Phrase
    </Button>
  </div>
</template>
