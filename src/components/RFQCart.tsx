import { useState, FormEvent } from 'react';
import { RFQItem } from '../types';
import { FileDown, CheckCircle, Trash2, Send, HardHat, Mail, Building2, User2, MessageSquare } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface RFQCartProps {
  rfqItems: RFQItem[];
  onUpdateQty: (pId: string, q: number) => void;
  onRemoveItem: (pId: string) => void;
  onClearRFQ: () => void;
  lang: 'ru' | 'en';
}

export default function RFQCart({ rfqItems, onUpdateQty, onRemoveItem, onClearRFQ, lang }: RFQCartProps) {
  const t = TRANSLATIONS[lang];

  // Form states
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');
  
  const [successResponse, setSuccessResponse] = useState<{ rfqId: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (rfqItems.length === 0 || loading) return;

    setLoading(true);

    try {
      const payload = {
        meta: { name, company, phone, email, comments },
        items: rfqItems.map(item => ({
          productId: item.product.id,
          model: item.product.model,
          title: lang === 'en' && item.product.titleEn ? item.product.titleEn : item.product.title,
          qty: item.quantity
        }))
      };

      let rfqId = '';
      try {
        const res = await fetch('/api/rfq/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const data = await res.json();
          rfqId = data.rfqId;
        }
      } catch (err) {
        // Safe fallback when running on fully static hosts like GitHub Pages
      }

      // If no ID returned because of static hosting/offline environment
      if (!rfqId) {
        const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
        const randNum = Math.floor(1000 + Math.random() * 9000);
        rfqId = `КД-${dateStr}-${randNum}-STATIC`;
      }

      setSuccessResponse({ rfqId });
      // Clear form & rfq items
      setName('');
      setCompany('');
      setPhone('');
      setEmail('');
      setComments('');
      onClearRFQ();
    } catch (err) {
      alert((lang === 'en' ? 'Submission error: ' : 'Ошибка отправки: ') + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (successResponse) {
    const isStatic = successResponse.rfqId.endsWith('-STATIC');
    return (
      <div className="bg-gray-50 min-h-screen py-16 flex items-center justify-center">
        <div className="bg-white border border-gray-200 p-8 sm:p-12 rounded-xl shadow-lg text-center max-w-xl mx-auto space-y-6">
          <div className="bg-emerald-500/10 border border-emerald-500/30 w-16 h-16 rounded-full flex items-center justify-center text-emerald-600 mx-auto animate-bounce">
            <CheckCircle className="h-9 w-9" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-emerald-600 font-bold tracking-widest bg-emerald-50 px-2 py-0.5 rounded border border-emerald-500/10">
              {t.rfqSuccessBadge}
            </span>
            <h2 className="text-2xl font-black text-[#00333b]">{t.rfqSuccessHeading}</h2>
            <p className="text-sm font-mono text-gray-400">
              {t.rfqSuccessIdLabel} <span className="text-gray-900 font-bold">{successResponse.rfqId}</span>
            </p>
          </div>

          <p className="text-gray-650 text-sm leading-relaxed">
            {isStatic 
              ? (lang === 'en'
                ? 'Your request has been successfully processed in offline static mode! For faster B2B processing, please screenshot this page or copy your inquiry and send it to info@sibtehlit.ru.'
                : 'Запрос оборудования успешно подготовлен в автономном режиме сайта! Пожалуйста, отправьте заявку на электронную почту info@sibtehlit.ru, указав сгенерированный номер КД для ускоренного ответа.')
              : t.rfqSuccessBody
            }
          </p>

          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={() => {
                setSuccessResponse(null);
              }}
              className="px-5 py-3 bg-[#00333b] text-white rounded font-extrabold text-xs uppercase tracking-wider transition hover:bg-teal-900 cursor-pointer border-none"
            >
              {t.rfqHomeBackBtn}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="border-b border-gray-200 pb-8 mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#e65410] font-bold">{t.rfqTitle}</span>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl font-display">
            {t.rfqHeader}
          </h1>
          <p className="text-gray-650 text-sm mt-1 max-w-2xl leading-relaxed">
            {t.rfqDesc}
          </p>
        </div>

        {rfqItems.length === 0 ? (
          <div className="bg-white border border-gray-200 p-12 text-center rounded-lg max-w-lg mx-auto space-y-4">
            <div className="bg-orange-600/5 p-4 w-16 h-16 rounded-full flex items-center justify-center text-[#e65410] mx-auto">
              <FileDown className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">{t.rfqEmptyTitle}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {t.rfqEmptyDesc}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side items table (7 columns) */}
            <div className="lg:col-span-7 bg-white border border-gray-200 rounded-lg p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <span className="text-xs font-mono uppercase text-gray-500 font-bold">{t.rfqCartSelectedHeader}</span>
                <button
                  onClick={onClearRFQ}
                  className="text-xs text-red-600 hover:text-[#e65410] font-semibold cursor-pointer border-none bg-transparent"
                >
                  {t.rfqClearAll}
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {rfqItems.map((item) => {
                  const pTitle = lang === 'en' && item.product.titleEn ? item.product.titleEn : item.product.title;
                  return (
                    <div key={item.product.id} className="py-4 flex flex-col sm:flex-row items-center sm:justify-between gap-4 first:pt-0 last:pb-0">
                      <div className="space-y-1 text-center sm:text-left">
                        <span className="text-[10px] font-mono text-amber-600 bg-amber-500/15 border border-amber-500/20 px-2 py-0.5 rounded font-black uppercase">
                          {t.rfqModelPrefix} {item.product.model}
                        </span>
                        <h4 className="font-bold text-sm text-[#00333b]">{pTitle}</h4>
                        <p className="text-xs text-gray-400 mt-1">
                          {t.rfqCategoryPrefix} {item.product.category === 'xtc-equipment' ? t.rfqCatXtcName : t.rfqCatFurnacesName}
                        </p>
                      </div>

                      <div className="flex items-center space-x-4 shrink-0 selection:bg-transparent">
                        {/* Quantity input component */}
                        <div className="flex items-center space-x-1.5 border border-gray-200 rounded p-1 bg-gray-50">
                          <button
                            onClick={() => onUpdateQty(item.product.id, Math.max(1, item.quantity - 1))}
                            className="px-2.5 py-0.5 bg-white border border-gray-200 text-xs font-bold rounded cursor-pointer select-none"
                          >
                            -
                          </button>
                          <span className="w-12 text-center text-xs font-mono font-bold">{item.quantity} {t.rfqPieceShort}</span>
                          <button
                            onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                            className="px-2.5 py-0.5 bg-white border border-gray-200 text-xs font-bold rounded cursor-pointer select-none"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1.5 text-gray-400 hover:text-red-650 hover:bg-gray-100 rounded transition cursor-pointer bg-transparent border-none"
                          title={lang === 'en' ? 'Remove component' : 'Удалить из запроса'}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Right side contact form panel (5 columns) */}
            <div className="lg:col-span-5 bg-white border border-gray-200 rounded-lg p-6 space-y-6">
              
              <div className="border-b border-gray-100 pb-3 flex items-center space-x-2">
                <HardHat className="h-4 w-4 text-[#e65410]" />
                <h3 className="text-base font-bold text-gray-900 uppercase font-sans tracking-tight">{t.rfqContactsHeader}</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-gray-500 flex items-center space-x-1">
                    <User2 className="h-3 w-3 text-[#e65410]" />
                    <span>{t.rfqFieldName}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={lang === 'en' ? 'John Doe' : 'Иванов Иван Иванович'}
                    className="w-full border border-gray-300 rounded p-2 text-sm text-gray-900 focus:outline-hidden focus:ring-1 focus:ring-[#e65410] focus:border-[#e65410]"
                  />
                </div>

                {/* Company */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-gray-500 flex items-center space-x-1">
                    <Building2 className="h-3 w-3 text-[#e65410]" />
                    <span>{t.rfqFieldCompany}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={lang === 'en' ? 'Industrial Ironworks Ltd.' : 'ООО Сибирский Литейный Завод'}
                    className="w-full border border-gray-300 rounded p-2 text-sm text-gray-900 focus:outline-hidden focus:ring-1 focus:ring-[#e65410] focus:border-[#e65410]"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-gray-500 flex items-center space-x-1">
                    <Building2 className="h-3 w-3 text-[#e65410]" />
                    <span>{t.rfqFieldPhone}</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={lang === 'en' ? '+1 (555) 019-2834' : '+7 (999) 123-45-67'}
                    className="w-full border border-gray-300 rounded p-2 text-sm text-gray-900 focus:outline-hidden focus:ring-1 focus:ring-[#e65410] focus:border-[#e65410]"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-gray-500 flex items-center space-x-1">
                    <Mail className="h-3 w-3 text-[#e65410]" />
                    <span>{t.rfqFieldEmail}</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={lang === 'en' ? 'manager@foundry.com' : 'director@foundry.ru'}
                    className="w-full border border-gray-300 rounded p-2 text-sm text-gray-900 focus:outline-hidden focus:ring-1 focus:ring-[#e65410] focus:border-[#e65410]"
                  />
                </div>

                {/* Comments */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-gray-500 flex items-center space-x-1">
                    <MessageSquare className="h-3 w-3 text-[#e65410]" />
                    <span>{t.rfqFieldComments}</span>
                  </label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder={t.rfqCommentsPlaceholder}
                    rows={3}
                    className="w-full border border-gray-300 rounded p-2 text-sm text-gray-900 focus:outline-hidden focus:ring-1 focus:ring-[#e65410] focus:border-[#e65410]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 bg-[#e65410] hover:bg-[#cc4a0c] disabled:opacity-40 text-white font-bold rounded text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition cursor-pointer border-none"
                >
                  <Send className="h-4 w-4" />
                  <span>{loading ? t.rfqSubmittingBtn : t.rfqSubmitBtn}</span>
                </button>
              </form>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
