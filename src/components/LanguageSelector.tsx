import { useState } from "react";

type Language = "react" | "html";

interface LanguageSelectorProps {
  onLanguageChange: (language: Language) => void;
  initialLanguage?: Language;
}

export function LanguageSelector({
  onLanguageChange,
  initialLanguage = "react",
}: LanguageSelectorProps) {
  const [selected, setSelected] = useState<Language>(initialLanguage);

  const handleSelect = (language: Language) => {
    setSelected(language);
    onLanguageChange(language);
  };

  return (
    <div
      role="radiogroup"
      aria-label="Select programming language"
      className="flex gap-2"
    >
      {(["react", "html"] as const).map((language) => (
        <button
          key={language}
          role="radio"
          aria-checked={selected === language}
          onClick={() => handleSelect(language)}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              handleSelect(language);
            }
          }}
          className={`
            px-4 py-2 rounded-full font-medium transition-colors
            ${
              selected === language
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }
          `}
        >
          {language === "react" ? "React" : "HTML5"}
        </button>
      ))}
    </div>
  );
}

export default LanguageSelector;
