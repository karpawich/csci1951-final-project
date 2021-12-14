import axios from 'axios'

export const http = async (request) => {
  const response = await axios(request)
  return response.data
}

export const get = async (url) => {
    return await http({
        method: 'GET',
        url: url,
    })
}
export const post = async (url, body) => {
  return await http({
    data: body,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    method: 'POST',
    url: url,
  })
}

export const put = async (url, body) => {
  return await http({
    data: body,
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    url: url,
  })
}

export const del = async (url, body) => {
  return await http({
    data: body ?? {},
    method: 'DELETE',
    url: url,
  })
}

export const patch = async (url, body) => {
  return await http({
    data: body,
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
    url: url,
  })
}


