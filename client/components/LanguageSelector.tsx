import { useI18n, Lang } from "@/context/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LanguageSelector() {
  const { lang, setLang, t } = useI18n();
  return (
    <Select value={lang} onValueChange={(v) => setLang(v as Lang)}>
      <SelectTrigger className="w-[160px] bg-secondary/60 backdrop-blur-sm">
        <SelectValue placeholder={t("language")} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="hi">हिंदी</SelectItem>
        <SelectItem value="ne">नेपाली</SelectItem>
        <SelectItem value="bo">བོད་ཡིག</SelectItem>
      </SelectContent>
    </Select>
  );
}
