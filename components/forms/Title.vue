<script setup lang="ts">
import { useTaskStore } from "~/stores/store";

const taskStore = useTaskStore();

const { task } = storeToRefs(taskStore);
</script>

<template>
  <v-text-field
    v-model="task.title"
    variant="outlined"
    label="Title"
    density="compact"
    :rules="[(v) => !!v || 'Title is required']"
    clearable
  />
</template>
