import { findInLibrary } from '../findInLibrary';
import { PEOPLE } from '../../content/people';

export function processPeople() {
    for (const personElement of document.querySelectorAll('person')) {
        const originalID = personElement.innerHTML;
        const person = findInLibrary(originalID, PEOPLE);

        if (person) {
            const [originalIDName, originalIDRole] = originalID.split('<role>');

            personElement.innerHTML = `
                <a href="${person.link}"> ${originalIDName}</a>${
                originalIDRole ? '<role>' + originalIDRole : ''
            }
            `;
        }
    }
}
