<template>
  <div>{{ timeText }}</div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from "vue";
  import { getApiData } from "@/utils/apiHandler";
  import { useInterval } from "@/utils/useInterval";
  import { timeSpan } from "@/initial-time-file";

  export default defineComponent({
    setup() {
      // 競技開始時刻と終了時刻
      const compTimeSpan = ref(timeSpan);
      // 競技開始時刻を記録したJSONファイルをロード
      const load = async (): Promise<void> => {
        try {
          compTimeSpan.value = await getApiData(`./time.json`);
        } catch (err) {
          console.log(err);
        }
      };
      void load();
      // 現在時刻
      const date = ref(new Date());
      // 表示用の時刻（競技開始後は終了時刻までの差分）
      const timeText = computed(() => {
        const now = date.value.getTime();
        const startTime = new Date(compTimeSpan.value["start"]).getTime();
        const endTime = new Date(compTimeSpan.value["end"]).getTime();
        if (now < startTime) {
          return "競技開始前です";
        }
        if (endTime < now) {
          return "00:00:00";
        }
        const diff = endTime - now + 999;
        return [
          Math.floor(Math.abs(diff) / (60 * 60 * 1000)),
          Math.floor(Math.abs(diff) / (60 * 1000)) % 60,
          Math.floor(Math.abs(diff) / 1000) % 60,
          ]
          .map((n) => n.toString().padStart(2, '0'))
          .join(':');
      })
      // 100ms間隔で表示を更新する
      useInterval(() => {
        date.value = new Date();
      }, 100);
      // 10秒間隔で開始・終了時刻を再取得する
      useInterval(() => {
        load();
      }, 10000);
      return { timeText };
    },
  });
</script>
