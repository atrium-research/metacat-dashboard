# Filozofia: Tailwind First

Celem tego dokumentu jest ujednolicenie sposobu stylowania UI w aplikacji opartej o **Next.js**, poprzez przyjęcie **Tailwind CSS v4** jako domyślnego i jedynego mechanizmu stylowania. Dążymy do maksymalnej czytelności kodu poprzez użycie klas utility **Tailwind CSS**.

# Setup Tailwind CSS

1. Zainstaluj wymagane pakiety, aby umożliwić obsługę **PostCSS** i **Tailwinda**, lub upewnij się, że są one zainstalowane i dostępne w projekcie.

```bash
npm i tailwindcss postcss @tailwindcss/postcss
```

2. Dodaj `@import "tailwindcss";` w pierwszej linijce pliku `globals.css`.

# Używanie Tailwind CSS

## Podstawowe klasy

Nazwy klas są intuicyjne i opierają się na standardowym CSS.

|                          | **Tailwind CSS (className)**                    |
|--------------------------|-------------------------------------------------|
| **Marginesy**            | `className="m-4 mt-2"`                          |
| **Padding**              | `className="p-6 px-2"`                          |
| **Flexbox**              | `className="flex items-center justify-between"` |
| **Układ (Grid)**         | `className="grid grid-cols-2 gap-4"`            |
| **Szerokość / Wysokość** | `className="w-full h-screen"`                   |
| **Kolory tekstu**        | `className="text-blue-600"`                     |
| **Tło**                  | `className="bg-gray-100"`                       |
| **Responsywność (RWD)**  | `className="w-full md:w-1/2"`                   |
| **Zaokrąglenia**         | `className="rounded-lg"`                        |
| **Cienie**               | `className="shadow-md"`                         |

Wszystkie pozostałe klasy oraz zasady ich stosowania opisane są w oficjalnej dokumentacji **Tailwind CSS**: https://tailwindcss.com/docs/styling-with-utility-classes

## Zmienne w namespaces

Zmienne zadeklarowane w warstwie `@theme` można wykorzystywać w całym projekcie jako tokeny, np. kolory przez klasy w stylu `text-primary-500`, `bg-primary-100`.

```css
@theme {
    --breakpoint-xs: 30rem;
    --color-primary-50: #f2f6ff;
    --color-primary-100: #e3ebff;
    --color-primary-200: #c7d7fe;
    --color-primary-300: #a3bcfd;
    --color-primary-400: #7a9af8;
    --color-primary-500: #4f74f2;
    --color-primary-600: #3b5ddd;
    --color-primary-700: #2f4bb8;
    --color-primary-800: #283f92;
    --color-primary-900: #233674;
    --color-primary-950: #161f44;
}
```

Przeczytaj więcej na ten temat: https://tailwindcss.com/docs/theme#theme-variable-namespaces

## Współdzielenie stylów z `@apply`

Zbyt dużo klas w jednej linijce? To nie problem! Dyrektywa `@apply` umożliwia definiowanie semantycznych klas komponentów (np. `button`, `input`, `card`) poprzez agregowanie klas użytkowych w jednym miejscu, dzięki czemu elementy w HTML otrzymują jedną, czytelną klasę, a cała logika stylowania pozostaje spójna i łatwa do utrzymania. Przykładowo można zadeklarować klasę `.button` odpowiadającą za wygląd wszystkich przycisków, a wewnątrz niej użyć `@apply` do połączenia kolorów, paddingów, typografii, stanów hover czy focus, bez konieczności powtarzania tych samych zestawów klas w markupie.

Przykład deklaracji wspólnego stylu przycisku i inputa z użyciem `@apply`:

```css
.button {
    @apply inline-flex items-center justify-center
    px-4 py-2
    text-primary-50 bg-primary-500
    rounded-md
    hover:bg-primary-600
    focus:outline-none focus:ring-2 focus:ring-primary-400;
}

.input {
    @apply w-full
    px-3 py-2
    text-primary-900
    bg-primary-50
    border border-primary-300
    rounded-md
    focus:outline-none focus:ring-2 focus:ring-primary-400;
}
```

