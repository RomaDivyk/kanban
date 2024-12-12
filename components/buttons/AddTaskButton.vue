<script setup lang="ts">
const emit = defineEmits<{
  (e: "openModal"): void;
}>();
</script>

<template>
  <v-btn
    class="mb-2 w-100 d-flex justify-space-between"
    prepend-icon="mdi-plus"
    append-icon="mdi-card-bulleted-outline"
    @click="emit('openModal')"
  >
    Add a card
  </v-btn>
</template>
