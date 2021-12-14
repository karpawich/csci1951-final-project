import { post, del, get } from '.'
//import {post} from 'axios'

import { baseEndpoint } from '.'

/** This is the path to the nodes microservice */
const servicePath = '/scrapbook'

export const getScrapbook = async (id) => {
  return (await get(baseEndpoint + servicePath + '/' + id)).scrapbook
}