# Verkefni10

Þetta er veðurspáinn úr verkefni 9 fyrir utan að hægt er að leita að fleiri borgum og hægt er að velja hvaða mælieiningar eru notaðar. Svo bætti ég líka við korti neðst á síðunni

## Tól
- Vite build framework
- Vue web framework
- eslinter fyrir javascript linting
- stylelinter fyrir css linting
- sass til að skipta css upp
- prettier til að formatta kóða
- Open Layers javascript library fyrir kort
- concurrently til að keyra skipanir samhliða

## Notkun
Vue notar Vite build frameworkið til að útbúa build og til að keyra dev server
hægt er að nota npm run dev til að keyra development serverinn
og npm run build til að búa til build af síðunni

Í src möppuni er App.vue skrá sem inniheldur allt html fyrir main hluta síðunnar
í main.js er notað fallið createApp sem settur html-ið í App.vue í DOM-ið á síðunni.
í main.js er síðan sett event listener á ákveðna hluti á síðunni.
