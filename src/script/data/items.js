export const ITEMS =

    [

        {
            id: "3d-galleries",
            uri: {
                cs: '3d-galerie',
                en: '3d-galleries'
            },
            type: "WEB_APP_S",
            interesting: true,
            name: {
                cs: "3D galerie",
                en: "3D galleries"
            },
            description: {
                cs: "Systém pro vytváření 3D galerií přímo na webu.",
                en: "System for creating 3D galleries on the web."
            },


            time: "6.2016-now",
            //todo fbgallery
            links:{
                'galerie.fotobernovska.cz': "http://galerie.fotobernovska.cz/",
                'gallery.pavolhejny.com': "http://gallery.pavolhejny.com/"
            },
        },


        {
            id: "todotable.com",
            type: "MINI_WEB_APP",
            language: 'en',
            //interesting: true,
            name: "TodoTable.com",
            roles: {
                "Pavol Hejný": "creator",
            },
            time: "4.2017-now",
            url:"http://todotable.com",

        },


        {
            id: "crypto-poll",
            type: "MINI_WEB_APP",
            language: 'en',
            interesting: true,
            name: "Crypto poll",
            roles: {
                "Pavol Hejný": "creator",
            },
            time: "5.2017-now",
            url:"https://hejny.github.io/crypto-poll/",

        },



        {
            id: "webappgames.com",
            type: "WEB_APP",
            language: 'en',
            name: "WebAppGames",
            description: {
                cs: "Hry vyrobené jako plnohodnotné www aplikace.",
                en: "Games as full-fledged web applications that can be played instantly without installation or manual downloading. "
            },
            roles: {
                "Pavol Hejný": "creator",
                "Přemysl Černý": "creator"
            },
            time: "10.2016-now",

            links:{Website: "http://webappgames.com"},
        },


        {
            id: "logic",
            parent: "webappgames.com",
            type: "WEB_GAME",
            name: {
                cs: "Logic",
                en: "Logic"
            },
            description: {
                cs: "Hra pro soutěž v rámci ITNetwork.cz.",
                en: "Game for competition on ITNetwork.cz."
            },
            roles: {
                "Pavol Hejný": "creator"
            },
            time: "7.2016-now",
            links:{Game: "http://logic.towns.cz",Forum: "http://www.itnetwork.cz/nezarazene/programatorska-soutez-geekwork-2016/hra-monster-canvas/"},
            //embed:["http://logic.towns.cz"],
            fbgallery: "10209122553847079",

        },

        {
            id: "towns",
            type: "WEB_GAME_S",
            interesting: true,
            name: "Towns",
            description: {
                cs: "Série strategických online her",
                en: "A series of strategic online games"
            },
        },


        {
            id: "towns5",
            parent: "towns",
            type: "WEB_GAME",
            name: "Towns 5",
            description: {
                cs: "Poslední, nedokončená verze Towns s otevřeným API. Hráči si zde budou moct vytvořit cokoliv od vlastních prvků na budovách až po celá impéria.",
                en: ""
            },
            roles: {
                "Pavol Hejný": "creator",
                "Štefan Kecskés": "creator",
                mp: "collaborator"
            },
            time: "6.2015-10.2016",
            //links:{Website: "http://towns.cz"},
            fbgallery: "10209122537926681",
        },


        {
            id: "towns4",
            parent: "towns",
            type: "WEB_GAME",
            name: "Towns 4",
            description: {
                cs: "Dlouho běžící online hra s izometrickou mapou. 3D budovami, spojováním budov a příběhy ve hře.",
                en: ""
            },
            roles: {
                "Pavol Hejný": "creator",
                "David Hrůša": "collaborator",
                "Přemysl Černý": "collaborator"
            },
            time: "6.2011-6.2015",
            fbgallery: "4537869370905",

        },


        {
            id: "towns3",
            parent: "towns",
            type: "WEB_GAME",
            name: "Towns 3",
            description: {
                cs: "Nedokončený projekt ve Flashy."
            },
            roles: {
                "Pavol Hejný": "creator",
                "David Hrůša": "collaborator"
            },
            time: "4.2009-3.2010",
            fbgallery: "1087741439863",
        },


        {
            id: "towns2",
            parent: "towns",
            type: "WEB_GAME",
            name: "Towns 2",
            description: {
                cs: "Druhá verze s izometrickou mapou, vylepšeným designem, vygenerovaným ostrovem 200x200 políček.",
                en: ""
            },
            roles: {
                "Pavol Hejný": "creator",
                "David Hrůša": "collaborator"
            },
            time: "2.2008-4.2009",
            fbgallery: "10205480393795354",
        },


        {
            id: "towns1",
            parent: "towns",
            type: "WEB_GAME",
            name: "Towns 1",
            description: {
                cs: "První ze série her Towns. Jednoduchá strategická hra s 2D mapou 100x100 políček. ",
                en: ""
            },
            roles: {
                "Pavol Hejný": "creator",
                "David Hrůša": "collaborator"
            },
            time: "6.2007-2.2008",
            fbgallery: "10205480360514522",
        },


        {
            id: "towers",
            uri: {
                cs: "veze",
                en: "towers"
            },
            type: "BOARD_GAME",
            name: {
                cs: "Věže",
                en: "Towers"
            },
            description: {
                cs: "Desková stavební hra hraná v reálném čase. Ještě ne zcela dokončený projekt.",
                en: "Board game played in real time. Not fully completed project."
            },
            roles: {
                "Pavol Hejný": "creator"
            },
            start: "2.2011-2.2014",
            fbgallery: "1957571225064",
        },





        {
            id: "kunraticky-les",
            uri: {
                cs: "kunraticky-les",
                en: "kunraticky-forest"
            },
            type: "WEB_PAGE",
            language: 'cs',
            name: "Kunratický les",
            description: {
                cs: "Přes 500 panoramatických snímků z Kunratického lesa z jara 2010.",
                en: "Over 500 panorama images from the Kunratický forest from spring 2010."
            },
            roles: {
                "Pavol Hejný": "creator"
            },
            start: "5.2010-now",

            url:"http://les.towns.cz",

            links:{Website: "http://les.towns.cz"},
            //fbgallery: "xxx",

        },


        {
            id: "fractals",
            uri: {
                cs: "fraktaly",
                en: "fractals"
            },
            type: "PROJECT",
            interesting: true,
            name: {
                cs: "Fraktály",
                en: "Fractals"
            },
            description: {
                cs: "Generátor fraktálů odvozených z Mandelbrotovi množiny.",
                en: "Fractal generator derived from the Mandelbrot set."
            },
            roles: {
                "Pavol Hejný": "creator"
            },
            start: "6.2013-now",
            links:{Website: "http://fractal.towns.cz"},
            fbgallery: "4963526252061",
        },



        {
            id: "avif-mobile",
            uri: {
                cs: "mobilni-aplikace-avif",
                en: "avif-mobile"
            },
            type: "MOBILE_APP",
            language: 'cs',
            interesting: true,
            name: {
                cs: "Avif Mobile",
                en: "Avif Mobile"
            },
            url:"https://play.google.com/store/apps/details?id=czavif.httpbirds.avifmobile",
            description: {
                cs: "Mobilní aplikace pro AviFaunistickou databázi ČR. Projekt České společnosti ornitologické",
                en: "Mobile application for the Czech AviFaunistic database. Project of the Czech Society of Ornithology"
            },
            roles: {
                "Pavol Hejný": "backend",
                "Přemysl Černý": "frontend"
            },
            time: "5.2015-now",
            links:{'Google Play': "https://play.google.com/store/apps/details?id=czavif.httpbirds.avifmobile"},
        },


        {
            id: "avif",
            type: "WEB_APP",
            language: 'cs',
            name: {
                cs: "Avif",
                en: "Avif"
            },
            url:"http://birds.cz",
            description: {
                cs: "AviFaunistická databáze ČR, Projekt České společnosti ornitologické",
                en: "Czech AviFaunistic database, Project of the Czech Society of Ornithology"
            },
            roles: {
                "Pavol Hejný": "administrator"
            },
            time: "9.2014",
            links:{Website: "http://birds.cz"},
        },


        {
            id: "cso-hry",
            uri: {
                cs: "cso-hry",
                en: "birds-games"
            },
            type: "WEB_GAME",
            language: 'cs',
            name: {
                cs: "Ptáci ve městech",
                en: "Birds in cities"
            },
            url:"http://hry.birds.cz",
            description: {
                cs: "3 jednoduché minihry pro Českou společnost ornitologickou",
                en: "3 simple mini games for the Czech Ornithological Society"
            },
            roles: {
                "Pavol Hejný": "creator"
            },
            start: "12.2015-now",
            links:{Website: "http://hry.birds.cz"},
        },


        {
            id: "hesla-pythagoras",
            type: "TALK",
            language: 'sk',
            name: {
                cs: "Hesla",
                en: "Passwords"
            },
            event: "LŠ Pythagoras",
            links:{
                Slides: "https://www.slideshare.net/secret/NUM3fvx7p1qBmo",
                //Event: 'https://www.jobsdev.cz/'
            },
            embed: ["https://www.slideshare.net/slideshow/embed_code/key/NUM3fvx7p1qBmo"],
            date: "2017-07-08"
        },
        /*{
            id: "react-redux-paralelni-polis",
            type: "TALK",
            interesting: true,
            //preparing: true,
            language: 'en',
            name: "React+Redux",
            event: "Paralelní Polis",
            //links:{Slides: "http://js.slides.webappgames.com/"},
            //embed: ["http://js.slides.webappgames.com/"],
            date: "2017-06-05"
        },*/
        {
            id: "3d-na-webu-jobsdev",
            type: "TALK",
            interesting: true,
            //preparing: true,
            language: 'cs',
            name: {
                cs: "3D na webu",
                en: "3D on the web"
            },
            event: "Jobs Dev",
            links:{
                Slides: "https://www.slideshare.net/PavolHejn/3d-na-webu",
                Event: 'https://www.jobsdev.cz/'
            },
            embed: ["https://www.slideshare.net/slideshow/embed_code/key/BqS93r0cqlYP0r"],
            date: "2017-05-27"
        },
        {
            id: "react-redux-itnetwork",
            type: "TALK",
            interesting: true,
            language: 'cs',
            name: "React+Redux",
            event: "ITNetwork",
            links:{
                Slides: "http://js.slides.webappgames.com/",
                Sample: "https://jsfiddle.net/phejny/vL5ae5L2/14/",
            },
            //embed: ["http://js.slides.webappgames.com/"],
            date: "2017-03-31"
        },

        {
            id: "3d-na-webu-itnetwork",
            type: "TALK",
            language: 'cs',
            name: {
                cs: "3D na webu",
                en: "3D on the web"
            },
            event: "ITNetwork",
            links:{Slides: "https://www.slideshare.net/PavolHejn/itnetwork-3d-na-webu"},
            embed: ["https://www.slideshare.net/slideshow/embed_code/key/n0Jfwxs3NQr1vR"],
            date: "2016-11-25"
        },


        //todo talk from 3.2016

        {
            id: "3d-na-webu-openalt",
            type: "TALK",
            interesting: true,
            language: 'cs',
            name: {
                cs: "3D na webu",
                en: "3D on the web"
            },
            event: "OpenAlt",
            links:{
                Slides: "https://www.slideshare.net/PavolHejn/3d-na-webu-konference-openalt",
                Video: 'https://www.superlectures.com/openalt2016/3d-na-webu'
            },
            //embed: ["https://www.slideshare.net/slideshow/embed_code/key/phlBSFxDrHuLq7"],
            date: "2016-11-06"
        },


        {
            id: "webappgames-gds2016",
            parent: "webappgames.com",
            type: "TALK",
            language: 'en',
            name: {
                cs: "Web App Games",
                en: "Web App Games"
            },
            event: "Game Developers Session",
            links:{Slides: "https://www.slideshare.net/PavolHejn/web-app-games"},
            embed: ["https://www.slideshare.net/slideshow/embed_code/key/4UACJkubrTz30u"],
            date: "2016-11-03"
        },


        {
            id: "generovana-2d-grafika-na-webu-itnetwork",
            type: "TALK",
            interesting: true,
            language: 'cs',
            name: {
                cs: "Generovaná 2D grafika na webu",
                en: "Generating 2D graphics on web"
            },
            event: "ITNetwork",
            links:{
                Slides: "https://www.slideshare.net/PavolHejn/generovan-2d-grafika-na-webu",
                'Sample 1': "https://jsfiddle.net/phejny/aknp0z71/13/",
                'Sample 2': "https://jsfiddle.net/phejny/497esp0z/15/",
                'Sample 3': "https://jsfiddle.net/phejny/hasf4gag/8/"

            },
            embed: ["https://www.slideshare.net/slideshow/embed_code/key/5nkcbs1xuxWKoW"],
            date: "2016-06-24"
        },


        {
            id: "webove-aplikace-v-javascriptu-itnetwork",
            type: "TALK",
            language: 'cs',
            name: {
                cs: "Webové aplikace v JavaScriptu",
                en: "Web applications in JavaScript"
            },
            event: "ITNetwork",
            links:{Slides: "https://www.slideshare.net/PavolHejn/webov-aplikace-v-javascriptu"},
            embed: ["https://www.slideshare.net/slideshow/embed_code/key/I7cENTfs9uL16b"],
            date: "2016-05-27"
        },


        {
            id: "fraktaly-itnetwork",
            parent: "fractals",
            type: "TALK",
            //interesting: true,
            language: 'cs',
            name: {
                cs: "Fraktály",
                en: "Fractals"
            },
            event: "ITNetwork",
            url: "http://www.itnetwork.cz/zpravodajstvi/prednasky/fraktaly",
            date: "2015-09-25"
        },


        {
            id: "jak-funguje-online-hra-towns",
            parent: "towns",
            type: "TALK",
            language: 'cs',
            name: {
                cs: "Jak funguje online hra Towns",
                en: "How does online game Towns work"
            },
            event: "ITNetwork",
            links:{Slides: "http://www.itnetwork.cz/zpravodajstvi/prednasky/jak-funguje-online-hra-towns"},
            date: "2015-06-26"
        },








        {
            //id: "",
            //parent: "towns",
            interesting: true,
            type: "ARTICLE_S",
            language: 'cs',
            name: {
                cs: "Vytvoř si vlastní webovou hru",
                en: "Create your own web game"
            },
            url:"https://www.itnetwork.cz/vytvor-si-vlastni-webovou-hru",
            date: "2017-06-07"
        },

        {
            id: "generator-stromu-itnetwork",
            parent: "towns",
            type: "ARTICLE",
            language: 'cs',
            name: {
                cs: "Generátor stromů",
                en: "Tree generator"
            },
            url:"http://www.itnetwork.cz/php/ostatni/php-aplikace-generator-stromu",
            date: "2015-06-01"
        },


        {
            id: "generator-map-itnetwork",
            parent: "towns",
            type: "ARTICLE",
            language: 'cs',
            name: {
                cs: "Generátor map",
                en: "Map generator"
            },
            url:"http://www.itnetwork.cz/php/php-aplikace-generator-map",
            date: "2015-05-03"
        }


    ]







