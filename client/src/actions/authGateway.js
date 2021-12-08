import {post, get} from 'axios'

import { baseEndpoint } from '.'

/** This is the path to the nodes microservice */
const servicePath = '/auth'

export const login = async (email) => {
    const res = await post(baseEndpoint + servicePath + '/login', { email })
    if (res.status === 400) {
        console.error(res.error)
        return null
    }

    return res.data
}