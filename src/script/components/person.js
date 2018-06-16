import {findInLibrary} from '../findInLibrary';


const people = [

    {
        name: 'David Žahour',
        link: 'https://www.facebook.com/david.pqe?ref=br_rs'

    },
    {
        name: 'Vladimír Smitka',
        link: 'https://www.linkedin.com/in/vsmitka/'

    },
    {
        name: 'Pavel Koenig',
        link: 'https://www.linkedin.com/in/pavelkoenig/'

    }


    
    

]

for(const personElement of document.querySelectorAll('person')){

    const originalID = personElement.innerHTML;
    const person = findInLibrary(originalID,people);

    if(person){
        personElement.innerHTML=`
        <a href="${person.link}"> ${originalID}</a>
        `;
    }




}