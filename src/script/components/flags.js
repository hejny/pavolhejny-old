const height = 10;
const template = `
<svg version="1.0" width="${(height / 2) * 3}" height="${height}">
	<rect width="${(height / 2) * 3}" height="${height}" fill="#d7141a"/>
	<rect width="${(height / 2) * 3}" height="${height / 2}" fill="#fff"/>
	<path d="M ${((height / 2) * 3) / 2},${height /
    2} 0,0 V ${height} z" fill="#11457e"/>
</svg>
`;

export function processFlags() {
    for (const element of document.querySelectorAll('flag-cs')) {
        element.innerHTML = template;
    }
}
