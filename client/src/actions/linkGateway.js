import { post } from '.'

import { baseEndpoint } from '.'

/** This is the path to the nodes microservice */
const servicePath = '/link'

export const getLinksByAnchor = async (anchor) => {
  return (await post(baseEndpoint + servicePath + '/anchor', { anchor })).links
}