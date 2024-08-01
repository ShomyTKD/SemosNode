/**
 * Funkcija koja generiše HTML sadržaj za email poruku.
 *
 * @param {string} template - The HTML template to use.
 * @param {object} replacements - An object containing key-value pairs to replace in the template.
 * @return {string} The generated HTML document.
 */
function generateHTML(template, replacements) {
    return template.replace(/{{(.*?)}}/g, (match, p1) => replacements[p1.trim()]);
}

module.exports = generateHTML;