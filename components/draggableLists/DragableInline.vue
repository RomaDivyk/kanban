<script setup lang="ts" generic="T, U">
import type { DraggableEvent } from "vue-draggable-plus";
import { VueDraggable } from "vue-draggable-plus";
import type { Status } from "~/types";

interface IDraggableEmits {
  (
    e: "drag:on-end" | "drag:on-start" | "drag:on-add" | "drag:on-change",
    event: DraggableEvent,
  ): void;
}
interface IDraggableProps {
  draggableListProps: T[];
  group?: string;
  status?: Partial<Status>;
}
const emits = defineEmits<IDraggableEmits>();
const props = defineProps<IDraggableProps>();

const id = useId();

const draggableList = ref();

const onEnd = (e: DraggableEvent) => {
  emits("drag:on-end", e);
};

const cloneProps = (): void => {
  if (!props.draggableListProps) return;
  draggableList.value = props.draggableListProps.map((item: T) => ({
    ...item,
  }));
};
const setDateKey = computed(() => {
  return props.status ? props.status.id : id;
});
watchEffect(() => cloneProps());
</script>
<template>
  <vue-draggable
    v-model="draggableList"
    :group="props.group"
    :data-key="setDateKey"
    :scroll="true"
    ghost-class="ghost-card"
    :empty-insert-threshold="20"
    @end="onEnd"
  >
    <slot name="draggable-items" :dragable="draggableList" :end="onEnd" />
  </vue-draggable>
</template>
