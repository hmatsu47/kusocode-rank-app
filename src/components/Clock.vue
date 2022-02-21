<template>
  <div>{{ timeText }}</div>
</template>

// オリジナルのソースはこちら //
https://github.com/ics-creative/210929_vue_composition/blob/master/src/samples/04_time/TimeViewAfter.vue
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useInterval } from "@/utils/useInterval";

export default defineComponent({
  setup() {
    // 現在時刻
    const date = ref(new Date());
    // 表示用の時刻（hh:mm:ss）※24時間表記
    const timeText = computed(() => {
      const d = date.value;
      return [d.getHours(), d.getMinutes(), d.getSeconds()]
        .map((n) => n.toString().padStart(2, "0"))
        .join(":");
    });
    // 100ms間隔で表示を更新する
    useInterval(() => {
      date.value = new Date();
    }, 100);
    return { timeText };
  },
});
</script>
