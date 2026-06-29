import { assetPath } from "@/lib/paths";

export type CasePhoto = {
  src: string;
  alt: string;
  featured?: boolean;
};

export type CaseCategorySlug =
  | "corporate-events"
  | "wedding-parties"
  | "festival-parties"
  | "community-events"
  | "private-outdoor-parties";

export type CaseCategory = {
  slug: CaseCategorySlug;
  eyebrow: string;
  title: string;
  shortTitle: string;
  description: string;
  metaDescription: string;
  caseIds: string[];
};

export type CaseDetail = {
  slug: string;
  lead: string;
  article?: {
    title: string;
    paragraphs: string[];
  };
  facts: Array<{
    label: string;
    value: string;
  }>;
  sections: Array<{
    title: string;
    body: string;
  }>;
  suitedFor: string[];
};

export type CaseItem = {
  id: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  summary: string;
  metaDescription: string;
  eventType: string;
  setting: string;
  serviceFocus: string[];
  categorySlugs: CaseCategorySlug[];
  photos: CasePhoto[];
  detail?: CaseDetail;
};

export const caseCategories: CaseCategory[] = [
  {
    slug: "corporate-events",
    eyebrow: "CORPORATE EVENTS",
    title: "企業團體外燴案例",
    shortTitle: "企業團體",
    description:
      "品牌活動、團隊聚會與特殊場地活動，依現場人流與活動節奏安排餐點、烤檯與服務動線。",
    metaDescription:
      "查看 Samba 窯烤企業團體外燴案例，包含大魯閣打擊場活動等現場窯烤服務情境。",
    caseIds: ["batting-center-event"]
  },
  {
    slug: "wedding-parties",
    eyebrow: "WEDDING PARTIES",
    title: "婚禮派對外燴案例",
    shortTitle: "婚禮派對",
    description:
      "戶外證婚、花園婚禮與婚宴派對，以現場窯烤和餐檯規劃創造自然、有記憶點的宴客氣氛。",
    metaDescription:
      "查看 Samba 窯烤婚禮派對外燴案例，包含陽明山花園婚禮與戶外婚禮現場窯烤服務。",
    caseIds: ["yangmingshan-garden-wedding"]
  },
  {
    slug: "festival-parties",
    eyebrow: "FESTIVAL PARTIES",
    title: "節慶派對外燴案例",
    shortTitle: "節慶派對",
    description:
      "從巴西國慶到聖誕派對，把節慶主題、戶外場地與現烤香氣整合成更有現場感的聚會。",
    metaDescription:
      "查看 Samba 窯烤節慶派對外燴案例，包含巴西國慶日與橋下聖誕烤肉派對。",
    caseIds: ["brazil-national-day", "christmas-bridge-party"]
  },
  {
    slug: "community-events",
    eyebrow: "COMMUNITY EVENTS",
    title: "社區與里民活動外燴案例",
    shortTitle: "社區活動",
    description:
      "把行動烤檯帶進社區與公共活動現場，讓里民聚會在輕鬆的節奏中共享熱食與互動。",
    metaDescription:
      "查看 Samba 窯烤社區與里民活動外燴案例，了解戶外聚會與公共活動的現場供餐方式。",
    caseIds: ["ruifang-community-event"]
  },
  {
    slug: "private-outdoor-parties",
    eyebrow: "PRIVATE OUTDOOR PARTIES",
    title: "私人與戶外派對外燴案例",
    shortTitle: "私人戶外",
    description:
      "生日、好友聚會、寵物友善活動與特殊戶外場地，都能依活動型態調整餐點與服務動線。",
    metaDescription:
      "查看 Samba 窯烤私人與戶外派對外燴案例，包含毛孩聚會與橋下聖誕烤肉派對。",
    caseIds: ["pet-outdoor-bbq-party", "christmas-bridge-party"]
  }
];

