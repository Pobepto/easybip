// @ts-nocheck
import axios from 'axios'
import snakeCase from 'lodash/snakeCase'

const URL = 'https://easybip.ru/api/v1/gift'

const createOrder = ({ link, product }) => {
  return axios.post(URL, {
    [snakeCase('giftName')]: product,
    link
  })
    .then(({ data }) => data)
}

export default {
  createOrder
}
