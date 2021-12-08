import { post } from '.'
//import {post} from 'axios'

import { baseEndpoint } from '.'

/** This is the path to the nodes microservice */
const servicePath = '/user'

export const createUser = async (email, firstName, lastName) => {
    try {
        return (await post(baseEndpoint + servicePath + '/', {email, firstName, lastName})).data.user
    } catch (err) {
        console.error(err)
    }
}