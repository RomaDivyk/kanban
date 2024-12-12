<script setup lang="ts">
import { useTaskStore } from "~/stores/store";
import type { Status, Task } from "~/types";
import { Statuses } from "~/constans/Statuses";

const { $toast } = useNuxtApp();

const taskStore = useTaskStore();

const { allTasks } = storeToRefs(taskStore);

const openModal = (): void => {
  taskStore.switchModal();
};

const filteredTasks = (statusId: number) =>
  computed(() =>
    allTasks.value.filter(
      (task: Task) => task.status && task.status.id === statusId,
    ),
  );

const selectRelevantStatus = (id: string): Status => {
  const result = Statuses.find((status: Status) => status.id === parseInt(id));
  return result;
};

const key = ref(1);
const updateStatus = (event): void => {
  try {
    const eventStatusKey = event.to.getAttribute("data-key");
    const newStatus = selectRelevantStatus(eventStatusKey);
    taskStore.updateTaskStatus(event.data.id, newStatus);
    key.value++;
    $toast.success(`Task status changed successfully`);
  } catch (error) {
    console.error(error);
    $toast.error(`Error: ${error}`);
  }
};
</script>

<template>
  <v-container fluid class="h-100">
    <ModalCreateOrUpdateTask />
    <div class="d-flex justify-center">
      <NuxtLink to="/"><v-btn color="info"> Go to main page </v-btn></NuxtLink>
    </div>
    <v-row>
      <v-col v-for="status in Statuses" :key="status.id">
        <v-card color="#FAFAFA" class="px-3 py-3" key="key">
          <v-alert
            width="100%"
            class="text-body-1 font-weight-medium justify-center mb-4"
          >
            {{ status.title }}
          </v-alert>

          <DraggableListsDragableInline
            :draggable-list-props="filteredTasks(status.id).value"
            :status="status"
            :group="'tasks'"
            :key="key"
            @drag:on-end="updateStatus"
          >
            <template #draggable-items="{ dragable }">
              <v-card
                v-for="item in dragable"
                :key="item.id"
                class="cursor-grab mb-3"
              >
                <TaskCard :taskData="item" />
              </v-card>
            </template>
          </DraggableListsDragableInline>
          <ButtonsAddTaskButton @open-modal="openModal" class="mt-4" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
