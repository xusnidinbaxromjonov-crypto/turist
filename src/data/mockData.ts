export const RAW_PLACES = [
  {
    id: 1,
    title: { uz: "Chorbog' dam olish maskani", ru: "Зона отдыха Чарвак" },
    category: { uz: "Tabiat", ru: "Природа" },
    image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop",
    desc: { uz: "Shahar shovqinidan uzoqda, musaffo havo va chiroyli tabiat qo'ynida dam olish uchun ajoyib maskan. Bu yerda siz oilangiz bilan sokin tabiatdan zavq olishingiz mumkin.", ru: "Вдали от городского шума, отличное место для отдыха на свежем воздухе и на лоне красивой природы. Здесь вы можете насладиться спокойной природой с семьей." },
    details: {
      location: { uz: "Farg'ona shahar markazidan 10 km uzoqlikda", ru: "В 10 км от центра Ферганы" },
      entryFee: { uz: "20,000 so'm", ru: "20,000 сум" },
      bestTime: { uz: "Bahor va yoz fasllari", ru: "Весна и лето" },
      rating: "4.8"
    }
  },
  {
    id: 2,
    title: { uz: "Jome masjidi", ru: "Мечеть Джоме" },
    category: { uz: "Tarix", ru: "История" },
    image: "/mosque.jpg",
    desc: { uz: "Qadimiy Jome masjidi o'zining betakror arxitekturasi va boy tarixi bilan sayyohlarni o'ziga jalb qiladi. Bu yerda siz sharqona me'morchilik namunasini ko'rishingiz mumkin.", ru: "Древняя мечеть Джоме привлекает туристов своей уникальной архитектурой и богатой историей. Здесь вы можете увидеть образец восточной архитектуры." },
    details: {
      location: { uz: "Farg'ona markazida", ru: "В центре Ферганы" },
      entryFee: { uz: "Bepul", ru: "Бесплатно" },
      bestTime: { uz: "Istalgan vaqt", ru: "Любое время" },
      rating: "4.9"
    }
  },
  {
    id: 3,
    title: { uz: "Mahalliy Bozor", ru: "Местный рынок" },
    category: { uz: "Madaniyat", ru: "Культура" },
    image: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=600&auto=format&fit=crop",
    desc: { uz: "Farg'onaning haqiqiy hayotini his qilish uchun mahalliy bozorga tashrif buyuring. Yangi uzilgan mevalar, sabzavotlar va milliy shirinliklar.", ru: "Посетите местный рынок, чтобы почувствовать настоящую жизнь Ферганы. Свежие фрукты, овощи и национальные сладости." },
    details: {
      location: { uz: "Bozor ko'chasi", ru: "Улица рынка" },
      entryFee: { uz: "Bepul", ru: "Бесплатно" },
      bestTime: { uz: "Ertalabki vaqtlar", ru: "Утреннее время" },
      rating: "4.5"
    }
  },
  {
    id: 4,
    title: { uz: "Tog' manzarasi", ru: "Горный пейзаж" },
    category: { uz: "Tabiat", ru: "Природа" },
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
    desc: { uz: "Tog' yonbag'irlari bo'ylab piyoda sayr qilish va betakror manzaralarni rasmga olish imkoniyati. Ekstremal sport va hayking ixlomandlari uchun.", ru: "Возможность прогуляться по горным склонам и сфотографировать уникальные пейзажи. Для любителей экстремального спорта и пешего туризма." },
    details: {
      location: { uz: "Farg'ona tog'lari", ru: "Ферганские горы" },
      entryFee: { uz: "Bepul", ru: "Бесплатно" },
      bestTime: { uz: "Kuz va baxor", ru: "Осень и весна" },
      rating: "4.7"
    }
  }
];

