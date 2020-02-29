import axios from 'axios'

const URL = 'https://biptophone.ru/apiheader.php'

const KEY = 'xYukuttnmSXjXbrK'

const getLimits = () => {
  const formData = new FormData()

  formData.append('key1', KEY)
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

export default {
  getLimits,
  connectPhone
}
