<script setup lang="ts">
import { useTaskStore } from "~/stores/store";
import { Priorities } from "~/constans/Priority";

const taskStore = useTaskStore();

const { task } = storeToRefs(taskStore);
</script>

<template>
  <v-select
    v-model="task.priority"
    :items="Priorities"
    variant="outlined"
    label="Priority"
    density="compact"
    clearable
  />
</template>