Następnie w HTML wystarczy użyć jednej klasy, np. `<button class="button">` albo `<input class="input" />`, a cała logika stylowania pozostaje w CSS.

## Motywy

**Tailwind** umożliwia wprowadzenie wielu motywów kolorystycznych, np. motyw ciemny (`dark`) lub tryb kontrastowy (`contrast`). Poniżej został opisany prosty sposób na wprowadzenie motywów do projektu.

1. Skonfiguruj motyw **Tailwinda**, aby korzystał ze zdefiniowanych zmiennych CSS. Dzięki temu **Tailwind** będzie dynamicznie reagował na zmianę wartości tych zmiennych w zależności od aktywnego motywu. Nie zapomnij zapisać deklaracji `inline` aby uniknąć konfliktów z wewnętrznymi zmiennymi **Tailwinda**.

```css
@theme inline {
    --color-primary-50: var(--primary-50);
    --color-primary-100: var(--primary-100);
    --color-primary-200: var(--primary-200);
    --color-primary-300: var(--primary-300);
    --color-primary-400: var(--primary-400);
    --color-primary-500: var(--primary-500);
    --color-primary-600: var(--primary-600);
    --color-primary-700: var(--primary-700);
    --color-primary-800: var(--primary-800);
    --color-primary-900: var(--primary-900);
    --color-primary-950: var(--primary-950);
}
```

2. Zdefiniuj motywy. Stwórz odpowiednio nazwaną klasę, która będzie zawierać zmienne danego motywu. Zamiast klasy `.light` podawanej wprost, możesz użyć `:root`. Selektor `:root` jest używany jako domyślny motyw, czyli gdy żadna klasa (np. `.dark` czy `.contrast`) nie jest ustawiona. Oznacza to, że jego zmienne obowiązują w całej aplikacji, dopóki nie zostaną nadpisane przez klasę ustawioną wyżej w drzewie DOM (np. na `<html>` lub `<body>`).

```css
.light {
    --primary-50: #f2f6ff;
    --primary-100: #e3ebff;
    --primary-200: #c7d7fe;
    --primary-300: #a3bcfd;
    --primary-400: #7a9af8;
    --primary-500: #4f74f2;
    --primary-600: #3b5ddd;
    --primary-700: #2f4bb8;
    --primary-800: #283f92;
    --primary-900: #233674;
    --primary-950: #161f44;
}

/* tryb ciemny - odwrócona paleta dla lepszej czytelności na ciemnym tle */
.dark {
    --primary-50: #161f44;
    --primary-100: #233674;
    --primary-200: #283f92;
    --primary-300: #2f4bb8;
    --primary-400: #3b5ddd;
    --primary-500: #4f74f2;
    --primary-600: #7a9af8;
    --primary-700: #a3bcfd;
    --primary-800: #c7d7fe;
    --primary-900: #e3ebff;
    --primary-950: #f2f6ff;
}

/* tryb wysokiego kontrastu - wszystkie stopnie ustawione na kolor jaskrawy żółty */
.contrast {
    --primary-50: #ffff00;
    --primary-100: #ffff00;
    --primary-200: #ffff00;
    --primary-300: #ffff00;
    --primary-400: #ffff00;
    --primary-500: #ffff00;
    --primary-600: #ffff00;
    --primary-700: #ffff00;
    --primary-800: #ffff00;
    --primary-900: #ffff00;
    --primary-950: #ffff00;
}
```

3. Zdefiniuj niestandardowe warianty

