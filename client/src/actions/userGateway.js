import { post } from '.'
//import {post} from 'axios'

import { baseEndpoint } from '.'

/** This is the path to the nodes microservice */
const servicePath = '/user'

export const createUser = async (email, firstName, lastName) => {
    const res = await post(baseEndpoint + servicePath + '/', {email, firstName, lastName})
    if (res.error) {
        console.error(res.error)
        return null
    }
    return res.user
}