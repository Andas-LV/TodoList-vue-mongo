import Cookies from 'universal-cookie';

export default function getCookie(name) {
    const cookies = new Cookies(document.cookie);
    return cookies.get(name);
}
