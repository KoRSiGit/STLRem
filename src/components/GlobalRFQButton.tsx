import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';

export default function GlobalRFQButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after mount to avoid hydration flash
    setVisible(true);
  }, []);

  return (
    <a
      href="/request"
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center w-12 h-52 
        bg-[#e65410] hover:bg-[#d14a0c] text-white font-black uppercase tracking-wider text-[11px] 
        shadow-lg transition-all duration-300 cursor-pointer group
        ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      aria-label="Запрос оборудования"
    >
      <span className="flex items-center gap-2">
        <FileText className="h-4 w-4 shrink-0" />
        Запрос
      </span>
    </a>
  );
}
