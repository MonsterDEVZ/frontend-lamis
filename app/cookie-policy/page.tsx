import HeaderWithSuspense from '@/components/header/HeaderWithSuspense';
import Footer from '@/components/Footer';

export default function CookiePolicyPage() {
  return (
    <>
      <HeaderWithSuspense />
      <div className="wrapper_centering">
        <div className="pt-50 pb-10">
          <h1 className="text-4xl font-bold mb-6">Политика в отношении куки</h1>
        </div>

        <div className="space-y-6 mb-20">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Основное положение</h2>
            <p className="leading-relaxed">
              Настоящим, продолжая работу на Сайте{' '}
              <a
                href="https://www.lamis.kg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-100 font-medium hover:underline"
              >
                https://www.lamis.kg
              </a>
              , я даю свое согласие [НУЖНА ИНФОРМАЦИЯ: полное юридическое название компании] (ИНН{' '}
              [НУЖНА ИНФОРМАЦИЯ: ИНН компании], [НУЖНА ИНФОРМАЦИЯ: регистрационный номер или ОГРН
              эквивалент в КР]) на автоматизированную обработку моих персональных данных (файлы
              cookie, сведения о действиях, которые я совершаю на Сайте, сведения об используемых
              для этого устройствах), путем совершения следующих действий: сбор, запись,
              систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение,
              использование, блокирование, удаление, уничтожение.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Типы файлов cookie</h2>
            <p className="mb-4">На Сайте используются следующие типы файлов cookie:</p>

            <div className="space-y-4">
              <div className="pl-4 border-l-4 border-green-100">
                <h3 className="font-semibold text-lg mb-2">1. Технические файлы cookie</h3>
                <p className="leading-relaxed">
                  Они необходимы для корректной работы Сайта и вспомогательных сервисов. Такие файлы
                  cookie позволяют:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Определять аппаратное и программное обеспечение устройства Пользователя</li>
                  <li>Выявлять ошибки при работе Сайта</li>
                  <li>Тестировать новые функции для повышения производительности Сайта</li>
                </ul>
              </div>

              <div className="pl-4 border-l-4 border-green-100">
                <h3 className="font-semibold text-lg mb-2">2. Аналитические файлы cookie</h3>
                <p className="leading-relaxed">
                  Они позволяют подсчитывать количество Пользователей Сайта и определять, какие
                  действия Пользователь совершает на Сайте (посещаемые страницы, время и количество
                  просмотренных страниц). Сбор аналитических данных осуществляется через партнеров,
                  в том числе Yandex Metrika.
                </p>
              </div>

              <div className="pl-4 border-l-4 border-green-100">
                <h3 className="font-semibold text-lg mb-2">3. Рекламные файлы cookie</h3>
                <p className="leading-relaxed">
                  Они помогают анализировать, из каких источников Пользователь перешел на Сайт, а
                  также персонализировать рекламные сообщения.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Сроки хранения и согласие</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                Срок хранения файлов cookie зависит от конкретного типа, но в любом случае не
                превышает срока, необходимого для достижения целей обработки персональных данных.
              </p>

              <p className="leading-relaxed">
                При посещении Сайта Оператор запрашивает согласие Пользователя на использование
                файлов cookie.
              </p>

              <p className="leading-relaxed">
                Обработка данных осуществляется в целях улучшения работы Сайта и совершенствования
                его сервисов. Настоящее согласие действует с момента его предоставления и в течение
                всего периода использования Сайта.
              </p>

              <p className="leading-relaxed font-medium">
                В случае отказа от обработки данных я проинформирован о необходимости прекратить
                использование Сайта или отключить файлы cookie в настройках браузера.
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
