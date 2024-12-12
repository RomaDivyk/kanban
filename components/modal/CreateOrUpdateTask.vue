<script setup lang="ts">
import { useTaskStore } from "~/stores/store";

const { $toast } = useNuxtApp();

const taskStore = useTaskStore();

const { task, modal } = storeToRefs(taskStore);

const closeModal = (): void => {
  taskStore.switchModal();
  setTimeout(() => {
    taskStore.clearTask();
  }, 100);
};

const addNewTask = (): void => {
  if (!task.value.title) return;
  taskStore.createTask();
};

const updateTask = (): void => {
  if (!task.value.title) return;
  taskStore.updateTask();
};

const relevantTitle = computed(() =>
  task.value.id ? "Edit task" : "New task",
);

const relevantMessage = computed(() =>
  task.value.id ? `Task updated successfully` : `Task added successfully`,
);

const confirmAction = async (): Promise<void> => {
  try {
    task.value.id ? updateTask() : addNewTask();
    $toast.success(relevantMessage.value);
  } catch (error) {
    console.error(error);
    $toast.error(`Error: ${error}`);
  } finally {
    closeModal();
  }
};
</script>

<template>
  <v-dialog class="w-50" v-model="modal">
    <v-card>
      <v-card-title>{{ relevantTitle }}</v-card-title>
      <v-card-text>
        <FormsTitle />
        <FormsDescription />
        <FormsUser
          v-model="task.responsibleUser"
          label="Responsible user"
          @set-relevant-users="
            taskStore.setResponsibleUser(task.responsibleUser)
          "
        />
        <FormsUser
          v-model="task.performers"
          :performers="true"
          :label="'Performers'"
          @set-relevant-users="taskStore.setPerformers(task.performers)"
        />
        <FormsStatus />
        <FormsPriority />
      </v-card-text>
      <ButtonsCardActions @reject="closeModal" @confirm="confirmAction" />
    </v-card>
  </v-dialog>
</template>
