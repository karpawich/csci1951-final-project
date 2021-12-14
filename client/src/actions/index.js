export const baseEndpoint = '/api'

export * from './eventGateway'
export * from './userGateway'
export * from './authGateway'
export * from './firebaseStorage'
export * from './httpHelpers'
export * from './momentGateway'
export * from './scrapbookGateway'
export * from './groupGateway'
export * from './linkGateway'

export const emailToName = (email) => email.substring(0, email.indexOf('@')).replaceAll('_', ' ')