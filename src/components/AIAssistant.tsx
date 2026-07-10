import { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { Bot, User, Trash2, Send, BadgeInfo } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface AIAssistantProps {
  lang: 'ru' | 'en';
}

export default function AIAssistant({ lang }: AIAssistantProps) {
  const t = TRANSLATIONS[lang];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: t.aiWelcomeMessage,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Synchronize first message on language change if it is the only one
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'welcome') {
      setMessages([
        {
          id: 'welcome',
          sender: 'assistant',
          text: t.aiWelcomeMessage,
          timestamp: messages[0].timestamp,
        },
      ]);
    }
  }, [lang, t.aiWelcomeMessage]);

  const samplePrompts = [
    {
      title: t.aiSampleTitle1,
      prompt: t.aiSamplePrompt1,
    },
    {
      title: t.aiSampleTitle2,
      prompt: t.aiSamplePrompt2,
    },
    {
      title: t.aiSampleTitle3,
      prompt: t.aiSamplePrompt3,
    },
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      let replyText = '';
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: textToSend,
            lang: lang,
            history: messages.map((m) => ({
              role: m.sender === 'user' ? 'user' : 'model',
              parts: [{ text: m.text }],
            })),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          replyText = data.reply;
        }
      } catch (e) {
        // Backend not reachable, will fall back to static/offline answers below
      }

      if (!replyText) {
        const lowerMsg = textToSend.toLowerCase();
        if (lang === 'en') {
          if (lowerMsg.includes('mixer') || lowerMsg.includes('molding') || lowerMsg.includes('sand') || lowerMsg.includes('furan')) {
            replyText = `Thank you for your inquiry regarding furan mold technology!\n\n` +
              `*Client-side Assistant Tips (Static / GitHub Pages Offline Mode):*\n` +
              `• **Resin Content**: Typically ranges between 1.0% to 1.3% of the total dry quartz sand weight.\n` +
              `• **Catalyst Concentration**: Maintain between 30% to 50% relative to resin mass, adjusting for local ambient storage temperatures.\n` +
              `• **Compaction**: Ensure fluid vibration times are on-point (20 to 45 seconds on VSF vibrators) to maximize mold density.`;
          } else if (lowerMsg.includes('furnace') || lowerMsg.includes('melting') || lowerMsg.includes('steel') || lowerMsg.includes('iron')) {
            replyText = `Thank you for asking about induction melting chambers!\n\n` +
              `*Client-side Assistant Tips (Static / GitHub Pages Offline Mode):*\n` +
              `• **Induction Coil Shielding**: Sibtehlit GW heavy steel-shell furnaces are recommended over aluminum frames to prevent stray magnetic flux feedback and extend refractories lifetime.\n` +
              `• **Cooling Design**: Setup dual dry hybrid water cooling units (GZ-60) to avoid lime or scale in power feeders.\n` +
              `• **Lining Profile**: Pre-cast high-manganese linings ensure steady melt sequences.`;
          } else {
            replyText = `Hello! I am currently running in client-side static mode (ideal for GitHub Pages hosting with no Node.js backend).\n\n` +
              `I can answer questions regarding foundry technology. Try asking about "*Furan Sand Mixer*" or "*Melting Furnace*". For full live chat power, run the NodeJS backend container by following the instructions in our README!`;
          }
        } else {
          if (lowerMsg.includes('смесител') || lowerMsg.includes('хтс') || lowerMsg.includes('песк') || lowerMsg.includes('фуран') || lowerMsg.includes('формов')) {
            replyText = `Благодарим за вопрос по технологии ХТС-процесса!\n\n` +
              `*Технические рекомендации (Автономный режим GitHub Pages):*\n` +
              `• **Дозировка смолы**: Должна быть в пределах 1.0 - 1.4% от массы сухого песка.\n` +
              `• **Ввод катализатора**: Составляет от 30% до 50% от массы смолы в зависимости от температуры формовочной смеси.\n` +
              `• **Процесс очистки**: Регулярно очищайте лопатки смесителя СХ и калибруйте весовые насосы-дозаторы жидкого связующего.`;
          } else if (lowerMsg.includes('печ') || lowerMsg.includes('плавк') || lowerMsg.includes('индукц') || lowerMsg.includes('стали') || lowerMsg.includes('чугу')) {
            replyText = `Благодарим за интерес к индукционным плавильным установкам!\n\n` +
              `*Технические рекомендации (Автономный режим GitHub Pages):*\n` +
              `• **Тигль и Каркас**: Для плавки стали в тяжелых условиях Сибири мы рекомендуем индукционные печи серии GW в жёстком стальном каркасе вместо алюминия для повышения стойкости футеровки.\n` +
              `• **Охлаждение**: Печи лучше подключать к закрытым двухконтурным градирням ГЗ-60, чтобы предотвратить появление накипи в индукторе.\n` +
              `• **Расчеты**: Вы можете воспользоваться нашими калькуляторами шихты и песка на соседней вкладке меню!`;
          } else {
            replyText = `Приветствую! В данный момент сервис работает в полностью автономном режиме обслуживания (сборка для статических сайтов GitHub Pages).\n\n` +
              `Я настроен консультировать вас по литейным процессам СНГ. Напишите мне про «*Смесители ХТС*», «*Плавильные печи*» или «*Качество отливок*»!\n\n` +
              `*(Для работы живого ИИ-Ассистента разверните бэкенд проекта на Node.js по инструкции из файла README.md).*`;
          }
        }
      }

      const assistantMessage: Message = {
        id: Math.random().toString(),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: Message = {
        id: Math.random().toString(),
        sender: 'assistant',
        text: lang === 'en'
          ? `Could not contact AI controller: ${err.message || 'unknown error'}. Ensure the server-side API key is set.`
          : `Ошибка связи с ИИ-модулем: ${err.message || 'неизвестная ошибка'}. Убедитесь, что серверный ключ API настроен.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: t.aiHistoryCleared,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 grow flex flex-col">
        
        {/* Chat Intro header */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="p-1 bg-[#e65410]/10 text-[#e65410] rounded">
                  <Bot className="h-5 w-5 animate-pulse" />
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-[#e65410] font-bold">{t.aiSupportHeader}</span>
              </div>
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3.5xl font-display uppercase">
                {t.aiAssistantTitle}
              </h1>
            </div>
            <button
              onClick={clearHistory}
              title={lang === 'en' ? 'Clear dialog history' : 'Очистить диалог'}
              className="p-2 text-gray-450 hover:text-red-500 hover:bg-gray-100 rounded transition duration-150 border border-gray-200 bg-white cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <p className="text-gray-650 text-xs mt-3 leading-relaxed">
            {t.aiDesc}
          </p>
        </div>

        {/* Messaging Area inside a framed container */}
        <div className="bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden min-h-[400px] max-h-[550px] shadow-sm">
          
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((m) => {
              const isAssistant = m.sender === 'assistant';
              return (
                <div
                  key={m.id}
                  className={`flex items-start space-x-3 max-w-[85%] ${
                    isAssistant ? 'self-start mr-auto' : 'self-end ml-auto flex-row-reverse space-x-reverse'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${isAssistant ? 'bg-[#00333b] text-amber-500' : 'bg-[#e65410] text-white'}`}>
                    {isAssistant ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  
                  <div className={`p-3.5 rounded-lg text-sm leading-relaxed border ${
                    isAssistant 
                      ? 'bg-gray-50 border-gray-200 text-gray-800' 
                      : 'bg-orange-50/50 border-orange-200 text-gray-900 font-medium'
                  }`}>
                    <pre className="whitespace-pre-wrap font-sans break-words">{m.text}</pre>
                    <span className="block text-[9px] text-gray-400 font-mono mt-1.5 text-right">
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-start space-x-3 max-w-[85%] self-start mr-auto">
                <div className="p-1.5 rounded-lg bg-[#00333b] text-amber-500 animate-pulse">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-[#e65410] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="h-2 w-2 bg-[#e65410] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="h-2 w-2 bg-[#e65410] rounded-full animate-bounce" />
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono mt-2 block">{t.aiComputingMsg}</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick recommendations chips */}
          {messages.length === 1 && (
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block mb-2.5">{t.aiSamplePromptsTitle}</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(p.prompt)}
                    className="p-3 bg-white hover:bg-[#e65410]/5 border border-gray-200/80 hover:border-[#e65410]/30 rounded-lg text-left transition duration-150 flex flex-col justify-between h-24 cursor-pointer"
                  >
                    <span className="text-[10px] font-mono uppercase text-[#e65410] font-bold">{p.title}</span>
                    <span className="text-[11px] text-gray-700 font-medium mt-1 line-clamp-2 leading-snug">{p.prompt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* User inputs bar */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.aiInputPlaceholder}
                disabled={loading}
                className="grow bg-gray-50 border border-gray-300 rounded p-2.5 text-sm text-gray-900 focus:outline-hidden focus:ring-1 focus:ring-[#e65410] focus:border-[#e65410]"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="bg-[#00333b] hover:bg-teal-900 disabled:opacity-40 text-amber-500 p-2.5 px-4 rounded transition duration-150 font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer border-none"
              >
                <span>{t.aiSendBtn}</span>
              </button>
            </form>
          </div>

        </div>

        {/* Informational disclaimer */}
        <div className="mt-4 p-3.5 bg-yellow-500/10 border border-yellow-500/20 text-[11px] text-gray-500 rounded flex items-start space-x-2.5">
          <BadgeInfo className="h-4.5 w-4.5 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-bold text-amber-700">{t.aiNoticeHeader}</span> {t.aiNoticeText}
          </p>
        </div>

      </div>
    </div>
  );
}
