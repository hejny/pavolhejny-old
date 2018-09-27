# Virtuální realita na webu
## [Pavol Hejný](https://www.pavolhejny.com/)



![](https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.pavolhejny.com/virtualni-realita-na-webu)

https://www.pavolhejny.com/virtualni-realita-na-webu


<footer>2018-09-27 | JobsDev.cz Meetup #4 </footer>


???
Ahoj jmenuji se Pavel Hejný jsem vývojář webových aplikací. Vyvíjím elektronické učebnice matematiky. Miluji nové technologie a proto se účastním konferencí meetupů konferencí a hackathonů.

Před dvěma týdny jsem byl na hackathonu veřejné správy. Myslel jsem, že budu pracovat čistě s daty, ale kromě velkého množství skvělých datových sad jsme měli k dispozici HTC Vive a Oculus Rift. 

Vedle mě stál kamarád se kterým jsme členem české Mozilla komunity a rychle nás napal nápad.
Co kdybychom všechna ta data zobrazovali na mapě v

---

![](/content/presentations/virtualni-realita-na-webu/hackuj-stat-clanek.png)


???








 kde rád vyvíjím a povídám o nejnovějších možnostech webu. Také jsem člen české Mozilla komunity se kterou chodíme po technologických konferencích a ukazujeme, co všechno dnes na webu jde včetně VR na webu a proto bych vám tom dnes rád řekl.

Než přejdu k virtuální realitě, začnu s 3D technologiemi na webu. Když jsem byl na prvním 1. Jobs Dev konferenci, mluvil jsem na téma na 3D na webu. 

Kde se dá 3D na webu dneska využívá
Napadá mě hned několik příkladů:



---
# Mapy

![](/content/presentations/virtualni-realita-na-webu/map.jpg)

???
Docela běžně se na webu setkáváme s 3D v mapách.

---
# Sférické 36O° foto/video

![](/content/presentations/virtualni-realita-na-webu/spherical-photo.jpg)

???
Sférické fotografie na Facebooku a YouTube.

---
# First person Scéna a Hry

![](/content/presentations/virtualni-realita-na-webu/babylon-js-game.jpg)

???
Věc která na webu zatím není úplně běžná jsou First person scény na webu


možná rozvést a collapse game


---

# Technologie

## APIs

- WebGL
- ES6, HTML5
- Browser APIs
  - (Pointer Lock API, Fullscreen API...)


???
Jaké technologie to umožní?

Jako hlavní je přístup ke grafické kartě přímo z prohlížeče pomocí WebGL. WebGL bylo standardizované v roce 2011 a dnes je  dostupné v 92% používaných prohlížečů.

WebGL ale rozhodně není jediná technologie díky které se dají 3D scény na webu vytvářet

Velmi důležitým skokem je celkové zlepšení javascriptu - ES6 a HTML5.

Existuje mnoho APIs, která umožňují webovým aplikacím funkce, které byli donedávna možné pouze desktopovým a mobilním aplikacím. Např. Pointer Lock API.

---

# Technologie

## Knihovny

existuje jich velké množství

- Three.js
- Babylon.js (TS)

???

Pokud chce člověk s 3D na webu pracovat bez psaní shaderů a nutnosti ovládat nízkoúrovňové API, je dobré využít některou z knihoven. Existuje jich velké množství. Já jsem vybral dvě které jsou podle mě nejdůležitější a nejzajímavější:

1) Tou první je Three.js. Je velmi dobrá na statické scény a pro ty co píši v čistém javascriptu. Zajímavé na ní je to, že byla vytvořena ještě předtím než bylo WebGL standartem.

2) Má oblíbená je však Babylon.js . Babylon je napsaný v TypeScriptu a je perfektní na vytváření herních a pohyblivých scén na webu.

Obě se následně dají použít i pro virtuální realitu na webu. 

---

# A-Frame

codesample:html:phejny/n2Le0za8/

???

Navíc existuje knihovna A-frame vyvíjená Mozillou postavená nad Three.js, která je designovaná přímo pro virtuální realitu a lze v ní psát scény velmi jednoduše v xml podobně, jak se zapisuje svg v rámci html.

Pokud chcete vytvořit něco velmi jednoduchého a chcete jen kódovat bez nutnosti programovat, použijte práve ji.

---

# Virtuální realita

![](/content/presentations/virtualni-realita-na-webu/vr-helmet.jpg)


???


Běžné 3D scény se ovládají pomocí tří věcí kurzoru, dotyku a klávesnicí. A obvykle buď zobrazují předmět, který před sebou otáčíme nebo scénu ve které jsme my postavou a pohybujeme se v ní. Případně zjednodušený případ kdy se pouze otáčíme kolem sférické fotografie či videa.


Virtuální realita se liší pomocí dvou věcí:
Pomocí toho, jak se ovládá a toho, že se renderuje místo do jedné plochy do obou očí.


Brýle virtuální reality například HTC Vive nebo Oculus Rift nejsou vlastně ničím jiným než obyčejnou obrazovkou, která je rozdělena na dvě části - dvě oči. A zároveň dokonale odděluje obraz od okolí. Další věcí kterou dělají je velmi přesné snímání pohybu a orientace natočení.

---

# WebVR
- [WebVR API](https://webvr.info/)
- Gamepad API
- DeviceOrientation API


???
Druhá velmi důležitá věc pro virtuální realitu velmi přesně synchronizovaný pohyb s obrazem. Jak pohyb helmy, tak pohyb ovladačů v ruce.

V helmách se k přenesení pohybu a natočení používá Gamepad API. Pokud nepoužíváte HTC vive nebo Oculus Rift ale mobil např. s Cardboard, k zaznamenání přesného pohybu využíváte gyroskop v mobilu. Ten se dá z javascriptu snímat pomocí DeviceOrientation API.



---
# Simple box
codesample:js:phejny/4j8w5g3q/1
---
# Many boxes
codesample:js:phejny/4j8w5g3q/4
---
# Boxes and rotation
codesample:js:phejny/4j8w5g3q/7
---
# Sky of spheres
codesample:js:phejny/4j8w5g3q/12
---
# VR camera
codesample:js:phejny/4j8w5g3q/14
---

#Fyzika
sample-background:webappgames.github.io/3d-project/

---


# Dává VR smysl?

Vůbec?

Na webu?

---

## Díky za pozornost!

![](https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.pavolhejny.com/virtualni-realita-na-webu)

https://www.pavolhejny.com/virtualni-realita-na-webu

https://webappgames.github.io/collapse-game/ *←Mobil*

https://webappgames.github.io/3d-project/ *←PC*





