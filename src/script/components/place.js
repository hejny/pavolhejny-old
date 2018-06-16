import {findInLibrary} from '../findInLibrary';

const places = [

    {
        name: 'TechHeaven',
        link: 'https://techheaven.org/',
        //icon: '/images/logos/techheaven-icon.svg'
    },
    {
        name: 'DEPO2015',
        link: 'https://www.depo2015.cz/',
    }

]

for(const placeElement of document.querySelectorAll('place')){

    const originalID = placeElement.innerHTML;
    const place = findInLibrary(originalID,places);

    if(place){
    placeElement.innerHTML=`
    <a href="${place.link}">${place.icon?`<img src="${place.icon}" alt="${place.name} logo">`:''}${originalID}</a>
    `;
    }




}