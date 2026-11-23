// All facts come from veon/client.json (C-001…C-021) and design/concept.md. Nothing here is invented.
// Prices: the clinic does not state a currency (C-012, R-105 — client decision), so numbers are shown without it.

export const PHONE_TEL = "tel:+380684911911";
export const PHONE_LABEL = "068 491 19 11";
export const PHONE_FULL = "+38 068 491 19 11";
export const EMAIL = "dentalclinicexpert@gmail.com";
export const INSTAGRAM = "https://www.instagram.com/expert_dental_clinic/";
export const FACEBOOK = "https://www.facebook.com/Expertdentalclinic";

export const HOURS = [
  { days: "Пн–Пт", time: "9:00–21:00" },
  { days: "Сб", time: "9:00–16:00" },
  { days: "Нд", time: "вихідний" },
] as const;

const mapUrl = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export interface Clinic {
  id: string;
  street: string;
  house: string;
  full: string;
  map: string;
}

export const CLINICS: Clinic[] = [
  {
    id: "velykoho",
    street: "Володимира Великого",
    house: "10Б",
    full: "вул. Володимира Великого, 10Б",
    map: mapUrl("Львів, вулиця Володимира Великого, 10Б"),
  },
  {
    id: "okruzhna",
    street: "Окружна",
    house: "94а",
    full: "вул. Окружна, 94а",
    map: mapUrl("Львів, вулиця Окружна, 94а"),
  },
];

export interface PriceRow { label: string; value: string; }
export interface Direction {
  id: string;
  title: string;
  lead: string;
  priceLabel: string;
  price: string;
  from: boolean;
  more: PriceRow[];
  kidsLink?: boolean;
}

export const DIRECTIONS: Direction[] = [
  {
    id: "therapy",
    title: "Терапевтична стоматологія",
    lead: "Реставрація, лікування під мікроскопом, пародонтологія, відбілювання.",
    priceLabel: "композитна пломба",
    price: "1 490",
    from: true,
    more: [
      { label: "Пломба Gradia GC: поверхневий, середній, глибокий карієс", value: "1 490 / 1 850 / 2 250" },
      { label: "Професійна гігієна, залежно від нальоту", value: "1 800 / 2 100" },
      { label: "Відбілювання", value: "4 500 / 5 700" },
      { label: "Консультація терапевта або пародонтолога", value: "500" },
    ],
  },
  {
    id: "surgery",
    title: "Хірургічна стоматологія та імплантація",
    lead: "Імплантація, видалення зубів, зокрема зубів мудрості.",
    priceLabel: "імплантація",
    price: "24 960",
    from: true,
    more: [
      { label: "Імплантація", value: "від 24 960" },
      { label: "Складне видалення зуба", value: "1 150" },
      { label: "Консультація хірурга з планом лікування", value: "600" },
    ],
  },
  {
    id: "aesthetics",
    title: "Естетична стоматологія та протезування",
    lead: "Вініри, коронки, знімні й незнімні протези.",
    priceLabel: "цирконієва коронка",
    price: "13 260",
    from: true,
    more: [
      { label: "Коронка цирконієва безметалева", value: "від 13 260" },
      { label: "Коронка металокерамічна", value: "5 720 / 6 120" },
      { label: "Коронка суцільнолита", value: "2 000" },
      { label: "Повний знімний протез", value: "8 000" },
      { label: "Консультація ортопеда з планом лікування", value: "600" },
    ],
  },
  {
    id: "orthodontics",
    title: "Ортодонтія",
    lead: "Брекети металеві, керамічні, лінгвальні; елайнери.",
    priceLabel: "консультація ортодонта з планом лікування",
    price: "600",
    from: false,
    more: [
      { label: "Консультація ортодонта з планом лікування", value: "600" },
      { label: "Вартість брекетів і елайнерів уточнюйте в адміністратора", value: "" },
    ],
  },
  {
    id: "kids",
    title: "Дитяча стоматологія «ЕКСПЕРТ Діти»",
    lead: "Адаптація, профілактика, лікування, седація, групові заняття-знайомства.",
    priceLabel: "консультація дитячого стоматолога",
    price: "500",
    from: false,
    more: [],
    kidsLink: true,
  },
  {
    id: "no-stress",
    title: "Лікування без стресу",
    lead: "Лікування в загальному наркозі та під закисом азоту.",
    priceLabel: "загальний наркоз (севофлуран) до 2 год",
    price: "8 500",
    from: false,
    more: [
      { label: "Загальний інгаляційний наркоз (севофлуран), до 2 годин", value: "8 500" },
    ],
  },
  {
    id: "xray",
    title: "Рентгенодіагностика",
    lead: "Рентген зуба, панорамний знімок.",
    priceLabel: "радіовізіограф",
    price: "150",
    from: true,
    more: [
      { label: "Радіовізіограф (знімок зуба)", value: "150" },
      { label: "Панорамний знімок", value: "500" },
    ],
  },
];

export interface Doctor {
  id: string;
  name: string;
  years: number;
  role: string;
  focus: string;
}

export const DOCTORS: Doctor[] = [
  { id: "potashnyk", name: "Ірина Поташник", years: 14, role: "Директор клініки", focus: "Терапевтична стоматологія дорослих і дітей, ендодонтія під мікроскопом, художня реставрація, пародонтологія" },
  { id: "zhuk", name: "Михайло Жук", years: 18, role: "", focus: "Хірургічна стоматологія, імплантологія, протезування" },
  { id: "lapida", name: "Тетяна Лапіда", years: 16, role: "Лікар вищої категорії", focus: "Терапевтична та дитяча стоматологія, художня реставрація, професійна гігієна" },
  { id: "yehorova", name: "Світлана Єгорова", years: 10, role: "", focus: "Терапевтична та дитяча стоматологія, ендодонтія, художня реставрація" },
  { id: "kolesnichenko", name: "Володимир Колєсніченко", years: 13, role: "", focus: "Терапевтична стоматологія, ендодонтія, художня реставрація, протезування" },
  { id: "pavlishak", name: "Іван Павлішак", years: 13, role: "", focus: "Ортопедична та хірургічна стоматологія, імплантологія, дизайн нової посмішки" },
];

export const FIRST_VISIT: PriceRow[] = [
  { label: "Консультація дитячого стоматолога, терапевта або пародонтолога", value: "500" },
  { label: "Консультація хірурга, ортопеда або ортодонта", value: "600" },
  { label: "Консультація з планом лікування: імплантація, ортопедія, ортодонтія", value: "600" },
  { label: "Панорамний знімок", value: "500" },
  { label: "Радіовізіограф", value: "150" },
];

export const INSURERS = ["СГ «ТАС»", "СК «АРКС»", "«КНЯЖА»", "«УНІКА»", "«СОС Сервіс Україна»", "«МАРС-АСИСТАНС»"];

export const SERVICES_LD = DIRECTIONS.map((d) => d.title);
