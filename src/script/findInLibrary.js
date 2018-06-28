function sanitizeName(name) {
    name = name.replace(' ', '');
    name = name.replace('<!--', '').replace('-->', '');
    name = name.split('<role>')[0];
    name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    name = name.replace('Honza', 'Jan');

    return name;
}

export function findInLibrary(name, library) {
    const nameSanitized = sanitizeName(name);

    for (const item of library) {
        const nameLibrarySanitized = sanitizeName(item.name);

        //console.log(nameSanitized, nameLibrarySanitized);
        if (nameSanitized === nameLibrarySanitized) {
            return item;
        }
    }
    return null;
}
