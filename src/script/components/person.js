import { findInLibrary } from '../findInLibrary';
const PEOPLE = [
    {
        name: 'David Žahour',
        link: 'https://www.facebook.com/isouesense/',
    },
    {
        name: 'Pavol Hejný',
        link: 'https://www.pavolhejny.com/',
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
    {
        name: 'Michal Vašíček',
        link: 'https://www.linkedin.com/in/vasicekmichal/',
    },
    {
        name: 'Jakub Rychlý',
        link: 'https://www.linkedin.com/in/jakubrychly/',
    },
    {
        name: 'Veronika Zelinková',
        link: 'http://www.vzelinkova.xyz/',
    },
    {
        name: 'Eva Kuttichová',
        link: 'https://dribbble.com/evakuttichova',
    },
    {
        name: 'Xxxxxx',
        link: 'xxx',
    },
    {
        name: 'Xxxxxx',
        link: 'xxx',
    },
    {
        name: 'Xxxxxx',
        link: 'xxx',
    },
    {
        name: 'Xxxxxx',
        link: 'xxx',
    },
];

export function processPeople() {
    console.log('Processing <person>...');

    for (const personElement of document.querySelectorAll('person')) {
        const id =
            personElement.getAttribute('source') || personElement.innerHTML;
        const originalID = personElement.innerHTML;
        console.log(id);
        const person = findInLibrary(id, PEOPLE);

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
