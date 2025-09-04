import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type Lang = "en" | "hi" | "ne" | "bo"; // English, Hindi, Nepali, Tibetan (bo)

const STRINGS: Record<Lang, Record<string, string>> = {
  en: {
    appName: "Monastery360",
    explore: "Explore",
    virtualTours: "Virtual Tours",
    interactiveMap: "Interactive Map",
    archives: "Digital Archives",
    calendar: "Cultural Calendar",
    audioGuide: "Smart Audio Guide",
    services: "Tourist Services",
    about: "About & Community",
    exploreNow: "Explore Now",
    monasteryOfWeek: "Monastery of the Week",
    quickLinks: "Quick Links",
    offline: "You are offline. Some features may be limited.",
    language: "Language",
  },
  hi: {
    appName: "मोनास्ट्री360",
    explore: "खोजें",
    virtualTours: "वर्चुअल टूर",
    interactiveMap: "इंटरएक्टिव मैप",
    archives: "डिजिटल आर्काइव",
    calendar: "सांस्कृतिक कैलेंडर",
    audioGuide: "स्मार्ट ऑडियो गाइड",
    services: "पर्यटन सेवाएँ",
    about: "हमारे बारे में",
    exploreNow: "अभी देखें",
    monasteryOfWeek: "सप्ताह का मठ",
    quickLinks: "त्वरित लिंक",
    offline: "आप ऑफ़लाइन हैं। कुछ सुविधाएँ सीमित हो सकती हैं।",
    language: "भाषा",
  },
  ne: {
    appName: "Monastery360",
    explore: "अन्वेषण",
    virtualTours: "भर्चुअल भ्रमण",
    interactiveMap: "इन्टरएक्टिभ नक्सा",
    archives: "डिजिटल अभिलेख",
    calendar: "सांस्कृतिक पात्रो",
    audioGuide: "स्मार्ट अडियो गाइड",
    services: "पर्यटक सेवाहरू",
    about: "हाम्रो बारेमा",
    exploreNow: "अहिले अन्वेषण गर्नुहोस्",
    monasteryOfWeek: "यो हप्ता को मठ",
    quickLinks: "छिटो पहुँच",
    offline: "तपाईं अफलाइन हुनुहुन्छ। केही सुविधाहरू सीमित हुन सक्छन्।",
    language: "भाषा",
  },
  bo: {
    appName: "དགོན་པ།360",
    explore: "འཚོལ་ཞིབ",
    virtualTours: "རྒྱུན་ལྡན་ལམ་འགྲུལ",
    interactiveMap: "མཐུན་སྒྲིག་ས་ཁྲ",
    archives: "ཡིག་མཛོད",
    calendar: "དུས་རབས",
    audioGuide: "ར���ར་ཉན་ཁོངས",
    services: "ལས་ཞུགས",
    about: "ང་ཚོའི་སྐོར",
    exploreNow: "མགོ་བརྩམ་",
    monasteryOfWeek: "གཟའ་འཁོར་གྱི་དགོན་པ",
    quickLinks: "མགྱོགས་དྲས",
    offline: "ཁྱེད་རང་ཕྱི་ལོགས་ཡོད།",
    language: "སྐད་ཡིག",
  },
};

interface I18nContextValue {
  lang: Lang;
  t: (key: string) => string;
  setLang: (l: Lang) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const stored =
      typeof window !== "undefined"
        ? (localStorage.getItem("lang") as Lang | null)
        : null;
    return stored || "en";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useMemo(() => (key: string) => STRINGS[lang]?.[key] ?? key, [lang]);

  return (
    <I18nContext.Provider value={{ lang, t, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
