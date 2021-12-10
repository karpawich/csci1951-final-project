import { post } from '.'

import { baseEndpoint } from '.'

/** This is the path to the nodes microservice */
const servicePath = '/event'

export const createEvent = async (name, emails) => {
    try {
        const event = { name, emails }
        return await post(baseEndpoint + servicePath + '/', {event})
    } catch (err) {
        console.error(err)
    }
}

export const getEventsByEmail = async (email) => {
    try {
        console.log((await post(baseEndpoint + servicePath + '/email', { email })))
        return []
    } catch (err) {
        console.error(err)
    }
}

export const addEmailToEvent = async (eventId, email) => {
    try {
        return (await post(baseEndpoint + servicePath + `/email${eventId}`, { email })).data.event
    } catch (err) {
        console.error(err)
    }
}