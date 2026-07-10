import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, FileText, CheckCircle2, Navigation, Send, Building } from 'lucide-react';

interface ContactsProps {
  lang: 'ru' | 'en';
}

export default function Contacts({ lang }: ContactsProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const t = {
    ru: {
      title: 'Контакты компании «Сибтехлит»',
      subtitle: 'Свяжитесь с нашими инженерами-металлургами для запроса оборудования или заезжайте на наш склад в Новосибирске.',
      officeHeader: 'Главный офис инжиниринга',
      officeAddress: '630008, г. Новосибирск, ул. Сакко и Ванцетти, д. 77, оф. 701, БЦ «Парк Резиденс»',
      warehouseHeader: 'Склад запчастей и отгрузки оборудования',
      warehouseAddress: '630052, г. Новосибирск, Архонский переулок, д. 3, территория терминала «Байт-Транзит»',
      phone: 'Многоканальный телефон',
      email: 'Электронный адрес',
      hours: 'Режим работы офиса',
      hoursVal: 'Пн-Пт: с 9:00 до 18:00 (Новосибирское время, +4 к МСК)',
      legalHeader: 'Реквизиты компании',
      legalDesc: 'ООО «Сибирские Технологии Литья» (ООО «СТЛ»)',
      inn: 'ИНН: 5404177218',
      kpp: 'КПП: 540401001',
      ogrn: 'ОГРН: 1205400034412',
      formHeader: 'Быстрый запрос или обратная связь',
      formDesc: 'Напишите нам, и дежурный технолог свяжется с вами в течение 10 минут для обсуждения вашего ТЗ.',
      fieldName: 'Ваше имя / Должность:',
      fieldPhone: 'Контактный телефон:',
      fieldEmail: 'Электронная почта:',
      fieldMessage: 'Какое оборудование вас интересует (ТЗ):',
      submitBtn: 'Отправить сообщение',
      successHeader: 'Запрос принят!',
      successMsg: 'Спасибо за ваше обращение! Инженер-технолог «Сибтехлит» свяжется с вами в самое ближайшее время.',
      mapTitle: 'Интерактивная карта проезда',
      routeGuide: 'Схема заезда к погрузочной зоне',
    },
    en: {
      title: 'Contact Sibtehlit',
      subtitle: 'Get in touch with our foundry engineers to calculate targets or visit our main warehouses in Novosibirsk.',
      officeHeader: 'Main Engineering Office',
      officeAddress: 'Office 701, Park Residence Business Center, Sacco and Vanzetti str. 77, Novosibirsk, 630008',
      warehouseHeader: 'Spare Parts & Dispatch Warehouse',
      warehouseAddress: 'Terminal "Byte-Transit" area, Arkhonsky lane, 3, Novosibirsk, 630052',
      phone: 'Primary Contact Phone',
      email: 'Official General Inquiries',
      hours: 'Office Working Hours',
      hoursVal: 'Mon-Fri: 9:00 AM - 6:00 PM (UTC+7 / Novosibirsk local time)',
      legalHeader: 'Company Legal Details',
      legalDesc: 'Siberian Foundry Technologies LLC (STL LLC)',
      inn: 'VAT / INN: 5404177218',
      kpp: 'KPP: 540401001',
      ogrn: 'OGRN ID: 1205400034412',
      formHeader: 'Direct Technical Inquiry',
      formDesc: 'Send us your message and a standby metallurgist will contact you within 10 minutes to discuss your requirements.',
      fieldName: 'Your Name / Position:',
      fieldPhone: 'Contact Phone Number:',
      fieldEmail: 'Your Business Email:',
      fieldMessage: 'How can we help / Equipment Specs:',
      submitBtn: 'Send Message',
      successHeader: 'Message Sent!',
      successMsg: 'Thank you for your message! A Sibtehlit engineering expert will contact you shortly.',
      mapTitle: 'Interactive Location Map',
      routeGuide: 'Loading dock access scheme',
    },
  }[lang];

  const offices = [
    {
      id: 'msk',
      city: lang === 'en' ? 'Moscow' : 'Москва',
      region: lang === 'en' ? 'Central District' : 'Центральный ФО',
      address: lang === 'en' ? 'Moscow, Kuskovskaya str., 20A, office 501' : 'г. Москва, ул. Кусковская, д. 20А, офис 501',
      phone: '+7 (495) 120-41-45',
      email: 'msk@sibtehlit.ru',
      specialization: lang === 'en' ? 'No-bake/cold-box molding line supply and engineering support' : 'Поставка формовочного оборудования ХТС, смесителей и печей'
    },
    {
      id: 'spb',
      city: lang === 'en' ? 'Saint Petersburg' : 'Санкт-Петербург',
      region: lang === 'en' ? 'North-West District' : 'Северо-Западный ФО',
      address: lang === 'en' ? 'St. Petersburg, Obukhovskoy Oborony ave., 120, Lit. B, office 408' : 'г. Санкт-Петербург, пр. Обуховской Обороны, д. 120, лит. Б, оф. 408',
      phone: '+7 (812) 640-28-54',
      email: 'spb@sibtehlit.ru',
      specialization: lang === 'en' ? 'ZIP parts warehouse, mixer spare blades, on-site service support' : 'Склад ЗИП, лопатки смесителей ХТС, техническая поддержка'
    },
    {
      id: 'chel',
      city: lang === 'en' ? 'Chelyabinsk' : 'Челябинск',
      region: lang === 'en' ? 'Urals Region' : 'Уральский ФО',
      address: lang === 'en' ? 'Chelyabinsk, Sverdlovsky tract, 5, office 203' : 'г. Челябинск, Свердловский тракт, д. 5, оф. 203',
      phone: '+7 (351) 220-44-32',
      email: 'chel@sibtehlit.ru',
      specialization: lang === 'en' ? 'Induction furnace maintenance, power system upgrades, and spare parts' : 'Сервисное обслуживание индукционных печей ИСТ/ИАТ, пусконаладка'
    },
    {
      id: 'ekb',
      city: lang === 'en' ? 'Yekaterinburg' : 'Екатеринбург',
      region: lang === 'en' ? 'Urals Region' : 'Уральский ФО',
      address: lang === 'en' ? 'Yekaterinburg, Sibirsky tract, 12, bld. 3, office 311' : 'г. Екатеринбург, ул. Сибирский тракт, д. 12, стр. 3, оф. 311',
      phone: '+7 (343) 311-54-12',
      email: 'ekb@sibtehlit.ru',
      specialization: lang === 'en' ? 'Foundry workspace design, core making machine setups & sand reclaim' : 'Проектирование литейных цехов, подбор оснастки и регенерации'
    },
    {
      id: 'minsk',
      city: lang === 'en' ? 'Minsk' : 'Минск',
      region: lang === 'en' ? 'Belarus' : 'Республика Беларусь',
      address: lang === 'en' ? 'Minsk, Radialnaya str., 40, office 22' : 'г. Минск, ул. Радиальная, д. 40, оф. 22',
      phone: '+375 (17) 388-12-54',
      email: 'bel@sibtehlit.ru',
      specialization: lang === 'en' ? 'Official representative office in BY, silicon carbide crucible deliveries' : 'Официальное представительство в РБ, поставки тиглей и запчастей'
    },
    {
      id: 'pavlodar',
      city: lang === 'en' ? 'Pavlodar' : 'Павлодар',
      region: lang === 'en' ? 'Kazakhstan' : 'Республика Казахстан',
      address: lang === 'en' ? 'Pavlodar, Torgovaya str., 9, office 104' : 'г. Павлодар, ул. Торговая, д. 9, оф. 104',
      phone: '+7 (7182) 65-12-54',
      email: 'kz@sibtehlit.ru',
      specialization: lang === 'en' ? 'Official representative office in KZ, quartz sand & chemical lining supplies' : 'Официальное представительство в РК, кварцит и футеровочные смеси'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
        <span className="font-mono text-[10px] text-[#e65410] uppercase tracking-widest font-black block">
          {lang === 'en' ? 'Siberian Casting Technologies' : 'Сибирские Технологии Литья'}
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-gray-950 uppercase font-sans tracking-tight">
          {t.title}
        </h1>
        <p className="text-sm sm:text-base text-gray-650 leading-relaxed font-sans">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-gray-200 rounded-none p-6 sm:p-8 space-y-6 shadow-2xs">
            
            {/* Office Item */}
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-orange-500/5 text-[#e65410] rounded-none shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold uppercase tracking-wide text-gray-900 font-sans">
                  {t.officeHeader}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-sans">
                  {t.officeAddress}
                </p>
              </div>
            </div>

            {/* Warehouse Item */}
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-blue-500/5 text-[#00333b] rounded-none shrink-0">
                <Building className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold uppercase tracking-wide text-[#00333b] font-sans">
                  {t.warehouseHeader}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-sans">
                  {t.warehouseAddress}
                </p>
              </div>
            </div>

            {/* Grid for Quick Contacts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              <div className="flex gap-3 items-start">
                <div className="p-2 bg-slate-100 text-gray-700 rounded-none shrink-0 mt-1">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="space-y-1.5">
                  <div>
                    <span className="text-[10px] text-gray-400 font-mono block uppercase leading-none">
                      {lang === 'en' ? 'Toll-free RF' : 'Телефон (бесплатный):'}
                    </span>
                    <a href="tel:88005506054" className="text-xs font-bold text-gray-900 hover:text-[#e65410] font-mono leading-none block mt-0.5">
                      8-800-550-60-54
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-mono block uppercase leading-none">
                      {lang === 'en' ? 'Multi-channel' : 'Телефон (многоканальный):'}
                    </span>
                    <a href="tel:+73833354054" className="text-xs font-bold text-gray-900 hover:text-[#e65410] font-mono leading-none block mt-0.5">
                      (383) 33-54-0-54
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2 bg-slate-100 text-gray-700 rounded-none shrink-0 mt-1">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-mono block uppercase leading-none">{t.email}</span>
                  <a href="mailto:info@sibtehlit.ru" className="text-xs font-bold text-gray-900 hover:text-[#e65410] font-mono leading-none block mt-1">
                    info@sibtehlit.ru
                  </a>
                </div>
              </div>
            </div>

            {/* Hours Item */}
            <div className="flex gap-3 items-center pt-4 border-t border-gray-100 text-xs">
              <Clock className="h-4 w-4 text-gray-400 shrink-0" />
              <span className="text-gray-600 font-medium font-sans">
                <strong>{t.hours}:</strong> {t.hoursVal}
              </span>
            </div>

          </div>

          {/* Legal Details Box */}
          <div className="bg-[#00333b] text-white border border-teal-800 rounded-none p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 border-b border-teal-800 pb-2.5">
              <FileText className="h-4 w-4 text-[#e65410]" />
              <span className="font-mono text-xs text-[#e65410] font-bold uppercase tracking-wider">{t.legalHeader}</span>
            </div>
            <p className="text-xs font-bold text-gray-200">
              {t.legalDesc}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] font-mono text-gray-400">
              <div>{t.inn}</div>
              <div>{t.kpp}</div>
              <div>{t.ogrn}</div>
            </div>
          </div>

          {/* Beautiful styled Minimalist Map graphic / Scheme */}
          <div className="bg-white border border-gray-200 rounded-none p-6 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-gray-800 flex items-center gap-1.5">
                <Navigation className="h-4 w-4 text-[#e65410]" />
                {t.mapTitle}
              </h4>
              <span className="text-[9px] bg-emerald-555/10 text-emerald-600 font-mono font-bold px-2 py-0.5 rounded-none uppercase">
                {lang === 'en' ? 'Direct Pickup Ready' : 'Склад отгрузки открыт'}
              </span>
            </div>
            {/* Simulated Clean Blueprint Map Grid showing the Siberian logistics intersection */}
            <div className="relative h-48 bg-slate-900 rounded-none overflow-hidden border border-slate-950 flex flex-col justify-between p-4 font-mono select-none">
              <div className="absolute inset-0 opacity-15" style={{ 
                backgroundImage: 'radial-gradient(circle, #e65410 1px, transparent 1px)', 
                backgroundSize: '16px 16px' 
              }} />
              
              {/* Fake aesthetic roadmap */}
              <svg className="absolute inset-0 h-full w-full opacity-35" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="100" x2="400" y2="100" stroke="white" strokeWidth="4" strokeDasharray="5,5" />
                <line x1="180" y1="0" x2="180" y2="200" stroke="white" strokeWidth="4" />
                <circle cx="180" cy="100" r="28" fill="none" stroke="#e65410" strokeWidth="2" strokeDasharray="3,3" />
              </svg>

              <div className="relative flex justify-between items-start">
                <span className="text-[10px] bg-slate-800/80 text-white px-2 py-0.5 rounded-none border border-gray-750">
                  {lang === 'en' ? 'Sacco & Vanzetti str.' : 'ул. Сакко и Ванцетти'}
                </span>
                <span className="text-[10px] bg-slate-800/80 text-white px-2 py-0.5 rounded-none border border-gray-750 text-right">
                  {lang === 'en' ? 'Arkhonsky lane' : 'Архонский переулок'}
                </span>
              </div>

              {/* Exact point locator */}
              <div className="relative self-center flex flex-col items-center justify-center space-y-1">
                <div className="h-4 w-4 bg-[#e65410] rounded-none flex items-center justify-center animate-ping absolute" />
                <div className="h-3 w-3 bg-[#e65410] rounded-none border-2 border-white z-10" />
                <span className="text-[10px] font-black text-white bg-[#00333b] border border-teal-500 px-2 py-1 rounded-none shadow-md uppercase">
                  ООО Сибтехлит
                </span>
              </div>

              <div className="relative flex justify-between items-end text-[9px] text-gray-400">
                <span>54.919° N, 82.914° E</span>
                <span className="text-[#e65410] font-bold">← {t.routeGuide}</span>
              </div>
            </div>
          </div>

        </div>

        {/* FEEDBACK INQUIRY FORM */}
        <div id="contacts-form" className="lg:col-span-5 bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-xs">
          {!formSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2 pb-2 border-b border-gray-100">
                <h3 className="text-base sm:text-lg font-bold font-sans text-gray-950 uppercase tracking-tight">
                  {t.formHeader}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {t.formDesc}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wide">
                  {t.fieldName}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={lang === 'en' ? 'E.g. Petrov Ivan / Chief Metallurgist' : 'Например: Петров Иван / Главный металлург'}
                  className="w-full text-xs font-sans px-3.5 py-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#e65410] focus:ring-1 focus:ring-[#e65410] transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wide">
                  {t.fieldPhone}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full text-xs font-mono px-3.5 py-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#e65410] focus:ring-1 focus:ring-[#e65410] transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wide">
                  {t.fieldEmail}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.ru"
                  className="w-full text-xs font-mono px-3.5 py-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#e65410] focus:ring-1 focus:ring-[#e65410] transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wide">
                  {t.fieldMessage}
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={lang === 'en' ? 'Describe required capacity, alloy, mold size...' : 'Укажите требуемый объем плавки, сплав, производительность смесителя ХТС или размеры опок...'}
                  className="w-full text-xs font-sans px-3.5 py-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#e65410] focus:ring-1 focus:ring-[#e65410] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#e65410] hover:bg-[#c24209] text-white py-3 px-4 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-none flex items-center justify-center space-x-2"
              >
                <span>{t.submitBtn}</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="mx-auto h-12 w-12 rounded-none bg-emerald-500/10 text-emerald-600 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-bold font-sans text-emerald-600 uppercase tracking-tight">
                  {t.successHeader}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-sans">
                  {t.successMsg}
                </p>
              </div>
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({ name: '', phone: '', email: '', message: '' });
                }}
                className="text-[11px] font-mono text-[#e65410] hover:underline bg-transparent border-none cursor-pointer"
              >
                {lang === 'en' ? '← Send another message' : '← Отправить новое обращение'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Regional Representative Offices Section */}
      <div className="mt-16 pt-12 border-t border-gray-200 space-y-8">
        <div className="text-center md:text-left max-w-2xl">
          <span className="font-mono text-[10px] text-[#e65410] uppercase tracking-widest font-black block">
            {lang === 'en' ? 'REGIONAL PRESENCE' : 'МАСШТАБЫ ПОСТАВОК'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-gray-950 uppercase mt-1 tracking-tight font-sans">
            {lang === 'en' ? 'Regional Representative Offices' : 'Наши региональные представительства'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed font-sans">
            {lang === 'en' 
              ? 'Find our authorized local engineer near you for swift calculation of foundry equipment, localized service, and spare parts supply.' 
              : 'Свяжитесь с официальными представителями компании «Сибтехлит» в вашем регионе для оперативного решения технологических задач, пусконаладки и поставок.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offices.map((office) => (
            <div 
              key={office.id} 
              className="bg-white border border-gray-200 hover:border-slate-350 hover:shadow-xs transition duration-200 p-6 rounded-none flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 font-sans tracking-tight">
                      {office.city}
                    </h3>
                    <span className="text-[10px] font-mono text-gray-400 block uppercase mt-0.5 font-bold">
                      {office.region}
                    </span>
                  </div>
                  <span className="bg-[#e65410]/5 text-[#e65410] border border-[#e65410]/10 text-[10px] font-mono uppercase font-black px-2.5 py-1 rounded-none">
                    {office.id === 'msk' || office.id === 'spb' ? (lang === 'en' ? 'OFFICE + STOCK' : 'Офис + Склад') : (lang === 'en' ? 'OFFICE' : 'Офис')}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-gray-700">
                  <div className="flex gap-2 items-start">
                    <MapPin className="h-4 w-4 text-[#00333b] shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Phone className="h-4 w-4 text-[#00333b] shrink-0" />
                    <a href={`tel:${office.phone.replace(/[^+\d]/g, '')}`} className="font-mono hover:text-[#e65410] font-bold">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Mail className="h-4 w-4 text-[#00333b] shrink-0" />
                    <a href={`mailto:${office.email}`} className="font-mono hover:text-[#e65410] font-bold">
                      {office.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-3.5 border-t border-gray-100">
                <span className="text-[9px] font-mono text-[#00333b] uppercase tracking-wider block font-bold leading-none mb-1.5">
                  {lang === 'en' ? 'Specification' : 'Спецификация представительства'}
                </span>
                <p className="text-[11px] text-gray-650 leading-relaxed font-sans font-medium">
                  {office.specialization}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
