console.log('(cc) Pavol Hejný');
import { processPlaces } from './components/place';
import { processPeople } from './components/person';
import { processFlags } from './components/flags';
import { processLinks } from './components/links';

window.onload = () => {
    console.log('loaded');

    processPlaces();
    processPeople();
    processFlags();
    processLinks();

    const featureImageMirror = document.getElementById('featured-image-mirror');
    const selectableElements = document.getElementsByClassName('selectable');
    for (const element of selectableElements) {
        element.addEventListener('mouseenter', () => {
            for (const element of selectableElements) {
                element.classList.remove('selected');
            }
            element.classList.add('selected');
        });
    }
};
