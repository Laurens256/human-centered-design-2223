# Design Principles

## Study situation

Omdat Petra blind geboren is, dacht ik in eerste instantie dat ze geen / weinig waarde zou hechten aan de kleur van haar kleding. Uit meerdere interviews en tests, is echter gebleken dat dit een van de belangrijkste dingen is om te weten voor haar digitale kledingkast. Ondanks dat Petra nooit gezien heeft, heeft ze wel een gevoel voor welke kleuren en tintent wel of niet bij elkaar staan. Dit is iets wat ze graag terug zou willen zien in de digitale kledingkast.

## Ignore conventions

Veel standaard conventies op het web zijn in theorie toegspitst op toegankelijkheid. Na zelf veel te testen, ben ik erachter gekomen dat deze conventies in realiteit niet altijd goed werken of soms echt gewoon bagger zijn. Een voorbeeld hiervan is het html element: `<input type="radio">`. Dit element is ervoor bedoeld om een keuze te maken uit meerdere opties. In de praktijk werkt dit element echter niet goed / consistent met de tab toets. Daarom gebruik ik in plaats van conventionele HTML form elementen, `<a href="#">` elementen. Deze elementen werken wel goed met de tab toets en werken met een beetje Javascript net als een `<input type="radio">` element.

## Prioritise identity

Petra vindt het fijn als zoveel mogelijk informatie zo snel mogelijk wordt voorgelezen door haar screenreader. Daarom heb ik ervoor gekozen om de kleuren van de kledingstukken al te laten voorlezen zonder op een extra toets te hoeven drukken. Deze verbetering kwam voort uit feedback op mijn eerste iteratie, waar eerst een aparte toets ingedrukt moest worden om deze informatie te horen.

## Add nonsense

Ik vond het lastig om nonsense toe te voegen aan een applicatie die alleen met een screenreader gebruikt zou worden. Veel nonsense die ik in een normale website zou toevoegen zou verloren gaan of te afleidend zijn voor een screenreader. Daarom heb ik ervoor gekozen om de screenreader een random complimentje te laten voorlezen wanneer een outfit is samengesteld. Dit complimentje is niet functioneel maar zorgt hopelijk wel voor een glimlach op het gezicht van Petra.

### Bronnen

- https://exclusive-design.vasilis.nl/flipping-things/