Aby móc używać w kodzie prefiksów takich jak `dark:`, `light:` czy `contrast:` (podobnie jak standardowego `hover:`), musisz zarejestrować odpowiednie warianty. Wykorzystanie selektora `&:where()` pozwala na stosowanie stylów zarówno wtedy, gdy klasa motywu jest nadana bezpośrednio na element, jak i na dowolnego z jego przodków (np. tag `<html>`).

```css
@custom-variant light (&:where(.light, .light *));
@custom-variant dark (&:where(.dark, .dark *));
@custom-variant contrast (&:where(.contrast, .contrast *));
```

4. Klasy zależne od motywu (np. kolory) muszą wynikać ze zmiennych, a nie być używane bezpośrednio w kodzie. Dzięki temu zmiana motywu (np. `dark` lub `contrast`) nie wymaga modyfikacji komponentów, a jedynie konfiguracji motywu.

Przykład:

- Nieprawidłowo **(zawsze pozostanie niebieski)**:

```typescript jsx
<button class="bg-blue-500 text-white">Button</button>
```

- Prawidłowo **(zmieni kolory zależnie od wybranego motywu)**:

```typescript jsx
<button class="bg-primary-500 text-primary-950">Button</button>
```

5. Dodaj możliwość przełączania między trybami.

Tutaj najlepszym rozwiązaniem jest użycie biblioteki `next-themes`. Dodaj `ThemeProvider` i przekaż mu jakich motywów używasz. Na tag `<body>` nadaj atrybut `suppressHydrationWarning`. Biblioteka `next-themes` zmienia właściwości znacznika `<html>` (dopisuje odpowiednią klasę motywu) po stronie klienta przed wyrenderowaniem drzewa DOM, co zapobiega miganiu nieostylowanego motywu (FOUC). Z powodu tej dynamicznej zmiany po stronie klienta, **React** bez atrybutu `suppressHydrationWarning` zgłosi ostrzeżenie o niezgodności hydratacji (hydration mismatch). Zgodnie z oficjalną dokumentacją `next-themes`, atrybut ten musi pozostać na elemencie `<html>`.

```typescript jsx
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import theme from "@/styles/theme";
import "@/styles/globals.css";

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html lang="en" suppressHydrationWarning>
    <body className="min-h-full flex flex-col">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        themes={["light", "dark", "contrast"]}
      >
        {children}
      </ThemeProvider>
    </body>
    </html>
  );
}

export default RootLayout;
```

Dodaj przełącznik, który umożliwi przełączanie między motywami. Użyj hooka `useTheme` z paczki `next-themes`.

```typescript jsx
import { useTheme } from "next-themes";

type ThemeToggleProps = {
  isLoading?: boolean;
};

function ThemeToggle(props: ThemeToggleProps) {
  const { isLoading } = props;
  const { theme, setTheme } = useTheme();

  return (
    <div className="h-8 flex items-center">
      <label htmlFor="theme-select" className="mr-2 text-sm text-primary-500">
        Wybierz motyw:
      </label>
      <select
        id="theme-select"
        value={theme ?? "system"}
        onChange={(e) => setTheme(e.target.value)}
        className="rounded-md border p-1 dark:bg-zinc-900 dark:text-white contrast:bg-yellow-400"
        disabled={isLoading}
      >
        <option value="system">{isLoading ? "Ładowanie..." : "Systemowy"}</option>
        <option value="light">Jasny</option>
        <option value="dark">Ciemny</option>
        <option value="contrast">Kontrastowy</option>
      </select>
    </div>
  );
}

export default ThemeToggle;
```

Aby uniknąć błędów i ostrzeżeń **React** i **ESLint** załaduj przełącznik dynamicznie.

```typescript jsx
"use client";

import dynamic from "next/dynamic";
import ThemeToggle from "@/components/ToggleTheme/ThemeToggle";

const ThemeSelect = dynamic(() => import("@/components/ToggleTheme/ThemeToggle"), {
  ssr: false,
  loading: () => <ThemeToggle isLoading />
});

export default ThemeSelect;
```

