<template>
  <Chart
    :size="{ width: 960, height: 480 }"
    :data="data"
    :margin="margin"
    :direction="direction"
    :axis="axis">
    <template #layers>
      <Grid strokeDasharray="2,2" />
      <Bar :dataKeys="['name', 'score']" :barStyle="{ fill: ['#48cae4'] }" :gap="32" />
    </template>

    <template #widgets>
      <Tooltip
        :hideLine="true"
        :config="{
          score: { color: '#48cae4' }
        }"
      />
    </template>
  </Chart>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { Chart, Grid, Bar, Tooltip } from "vue3-charts";
  import { getApiData } from "@/utils/apiHandler";
  import { useInterval } from "@/utils/useInterval";
  import { scoreByTeam } from "@/initial-score-file";

  export default defineComponent({
    // スコア表示用棒グラフに必要なデータを取得
    name: "BarChart",
    components: { Chart, Grid, Bar, Tooltip },
    setup() {
      // 各チームの名前と初期スコア（0点）をロード
      const data = ref(scoreByTeam);
      // スコアを記録したJSONファイルをロード
      const load = async (): Promise<void> => {
        try {
          data.value = await getApiData(`./score.json`);
        } catch (err) {
          console.log(err);
        }
      };
      void load();
      // スコア表示更新用タイマーをセット（10秒間隔で再表示）
      useInterval(() => load(), 10000);
      // 棒グラフの向き（縦方向に項目が並ぶグラフ）
      const direction = ref("vertical");
      // グラフ領域の外側のマージン
      const margin = ref({
        left: 32,
        top: 32,
        right: 32,
        bottom: 32,
      });
      // グラフの縦軸（primary）と横軸（secondary）の設定
      const axis = ref({
        primary: {
          type: "band"
        },
        secondary: {
          domain: ["dataMin", "dataMax + 100"],
          type: "linear",
          ticks: 10,
        },
      });
      return { data, direction, margin, axis };
    },
  });
</script>