export const RAW_ROUTES = [
  {
    id: 1,
    title: { uz: "Farg'ona 1 kunlik sayohati", ru: "1-дневная поездка по Фергане" },
    desc: { uz: "Tayyor marshrutlar orqali vaqtni tejab va eng yaxshi joylarni kashf eting. Shaharning eng diqqatga sazovor joylarini bir kunda ko'rib chiqing.", ru: "Экономьте время с готовыми маршрутами и открывайте лучшие места. Посмотрите главные достопримечательности города за один день." },
    places: { uz: "6 joy", ru: "6 мест" },
    distance: { uz: "18 km", ru: "18 км" },
    duration: { uz: "1 kun", ru: "1 день" },
    image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=800&auto=format&fit=crop",
    featured: true,
    timeline: [
      { time: "09:00", act: { uz: "Markaziy maydonda uchrashuv", ru: "Встреча на центральной площади" } },
      { time: "10:30", act: { uz: "Tarixiy obidalarni ziyorat qilish", ru: "Посещение исторических памятников" } },
      { time: "13:00", act: { uz: "Milliy taomlardan tushlik", ru: "Обед из национальных блюд" } },
      { time: "15:00", act: { uz: "Tog' yonbag'rida sayr", ru: "Прогулка по склону горы" } },
      { time: "18:00", act: { uz: "Sayohat yakuni va suvenir xaridi", ru: "Окончание поездки и покупка сувениров" } }
    ]
  },
  {
    id: 2,
    title: { uz: "Jome masjidi", ru: "Мечеть Джоме" },
    places: { uz: "4 joy", ru: "4 места" },
    duration: { uz: "1 kun", ru: "1 день" },
    image: "/mosque.jpg",
    featured: false,
    timeline: [
      { time: "08:00", act: { uz: "Masjidni ziyorat qilish", ru: "Посещение мечети" } },
      { time: "11:00", act: { uz: "Qadimiy hovlilarni ko'zdan kechirish", ru: "Осмотр старинных дворов" } },
      { time: "14:00", act: { uz: "Tushlik", ru: "Обед" } },
      { time: "16:00", act: { uz: "Oila bilan dam olish bog'iga borish", ru: "Посещение парка отдыха с семьей" } }
    ]
  },
  {
    id: 3,
    title: { uz: "Shifoxona", ru: "Лечебница" },
    places: { uz: "5 joy", ru: "5 мест" },
    duration: { uz: "Yarim kun", ru: "Полдня" },
    image: "/banisa.jpg",
    featured: false,
    timeline: [
      { time: "09:00", act: { uz: "Oilaviy dam olish maskaniga yetib borish", ru: "Прибытие в зону семейного отдыха" } },
      { time: "10:00", act: { uz: "Sog'lomlashtirish muolajalari", ru: "Оздоровительные процедуры" } },
      { time: "13:00", act: { uz: "Birgalikda tushlik", ru: "Совместный обед" } }
    ]
  },
  {
    id: 4,
    title: { uz: "Tabiat marshruti", ru: "Маршрут природы" },
    places: { uz: "3 joy", ru: "3 места" },
    duration: { uz: "1 kun", ru: "1 день" },
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
    featured: false,
    timeline: [
      { time: "07:00", act: { uz: "Tog'ga ko'tarilish", ru: "Подъем в гору" } },
      { time: "12:00", act: { uz: "Cho'qqida piknik", ru: "Пикник на вершине" } },
      { time: "15:00", act: { uz: "Sharsharaga sayr", ru: "Прогулка к водопаду" } }
    ]
  },
  {
    id: 5,
    title: { uz: "Foto-tur marshruti", ru: "Фото-тур маршрут" },
    places: { uz: "8 joy", ru: "8 мест" },
    duration: { uz: "1 kun", ru: "1 день" },
    image: "/foto_tur_q.png",
    featured: false,
    timeline: [
      { time: "06:00", act: { uz: "Quyosh chiqishini rasmga olish", ru: "Съемка восхода солнца" } },
      { time: "10:00", act: { uz: "Tarixiy ko'chalarda fotosessiya", ru: "Фотосессия на исторических улицах" } },
      { time: "17:00", act: { uz: "Oltin soat - Tog'da suratga tushish", ru: "Золотой час - съемка в горах" } }
    ]
  }
];

