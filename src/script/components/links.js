export function processLinks() {
    console.log(document.querySelectorAll('a[href^="http"]'));
    for (const element of document.querySelectorAll('a[href^="http"]')) {
        if (!element.classList.contains('pure')) {
            element.innerHTML +=
                '<i class="fas fa-external-link-alt" aria-hidden="true"></i>';

            element.setAttribute('rel','noopener noreferrer');
            element.setAttribute('target','blank');
        }
    }
}
