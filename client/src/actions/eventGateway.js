import { post } from '.'

import { baseEndpoint } from '.'

/** This is the path to the nodes microservice */
const servicePath = '/event'

export const createEvent = async (name, location, emails) => {
    try {
        const event = { name, location, emails }
        return await post(baseEndpoint + servicePath + '/', {event})
    } catch (err) {
        console.error(err)
    }
}

export const getEventsByEmail = async (email) => {
    try {
        return (await post(baseEndpoint + servicePath + '/email', { email })).events
    } catch (err) {
        console.error(err)
    }
}

export const addEmailToEvent = async (eventId, email) => {
    console.log(eventId, email)
    try {
        return await post(baseEndpoint + servicePath + `/email/${eventId}`, { email })
    } catch (err) {
        console.error(err)
    }
}