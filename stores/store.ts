import { defineStore } from "pinia";
import type { Status, Task, TasksInterface, User } from "~/types";

export const useTaskStore = defineStore("taskStore", {
  state: (): TasksInterface => ({
    statuses: [],
    task: {
      id: null,
      title: "",
      description: "",
      responsibleUser: null,
      performers: [],
      status: null,
      priority: null,
    },
    allTasks: [],
    modal: false,
  }),
  actions: {
    setResponsibleUser(value: User | null): void {
      this.task.responsibleUser = value;
    },

    setPerformers(value: User[] | null): void {
      this.task.performers = value;
    },

    setStatus(value: Status | null): void {
      this.task.status = value;
    },

    setTask(value: Task): void {
      this.task = value;
    },

    switchModal(): void {
      this.modal = !this.modal;
    },

    clearTask(): void {
      this.task = {
        id: null,
        title: "",
        description: "",
        responsibleUser: null,
        performers: [],
        status: null,
        priority: null,
      };
    },

    generateRandomId(): number {
      return Math.floor(Math.random() * 10000000) + 1;
    },

    createTask(): void {
      const newTask = {
        ...this.task,
        id: this.generateRandomId(),
        status: this.task.status || { id: 1, title: "Todo" },
      };
      this.allTasks.push(newTask);
    },

    updateTask(): void {
      const index = this.allTasks.findIndex(
        (currentTask: Task) => currentTask.id === this.task.id,
      );
      if (index !== -1) this.allTasks[index] = { ...this.task };
    },

    updateTaskStatus(id: number, newStatus: Status): void {
      const taskToUpdate = this.allTasks.find(
        (currentTask: Task) => currentTask.id === id,
      );
      if (taskToUpdate) {
        taskToUpdate.status = newStatus;
        const index = this.allTasks.findIndex(
          (currentTask: Task) => currentTask.id === id,
        );
        if (index !== -1) {
          this.allTasks[index] = { ...taskToUpdate };
        }
      }
    },

    deleteTask(value: number) {
      this.allTasks = this.allTasks.filter((task: Task) => task.id !== value);
    },
  },
});