/*

 {
 id: "bezpecne-zastavky",
 uri: {
 cs: "bezpecne-zastavky",
 en: "safe-stops"
 },
 type: "WEB_APP",
 name: {
 cs: "Bezpečné zastávky",
 en: "Safe stops"
 },
 url:"http://zastavky.birdlife.cz",
 description: {
 cs: "",
 en: ""
 },


 roles: {
 "Pavol Hejný": "creator",
 "Zbyněk Janoška": "creator, administrator"
 },
 time: "1.2016-now",
 links:{Website: "http://zastavky.birdlife.cz"},
 },


{
 id: "skydreamgame.com",
 parent: "webappgames.com",
 type: "WEB_GAME",
 name: "SkyDreamGame.com",
 description: {
 cs: "",
 en: "The player wakes up in a heavenly realm and his goal is to choose a path upon a spider web and solve logical puzzles that present themselves during the way. All possible ways lead to a great castle on clouds. The puzzles include logical keys and teleportation. During the game the player also learns more about his story. "
 },
 roles: {
 "Pavol Hejný": "creator",
 "Přemysl Černý": "creator"
 },
 start: "10.2016-11.2016",
 //status: "working",
 links:{Website: "http://skydreamgame.com"},
 embed:["http://skydreamgame.com"],
 },*/
