import { findInLibrary } from '../findInLibrary';

const PEOPLE = [
    {
        name: 'David Žahour',
        link: 'https://www.facebook.com/isouesense/',
    },
    {
        name: 'Vladimír Smitka',
        link: 'https://www.linkedin.com/in/vsmitka/',
    },
    {
        name: 'Pavel Koenig',
        link: 'https://www.linkedin.com/in/pavelkoenig/',
    },
    {
        name: 'Max Kozlov',
        link: 'https://www.linkedin.com/in/themaxkozlov/',
    },
    {
        name: 'Jan Steinbach',
        link: 'https://www.linkedin.com/in/honzasteinbach/',
    },
];

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
