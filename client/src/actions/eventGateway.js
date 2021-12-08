import { post, get } from 'axios'

import { baseEndpoint } from '.'

/** This is the path to the nodes microservice */
const servicePath = '/event'

export const createEvent = async (event) => {
    const res = await post(baseEndpoint + servicePath, { event })
    if (res.status === 400) {
        console.error(res.error)
        return null
    }

    return res.data
}