export const caseItems: CaseItem[] = [
  {
    id: "brazil-national-day",
    eyebrow: "BRAZIL NATIONAL DAY",
    title: "巴西國慶日活動外燴",
    shortTitle: "巴西國慶日",
    summary:
      "以現場窯烤料理與熱情服務，一起感受充滿巴西風情的節慶聚會。",
    metaDescription:
      "巴西國慶日活動外燴案例，Samba 窯烤以現場炭火料理、活動餐檯與服務動線支援大型節慶聚會。",
    eventType: "節慶派對",
    setting: "戶外活動場地",
    serviceFocus: ["現場窯烤料理", "節慶活動餐檯", "賓客互動與服務動線"],
    categorySlugs: ["festival-parties"],
    photos: [
      {
        src: assetPath("/images/case-brazil-national-day-cover.jpg"),
        alt: "巴西國慶日活動現場",
        featured: true
      },
      {
        src: assetPath("/images/case-brazil-national-day-venue.jpg"),
        alt: "巴西國慶日戶外活動場地"
      },
      {
        src: assetPath("/images/case-brazil-national-day-grill.jpg"),
        alt: "巴西國慶日現場窯烤料理"
      },
      {
        src: assetPath("/images/case-brazil-national-day-guests.jpg"),
        alt: "巴西國慶日賓客聚會"
      },
      {
        src: assetPath("/images/case-brazil-national-day-service.jpg"),
        alt: "Samba 巴西國慶日外燴服務"
      }
    ],
    detail: {
      slug: "brazil-national-day",
      lead:
        "節慶活動需要的不只是餐點，也需要和現場氣氛連在一起的服務節奏。這場巴西國慶日活動以戶外空間、賓客互動與現場窯烤共同構成 Samba 的主題感。",
      article: {
        title: "巴西國慶日活動外燴｜巴西主題聚會的現場窯烤服務",
        paragraphs: [
          "Samba 窯烤外燴曾為巴西國慶日活動提供現場代烤服務，營造熱鬧的節慶聚會氛圍。",
          "適合主題派對、異國風聚會與節慶活動安排。"
        ]
      },
      facts: [
        { label: "活動類型", value: "節慶派對" },
        { label: "場地情境", value: "戶外活動場地" },
        { label: "規模資訊", value: "大型活動情境，實際人數依預約資料確認" },
        { label: "服務重點", value: "現場窯烤、供餐動線、節慶氛圍" }
      ],
      sections: [
        {
          title: "活動需求",
          body:
            "這類活動通常同時有交流、拍照、節目與餐飲需求，外燴不適合只做靜態餐點陳列，必須讓賓客容易取餐，也能感受到活動主題。"
        },
        {
          title: "Samba 的處理",
          body:
            "以現場窯烤作為視覺與香氣核心，搭配餐檯服務和賓客動線安排，讓餐點成為節慶氣氛的一部分。"
        },
        {
          title: "案例重點",
          body:
            "適合需要主題感、節慶氣氛與現場互動的大型派對，尤其是節慶活動、異國風聚會與戶外交流場合。"
        }
      ],
      suitedFor: ["主題派對", "節慶活動", "文化交流活動", "大型戶外聚會"]
    }
  },
  {
    id: "batting-center-event",
    eyebrow: "BATTING CENTER EVENT",
    title: "大魯閣打擊場活動外燴",
    shortTitle: "大魯閣打擊場活動",
    summary:
      "打擊場聚會也能享用現烤窯烤料理，Samba 團隊到場準備餐點與服務。",
    metaDescription:
      "大魯閣打擊場活動外燴案例，Samba 窯烤支援企業團體與特殊場地活動的現場供餐服務。",
    eventType: "企業團體活動 / 特殊場地聚會",
    setting: "打擊場活動空間",
    serviceFocus: ["特殊場地供餐", "餐檯與用餐區安排", "團體活動服務"],
    categorySlugs: ["corporate-events"],
    photos: [
      {
        src: assetPath("/images/case-batting-center-service.jpg"),
        alt: "Samba 團隊現場準備餐點與服務",
        featured: true
      },
      {
        src: assetPath("/images/case-batting-center-venue.jpg"),
        alt: "大魯閣打擊場活動場地與賓客"
      },
      {
        src: assetPath("/images/case-batting-center-buffet.jpg"),
        alt: "打擊場活動外燴餐檯"
      },
      {
        src: assetPath("/images/case-batting-center-dining.jpg"),
        alt: "大魯閣打擊場聚會用餐區"
      }
    ],
    detail: {
      slug: "batting-center-event",
      lead:
        "打擊場活動重點在於讓賓客可以一邊參與活動，一邊自然取得餐點。Samba 以現場服務與餐檯安排支援這類特殊場地聚會。",
      article: {
        title: "大魯閣打擊場活動外燴｜企業聚會與運動活動的現場窯烤服務",
        paragraphs: [
          "Samba 窯烤外燴曾到大魯閣打擊場活動現場提供餐飲服務，為參與者準備現烤窯烤料理、配菜與活動餐點。打擊場聚會本身有運動、互動與休息交流的節奏，搭配現場窯烤料理，可以讓活動不只是玩樂，也多了熱食供應與聚會氛圍。",
          "這類活動很適合企業聚餐、員工活動、朋友聚會、社團活動或運動型活動安排。Samba 團隊可依照人數、場地條件與活動流程，規劃適合現場出餐的窯烤外燴服務，讓主辦方不需要另外煩惱備餐、烤肉與餐點供應問題。"
        ]
      },
      facts: [
        { label: "活動類型", value: "企業團體活動、特殊場地聚會" },
        { label: "場地情境", value: "打擊場活動空間" },
        { label: "規模資訊", value: "團體活動情境，實際人數依預約資料確認" },
        { label: "服務重點", value: "餐檯安排、現場服務、用餐區動線" }
      ],
      sections: [
        {
          title: "活動需求",
          body:
            "特殊場地活動需要兼顧活動動線與取餐動線，避免餐檯影響原本的活動節奏。"
        },
        {
          title: "Samba 的處理",
          body:
            "團隊到場準備餐點與餐檯，讓參加者在活動間自然用餐，保留打擊場聚會的輕鬆感。"
        },
        {
          title: "案例重點",
          body:
            "適合企業團建、品牌活動、運動空間聚會與其他非傳統宴會場地參考。"
        }
      ],
      suitedFor: ["企業團建", "運動場館活動", "品牌活動", "特殊場地聚會"]
    }
  },
  {
    id: "christmas-bridge-party",
    eyebrow: "CHRISTMAS PARTY",
    title: "橋下聖誕烤肉派對",
    shortTitle: "橋下聖誕派對",
    summary:
      "橋下空間化身熱鬧聚會現場，旋轉窯烤與現烤料理陪大家一起過聖誕。",
    metaDescription:
      "橋下聖誕烤肉派對外燴案例，Samba 窯烤支援戶外節慶聚會與特殊場地現場供餐。",
    eventType: "節慶派對 / 戶外聚會",
    setting: "橋下戶外空間",
    serviceFocus: ["旋轉窯烤", "特殊場地供餐", "節慶聚會氛圍"],
    categorySlugs: ["festival-parties", "private-outdoor-parties"],
    photos: [
      {
        src: assetPath("/images/case-christmas-bridge-cover.jpg"),
        alt: "橋下聖誕烤肉派對旋轉烤全雞",
        featured: true
      },
      {
        src: assetPath("/images/case-christmas-bridge-guests.jpg"),
        alt: "橋下聖誕派對賓客享用窯烤料理"
      },
      {
        src: assetPath("/images/case-christmas-bridge-grill.jpg"),
        alt: "聖誕派對現場旋轉窯烤"
      },
      {
        src: assetPath("/images/case-christmas-bridge-fish.jpg"),
        alt: "橋下派對現場烤魚料理"
      }
    ],
    detail: {
      slug: "christmas-bridge-party",
      lead:
        "橋下空間不一定是標準宴會場，但只要動線和供餐方式安排得宜，也能成為有氣氛的節慶派對現場。",
      article: {
        title: "橋下聖誕烤肉派對｜戶外活動現場窯烤外燴",
        paragraphs: [
          "Samba 窯烤外燴曾於橋下空間提供聖誕烤肉派對服務。從創立初期開始，我們就經常在橋下、露營區與戶外場地提供現場窯烤與代烤服務。",
          "適合公司聖誕活動、朋友聚會、社區派對安排。"
        ]
      },
      facts: [
        { label: "活動類型", value: "節慶派對、戶外聚會" },
        { label: "場地情境", value: "橋下戶外空間" },
        { label: "規模資訊", value: "節慶聚會情境，實際人數依預約資料確認" },
        { label: "服務重點", value: "旋轉窯烤、烤魚料理、戶外供餐" }
      ],
      sections: [
        {
          title: "活動需求",
          body:
            "聖誕聚會需要熱鬧、有畫面，也需要餐點能配合戶外場地的停留與交流節奏。"
        },
        {
          title: "Samba 的處理",
          body:
            "以旋轉窯烤和現場熱食創造視覺焦點，讓橋下空間自然變成節慶派對的聚會中心。"
        },
        {
          title: "案例重點",
          body:
            "適合聖誕派對、年末聚會、戶外烤肉派對與其他特殊場地活動參考。"
        }
      ],
      suitedFor: ["聖誕派對", "年末聚會", "戶外烤肉派對", "特殊場地活動"]
    }
  },
  {
    id: "ruifang-community-event",
    eyebrow: "COMMUNITY EVENT",
    title: "瑞芳里民活動外燴",
    shortTitle: "瑞芳里民活動",
    summary:
      "把現烤香氣帶進里民聚會，讓大家在輕鬆熱鬧的氣氛中共享餐點。",
    metaDescription:
      "瑞芳里民活動外燴案例，Samba 窯烤以現場窯烤料理支援社區與公共活動聚會。",
    eventType: "社區活動 / 里民聚會",
    setting: "戶外社區活動現場",
    serviceFocus: ["社區活動供餐", "現場窯烤料理", "公共活動動線"],
    categorySlugs: ["community-events"],
    photos: [
      {
        src: assetPath("/images/case-ruifang-community-cover.jpg"),
        alt: "瑞芳里民活動現場",
        featured: true
      },
      {
        src: assetPath("/images/case-ruifang-community-event.jpg"),
        alt: "瑞芳里民戶外聚會"
      },
      {
        src: assetPath("/images/case-ruifang-community-grill.jpg"),
        alt: "瑞芳里民活動窯烤料理"
      },
      {
        src: assetPath("/images/case-ruifang-community-poster.png"),
        alt: "瑞芳里民活動紀錄"
      }
    ],
    detail: {
      slug: "ruifang-community-event",
      lead:
        "社區活動講求輕鬆、好取餐，也需要讓不同年齡層的參加者能自然共享熱食與活動氣氛。",
      article: {
        title: "瑞芳里民活動外燴｜社區聚會外燴服務",
        paragraphs: [
          "Samba 窯烤外燴曾為瑞芳里民活動提供現場餐飲服務，將巴西窯烤帶入社區聚會中。",
          "適合里民活動、社區派對、戶外聚餐與地方活動外燴安排。"
        ]
      },
      facts: [
        { label: "活動類型", value: "社區活動、里民聚會" },
        { label: "場地情境", value: "戶外社區活動現場" },
        { label: "規模資訊", value: "公共活動情境，實際人數依預約資料確認" },
        { label: "服務重點", value: "社區活動供餐、現場窯烤、公共空間動線" }
      ],
      sections: [
        {
          title: "活動需求",
          body:
            "里民活動需要供餐動線清楚，也要讓餐點能配合戶外公共空間的交流節奏。"
        },
        {
          title: "Samba 的處理",
          body:
            "把行動烤檯與現烤香氣帶進社區現場，讓聚會不只是取餐，也有活動感。"
        },
        {
          title: "案例重點",
          body:
            "適合社區活動、里民聚會、公共空間活動與地方型節慶參考。"
        }
      ],
      suitedFor: ["社區活動", "里民聚會", "地方節慶", "公共空間聚會"]
    }
  },
  {
    id: "pet-outdoor-bbq-party",
    eyebrow: "PET FRIENDLY EVENT",
    title: "毛孩聚會｜50隻毛孩的戶外窯烤派對",
    shortTitle: "毛孩戶外窯烤派對",
    summary:
      "毛孩自在奔跑，主人輕鬆相聚；現場窯烤讓戶外派對多一份香氣與熱鬧。",
    metaDescription:
      "毛孩聚會戶外窯烤派對案例，Samba 窯烤為寵物友善戶外活動安排現場外燴服務。",
    eventType: "寵物友善戶外聚會",
    setting: "戶外寵物活動場地",
    serviceFocus: ["戶外派對供餐", "人寵同場動線", "現場窯烤料理"],
    categorySlugs: ["private-outdoor-parties"],
    photos: [
      {
        src: assetPath("/images/pet-party-venue-mosaicked.jpg"),
        alt: "毛孩戶外活動場地",
        featured: true
      },
      {
        src: assetPath("/images/pet-party-woman-mosaicked.jpg"),
        alt: "參加者與薩摩耶合影"
      },
      {
        src: assetPath("/images/pet-party-christmas-samoyed.jpg"),
        alt: "聖誕裝扮的薩摩耶"
      },
      {
        src: assetPath("/images/pet-party-dog-friends.jpg"),
        alt: "薩摩耶與米格魯相聚"
      },
      {
        src: assetPath("/images/pet-party-samoyed-group.jpg"),
        alt: "戶外活動中的薩摩耶群"
      },
      {
        src: assetPath("/images/pet-party-venue-sign.jpg"),
        alt: "毛孩戶外聚會場地"
      }
    ],
    detail: {
      slug: "pet-outdoor-bbq-party",
      lead:
        "這場戶外聚會的主角不只有人，還有 50 隻毛孩。活動需要讓主人能安心交流，也要讓戶外空間保有自由、輕鬆和熱鬧的節奏。",
      article: {
        title: "毛孩聚會外燴｜寵物友善戶外派對現場窯烤",
        paragraphs: [
          "Samba 窯烤外燴曾為 50 隻毛孩的戶外聚會提供現場餐飲服務，讓主人們在寵物友善空間中輕鬆相聚的同時也能享用熱騰騰的現烤料理。",
          "適合狗狗聚會、寵物活動、朋友聚餐與戶外派對外燴安排。"
        ]
      },
      facts: [
        { label: "活動類型", value: "寵物友善戶外派對" },
        { label: "場地情境", value: "戶外毛孩活動場地" },
        { label: "規模資訊", value: "50 隻毛孩的戶外聚會情境" },
        { label: "服務重點", value: "戶外供餐、人寵同場動線、現場窯烤" }
      ],
      sections: [
        {
          title: "活動需求",
          body:
            "寵物友善活動的供餐重點在於讓主人能輕鬆取餐、交流，同時避開過度擁擠的動線，讓毛孩活動空間保有彈性。"
        },
        {
          title: "Samba 的處理",
          body:
            "以戶外餐檯和現場窯烤作為聚會核心，讓餐點服務不打斷活動節奏，也讓參加者能自然停留、拍照與互動。"
        },
        {
          title: "案例重點",
          body:
            "這類案例能展現 Samba 對特殊活動情境的適應力，特別適合寵物聚會、戶外社群活動與私人派對參考。"
        }
      ],
      suitedFor: ["寵物聚會", "戶外派對", "社群活動", "好友家庭日"]
    }
  },
  {
    id: "yangmingshan-garden-wedding",
    eyebrow: "GARDEN WEDDING",
    title: "陽明山花園婚禮｜森林系戶外婚禮",
    shortTitle: "陽明山花園婚禮",
    summary:
      "綠意環繞的花園長桌，搭配現場窯烤與精緻餐點，讓婚禮晚宴自然、溫暖又充滿香氣。",
    metaDescription:
      "陽明山花園婚禮外燴案例，Samba 窯烤以戶外餐檯、甜點展示與現場窯烤服務森林系婚禮。",
    eventType: "戶外婚禮 / 花園婚禮",
    setting: "陽明山花園戶外場地",
    serviceFocus: ["戶外婚禮餐檯", "現場窯烤料理", "甜點與點心展示"],
    categorySlugs: ["wedding-parties"],
    photos: [
      {
        src: assetPath("/images/case-yangmingshan-wedding-new-venue.jpg"),
        alt: "陽明山森林系花園婚禮宴會場地",
        featured: true
      },
      {
        src: assetPath("/images/case-yangmingshan-wedding-new-dessert-wall.jpg"),
        alt: "花園婚禮甜甜圈展示牆"
      },
      {
        src: assetPath("/images/case-yangmingshan-wedding-new-buffet.jpg"),
        alt: "森林系婚禮戶外餐點展示"
      },
      {
        src: assetPath("/images/case-yangmingshan-wedding-new-grill.jpg"),
        alt: "婚禮晚宴現場窯烤料理"
      },
      {
        src: assetPath("/images/case-yangmingshan-wedding-new-snacks.jpg"),
        alt: "花園婚禮點心餐檯"
      }
    ],
    detail: {
      slug: "yangmingshan-garden-wedding",
      lead:
        "戶外婚禮需要餐點、場地動線與宴客氣氛一起成立。這場陽明山花園婚禮以自然綠意、長桌宴客與現場窯烤構成溫暖的婚禮晚宴。",
      article: {
        title: "陽明山花園婚禮外燴｜森林系戶外婚禮餐飲服務",
        paragraphs: [
          "Samba 窯烤外燴曾於陽明山花園婚禮提供現場代烤服務，將餐點與婚禮氛圍結合。適合戶外婚禮、花園婚禮、婚禮晚宴與小型派對外燴安排，讓自然場地也能擁有溫暖又有記憶點的餐飲體驗。"
        ]
      },
      facts: [
        { label: "活動類型", value: "戶外婚禮、花園婚禮" },
        { label: "場地情境", value: "陽明山花園戶外場地" },
        { label: "規模資訊", value: "婚禮宴客情境，實際人數依預約資料確認" },
        { label: "服務重點", value: "餐檯規劃、現場窯烤、甜點與點心展示" }
      ],
      sections: [
        {
          title: "活動需求",
          body:
            "戶外婚禮希望保留自然感，但同時需要穩定供餐、清楚動線與足夠有記憶點的料理呈現。"
        },
        {
          title: "Samba 的處理",
          body:
            "以現場窯烤搭配戶外餐檯與甜點展示，讓賓客在花園空間中自然取餐、交流，也能感受到料理正在現場完成。"
        },
        {
          title: "案例重點",
          body:
            "適合正在規劃戶外證婚、森林系婚禮、花園晚宴或 After Party 的新人參考。"
        }
      ],
      suitedFor: ["戶外婚禮", "花園婚禮", "森林系婚禮", "婚宴 After Party"]
    }
  }
];

