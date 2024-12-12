<script setup lang="ts">
const emit = defineEmits<{
  (e: "reject" | "confirm"): void;
}>();
</script>

<template>
  <v-card-actions class="d-flex justify-end">
    <v-btn @click="emit('reject')"> Reject </v-btn>
    <v-btn @click="emit('confirm')"> Confirm </v-btn>
  </v-card-actions>
</template>
