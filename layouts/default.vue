<script lang="ts" setup>
useHead({
  title: "Task Board",
});
</script>
<template>
  <v-app>
    <Header />
    <v-main id="scroll-target">
      <v-container class="ma-0 pa-0" fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
