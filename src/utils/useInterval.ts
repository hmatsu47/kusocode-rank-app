import { onBeforeUnmount } from "vue";

// ソースはこちら
// https://github.com/ics-creative/210929_vue_composition/blob/master/src/samples/04_time/useInterval.ts
export const useInterval = (f: () => void, ms: number) => {
  /** タイマー */
  const timer = window.setInterval(f, ms);

  /** 解除処理 */
  const clear = () => {
    window.clearInterval(timer);
  };

  // コンポーネント破棄時に解除
  onBeforeUnmount(clear);

  // 任意のタイミングで止められるように、clear関数を返却
  return { clear };
};
