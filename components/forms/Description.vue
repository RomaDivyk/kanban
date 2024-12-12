<script setup lang="ts">
import { useTaskStore } from "~/stores/store";

const taskStore = useTaskStore();

const { task } = storeToRefs(taskStore);
</script>

<template>
  <v-textarea
    v-model="task.description"
    variant="outlined"
    density="compact"
    label="Description"
    clearable
  />
</template>
