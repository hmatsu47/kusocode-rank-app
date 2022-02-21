// APIからデータ取得
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getApiData = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
