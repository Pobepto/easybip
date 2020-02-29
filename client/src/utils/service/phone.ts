import axios from 'axios'
import easyBipApi from '@/utils/api'

const URL = 'https://biptophone.ru/api.php'

const KEY = ''

const getLimits = () => {
  const formData = new FormData()

  formData.append('key', KEY)
  formData.append('curs', '1')

  return axios.post(URL, formData)
    .then(({ data }) => data)
}

const connectPhone = ({ phone }) => {
  const formData = new FormData()
  formData.append('contact', '1')
  formData.append('phone', phone)
  formData.append('key1', KEY)

  return axios.post(URL, formData)
    .then(({ data }) => data)
}

// const createPayment = async ({ link, to, password, amount, payload, phone }) => {
//   try {
//     const { keyword } = await connectPhone({ phone })
//     if (keyword.length) {
//       return easyBipApi.sendMoney({
//         link, to, password, amount, payload: keyword
//       })
//     }
//   } catch (error) {

//   }
// }

export default {
  getLimits,
  connectPhone
  // createPayment
}
