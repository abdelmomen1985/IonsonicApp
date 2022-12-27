const config = {
  API_URL: "http://35.222.62.254:881/api/",
  // PROXY_POST: "http://13.90.214.197:8081/hrback/public/api/",
  ORIG_URL: "http://35.222.62.254:881/api/",
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
  fakeAPI: {
    news: [
      {
        Id: 1,
        TitleAr: "تجربة خبر عنوان الخبر",
        TitleEn: "Title text goes Here",
        DescAr:
          " تجربة  نص الخبر تجربة  نص الخبر تجربة  نص الخبر تجربة  نص الخبر تجربة  نص الخبر",
        DescEn:
          "News content goes here , news content goes here content goes here content goes here ",
        CreatedDate: "2020-05-01",
        Images: [
          {
            Image: "https://i.imgur.com/DJwGZkjl.jpg",
          },
        ],
      },
      {
        Id: 2,
        TitleAr: "تجربة خبر جديد ",
        TitleEn: "Title two text goes Here",
        DescAr:
          " تجربة  نص الخبر تجربة  نص الخبر تجربة  نص الخبر تجربة  نص الخبر تجربة  نص الخبر",
        DescEn:
          "News content goes here , news content goes here content goes here content goes here ",
        CreatedDate: "2020-06-01",
        Images: [
          {
            Image: "https://i.imgur.com/5miT1Bpl.jpg",
          },
        ],
      },
    ],
  },
  marital_status: {
    1: {
      ar_name: "اعزب",
      en_name: "Single",
    },
    2: {
      ar_name: "متزوج",
      en_name: "Married",
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
