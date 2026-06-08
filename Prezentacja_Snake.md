# Slajd 1: Strona Tytułowa
**Tytuł:** Projekt Systemy Mobilne - Gra "Neon Snake"
**Autor:** Anna Tischner
**Data:** [Wpisz dzisiejszą datę w formacie dd.MM.yyyy]
**Link do repozytorium kodu:** https://github.com/AniaTisch/snake-neon

---

# Slajd 2: Demonstracja Działania gry
*(Na tym slajdzie podczas zajęć zaprezentujesz działanie gry, poniżej ściągawka co pokazać)*
* **Ekran Menu:** Możliwość wpisania imienia i uruchomienia gry.
* **Rozgrywka:** Sterowanie dotykowe na telefonie (wirtualny D-Pad). Pokaż, jak wąż rośnie o 1 segment po zjedzeniu owocu.
* **Ustawienia:** Pokaż płynną zmianę parametrów – opóźnienie w pojawianiu się owoców, zmianę prędkości ruchu węża oraz rozmiaru planszy.
* **Game Over:** Zaprezentuj, że gra kończy się tylko w momencie uderzenia w swój własny ogon i zapisuje najlepszy wynik.

---

# Slajd 3: Opis problemu, który rozwiązuje zadanie
**Problem:** Zbudowanie wydajnej i responsywnej gry mobilnej w oparciu o klasyczną mechanikę kultowego "Węża" z telefonów Nokia.
* **Wyzwania:**
  * Płynne odświeżanie wyglądu węża (tempo poruszania się).
  * Rozwiązanie problemu sterowania na ekranach dotykowych brakiem fizycznych klawiszy (implementacja wirtualnego krzyżaka - D-Pada).
  * Trwałe przechowywanie wyników bez konieczności używania zewnętrznej bazy danych (rozwiązanie offline).

---

# Slajd 4: Szczegóły realizacji
* **Technologia główna:** React (z użyciem Vite dla optymalizacji bundlowania). 
* **Stylizacja:** Czysty CSS z wykorzystaniem zmiennych (Custom Properties) dla estetyki "Dark/Neon Mode" oraz micro-animacji (powiększanie przycisków, mruganie owoców).
* **Zarządzanie stanem:** Wykorzystanie Hooków w React (`useState`, `useEffect`, `useCallback`) do kontrolowania cyklu życia gry, w tym pętli renderowania (`setInterval`).
* **Zapis Danych:** Użycie natywnego API przeglądarki `localStorage` do przechowywania pseudonimu oraz historii rekordów.
* **Kompilacja Mobile:** Capacitor JS (Ionic) do bezproblemowego wygenerowania natywnej aplikacji `.apk` na system Android.

---

# Slajd 5: Najciekawszy kawałek kodu (Część 1)
**Opis:** Główna logika ruchu węża i zapętlania planszy (przechodzenie przez ściany). Ten fragment sprawił trochę trudności przy synchronizacji stanu, ale nauczył mnie operowania na poprzednim stanie w React.

```javascript
// Game.jsx - Fragment pętli odpowiedzialnej za ruch
setSnake((prevSnake) => {
  const head = prevSnake[0];
  const newHead = {
    x: head.x + directionRef.current.x,
    y: head.y + directionRef.current.y,
  };

  // Zawijanie planszy - jeśli wąż wejdzie w ścianę, pojawia się z drugiej strony
  if (newHead.x < 0) newHead.x = boardSize - 1;
  if (newHead.x >= boardSize) newHead.x = 0;
  if (newHead.y < 0) newHead.y = boardSize - 1;
  if (newHead.y >= boardSize) newHead.y = 0;

  // Sprawdzanie czy wąż najechał na swój ogon
  const hitTail = prevSnake.some(
    (segment) => segment.x === newHead.x && segment.y === newHead.y
  );

  if (hitTail) {
    setIsGameOver(true);
    return prevSnake; // Zatrzymaj aktualizację
  }
  // ... (dodawanie głowy i jedzenie owocu)
```

---

# Slajd 6: Najciekawszy kawałek kodu (Część 2)
**Opis:** Implementacja opóźnionego pojawiania się owoców na planszy. Dzięki użyciu referencji do timera (`useRef`), owoce mogą pojawiać się od razu lub ze zwłoką wybraną w opcjach gry bez bugów.

```javascript
// Game.jsx - Logika spawnowania owocu
const scheduleNextFruit = useCallback((currentSnake) => {
  setFruit(null); // Zjedzenie owocu powoduje jego wizualne zniknięcie

  // Jeśli użytkownik ustawił opóźnienie > 0s w ustawieniach
  if (fruitSpawnDelay > 0) {
    fruitTimerRef.current = setTimeout(() => {
      spawnFruit(currentSnake);
    }, fruitSpawnDelay);
  } else {
    // Klasyczny tryb - owoc pojawia się natychmiast
    spawnFruit(currentSnake);
  }
}, [fruitSpawnDelay, spawnFruit]);
```

---

# Slajd 7: Źródła
Podczas tworzenia projektu, w poszukiwaniu optymalnych metod zarządzania stanem pętli gry i konfiguracji środowiska korzystałem z:
1. **Dokumentacja React.js** (Hooki: `useState`, `useEffect`, `useCallback`) - https://react.dev/reference/react
2. **MDN Web Docs (JavaScript)** (dla manipulacji `localStorage` oraz obsługi `setTimeout` / `setInterval`) - https://developer.mozilla.org/
3. **Dokumentacja Capacitor JS** (do zbudowania projektu jako natywna aplikacja na system Android) - https://capacitorjs.com/docs/getting-started
*(Data dostępu dla powyższych źródeł: [Dzisiejsza data])*

---

# Slajd 8: Podsumowanie
**Jak pracowało się w wybranej technologii?**
Użycie React i Vite okazało się niesamowicie intuicyjne przy tworzeniu aplikacji na urządzenia mobilne. Największym zaskoczeniem była szybkość działania środowiska i brak obciążeń typowych dla klasycznego Android Studio podczas pisania samego kodu UI. 

**Czego się dowiedziałem?**
Nauczyłem się, jak łączyć ekosystem aplikacji webowych z urządzeniami mobilnymi (za pomocą Capacitor). Przećwiczyłem też radzenie sobie z częstotliwością odświeżania (`setInterval`) na tle mechanizmów Reacta, w którym łatwo o "wycieki pamięci", jeśli odpowiednio nie wyczyści się starych timerów podczas opuszczania komponentu ekranu. Praca przy tym projekcie to bardzo przyjemne doświadczenie z tworzenia pełnoprawnego, stylowego projektu na smartfony.
