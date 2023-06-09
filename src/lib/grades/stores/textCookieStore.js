/**
 * @typedef {import('svelte/store').Writable<string> & import('$lib/grades/stores/cookieStore').Cookie} TextCookieStore
 */
import { getCookie, setCookieClient, setCookieServer } from '$lib/grades/stores/cookieStore';
import { get, writable } from 'svelte/store';

/**
 * @param {string} key
 * @param {string} defaultValue
 * @returns {TextCookieStore}
 */
export function createTextCookieStore(key, defaultValue) {
    const storedValue = getCookie(key);
    const initialValue = storedValue === undefined ? defaultValue : storedValue;
    const { subscribe, set, update } = writable(initialValue);
    /**
     * @param {import('@sveltejs/kit').Cookies} cookies
     * @this {TextCookieStore}
     */
    function setStoreByCookie(cookies) {
        const cookieValue = cookies.get(this.cookieKey);
        if (cookieValue === undefined) {
            return;
        }
        this.set(cookieValue);
    }
    /**
     * @this {TextCookieStore}
     * @param {import('@sveltejs/kit').Cookies} [cookies]
     */
    function setCookieByStore(cookies) {
        if (cookies) {
            setCookieServer(cookies, this.cookieKey, get(this));
        }
        setCookieClient(this.cookieKey, get(this));
        setCookieClient(this.cookieKey, get(this));
    }
    /**
     * @this {TextCookieStore}
     * @param {FormData} formData
     */
    function setByFormData(formData) {
        const textValue = formData.get(this.cookieKey);
        if (!textValue) {
            return;
        }
        this.set(/** @type {string}*/(textValue));
    }
    const cookieStore = {
        subscribe,
        set,
        update,
        setStoreByCookie,
        setCookieByStore,
        setByFormData,
        cookieKey: key
    };
    cookieStore.subscribe(() => cookieStore.setCookieByStore());
    return cookieStore;
}
