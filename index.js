!function(e){function n(t){if(r[t])return r[t].exports;var l=r[t]={exports:{},id:t,loaded:!1};return e[t].call(l.exports,l,l.exports,n),l.loaded=!0,l.exports}var r={};n.m=e,n.c=r,n.p="",n(0)}([function(e,n,r){"use strict";var t=r(1),l=r(3),i=r(4),a=r(5);console.log("(cc) Pavol Hejný"),window.onload=function(){console.log("loaded"),(0,t.processPlaces)(),(0,l.processPeople)(),(0,i.processFlags)(),(0,a.processLinks)();var e=(document.getElementById("featured-image-mirror"),document.getElementsByClassName("selectable")),n=!0,r=!1,o=void 0;try{for(var c,u=e[Symbol.iterator]();!(n=(c=u.next()).done);n=!0)!function(){var n=c.value;n.addEventListener("mouseenter",function(){var r=!0,t=!1,l=void 0;try{for(var i,a=e[Symbol.iterator]();!(r=(i=a.next()).done);r=!0){i.value.classList.remove("selected")}}catch(e){t=!0,l=e}finally{try{!r&&a.return&&a.return()}finally{if(t)throw l}}n.classList.add("selected")})}()}catch(e){r=!0,o=e}finally{try{!n&&u.return&&u.return()}finally{if(r)throw o}}}},function(e,n,r){"use strict";function t(){var e=!0,n=!1,r=void 0;try{for(var t,a=document.querySelectorAll("place")[Symbol.iterator]();!(e=(t=a.next()).done);e=!0){var o=t.value,c=o.innerHTML,u=(0,l.findInLibrary)(c,i);u&&(o.innerHTML='\n    <a href="'+u.link+'">'+c+"</a>\n    ")}}catch(e){n=!0,r=e}finally{try{!e&&a.return&&a.return()}finally{if(n)throw r}}}Object.defineProperty(n,"__esModule",{value:!0}),n.processPlaces=t;var l=r(2),i=[{name:"TechHeaven",link:"https://techheaven.org/"},{name:"DEPO2015",link:"https://www.depo2015.cz/"}]},function(e,n){"use strict";function r(e){return e=e.replace(" ",""),e=e.replace("\x3c!--","").replace("--\x3e",""),e=e.split("<role>")[0],e=e.normalize("NFD").replace(/[\u0300-\u036f]/g,""),e=e.replace("Honza","Jan")}function t(e,n){var t=r(e),l=!0,i=!1,a=void 0;try{for(var o,c=n[Symbol.iterator]();!(l=(o=c.next()).done);l=!0){var u=o.value,s=r(u.name);if(console.log(t,s),t===s)return u}}catch(e){i=!0,a=e}finally{try{!l&&c.return&&c.return()}finally{if(i)throw a}}return null}Object.defineProperty(n,"__esModule",{value:!0}),n.findInLibrary=t},function(e,n,r){"use strict";function t(){var e=!0,n=!1,r=void 0;try{for(var t,o=document.querySelectorAll("person")[Symbol.iterator]();!(e=(t=o.next()).done);e=!0){var c=t.value,u=c.innerHTML,s=(0,i.findInLibrary)(u,a);if(s){var f=u.split("<role>"),v=l(f,2),d=v[0],y=v[1];c.innerHTML='\n                <a href="'+s.link+'"> '+d+"</a>"+(y?"<role>"+y:"")+"\n            "}}}catch(e){n=!0,r=e}finally{try{!e&&o.return&&o.return()}finally{if(n)throw r}}}Object.defineProperty(n,"__esModule",{value:!0});var l=function(){function e(e,n){var r=[],t=!0,l=!1,i=void 0;try{for(var a,o=e[Symbol.iterator]();!(t=(a=o.next()).done)&&(r.push(a.value),!n||r.length!==n);t=!0);}catch(e){l=!0,i=e}finally{try{!t&&o.return&&o.return()}finally{if(l)throw i}}return r}return function(n,r){if(Array.isArray(n))return n;if(Symbol.iterator in Object(n))return e(n,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();n.processPeople=t;var i=r(2),a=[{name:"Xxxxxx",link:"xxx"},{name:"Pavol Hejný",link:"https://www.pavolhejny.com/"},{name:"Vladimír Smitka",link:"https://www.linkedin.com/in/vsmitka/"},{name:"Pavel Koenig",link:"https://www.linkedin.com/in/pavelkoenig/"},{name:"Max Kozlov",link:"https://www.linkedin.com/in/themaxkozlov/"},{name:"Jan Steinbach",link:"https://www.linkedin.com/in/honzasteinbach/"},{name:"Michal Vašíček",link:"https://www.linkedin.com/in/vasicekmichal/"},{name:"Jakub Rychlý",link:"https://www.linkedin.com/in/jakubrychly/"},{name:"Veronika Zelinková",link:"http://www.vzelinkova.xyz/"},{name:"Eva Kuttichová",link:"https://dribbble.com/evakuttichova"},{name:"Xxxxxx",link:"xxx"},{name:"Xxxxxx",link:"xxx"},{name:"Xxxxxx",link:"xxx"},{name:"Xxxxxx",link:"xxx"}]},function(e,n){"use strict";function r(){var e=!0,n=!1,r=void 0;try{for(var l,i=document.querySelectorAll("flag-cs")[Symbol.iterator]();!(e=(l=i.next()).done);e=!0){l.value.innerHTML=t}}catch(e){n=!0,r=e}finally{try{!e&&i.return&&i.return()}finally{if(n)throw r}}}Object.defineProperty(n,"__esModule",{value:!0}),n.processFlags=r;var t='\n<svg version="1.0" width="15" height="10">\n\t<rect width="15" height="10" fill="#d7141a"/>\n\t<rect width="15" height="5" fill="#fff"/>\n\t<path d="M 7.5,5 0,0 V 10 z" fill="#11457e"/>\n</svg>\n'},function(e,n){"use strict";function r(){console.log(document.querySelectorAll('a[href^="http"]'));var e=!0,n=!1,r=void 0;try{for(var t,l=document.querySelectorAll('a[href^="http"]')[Symbol.iterator]();!(e=(t=l.next()).done);e=!0){var i=t.value;i.classList.contains("pure")||(0===i.querySelectorAll("flag-cs").length&&(i.innerHTML+='<i class="fas fa-external-link-alt" aria-hidden="true"></i>'),i.setAttribute("rel","noopener noreferrer"),i.setAttribute("target","blank"))}}catch(e){n=!0,r=e}finally{try{!e&&l.return&&l.return()}finally{if(n)throw r}}}Object.defineProperty(n,"__esModule",{value:!0}),n.processLinks=r}]);
//# sourceMappingURL=index.js.map