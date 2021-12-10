import {post, get} from 'axios'

import { baseEndpoint } from '.'

/** This is the path to the nodes microservice */
const servicePath = '/auth'

export const login = async (email) => {
    try {
        console.log(email);
        return (await post(baseEndpoint + servicePath + '/login', { email })).status == 200
    } catch (err) {
        console.error(err)
    }
}

const getCookiesMap = cookiesString => {
    // code borrowed from stack overflow
  return cookiesString.split(";")
    .map(function(cookieString) {
        return cookieString.trim().split("=");
    })
    .reduce(function(acc, curr) {
        acc[curr[0]] = curr[1];
        return acc;
    }, {});
}

export const getEmail = () => getCookiesMap(document.cookie)['username'].replaceAll('%40', '@');