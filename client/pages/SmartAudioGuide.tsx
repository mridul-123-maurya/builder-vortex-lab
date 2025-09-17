import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/context/i18n";
import { Link } from "react-router-dom";
import toursData from "@/data/tours.json";
import eventsData from "@/data/events.json";

// Types inferred from JSON
type Tour = {
  id: string;
  name: string;
  location: string;
  century?: string;
};

type EventItem = {
  id: string;
  name: string;
  date: string;
  location: string;
  monastery?: string;
};

type Msg = { role: "user" | "assistant"; text: string };

const tours = toursData as unknown as Tour[];
const events = eventsData as unknown as EventItem[];

const DICT = {
  en: {
    title: "Smart Audio Guide",
    placeholder: "Ask about monasteries, routes, or upcoming festivals…",
    send: "Send",
    speak: "Speak replies",
    language: "Language",
    suggestions: "Suggestions",
    eventsIntro: "Here are upcoming events:",
    toursIntro: "Popular monasteries:",
    calendarCta: "See Cultural Calendar",
    notFound:
      "I can help with Sikkim monasteries, 360° tours, and festivals. Try: 'Tell me about Rumtek' or 'Upcoming festivals'.",
  },
  hi: {
    title: "स्मार्ट ऑडियो गाइड",
    placeholder: "मठों, मार्गों या आने वाले त्योहारों के बारे में पूछें…",
    send: "भेजें",
    speak: "आवाज़ में सुना��ँ",
    language: "भाषा",
    suggestions: "सुझाव",
    eventsIntro: "आगामी आयोजन:",
    toursIntro: "प्रमुख मठ:",
    calendarCta: "कल्चरल कैलेंडर देखें",
    notFound:
      "मैं सिक्किम के मठों, 360° टूर और उत्सवों में मदद कर सकता हूँ। जैसे पूछें: 'रुमटेक के बारे में बताएं' या 'आगामी त्यौहार'।",
  },
  ne: {
    title: "स्मार्ट अडियो गाइड",
    placeholder: "मठ, बाटो वा आगामी पर्वबारे सोध्नुहोस्…",
    send: "पठाउनुहोस्",
    speak: "आवाजमा बोल्नुहोस्",
    language: "भाषा",
    suggestions: "सुझाव",
    eventsIntro: "आगामी कार्यक्रमहरू:",
    toursIntro: "लोकप्रिय मठहरू:",
    calendarCta: "सांस्कृतिक पात्रो हेर्नुहोस्",
    notFound:
      "म सिक्किमका मठ, 360° भ्रमण र पर्वमा मद���दत गर्छु। जस्तै: 'रुमटेकबारे बताऊ' वा 'आगामी पर्व'।",
  },
  bo: {
    title: "རྣམ་གྲངས་སྒྲ་སྒྲིག",
    placeholder: "དགོན་པ་དང་ལམ་འགྲུལ། དུས་ཆེན་སྐོར་གསུངས།",
    send: "གཏོང་",
    speak: "སྒྲ་སྒྲིག",
    language: "སྐད་ཡིག",
    suggestions: "གསལ་འདེབས",
    eventsIntro: "མཆོག་འགྲུལ་འགོ་འཛུགས:",
    toursIntro: "དགོན་པ་གསར་པ:",
    calendarCta: "དུས་རབས་ལྟ་སྤྱོད",
    notFound:
      "ངས་སྐུ་ལ་དགོན་པ་དང་ 360° ལམ་འགྲུལ། དུས་ཆེན་སྐོར་རོགས་རམ་བྱེད་ཐུབ། 'Rumtek' ཡང་ན་ 'upcoming festivals' ཞིབ་འཇུག་བྱས་རྒྱགས།",
  },
} as const;

function useSpeech(enabled: boolean, lang: string) {
  const speak = (text: string) => {
    if (!enabled || typeof window === "undefined" || !("speechSynthesis" in window))
      return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang === "hi" ? "hi-IN" : lang === "ne" ? "ne-NP" : lang === "bo" ? "bo" : "en-IN";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };
  return { speak };
}

