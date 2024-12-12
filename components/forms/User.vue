<script setup lang="ts">
import type { User } from "~/types";
import { Users } from "~/constans/Users";

const { performers = false, label } = defineProps<{
  performers?: boolean;
  label: string;
}>();

const emit = defineEmits<{
  (e: "setRelevantUsers"): void;
}>();

const user = defineModel<User | User[] | null>();
</script>

<template>
  <v-select
    v-model="user"
    :items="Users"
    item-title="lastName"
    :item-value="(item: User) => item"
    variant="outlined"
    :label="label"
    :rules="[(v) => !!v || 'User is required']"
    :multiple="performers"
    density="compact"
    clearable
    @update:model-value="emit('setRelevantUsers')"
  >
    <template #item="{ props, item }">
      <v-list-item
        v-bind="props"
        :subtitle="item.raw.position"
        :title="`${item.raw.lastName} ${item.raw.firstName}`"
      ></v-list-item></template
  ></v-select>
</template>