export const RAW_BUSINESSES = [
  {
    id: 1,
    name: { uz: "Navro'z Restorani", ru: "Ресторан Навруз" },
    category: { uz: "Restoran", ru: "Ресторан" },
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=400&auto=format&fit=crop",
    location: { uz: "Markaziy ko'cha, 15", ru: "Улица Центральная, 15" },
    desc: { uz: "Milliy Farg'ona palovi va boshqa o'zbek taomlari tayyorlanadigan eng mashhur restoran.", ru: "Самый известный ресторан, где готовят национальный ферганский плов и другие узбекские блюда." }
  },
  {
    id: 2,
    name: { uz: "Farg'ona Mehmonxonasi", ru: "Отель Фергана" },
    category: { uz: "Mehmonxona", ru: "Отель" },
    rating: 4.5,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop",
    location: { uz: "A.Navoiy ko'chasi", ru: "Улица А.Навои" },
    desc: { uz: "Qulay xonalar va bepul nonushta. Shahar markazida joylashgan.", ru: "Комфортабельные номера и бесплатный завтрак. Расположен в центре города." }
  },
  {
    id: 3,
    name: { uz: "Choyxona 'Chorbog'", ru: "Чайхана 'Чарвак'" },
    category: { uz: "Kafe", ru: "Кафе" },
    rating: 4.9,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop",
    location: { uz: "Chorbog' bo'yi", ru: "У берега Чарвака" },
    desc: { uz: "Tabiat qo'ynida, suv bo'yida joylashgan an'anaviy choyxona.", ru: "Традиционная чайхана, расположенная на лоне природы, у воды." }
  },
  {
    id: 4,
    name: { uz: "Tog' Basi", ru: "У подножия гор" },
    category: { uz: "Dam olish", ru: "Отдых" },
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=400&auto=format&fit=crop",
    location: { uz: "Tog' etagi", ru: "Подножие горы" },
    desc: { uz: "Oila bilan dam olish uchun ajoyib joy, basseyn va kottejlar.", ru: "Отличное место для отдыха с семьей, бассейн и коттеджи." }
  }
];

export const RAW_PRODUCTS = [
  {
    id: 1,
    name: { uz: "Qo'lda to'qilgan gilam", ru: "Ковер ручной работы" },
    producer: { uz: "Mahalliy hunarmandlar", ru: "Местные ремесленники" },
    price: { uz: "1 200 000 so'm", ru: "1 200 000 сум" },
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=600&auto=format&fit=crop",
    desc: { uz: "Tabiiy ipak va jundan tayyorlangan, naqshinkor qadimiy uslubdagi Farg'ona gilamlari. Uyingizga haqiqiy sharqona ruh bag'ishlaydi.", ru: "Ферганские ковры ручной работы в старинном стиле из натурального шелка и шерсти. Придадут вашему дому настоящий восточный дух." }
  },
  {
    id: 2,
    name: { uz: "Tabiiy asal", ru: "Натуральный мед" },
    producer: { uz: "Tog' asalarichilari", ru: "Горные пчеловоды" },
    price: { uz: "150 000 so'm", ru: "150 000 сум" },
    image: "/asal_haqiqiy.png",
    desc: { uz: "Farg'ona tog'larining musaffo havosida gullagan tog' o'simliklaridan yig'ilgan toza asal. Shifobaxsh va immunitetni ko'taradi.", ru: "Чистый мед, собранный с горных растений, цветущих в чистом воздухе Ферганских гор. Целебный и повышающий иммунитет." }
  },
  {
    id: 3,
    name: { uz: "Sopol buyumlar", ru: "Керамические изделия" },
    producer: { uz: "Usta kulollar", ru: "Мастера гончары" },
    price: { uz: "85 000 so'm", ru: "85 000 сум" },
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=600&auto=format&fit=crop",
    desc: { uz: "Rishton uslubidagi chiroyli lagan, piyola va ko'zachalar. Har biri usta tomonidan qo'lda ishlangan.", ru: "Красивые тарелки, пиалы и кувшины в риштанском стиле. Каждое изделие сделано вручную мастером." }
  },
  {
    id: 4,
    name: { uz: "Milliy shirinliklar to'plami", ru: "Набор национальных сладостей" },
    producer: { uz: "Farg'ona shirinliklari", ru: "Ферганские сладости" },
    price: { uz: "120 000 so'm", ru: "120 000 сум" },
    image: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?q=80&w=600&auto=format&fit=crop",
    desc: { uz: "Navvot, parvarda, pashmak va boshqa mahalliy shirinliklardan iborat maxsus sovg'abop quti.", ru: "Специальная подарочная коробка с наватом, парвардой, пашмаком и другими местными сладостями." }
  }
];

