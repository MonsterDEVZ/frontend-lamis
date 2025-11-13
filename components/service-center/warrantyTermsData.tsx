import React from 'react';

export interface WarrantySection {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export const warrantyTermsSections: WarrantySection[] = [
  {
    title: 'Условия гарантийного обслуживания',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          Торговая марка <strong>BLESK</strong> предоставляет высококачественное сервисное
          обслуживание и обеспечивает максимально короткий срок выполнения ремонта.
        </p>
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Необходимые условия для гарантии:</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-100 mt-1">✓</span>
              <span>
                Наличие гарантийного талона, полностью заполненного, с печатью торгующей организации
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-100 mt-1">✓</span>
              <span>Наличие серийного номера на внешнем корпусе водонагревателя</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-100 mt-1">✓</span>
              <span>Наличие кассового чека с датой покупки</span>
            </li>
          </ul>
        </div>
        <p className="text-gray-700">
          На протяжении гарантийного срока торговая марка <strong>BLESK</strong> обеспечит
          выполнение бесплатного гарантийного ремонта и/или замены водонагревателя, составных частей
          и комплектующих изделий ненадлежащего качества.
        </p>
      </div>
    ),
  },
  {
    title: 'Гарантийные сроки на водонагреватели BLESK',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    content: (
      <div className="space-y-4">
        <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-100">
          <h4 className="font-bold text-gray-900 mb-4 text-lg">Водонагреватели серий:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4 text-sm text-gray-700">
            <div>• B/FL300, B/FL500, B/FL800, B/FL1000</div>
            <div>• B/SLV300, B/SLV500, B/SLV800, B/SLV1000</div>
            <div>• B/VC300, B/VC500, B/VC800, B/VC1000</div>
            <div>• B/MI100, B/MI150, B/MI300</div>
            <div>• B/HOR500, B/HOR800, B/HOR1000</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-3xl font-bold text-green-100 mb-2">3 года</div>
              <div className="text-gray-700">Гарантия на водосодержащую емкость (бак)</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-3xl font-bold text-green-100 mb-2">3 года</div>
              <div className="text-gray-700">Гарантия на электрическую часть</div>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>Важно:</strong> При резком изменении напряжения питания возможно срабатывание
            аварийного термостата. Это не покрывается гарантией, вызов мастера оплачивается
            потребителем отдельно.
          </p>
        </div>
        <p className="text-gray-600 text-sm">
          Гарантийный срок исчисляется с момента изготовления изделия. Дата изготовления указана на
          табличке с техническими параметрами на корпусе изделия.
        </p>
      </div>
    ),
  },
  {
    title: 'Когда гарантия прекращается',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    ),
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 font-medium">
          Гарантия прекращается при наступлении следующих обстоятельств:
        </p>
        <div className="space-y-3">
          <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 mb-2">Нарушение правил эксплуатации:</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">×</span>
                <span>Несоблюдение правил установки, хранения, транспортировки и эксплуатации</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">×</span>
                <span>Включение изделия в сеть с не заполненным баком</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">×</span>
                <span>Использование не в домашних нуждах (сокращает гарантию до 1 года)</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 mb-2">Неправильная установка:</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">×</span>
                <span>Установка не квалифицированным специалистом, не согласно инструкции</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">×</span>
                <span>Отсутствие предохранительного клапана на входе в водонагреватель</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">×</span>
                <span>Отсутствие редуктора давления при давлении воды выше 5 бар</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">×</span>
                <span>Воздействие высокого давления (гидроудар)</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 mb-2">Техническое обслуживание:</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">×</span>
                <span>Несоблюдение регулярного обслуживания (замена магниевого анода 1 раз в год)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">×</span>
                <span>Ремонт изделия не уполномоченными лицами или самостоятельный демонтаж</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 mb-2">Прочие причины:</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">×</span>
                <span>Механические повреждения после передачи потребителю</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">×</span>
                <span>Отсутствие серийного номера на корпусе изделия</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">×</span>
                <span>Попадание посторонних предметов, мусора, насекомых во внутренние объёмы</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Техническое обслуживание',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
    ),
    content: (
      <div className="space-y-4">
        <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-6">
          <h4 className="font-bold text-gray-900 mb-3 text-lg">Рекомендуется проводить ТО 1 раз в год</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900">Чистка бака</h5>
                <p className="text-sm text-gray-600">Удаление накипи и отложений для эффективной работы</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900">Замена магниевого анода</h5>
                <p className="text-sm text-gray-600">
                  При износе более 70%. Магниевый анод является расходным материалом
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900">Проверка системы</h5>
                <p className="text-sm text-gray-600">
                  Проверка правильности установки, обратного клапана и фланца
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-gray-700">
            <strong className="text-green-700">Специальное предложение:</strong> При замене магниевого
            анода в нашей компании вы получаете уникальную гарантию с отметкой <strong>2 года</strong>.
          </p>
        </div>
        <p className="text-gray-600 text-sm">
          ТО проводится на платной основе по тарифам АСЦ. Свяжитесь с любым из авторизованных
          сервисных центров в вашем городе для проведения ТО.
        </p>
      </div>
    ),
  },
  {
    title: 'Дополнительные услуги',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    ),
    content: (
      <div className="space-y-4">
        <p className="text-gray-700">Через сеть наших сервисных центров вы можете заказать и приобрести:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 mb-2">Запасные части:</h5>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Нагревательные элементы (ТЭН)</li>
              <li>• Магниевые аноды</li>
              <li>• Термостаты</li>
              <li>• Фланцы</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 mb-2">Аксессуары:</h5>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Редукторы давления</li>
              <li>• Обратные клапаны</li>
              <li>• Пластиковые переходники</li>
              <li>• Нагревательные элементы большой мощности</li>
            </ul>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-6">
          <h5 className="font-semibold text-gray-900 mb-3">Платные услуги специалистов АСЦ:</h5>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-100 mt-1">→</span>
              <span>Установка приобретённого оборудования</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-100 mt-1">→</span>
              <span>Техническая консультация по продукции</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-100 mt-1">→</span>
              <span>Ремонт и замена составных частей</span>
            </li>
          </ul>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>Обратите внимание:</strong> При вызове мастера для диагностики, в результате которой
            выявилось отсутствие заводского брака, все работы оплачиваются покупателем по прейскуранту
            сервисного центра. При отсутствии клиента дома в назначенное время, при повторном вызове
            взимается плата за вызов.
          </p>
        </div>
      </div>
    ),
  },
];
