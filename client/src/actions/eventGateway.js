import { get, post, del } from '.'

import { baseEndpoint } from '.'

/** This is the path to the nodes microservice */
const servicePath = '/event'

export const getEvent = async(id) => {
    try {
        const url = `${baseEndpoint}${servicePath}/${id}`
        return await get(url)
    } catch (err) {
        console.error(err)
    }
}

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

export const deleteEvent = async (eventId) => {
    try {
        return await del(baseEndpoint + servicePath + `/${eventId}`)
    } catch (err) {
        console.error(err)
    }
}