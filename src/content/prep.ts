import { t } from './diagram'
import type { ChecklistItem, PrepSection, StoryPrompt, TrickQuestion } from './types'

export const PREP_SECTIONS: PrepSection[] = ['story', 'traps', 'flags', 'ask', 'checklist']

export const STORY_PROMPTS: StoryPrompt[] = [
  {
    id: 'product',
    title: t('1. Продукт и масштаб', '1. Product and scale', '1. Produkt i skala'),
    hint: t(
      'Что делает продукт, сколько пользователей, сколько фронтендеров и команд, сколько кода.',
      'What it does, how many users, how many frontend engineers and teams, how much code.', 'Co robi produkt, ilu użytkowników, ilu frontendowców i zespołów, ile kodu.',
    ),
  },
  {
    id: 'scheme',
    title: t('2. Высокоуровневая схема', '2. High-level scheme', '2. Schemat wysokiego poziomu'),
    hint: t(
      'Клиент → BFF/API gateway → сервисы; где SSR, где CDN.',
      'Client → BFF/API gateway → services; where SSR lives, where the CDN sits.', 'Klient → BFF/API gateway → serwisy; gdzie SSR, gdzie CDN.',
    ),
  },
  {
    id: 'stack',
    title: t('3. Стек и почему он', '3. Stack and why', '3. Stack i dlaczego on'),
    hint: t(
      'Каждый выбор через требование, не через вкус. Держи отвергнутую альтернативу.',
      'Each choice through a requirement, not taste. Keep the rejected alternative ready.', 'Każdy wybór przez wymaganie, nie gust. Trzymaj odrzuconą alternatywę.',
    ),
  },
  {
    id: 'structure',
    title: t('4. Структура кода', '4. Code structure', '4. Struktura kodu'),
    hint: t(
      'Монорепо или нет, слои/фичи, правила зависимостей, дизайн-система.',
      'Monorepo or not, layers/features, dependency rules, design system.', 'Monorepo czy nie, warstwy/funkcje, reguły zależności, design system.',
    ),
  },
  {
    id: 'data',
    title: t('5. Данные и состояние', '5. Data and state', '5. Dane i stan'),
    hint: t(
      'Серверное состояние, клиентское, URL, формы; кэш и инвалидация.',
      'Server state, client state, URL, forms; cache and invalidation.', 'Stan serwerowy, kliencki, URL, formularze; cache i invalidacja.',
    ),
  },
  {
    id: 'quality',
    title: t('6. Качество и доставка', '6. Quality and delivery', '6. Jakość i dostawa'),
    hint: t(
      'Тесты, CI/CD, feature flags, мониторинг, метрики производительности.',
      'Tests, CI/CD, feature flags, monitoring, performance metrics.', 'Testy, CI/CD, feature flags, monitoring, metryki wydajności.',
    ),
  },
  {
    id: 'weakness',
    title: t('7. Слабые места и что бы ты изменил', '7. Weak spots and what you would change', '7. Słabe miejsca i co byś zmienił'),
    hint: t(
      'Обязательный пункт — он сильнее всего показывает senior-уровень. Честно, без обвинения коллег, с планом.',
      'Mandatory — this is what most shows seniority. Honest, without blaming colleagues, with a plan.', 'Punkt obowiązkowy — najmocniej pokazuje poziom seniora. Szczerze, bez obwiniania kolegów, z planem.',
    ),
  },
]

