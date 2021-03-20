const beijingDescription = `Home to the capital of China, 
    Beijing offers visitors the chance to witness both its ancient and modern blend.
    From the Forbidden City to the Great Wall of China, Beijing is one of the must-visit cities in China.`;

const chengduDescription = `Pandas. Pandas. Pandas. Chengdu is home to the world's largest panda research base. It is also known to be filled with 
    an abundance of hotpot restaurants, one of the top must-have meals in China.`;

const guangzhouDescription = `Home to dimsum, Guangzhou is a food lover's heaven. From the Canton Tower to the natural beauty of Baiyun Mountain,
    one thing is for certain. Everyone eats dimsum in Guangzhou.`;

const guilinDescription = `A land filled with karsts, Guilin is a must visit. Taking a cruise down the Li River from Guilin to Yangshou allows you
    to take in the sights of famous karst landscapes seen on Chinese monetary bills and paintings.`;

const hangzhouDescription = `Known for West Lake, Hangzhou is known for its beautiful scenery. Fog-filled hills, stunning sunsets have inspired
    Hangzhou to have been talked about throughout China's history as one of the most beautiful places.`;

const harbinDescription = `Home to the world's largest ice festival, Harbin from December to February is one of the must-see
    places in the entire world. Ice sculptors all around the world gather to create some of the most stunning ice sculptures out there.`;

const lhasaDescription = `Home of the Tibetan people, Lhasa is one of the highest cities in the world at nearly 12,000 feet. With the Himalayan Mountains
    within sight, experience the beauty of Tibetan monestaries alongside Tibetan culture.`;

const shanghaiDescription = `One of the most modern cities in the world, 
    Shanghai offers a blend of Chinese and European influence. Shanghai is a city that never sleeps.`;

const suzhouDescription = `Considered as one of the most beautiful places to visit in China, Suzhou offers
    beautiful water towns showing the charm and beauty of Suzhou gardens. A short distance from Shanghai makes a
    perfect day trip via the bullet train`;

const xianDescription = `Terracotta warriors, fortresses, pagodas. Xi'an is home to the world famous Terracotta Warriors alongside one of the largest ancient
    military defense systems in the world. Witness the history of an ancient city wall in a bustling city.`;

export const cities = [
  {
    id: 1,
    name: "Beijing",
    pinyin: "北京",
    img: require("@/assets/travel/beijing-ling-tang.jpg"),
    description: beijingDescription,
    attractions: ["Forbidden City", "Great Wall", "Temple of Heaven"],
    url: "https://unsplash.com/photos/yBroAF1cN3I"
  },
  {
    id: 3,
    name: "Shanghai",
    pinyin: "上海",
    img: require("@/assets/travel/shanghai-li-yang.jpg"),
    description: shanghaiDescription,
    attractions: ["The Bund", "Oriental Pearl TV Tower", "Nanjing Road"],
    url: "https://unsplash.com/photos/5h_dMuX_7RE"
  },
  {
    id: 5,
    name: "Suzhou",
    pinyin: "苏州",
    img: require("@/assets/travel/suzhou-zhang-kaiyv.jpg"),
    description: suzhouDescription,
    attractions: [
      "Humble Administrator's Garden",
      "Tiger Hill",
      "Zhouzhuang Water Town"
    ],
    url: "https://unsplash.com/photos/T6E_WftGLQs"
  },
  {
    id: 7,
    name: "Harbin",
    pinyin: "哈尔滨",
    img: require("@/assets/travel/harbin-erica-li.jpg"),
    description: harbinDescription,
    attractions: [
      "Ice & Snow World Festival",
      "Saint Sophia's Church",
      "Yabuli Ski Resort"
    ],
    url: "https://unsplash.com/photos/HsqB3X2tiOA"
  },
  {
    id: 9,
    name: "Guangzhou",
    pinyin: "广州",
    img: require("@/assets/travel/guangzhou-jason-yuen.jpg"),
    description: guangzhouDescription,
    attractions: ["Canton Tower", "Baiyun Mountain", "Shamian Island"],
    url: "https://unsplash.com/photos/jd2YTPu_q1Y"
  },
  {
    id: 11,
    name: "Hangzhou",
    pinyin: "杭州",
    img: require("@/assets/travel/hangzhou-max-van-den-oetelaar.jpg"),
    description: hangzhouDescription,
    attractions: ["West Lake", "Lingyin Temple", "Wuzhen Water Town"],
    url: "https://unsplash.com/photos/AxIS3R2_hBU"
  },
  {
    id: 13,
    name: "Guilin",
    pinyin: "桂林",
    img: require("@/assets/travel/guilin-farfar.jpg"),
    description: guilinDescription,
    attractions: ["Li River", "Yangshuo", "Longji Terraced Rice Fields"],
    url: "https://unsplash.com/photos/peK8iXqGMzQ"
  },
  {
    id: 15,
    name: "Chengdu",
    pinyin: "成都",
    img: require("@/assets/travel/chengdu-pascal-muller.jpg"),
    description: chengduDescription,
    attractions: [
      "Chengdu Research Base of Giant Panda Breeding",
      "Leshan Giant Budda",
      "Mount Emei"
    ],
    url: "https://unsplash.com/photos/wFUyCqW9tS4"
  },
  {
    id: 17,
    name: "Lhasa",
    pinyin: "拉萨",
    img: require("@/assets/travel/lhasa-citext-wing.jpg"),
    description: lhasaDescription,
    attractions: ["Potala Palace", "Jokhang Temple", "Ganden Monastery"],
    url: "https://unsplash.com/photos/2-gqoWYa3KM"
  },
  {
    id: 19,
    name: "Xi'an",
    pinyin: "西安",
    img: require("@/assets/travel/xian-aaron-greenwood.jpg"),
    description: xianDescription,
    attractions: [
      "Terracotta Warriors",
      "Giant Wild Goose Pagoda",
      "Bell Tower"
    ],
    url: "https://unsplash.com/photos/xZDWEEMS3sA"
  }
];