export const RAW_EVENTS = [
  {
    id: 1,
    title: { uz: "Buloq sayli", ru: "Праздник источника" },
    date: { uz: "15 May, 2026", ru: "15 Мая, 2026" },
    location: { uz: "Chorbog' dam olish maskani", ru: "Зона отдыха Чарвак" },
    desc: { uz: "Buloq suvi atrofida milliy o'yinlar, dorbozlik va baxshilar musobaqasi.", ru: "Национальные игры, канатоходцы и состязания бахши у родниковой воды." },
    image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=400&auto=format&fit=crop",
    fullDesc: { uz: "Buloq sayli Farg'onaning eng qadimiy va sevimli bayramlaridan biri hisoblanadi. Tadbir davomida baxshilar bellashuvi, milliy kurash, dorbozlar o'yini kabi an'anaviy xalq o'yinlari namoyish etiladi. Shuningdek, mahalliy oshpazlar tomonidan qozonlarda palov damlanadi. Oilangiz va do'stlaringiz bilan qatnashib, ajoyib bahoriy kayfiyat oling!", ru: "Праздник родника - один из самых древних и любимых праздников Ферганы. Во время мероприятия демонстрируются такие традиционные народные игры, как состязания бахши, национальная борьба кураш, игры канатоходцев. Местные повара также готовят плов в казанах. Присоединяйтесь с семьей и друзьями и получите отличное весеннее настроение!" }
  },
  {
    id: 2,
    title: { uz: "Hunarmandlar yarmarkasi", ru: "Ярмарка ремесленников" },
    date: { uz: "22 May, 2026", ru: "22 Мая, 2026" },
    location: { uz: "Farg'ona markaziy maydoni", ru: "Центральная площадь Ферганы" },
    desc: { uz: "Farg'ona vodiysi hunarmandlarining ko'rgazmasi va master-klasslar.", ru: "Выставка и мастер-классы ремесленников Ферганской долины." },
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400&auto=format&fit=crop",
    fullDesc: { uz: "Ushbu yarmarkada Rishton kulolchiligi, Marg'ilon ipagi, Qo'qon yog'och o'ymakorligi ustalarining eng sara ishlari namoyish qilinadi. Siz nafaqat tayyor mahsulotlarni sotib olishingiz, balki o'z qo'lingiz bilan sopol buyum yasash yoki ip yigirish jarayonlarini master-klasslarda o'rganishingiz mumkin.", ru: "На этой ярмарке будут представлены лучшие работы мастеров риштанской керамики, маргиланского шелка, кокандской резьбы по дереву. Вы можете не только купить готовые изделия, но и научиться на мастер-классах делать керамические изделия своими руками или прясть нитки." }
  },
  {
    id: 3,
    title: { uz: "Tog' velomarafoni", ru: "Горный веломарафон" },
    date: { uz: "5 Iyun, 2026", ru: "5 Июня, 2026" },
    location: { uz: "Farg'ona tog'lari", ru: "Ферганские горы" },
    desc: { uz: "Havaskorlar va professionallar o'rtasida tog' yo'llari bo'ylab velomarafon.", ru: "Веломарафон по горным дорогам среди любителей и профессионалов." },
    image: "/velomarafon_q.png",
    fullDesc: { uz: "Ekstremal sport ixlosmandlari uchun maxsus tashkil etilgan ushbu velomarafon Farg'onaning xushmanzara tog' tizmalari bo'ylab o'tadi. Qatnashuvchilar uchun xavfsizlik choralari to'liq ko'rilgan va marshrut bo'ylab dam olish punktlari tashkil qilingan. G'oliblarni qimmatbaho sovg'alar kutmoqda!", ru: "Этот веломарафон, специально организованный для любителей экстремальных видов спорта, проходит по живописным горным хребтам Ферганы. Для участников приняты все меры безопасности, по маршруту организованы пункты отдыха. Победителей ждут ценные призы!" }
  }
];


// Helper function to extract uz translations from objects
const extractUz = (obj: any): any => {
  if (typeof obj === 'string') return obj;
  if (obj && typeof obj === 'object' && 'uz' in obj) return obj.uz;
  if (Array.isArray(obj)) return obj.map(extractUz);
  if (obj && typeof obj === 'object') {
    const res: any = {};
    for (const key in obj) {
      res[key] = extractUz(obj[key]);
    }
    return res;
  }
  return obj;
};

export const PLACES = RAW_PLACES.map(extractUz);
export const ROUTES = RAW_ROUTES.map(extractUz);
export const BUSINESSES = RAW_BUSINESSES.map(extractUz);
export const PRODUCTS = RAW_PRODUCTS.map(extractUz);
export const EVENTS = RAW_EVENTS.map(extractUz);
