import { get } from '.'

import { baseEndpoint } from '.'

/** This is the path to the nodes microservice */
const servicePath = '/scrapbook'

export const getScrapbook = async (id) => {
  return (await get(baseEndpoint + servicePath + '/' + id)).scrapbook
}