export const TRICK_QUESTIONS: TrickQuestion[] = [
  {
    id: 'best-arch',
    question: t('Какая архитектура лучшая?', 'What is the best architecture?', 'Jaka architektura jest najlepsza?'),
    answer: t(
      'Универсально лучшей нет — есть подходящая под контекст. Для стартапа из трёх человек хороша простая feature-based структура и минимум абстракций: важнее скорость. Для двадцати разработчиков в пяти командах — жёсткие границы модулей, монорепо и дизайн-система. Хорошая архитектура делает дешёвыми изменения, которые происходят чаще всего.',
      'There is no universally best one — only one that fits the context. For a three-person startup, a simple feature-based structure with minimal abstraction works best — speed matters more. For twenty engineers across five teams, invest in strict module boundaries, a monorepo and a design system. Good architecture makes the most frequent changes cheap.', 'Uniwersalnie najlepszej nie ma — jest pasująca do kontekstu. Dla startupu z trzech osób dobra jest prosta struktura feature-based i minimum abstrakcji: ważniejsza jest szybkość. Dla dwudziestu inżynierów w pięciu zespołach — twarde granice modułów, monorepo i design system. Dobra architektura tanie robi zmiany, które zdarzają się najczęściej.',
    ),
  },
  {
    id: 'why-arch',
    question: t('Зачем вообще архитектура, если можно быстро писать фичи?', 'Why architecture at all if we can just ship features?', 'Po co w ogóle architektura, skoro można szybko pisać funkcje?'),
    answer: t(
      'Согласись наполовину: на ранней стадии чрезмерная архитектура вредит. Но стоимость изменений растёт со временем, и минимальные правила (границы, типы, тесты критичных путей) окупаются уже через несколько месяцев. Архитектура должна расти вместе с продуктом — evolutionary architecture.',
      'Agree halfway: too much architecture hurts early on. Change cost grows over time, and a few rules (boundaries, types, tests of critical paths) pay off within months. Architecture should grow with the product — evolutionary architecture.', 'Zgódź się w połowie: na wczesnym etapie nadmiar architektury szkodzi. Koszt zmian rośnie z czasem, a minimalne reguły (granice, typy, testy krytycznych ścieżek) zwracają się w kilka miesięcy. Architektura ma rosnąć z produktem — evolutionary architecture.',
    ),
  },
  {
    id: 'rewrite',
    question: t('Ты бы переписал проект с нуля?', 'Would you rewrite the project from scratch?', 'Przepisałbyś projekt od zera?'),
    answer: t(
      'Почти никогда целиком: риск, остановка продукта, потеря накопленных исправлений. Постепенная замена (strangler fig) с измеримыми целями.',
      'Almost never as a whole: risk, stopping the product, losing accumulated fixes. Incremental replacement (strangler fig) with measurable goals.', 'Prawie nigdy w całości: ryzyko, zatrzymanie produktu, utrata zebranych poprawek. Stopniowa wymiana (strangler fig) z mierzalnymi celami.',
    ),
  },
  {
    id: 'disagree',
    question: t(
      'Команда выбрала технологию, с которой ты не согласен. Что будешь делать?',
      'The team chose a technology you disagree with. What do you do?', 'Zespół wybrał technologię, z którą się nie zgadzasz. Co zrobisz?',
    ),
    answer: t(
      'Высказать аргументы с данными (прототип, бенчмарк), предложить критерии пересмотра — и после решения поддержать его: disagree and commit.',
      'Make the case with data (prototype, benchmark), propose revisit criteria — and after the decision, support it: disagree and commit.', 'Przedstaw argumenty z danymi (prototyp, benchmark), zaproponuj kryteria przeglądu — i po decyzji wesprzyj ją: disagree and commit.',
    ),
  },
  {
    id: 'why-react',
    question: t('Почему React, а не Vue/Svelte/Angular?', 'Why React rather than Vue/Svelte/Angular?', 'Dlaczego React, a nie Vue/Svelte/Angular?'),
    answer: t(
      'Не религия: экосистема, найм, опыт команды, RSC/Next.js. Если бы проект требовал X, рассмотрел бы Y. Angular — встроенная структура и DI для больших enterprise-команд; Svelte/Solid — меньше рантайма и fine-grained reactivity.',
      'Not religion: ecosystem, hiring, team experience, RSC/Next.js. If the project needed X, I would consider Y. Angular — built-in structure and DI for large enterprise teams; Svelte/Solid — less runtime and fine-grained reactivity.', 'Nie religia: ekosystem, hiring, doświadczenie zespołu, RSC/Next.js. Gdyby projekt wymagał X, rozważyłbym Y. Angular — wbudowana struktura i DI dla dużych zespołów enterprise; Svelte/Solid — mniej runtime i fine-grained reactivity.',
    ),
  },
  {
    id: 'hype',
    question: t('Что ты думаешь о новом хайповом подходе X?', 'What do you think of hyped approach X?', 'Co myślisz o nowym hype’owym podejściu X?'),
    answer: t(
      'Опиши проблему, которую он решает, цену и в каком случае ты бы его попробовал — пилот на некритичной части.',
      'Name the problem it solves, the cost, and when you would try it — a pilot on a non-critical slice.', 'Nazwij problem, który rozwiązuje, koszt i kiedy byś spróbował — pilotaż na niekrytycznym kawałku.',
    ),
  },
]

export const RED_FLAGS = [
  t('Ответ начинается с названий библиотек, а не с требований.', 'The answer starts with library names, not requirements.', 'Odpowiedź zaczyna się od nazw bibliotek, nie od wymagań.'),
  t('«Всегда» и «никогда» без контекста.', '“Always” and “never” without context.', '„Zawsze” i „nigdy” bez kontekstu.'),
  t('Нет ни одного trade-off.', 'Not a single trade-off.', 'Ani jednego trade-offu.'),
  t('Только «мы», не видно вклада, — или только «я», не видно команды.', 'Only “we” with no personal contribution — or only “I” with no team.', 'Tylko „my”, nie widać wkładu — albo tylko „ja”, nie widać zespołu.'),
  t('Не можешь объяснить, почему в твоём проекте сделано именно так.', 'You cannot explain why your project is built this way.', 'Nie umiesz wyjaśnić, dlaczego w twoim projekcie jest zrobione właśnie tak.'),
  t('Обвинения в адрес коллег или прошлой компании.', 'Blaming colleagues or a previous company.', 'Obwinianie kolegów albo poprzedniej firmy.'),
  t('Не знаешь базовых метрик продукта, над которым работал.', 'You do not know basic metrics of the product you worked on.', 'Nie znasz podstawowych metryk produktu, nad którym pracowałeś.'),
]

