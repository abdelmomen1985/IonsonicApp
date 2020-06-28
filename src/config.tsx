const config = {
  API_URL: "http://13.90.214.197:881/api/",
  PROXY_POST: "http://13.90.214.197:8081/hrback/public/api/",
  // TODO: make them dynamic [later]
  LANG_CODES: {
    ar: {
      code: "ar",
      id: 1,
    },
    en: {
      code: "en",
      id: 2,
    },
    hi: {
      code: "hi",
      id: 3,
    },
    bn: {
      code: "bn",
      id: 4,
    },
    ur: {
      code: "ur",
      id: 5,
    },
  },
  contact_us_types: {
    1: {
      ar_name: "أستعلام",
      en_name: "Inquiry",
    },
    2: {
      ar_name: "شكوي",
      en_name: "Complaint",
    },
    3: {
      ar_name: "سابقة أعمال",
      en_name: "PreviousWork",
    },
  },
};
export default config;
