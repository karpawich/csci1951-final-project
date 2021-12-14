import { post, del } from '.'
//import {post} from 'axios'

import { baseEndpoint } from '.'

/** This is the path to the nodes microservice */
const servicePath = '/scrapbook'

export const createUser = async (email, firstName, lastName) => {
	try {
		return (await post(baseEndpoint + servicePath, { 'user': {email, firstName, lastName} }))
	} catch (err) {
		console.error(err)
	}
}