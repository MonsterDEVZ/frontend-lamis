import Header from '@/components/header/Header'; // Убедитесь, что путь к Header правильный
import Footer from '@/components/Footer'; // Убедитесь, что путь к Footer правильный

export default function CookiePolicyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Заголовок */}
          <div className="bg-green-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white text-center">Политика в отношении куки</h1>
          </div>

          {/* Основное содержание */}
          <div className="px-6 py-8">
            <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
              <p className="leading-relaxed">
                Настоящим, продолжая работу на Сайте{' '}
                <span className="text-blue-600 font-medium">https://www.lamis.ru</span>, я даю свое
                согласие Обществу с ограниченной ответственностью «СКЛ» (ИНН 7805442438, ОГРН
                1077847638549) на автоматизированную обработку моих персональных данных (файлы
                cookie, сведения о действиях, которые я совершаю на Сайте, сведения об используемых
                для этого устройствах, сведения, путем совершения следующих действий: сбор, запись,
                систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение,
                использование, блокирование, удаление, уничтожение.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  На Сайте используются следующие типы файлов cookie:
                </h2>

                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      1. Технические файлы cookie
                    </h3>
                    <p className="text-gray-700">
                      они необходимы для корректной работы Сайта и вспомогательных сервисов. Такие
                      файлы cookie позволяют определять аппаратное и программное обеспечение
                      устройства Пользователя; выявлять ошибки при работе Сайта; тестировать новые
                      функции для повышения производительности Сайта.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      2. Аналитические файлы cookie
                    </h3>
                    <p className="text-gray-700">
                      они позволяют подсчитывать количество Пользователей Сайта; определять, какие
                      действия Пользователь совершает на Сайте (посещаемые страницы, время и
                      количество просмотренных страниц). Сбор аналитических данных осуществляется
                      через партнеров, в том числе Yandex Metrika.
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      3. Рекламные файлы cookie
                    </h3>
                    <p className="text-gray-700">
                      они помогают анализировать, из каких источников Пользователь перешел на Сайт,
                      а также персонализировать рекламные сообщения.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p>
                  <strong>Срок хранения</strong> файлов cookie зависит от конкретного типа, но в
                  любом случае не превышает срока, необходимого для достижения целей обработки
                  персональных данных.
                </p>

                <p>
                  <strong>При посещении Сайта</strong> Оператор запрашивает согласие Пользователя на
                  использование файлов cookie.
                </p>

                <p>
                  <strong>Обработка данных</strong> осуществляется в целях улучшения работы Сайта и
                  совершенствования его сервисов. Настоящее согласие действует с момента его
                  предоставления и в течение всего периода использования Сайта.
                </p>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 font-medium">
                    В случае отказа от обработки данных я проинформирован о необходимости прекратить
                    использование Сайта или отключить файлы cookie в настройках браузера.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
