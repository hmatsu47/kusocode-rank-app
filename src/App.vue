<template>
  <div class="title">
    <h1>
      社内 ISUCON #1 :
      <p class="unko">クソコード</p>
      を直せ！
    </h1>
  </div>
  <div class="clock">
    <div>
      <h2>現在の時刻</h2>
    </div>
    <Clock class="time" />
  </div>
  <div class="timer">
    <div>
      <h2>残り時間</h2>
    </div>
    <Timer class="time" />
  </div>
  <div class="rank">
    <div>
      <h2>現在のランキング</h2>
      <h3 class="notice">（注）終了30分前以降は更新されません</h3>
    </div>
    <RankChart />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Clock from "@/components/Clock.vue";
import Timer from "@/components/Timer.vue";
import RankChart from "@/components/RankChart.vue";

export default defineComponent({
  name: "View",
  components: {
    Clock,
    Timer,
    RankChart,
  },
});
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  font-family: fantasy;
  .unko {
    color: brown;
    display: inline;
  }
}
.clock {
  text-align: center;
  .time {
    font-family: "Courier New", Courier, monospace;
    font-size: 36px;
    font-weight: bold;
    color: darkcyan;
  }
}
.timer {
  text-align: center;
  .time {
    font-family: "Courier New", Courier, monospace;
    font-size: 36px;
    font-weight: bold;
    color: darkmagenta;
  }
}
.rank {
  text-align: center;
  .notice {
    color: darkred;
  }
}
</style>