Oczywiście jest to tylko jeden z wielu sposobów na implementację przełącznika motywów i można to zrobić inaczej, według własnego wyboru.

## Typografia

Ponieważ **Tailwind CSS v4** opiera się na zmiennych CSS, konfigurację dowolnego Design Systemu jest całkiem prosta. **Tailwind** domyślnie opiera się na trzech podstawowych utility dla `font-family`. Jeśli nie nadasz elementowi żadnej klasy, domyślnie używany jest `font-sans` (aplikowany przez reset _Preflight_ na tag `html`).

| **Klasa**    | **Zmienna CSS** | **Domyślna wartość (Font Stack)**                                                                                    |
|--------------|-----------------|----------------------------------------------------------------------------------------------------------------------|
| `font-sans`  | `--font-sans`   | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| `font-serif` | `--font-serif`  | `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`                                                        |
| `font-mono`  | `--font-mono`   | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`                 |

Domyślne wartości zmiennych w **Tailwind** dostępne są tutaj: https://tailwindcss.com/docs/theme#default-theme-variable-reference

Aby nadpisać domyślne wartości z wykorzystaniem mechanizmu optymalizacji z Next.js, wykonaj następujące kroki:

1. Zaimportuj fonty z Google fonts lub jeżeli chcesz użyć lokalnego pliku zaimportuj funkcję localFont. Dzięki `next/font` fonty są optymalizowane i serwowane z domeny (brak Google Fonts API w runtime).

```typescript jsx
import { Bebas_Neue, Rubik_Mono_One, Ultra } from "next/font/google";
import localFont from "next/font/local"
```

2. Zdefiniuj zmienne CSS dla fontów. Jeżeli chcesz użyć lokalnego pliku podaj do niego ścieżkę w `src`.

```typescript jsx
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

const ultra = Ultra({
  variable: "--font-ultra",
  subsets: ["latin"],
  weight: ["400"],
});

const rubikMonoOne = Rubik_Mono_One({
  variable: "--font-rubik-mono-one",
  subsets: ["latin"],
  weight: ["400"],
});

const nikeFuturaND = localFont({
  src: "../fonts/NikeFuturaND.ttf",
  variable: "--font-nike-futura-nd",
});
```

3. Dodaj odpowiednie klasy do znacznika html, aby zmienne były widoczne w całym projekcie.

```typescript jsx
<html
  lang="en"
  className={`${bebasNeue.variable} ${ultra.variable} ${rubikMonoOne.variable} ${nikeFuturaND.variable} h-full antialiased`}
>;
```

4. W pliku `globals.css` mapujemy zmienne, czyli `--font-sans` zastępujemy własną zmienną z **Next.js**. Możesz też stworzyć własny token np. `font-display`. Zmienne w `next/font` muszą mieć identyczne nazwy jak te użyte w `var()` w CSS.

```css
@theme inline {
    --font-sans: var(--font-bebas-neue);
    --font-serif: var(--font-ultra);
    --font-mono: var(--font-rubik-mono-one);
    --font-display: var(--font-nike-futura-nd);
}
```

5. Użyj odpowiedniej klasy w kodzie, ale pamiętaj, że **Tailwind** domyślnie używa `font-sans`, który został zastąpiony.

```typescript jsx
<h1 className="font-sans text-red-500 text-7xl">Font sans</h1>
<h1 className="font-serif text-yellow-500 text-7xl">Font serif</h1>
<h1 className="font-mono text-green-500 text-7xl">Font mono</h1>
<h1 className="font-display text-blue-500 text-7xl">Font display</h1>
```

Gdyby to nie zadziałało od razu, spróbuj usunąć folder `.next`, a następnie uruchomić jeszcze raz aplikację, aby **Next.js** ją przebudował razem z CSS.

Więcej informacji na temat dodawania fontów z lokalnych plików znajdziesz na stronie dokumentacji: https://nextjs.org/docs/app/getting-started/fonts#local-fonts