export const ASK_INTERVIEWER = [
  t(
    'Как сейчас устроен фронтенд и какая самая большая архитектурная проблема?',
    'How is the frontend structured today, and what is the biggest architectural pain point?', 'Jak dziś wygląda frontend i jaki jest największy problem architektoniczny?',
  ),
  t('Как принимаются технические решения — есть ли RFC/ADR?', 'How are technical decisions made — do you use RFCs or ADRs?', 'Jak zapadają decyzje techniczne — są RFC/ADR?'),
  t(
    'Сколько команд работает в одном коде и как разделён ownership?',
    'How many teams work in the same codebase, and how is ownership split?', 'Ile zespołów pracuje w jednym kodzie i jak podzielony jest ownership?',
  ),
  t('Как часто вы релизите, есть ли feature flags?', 'How often do you release, and do you use feature flags?', 'Jak często releasujecie, czy są feature flags?'),
  t('Как измеряете производительность и качество фронта?', 'How do you measure frontend performance and quality?', 'Jak mierzycie wydajność i jakość frontu?'),
  t(
    'Чего вы ждёте от senior в первые 3–6 месяцев?',
    'What do you expect from a senior engineer in the first three to six months?', 'Czego oczekujecie od seniora w pierwszych 3–6 miesiącach?',
  ),
]

export const CHECKLIST: ChecklistItem[] = [
  {
    id: 'story-rehearse',
    label: t(
      'Подготовить и отрепетировать вслух рассказ о своём проекте (RU и EN, 3–5 минут)',
      'Prepare and rehearse the project story out loud (RU and EN, 3–5 minutes)', 'Przygotować i przećwiczyć na głos opowieść o projekcie (RU, EN i PL, 3–5 minut)',
    ),
  },
  {
    id: 'draw',
    label: t('Нарисовать схему архитектуры своего проекта от руки', 'Draw your project architecture by hand', 'Narysować schemat architektury swojego projektu ręcznie'),
  },
  {
    id: 'star',
    label: t(
      'Собрать 3–4 истории STAR: сложное решение, ошибка, миграция, конфликт мнений',
      'Collect 3–4 STAR stories: a hard decision, a mistake, a migration, a disagreement', 'Zebrać 3–4 historie STAR: trudna decyzja, błąd, migracja, spór o zdanie',
    ),
  },
  {
    id: 'numbers',
    label: t(
      'Вспомнить конкретные цифры: пользователи, команда, метрики до и после',
      'Recall concrete numbers: users, team, metrics before and after', 'Przypomnieć konkretne liczby: użytkownicy, zespół, metryki przed i po',
    ),
  },
  {
    id: 'radio',
    label: t(
      'Решить вслух 2–3 задачи system design по RADIO с таймером на 45 минут',
      'Solve 2–3 system-design problems out loud with RADIO and a 45-minute timer', 'Rozwiązać na głos 2–3 zadania system design według RADIO z timerem 45 minut',
    ),
  },
  {
    id: 'alternatives',
    label: t(
      'Для каждого ключевого выбора в своём проекте подготовить отвергнутую альтернативу и причину',
      'For each key choice in your project, prepare the rejected alternative and why', 'Dla każdego kluczowego wyboru w swoim projekcie przygotować odrzuconą alternatywę i powód',
    ),
  },
]

export const STAR_HINT = t(
  'STAR: ситуация, задача, действия, результат. Для ошибки — неверная предпосылка, как заметили, как исправили, какой вывод. Не перекладывай вину.',
  'STAR: situation, task, action, result. For a mistake: the wrong assumption, how you noticed, how you fixed it, the lesson. Do not shift blame.', 'STAR: sytuacja, zadanie, działania, wynik. Dla błędu — błędne założenie, jak zauważyliście, jak naprawiliście, jaki wniosek. Nie zrzucaj winy.',
)

export const TRAPS_INTRO = t(
  'Каверзные вопросы проверяют, не догматик ли ты. Признай, что у любого подхода есть цена, и покажи границу применимости.',
  'Trick questions check that you are not a dogmatist. Admit every approach has a cost, and show where it stops applying.', 'Pytania-pułapki sprawdzają, czy nie jesteś dogmatykiem. Przyznaj, że każde podejście ma koszt, i pokaż granicę stosowania.',
)