/*{
 id: "logic-ti89",
 type: "TI89_APP",
 name: {
 cs: "Logic",
 en: "Logic"
 },
 description: {
 cs: "Logická bludišťová plošinovka pro známé programovatelné kalkulačky TI-89. Součástí hry je i editor a mnoho vytvořených úrovní.",
 en: ""
 },
 roles: {
 "Pavol Hejný": "creator"
 },
 start: "2.2007",
 end: "6.2007",
 //status: "done",
 //fbgallery: "xxx",
 },*/
/*{
 id: "graph",
 uri: {
 cs: "3d-graf",
 en: "3d-graph"
 },
 type: "DESKTOP_APP",
 name: {
 cs: "3D Graf",
 en: "3D Graph"
 },
 description: {
 cs: "2D / 3D program pro vykreslování grafů jedné nebo dvou funkcí. Netradiční možnost dynamicky měnit barvu a tloušťku čas podle vzorce.",
 en: ""
 },

 //todo download
 roles: {
 "Pavol Hejný": "creator"
 },


 start: "10.2012-6.2013",
 links:{Website: "http://3d.towns.cz"},
 fbgallery: "4833554642852",
 },
 {
 id: "drawing",
 uri: {
 cs: "kresleni",
 en: "drawing"
 },
 type: "DESKTOP_APP",
 name: {
 cs: "Kreslení",
 en: "Drawing"
 },
 description: {
 cs: "Jednoduchý kreslící bitmapový program s několika speciálními funkcemi např. paprsčité kreslení čar a obdélníků nebo kreslení pomocí textu.",
 en: ""
 },
 //todo download
 roles: {
 "Pavol Hejný": "creator"
 },


 start: "5.2012",
 end: "6.2012",
 //status: "done",
 links:{Website: "http://kresleni.towns.cz"},
 fbgallery: "3433888252067",
 },*/
