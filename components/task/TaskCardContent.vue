<script setup lang="ts">
import type { Task, User } from "~/types";

const { taskData } = defineProps<{
  taskData: Task;
}>();
const fullName = (value: User): string =>
  `${value?.lastName} ${value?.firstName}`;
</script>

<template>
  <v-card-text>
    <v-card v-if="taskData.responsibleUser" class="mb-1" variant="outlined">
      <v-card-subtitle>Responsible user</v-card-subtitle>
      <v-card-text class="pt-0 pb-0">{{
        fullName(taskData.responsibleUser)
      }}</v-card-text></v-card
    >
    <v-card v-if="taskData.performers?.length" class="mb-1" variant="outlined">
      <v-card-subtitle>Performers</v-card-subtitle>
      <v-card-text class="pt-0 pb-0" v-for="performer in taskData.performers">{{
        fullName(performer)
      }}</v-card-text></v-card
    >
    <v-card v-if="taskData.description" class="mb-1" variant="outlined">
      <v-card-subtitle>Description</v-card-subtitle>
      <v-card-text class="pt-0 pb-0">{{
        taskData.description
      }}</v-card-text></v-card
    >
    <v-card v-if="taskData.priority" class="mb-1" variant="outlined">
      <v-card-subtitle>Priority</v-card-subtitle>
      <v-card-text class="pt-0 pb-0">{{
        taskData.priority
      }}</v-card-text></v-card
    >
  </v-card-text>
</template>
