import axios from 'axios'

const URL = 'https://minterfood.ru/miniapi/create_pay.php'

const createOrder = ({ link, product }) => {
  const webhook = `https://easybip.ru/api/v1/gift/order/${link}/${product}`
  const formData = new FormData()

  formData.append('product', product)
  formData.append('webhook', webhook)

  return axios.post(URL, formData)
    .then(({ data }) => data)
}

export default {
  createOrder
}
