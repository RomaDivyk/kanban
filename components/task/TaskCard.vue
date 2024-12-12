<script setup lang="ts">
import type { Task } from "~/types";
import { useTaskStore } from "~/stores/store";

const { $toast } = useNuxtApp();

const taskStore = useTaskStore();

const { taskData } = defineProps<{
  taskData: Task;
}>();

const activePanel = ref([]);

const openEditModal = (): void => {
  taskStore.setTask(taskData);
  taskStore.switchModal();
};

const deleteTask = (id: number): void => {
  try {
    taskStore.deleteTask(id);
    $toast.success(`Task deleted successfully`);
  } catch (error) {
    console.error(error);
    $toast.error(`Error: ${error}`);
  }
};
</script>

<template>
  <v-card>
    <v-expansion-panels v-model="activePanel">
      <v-expansion-panel>
        <v-expansion-panel-title class="text-h6">
          {{ taskData?.title }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row no-gutters class="d-flex justify-space-around">
            <v-btn
              density="compact"
              icon="mdi-file-document-edit-outline"
              @click="openEditModal"
            ></v-btn>
            <v-btn
              density="compact"
              icon="mdi-delete-outline"
              @click="deleteTask(taskData.id)"
            ></v-btn>
          </v-row>
          <TaskCardContent :taskData="taskData" />
        </v-expansion-panel-text>
      </v-expansion-panel> </v-expansion-panels
  ></v-card>
</template>
