<script setup lang="ts">
import { ElMessage } from "element-plus";

const newDocumentName = $ref("");
let documentNames = $ref([] as string[]);

const fetchDocuments = async() => {
  documentNames = await getDocuments();
};

onMounted(fetchDocuments);

const onAdd = async() => {
  if (!newDocumentName) { return; }
  try {
    const res = await newDocument(newDocumentName);
    if (res) {
      ElMessage.error(res);
      return;
    }
  } catch (e: any) {
    ElMessage.error(e);
  }
  await fetchDocuments();
};
</script>

<template>
  <div flex="~ gap-3 wrap">
    <ElInput v-model="newDocumentName" w-full placeholder="Enter new document name..." />
    <ElButton w-full justify-center type="primary" @click="onAdd">
      <span i-carbon-add />
      New Document
    </ElButton>
  </div>
  <ItemList :names="documentNames" />
</template>
