import { get, post, baseEndpoint } from '.'

/** This is the path to the nodes microservice */
const servicePath = '/group'

export const getGroupById = async (id) => {
  return (await get(baseEndpoint + servicePath + '/' + id)).group
}

export const getGroupsByIds = async (ids) => {
  return (await post(baseEndpoint + servicePath + '/ids', { ids })).groups
}