function bcp47(lang: string) {
  return lang === "hi" ? "hi-IN" : lang === "ne" ? "ne-NP" : lang === "bo" ? "bo" : "en-IN";
}

function useSpeechRecognition(lang: string, onText: (text: string) => void) {
  const [listening, setListening] = useState(false);
  const supported = typeof window !== "undefined" &&
    ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

  const start = () => {
    if (!supported || listening) return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = bcp47(lang);
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    setListening(true);
    rec.onresult = (e: any) => {
      const text = e.results?.[0]?.[0]?.transcript || "";
      if (text) onText(text);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    try {
      rec.start();
    } catch {
      setListening(false);
    }
  };

  const stop = () => {
    if (!(window as any).speechSynthesis) {
      setListening(false);
      return;
    }
    // Best-effort stop by toggling flag; instance auto-stops onend
    setListening(false);
  };

  return { start, stop, listening, supported: Boolean(supported) };
}

export default function SmartAudioGuide() {
  const { lang: appLang } = useI18n();
  const [chatLang, setChatLang] = useState(appLang);
  const [speakOn, setSpeakOn] = useState(true);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([{
    role: "assistant",
    text: DICT[appLang].notFound,
  }]);
  const { speak } = useSpeech(speakOn, chatLang);
  const endRef = useRef<HTMLDivElement | null>(null);
  const recog = useSpeechRecognition(chatLang, (text) => {
    setInput(text);
    handleSend(text);
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs.length]);

  const strings = useMemo(() => DICT[chatLang], [chatLang]);

  function handleSend(text: string) {
    const q = text.trim();
    if (!q) return;
    const next: Msg[] = [...msgs, { role: "user", text: q }];
    const reply = generateReply(q, chatLang);
    next.push({ role: "assistant", text: reply });
    setMsgs(next);
    setInput("");
    speak(reply);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  }

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <header className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">{strings.title}</h1>
          <div className="flex items-center gap-3">
            <label className="text-sm text-muted-foreground">{strings.language}</label>
            <select
              value={chatLang}
              onChange={(e) => setChatLang(e.target.value as any)}
              className="h-9 rounded-md border border-input bg-background px-2 text-sm"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="ne">नेपाली</option>
              <option value="bo">བོད་ཡིག</option>
            </select>
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={speakOn}
                onChange={(e) => setSpeakOn(e.target.checked)}
              />
              {strings.speak}
            </label>
          </div>
        </header>

        <section className="mb-3 flex flex-wrap gap-2">
          <QuickChip onClick={() => handleSend("upcoming festivals")}>{strings.eventsIntro}</QuickChip>
          <QuickChip onClick={() => handleSend("popular monasteries")}>{strings.toursIntro}</QuickChip>
          <QuickChip onClick={() => handleSend("Tell me about Rumtek Monastery")}>Rumtek</QuickChip>
          <QuickChip onClick={() => handleSend("Show calendar")}>{strings.calendarCta}</QuickChip>
        </section>

        <div className="rounded-xl border bg-secondary/40 p-4">
          <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "assistant" ? "flex justify-start" : "flex justify-end"}>
                <div
                  className={
                    "max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow " +
                    (m.role === "assistant"
                      ? "bg-background border"
                      : "bg-primary text-primary-foreground")
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="mt-3 flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={strings.placeholder}
              className="min-h-[44px] max-h-40"
            />
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className={"h-10 w-10 " + (recog.listening ? "animate-pulse ring-2 ring-primary/40" : "")}
              onClick={() => (recog.listening ? recog.stop() : recog.start())}
              disabled={!recog.supported}
              aria-label={recog.listening ? "Stop voice input" : "Start voice input"}
              title={recog.supported ? (recog.listening ? "Stop" : "Speak") : "Voice input not supported in this browser"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 14a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v4a3 3 0 0 0 3 3z" />
                <path d="M5 11a1 1 0 1 0-2 0 9 9 0 0 0 8 8v3h2v-3a9 9 0 0 0 8-8 1 1 0 1 0-2 0 7 7 0 1 1-14 0z" />
              </svg>
            </Button>
            <Button onClick={() => handleSend(input)} className="h-10">
              {strings.send}
            </Button>
          </div>

          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            {recog.listening && <span>Listening…</span>}
            <span>
              {strings.calendarCta}: <Link to="/calendar" className="underline">/calendar</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickChip({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border bg-background px-3 py-1 text-xs hover:bg-accent/40"
    >
      {children}
    </button>
  );
}

function includesName(q: string, name: string) {
  const qlc = q.toLowerCase();
  const tokens = name.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 2);
  return tokens.every((t) => qlc.includes(t));
}

function findTour(q: string) {
  return tours.find((t) => includesName(q, t.name) || q.toLowerCase().includes(t.id));
}

function findEvent(q: string) {
  return events.find((e) => includesName(q, e.name) || q.toLowerCase().includes(e.id));
}

function generateReply(q: string, lang: "en" | "hi" | "ne" | "bo") {
  const lc = q.toLowerCase();

  // Direct intents
  const askWhen = /(when|kab|कब|कहिले|གང་དུ)\b/.test(lc);
  const askWhere = /(where|kahaan|कहाँ|कहाँ|कता|གནས་ས)\b/.test(lc);
  const askWhat = /(what|tell me|kaun|क्या|के हो|ཅི་ཡིན)\b/.test(lc);
  const askBook = /(book|tickets?|trip|tour|booking|reserve|बुक)/.test(lc);

  // Events scope
  if (lc.includes("festival") || lc.includes("event") || lc.includes("calendar")) {
    const match = findEvent(lc);
    if (match) {
      if (askWhen) return `${match.name} — ${match.date} at ${match.location}${match.monastery ? ", " + match.monastery : ""}. More at /calendar.`;
      if (askWhere) return `${match.name} is at ${match.location}${match.monastery ? ", " + match.monastery : ""}. More at /calendar.`;
      return `${DICT[lang].eventsIntro}\n• ${match.name} — ${match.date} (${match.location}${match.monastery ? ", " + match.monastery : ""})\n→ /calendar`;
    }
    const head = DICT[lang].eventsIntro;
    const list = events
      .map((e) => `• ${e.name} — ${e.date} (${e.location}${e.monastery ? ", " + e.monastery : ""})`)
      .join("\n");
    return `${head}\n${list}\n→ /calendar`;
  }

  // Tours scope
  if (lc.includes("monastery") || lc.includes("monasteries") || lc.includes("tour") || lc === "tours" || lc.includes("rumtek") || lc.includes("monastery")) {
    const match = findTour(lc);
    if (match) {
      if (askWhere) return `${match.name} is in ${match.location}.`;
      if (askWhat) return `${match.name} — ${match.location}${match.century ? ", " + match.century : ""}. Explore 360° tour at /tours/${match.id}.`;
      if (askBook) return `You can book a trip from Tourist Services → /services. Also explore /tours/${match.id}.`;
      return `${match.name} — ${match.location}${match.century ? ", " + match.century : ""}. See 360° tour at /tours/${match.id}.`;
    }
    const head = DICT[lang].toursIntro;
    const list = tours
      .slice(0, 6)
      .map((t) => `• ${t.name} — ${t.location}${t.century ? ", " + t.century : ""} (Go: /tours/${t.id})`)
      .join("\n");
    return `${head}\n${list}`;
  }

  // Booking intent
  if (askBook) return `You can book trips under Tourist Services at /services.`;

  // Try entity-first
  const hitTour = findTour(lc);
  if (hitTour) return `${hitTour.name} — ${hitTour.location}${hitTour.century ? ", " + hitTour.century : ""}. Explore the 360° tour at /tours/${hitTour.id}.`;
  const hitEvent = findEvent(lc);
  if (hitEvent) return `${hitEvent.name} — ${hitEvent.date} at ${hitEvent.location}${hitEvent.monastery ? ", " + hitEvent.monastery : ""}. More at /calendar.`;

  return DICT[lang].notFound;
}
