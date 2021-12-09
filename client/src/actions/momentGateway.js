import { post } from '.'
//import {post} from 'axios'

import { baseEndpoint } from '.'

/** This is the path to the nodes microservice */
const servicePath = '/moment'

export const uploadMoment = async (mediaUrl, mediaType, emails, timestamp, eventId) => {
    const data = { media: { mediaUrl, mediaType }, emails, eventId, timestamp }
    try {
        return (await post(baseEndpoint + servicePath + '/', data)).data.moment
    }
    catch (err) {
        console.error(err)
    }
}

export const getMomentsByEvent = async (eventId) => {
    const data = {query: {events: [eventId]}}
    return (await post(baseEndpoint + servicePath + '/search', data)).data.moments
}