export const eventVideos = [
  {
    title: "巴西嘉年華烤肉趴",
    category: "FIESTA",
    description: "窯烤、音樂與熱情互動，一起感受 Samba 活動現場的節奏。",
    url: "https://www.facebook.com/SambaChurrasco/videos/1659504554093111/"
  }
];

export function facebookVideoEmbed(url: string) {
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=760`;
}

export function hasCaseDetail(
  item: CaseItem
): item is CaseItem & { detail: CaseDetail } {
  return Boolean(item.detail);
}

export function getCaseCategory(slug: string) {
  return caseCategories.find((category) => category.slug === slug);
}

export function getCaseById(id: string) {
  return caseItems.find((item) => item.id === id);
}

export function getCaseBySlug(slug: string) {
  return caseItems.find((item) => item.detail?.slug === slug);
}

export function getCasesByCategory(slug: CaseCategorySlug) {
  return caseItems.filter((item) => item.categorySlugs.includes(slug));
}

export function getCategoriesForCase(item: CaseItem) {
  return item.categorySlugs
    .map((slug) => getCaseCategory(slug))
    .filter((category): category is CaseCategory => Boolean(category));
}

export function getCasePath(item: CaseItem) {
  return item.detail ? `/cases/${item.detail.slug}` : `/cases#${item.id}`;
}

export const featuredCaseDetails = caseItems.filter(hasCaseDetail);

export const caseSitemapPaths = [
  ...caseCategories.map((category) => `/cases/${category.slug}`),
  ...featuredCaseDetails.map((item) => `/cases/${item.detail.slug}`)
];
