const PptxGenJS = require("pptxgenjs");

let pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_16x9';
pptx.author = 'Anna Tischner';
pptx.title = 'Projekt Systemy Mobilne';

// Slide 1
let slide1 = pptx.addSlide();
slide1.addText("Projekt Systemy Mobilne\nGra Neon Snake", { x: 1, y: 1.5, w: 8, h: 1.5, fontSize: 36, bold: true, align: 'center', color: '10b981' });
slide1.addText("Autor: Anna Tischner\nData: 08.06.2026", { x: 1, y: 3.5, w: 8, h: 1, fontSize: 18, align: 'center' });
slide1.addText("Repozytorium kodu:\nhttps://github.com/AniaTisch/snake-neon", { x: 1, y: 4.5, w: 8, h: 1, fontSize: 14, align: 'center', color: '3b82f6' });

// Slide 2
let slide2 = pptx.addSlide();
slide2.addText("Demonstracja Działania Gry", { x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 24, bold: true, color: '10b981' });
slide2.addText([
  { text: "Ekran Menu:", options: { bold: true } },
  { text: " Wpisywanie imienia i zapamiętywanie wyniku." },
  { text: "\nRozgrywka:", options: { bold: true } },
  { text: " Wirtualny D-Pad na ekrany dotykowe. Wąż rośnie o 1 segment po zjedzeniu owocu." },
  { text: "\nUstawienia:", options: { bold: true } },
  { text: " Płynna zmiana parametrów (prędkość, opóźnienie nowego owocu)." },
  { text: "\nGame Over:", options: { bold: true } },
  { text: " Gra kończy się po uderzeniu w ogon (ściany zawijają planszę)." }
], { x: 0.5, y: 1.5, w: 9, h: 4, fontSize: 18, bullet: true });

// Slide 3
let slide3 = pptx.addSlide();
slide3.addText("Opis problemu, który rozwiązuje zadanie", { x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 24, bold: true, color: '10b981' });
slide3.addText([
  { text: "Problem:", options: { bold: true } },
  { text: " Zbudowanie wydajnej, responsywnej gry mobilnej w oparciu o kultowego Węża z Nokii." },
  { text: "\nWyzwania:", options: { bold: true } },
  { text: " \n- Płynne odświeżanie wyglądu węża." },
  { text: " \n- Implementacja sterowania dotykowego (wirtualny D-Pad)." },
  { text: " \n- Trwałe przechowywanie wyników offline bez użycia backendu." }
], { x: 0.5, y: 1.5, w: 9, h: 4, fontSize: 18 });

// Slide 4
let slide4 = pptx.addSlide();
slide4.addText("Szczegóły realizacji", { x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 24, bold: true, color: '10b981' });
slide4.addText([
  { text: "Technologia główna:", options: { bold: true } },
  { text: " React (Vite)." },
  { text: "\nStylizacja:", options: { bold: true } },
  { text: " Czysty CSS z elementami Neon Mode oraz micro-animacjami." },
  { text: "\nZarządzanie stanem:", options: { bold: true } },
  { text: " Hooki w React (useState, useEffect) do pętli gry." },
  { text: "\nZapis Danych:", options: { bold: true } },
  { text: " Natywne API przeglądarki localStorage." },
  { text: "\nKompilacja Mobile:", options: { bold: true } },
  { text: " Capacitor JS do generowania aplikacji .apk na system Android." }
], { x: 0.5, y: 1.5, w: 9, h: 4, fontSize: 18, bullet: true });

// Slide 5
let slide5 = pptx.addSlide();
slide5.addText("Najciekawszy kawałek kodu (Część 1)", { x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 24, bold: true, color: '10b981' });
slide5.addText("Logika ruchu węża i przechodzenie przez ściany. Nauczyło mnie operowania na poprzednim stanie tablicy w React.", { x: 0.5, y: 1.2, w: 9, h: 0.5, fontSize: 14, italic: true });
let code1 = `setSnake((prevSnake) => {
  const head = prevSnake[0];
  const newHead = { x: head.x + directionRef.current.x, y: head.y + directionRef.current.y };

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
  // ...`;
slide5.addText(code1, { x: 0.5, y: 1.8, w: 9, h: 3.5, fontSize: 11, fontFace: "Courier New", fill: { color: "F1F1F1" } });

// Slide 6
let slide6 = pptx.addSlide();
slide6.addText("Najciekawszy kawałek kodu (Część 2)", { x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 24, bold: true, color: '10b981' });
slide6.addText("Implementacja opóźnionego pojawiania się owoców na planszy za pomocą useCallaback i useRef.", { x: 0.5, y: 1.2, w: 9, h: 0.5, fontSize: 14, italic: true });
let code2 = `const scheduleNextFruit = useCallback((currentSnake) => {
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
}, [fruitSpawnDelay, spawnFruit]);`;
slide6.addText(code2, { x: 0.5, y: 1.8, w: 9, h: 3.5, fontSize: 12, fontFace: "Courier New", fill: { color: "F1F1F1" } });

// Slide 7
let slide7 = pptx.addSlide();
slide7.addText("Źródła", { x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 24, bold: true, color: '10b981' });
slide7.addText([
  { text: "Podczas tworzenia projektu korzystałem z:" },
  { text: "\n1. Dokumentacja React.js (Hooki: useState, useEffect)" },
  { text: "   https://react.dev/reference/react" },
  { text: "\n2. MDN Web Docs (JavaScript) (localStorage, setTimeout)" },
  { text: "   https://developer.mozilla.org/" },
  { text: "\n3. Dokumentacja Capacitor JS (kompilacja na Android)" },
  { text: "   https://capacitorjs.com/docs/getting-started" },
  { text: "\n(Data dostępu dla wszystkich źródeł: 08.06.2026)", options: { italic: true, fontSize: 12 } }
], { x: 0.5, y: 1.5, w: 9, h: 4, fontSize: 18 });

// Slide 8
let slide8 = pptx.addSlide();
slide8.addText("Podsumowanie", { x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 24, bold: true, color: '10b981' });
slide8.addText([
  { text: "Jak pracowało się w wybranej technologii?", options: { bold: true } },
  { text: "\nUżycie React i Vite było intuicyjne przy tworzeniu UI. Największym zaskoczeniem była szybkość działania środowiska i brak obciążeń typowych dla Android Studio podczas pisania logiki." },
  { text: "\nCzego się dowiedziałem?", options: { bold: true } },
  { text: "\nNauczyłem się, jak łączyć ekosystem webowy z urządzeniami mobilnymi (Capacitor). Przećwiczyłem radzenie sobie z pętlami setInterval wewnątrz cyklu życia komponentów Reacta. Praca przy tym projekcie pokazała mi, że można szybko budować prototypy gier korzystając z HTML/JS." }
], { x: 0.5, y: 1.5, w: 9, h: 4, fontSize: 16 });

const fileName = "Tischner_Anna_08062026.pptx";
pptx.writeFile({ fileName: fileName }).then(() => {
  console.log("created " + fileName);
});
