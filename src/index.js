import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

import { fetchCountries } from './fetchCountries';
import { renderListCountries } from './rendering';
import { rendercountry } from './rendering';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryLlist: document.querySelector('.country-list'),
    countryIinfo: document.querySelector('.country-info'),
}

refs.input.addEventListener("input", debounce(onFetchCountries, DEBOUNCE_DELAY));

function onFetchCountries(event) {
    const inputValue = event.target.value.trim();
    if (!inputValue) {
     clearHtml();   
        return;
    }
    fetchCountries(inputValue)
        .then(arrayCoutries => { 
            if (arrayCoutries.length > 10) {
                Notify.info("Too many matches found. Please enter a more specific name.");
                clearHtml();
                return;  
            }
            if (arrayCoutries.length > 1) {
                refs.countryIinfo.innerHTML = "";
                refs.countryLlist.innerHTML = renderListCountries(arrayCoutries);
                return;
            }
            refs.countryLlist.innerHTML = "";
            refs.countryIinfo.innerHTML = rendercountry(arrayCoutries);
        })
        .catch((error) => {
            if (error.message === "Cannot read properties of undefined (reading 'languages')") {
                Notify.failure("Oops, there is no country with that name");
            }
            clearHtml();
            console.log(error.message);
           })
}

function clearHtml() {
     refs.countryLlist.innerHTML = "";
     refs.countryIinfo.innerHTML = "";  
}