export function renderListCountries(array) {
    return array.map(({ flags: { svg }, name: { official } }) => {
        return `<li>
        <img src=${svg} alt='flag' width=20> ${official}</li>`
    }).join("");
}

export function rendercountry(array) {
    const language = Object.values(array[0].languages).join(", ");
    return array.map(({ flags: { svg }, name: { official }, capital, population}) => {
    return `<h1><img src=${svg} alt='flag' width=30> ${official}</h1>
    <p><b>Capital:</b> ${capital}</p>
    <p><b>Population:</b> ${population}</p>
    <p><b>Languages:</b> ${language}</p>`
}).join("");
}