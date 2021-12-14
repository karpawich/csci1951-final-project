import { post, get } from '.'
//import {post} from 'axios'

import { baseEndpoint } from '.'

/** This is the path to the nodes microservice */
const servicePath = '/moment'

export const uploadMoment = async (mediaUrl, mediaType, emails, timestamp, eventId) => {
    const moment = { media: { mediaUrl, mediaType }, emails, eventId, timestamp }
    try {
        const res = await post(baseEndpoint + servicePath + '/', { moment })
        console.log(res)
        return res.moment
    }
    catch (err) {
        console.error(err)
    }
}

export const getMomentsByEvent = async (eventId) => {
    const data = { query: { events: [eventId] } }
    return (await post(baseEndpoint + servicePath + '/search', data)).moments
}

export const getMomentById = async (id) => {
    return (await get(baseEndpoint + servicePath + '/' + id)).moment
}

export const getMomentsByIds = async (ids) => {
    return (await post(baseEndpoint + servicePath + '/ids', { ids })).moments
}