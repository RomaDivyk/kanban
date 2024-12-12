<script setup lang="ts">
import { useTaskStore } from "~/stores/store";
import { Statuses } from "~/constans/Statuses";
import type { Status } from "~/types";

const taskStore = useTaskStore();

const { task } = storeToRefs(taskStore);
</script>

<template>
  <v-select
    v-model="task.status"
    :items="Statuses"
    item-title="title"
    :item-value="(item: Status) => item"
    :rules="[(v) => !!v || 'Status is required']"
    variant="outlined"
    label="Status"
    density="compact"
    clearable
    @update:model-value="taskStore.setStatus(task.status)"
  />
</template>
