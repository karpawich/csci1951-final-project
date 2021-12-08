import { post } from '.'
//import {post} from 'axios'

import { baseEndpoint } from '.'

/** This is the path to the nodes microservice */
const servicePath = '/moment'

export const uploadMoment = async (mediaUrl, mediaType, emails, timestamp, eventId) => {
    const data = {media: {mediaUrl, mediaType}, emails, eventId, timestamp}
    const res = await post(baseEndpoint + servicePath + '/', data)
    if (res.error) {
        console.error(res.error)
        return null
    }
    return res.moment
}

export const getMomentsByEvent = async (eventId) => {
    const data = {query: {events: [eventId]}}
    return (await post(baseEndpoint + servicePath + '/search', data)).moments
}