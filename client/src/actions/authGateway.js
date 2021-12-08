import {post, get} from 'axios'

import { baseEndpoint } from '.'

/** This is the path to the nodes microservice */
const servicePath = '/auth'

export const login = async (email) => {
    try {
        // supposed to redirect ?
        await post(baseEndpoint + servicePath + '/login', { email })
    } catch (err) {
        console.error(err)
    }
}