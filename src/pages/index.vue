<script setup lang="ts">
const newDocumentName = $ref("");
let notification = $ref(null as null | string);
let showNotification = $ref(false);
let documentNames = $ref([] as string[]);

const fetchDocuments = async() => {
  documentNames = await getDocuments();
};

onMounted(fetchDocuments);

const onAdd = async() => {
  if (!newDocumentName) { return; }
  try {
    notification = await newDocument(newDocumentName);
  } catch (e: any) {
    notification = e;
  }
  showNotification = true;
  setTimeout(() => showNotification = false, 2000);
  await fetchDocuments();
};
</script>

<template>
  <div flex="~ gap-3 wrap">
    <Input v-model="newDocumentName" w-full placeholder="Enter new document name..." />
    <Button w-full justify-center :disabled="showNotification" @click="onAdd">
      <span i-carbon-add />
      New Document
    </Button>
    <Notification v-show="showNotification && !notification" w-full justify-center>
      <span i-carbon-checkmark />
      Created successfully!
    </Notification>
    <Notification v-show="showNotification && notification" type="error" w-full justify-center>
      <span i-carbon-close />
      {{ notification }}
    </Notification>
  </div>
  <ItemList :names="documentNames" />
</template>
