import config from "../config";

const bugy = (data: any) => {
  console.info("BUGY", JSON.stringify(data));
};

const getLangId = (lang: string) => {
  return (config as any)?.LANG_CODES[lang].id;
};

const getMaritalStatus = (id: number) => {
  return (config as any)?.marital_status[id];
};
export { bugy, getLangId, getMaritalStatus };
