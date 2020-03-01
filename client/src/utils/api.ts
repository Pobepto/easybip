import axios from 'axios'

// const PROTOCOL = location.protocol
// const URL = location.host + '/api/v1'
const PROTOCOL = 'https:'
const URL = 'easybip.ru' + '/api/v1'

interface SingleUserRequestStructure {
  from_: string;
  to: string;
  password: string;
}

interface MultiUserRequestStructure {
  from_: string;
  users: {
    email: string;
    fullname: string;
    amount: string;
  }[];
  password: string;
}

interface WalletRequestStructure {
  link: string;
}

interface AddressRequestStructure {
  address: string;
}

const sendSingleUser = (data: SingleUserRequestStructure) => {
  return axios.post(`${PROTOCOL}//${URL}/wallet/send`, data)
    .then(({ data }) => data)
}

const sendMultiUsers = (data: MultiUserRequestStructure) => {
  return axios.post(`${PROTOCOL}//${URL}/wallets/send`, data)
    .then(({ data }) => data)
}

const getUserLink = ({ link }: WalletRequestStructure) => {
  return axios.get(`${PROTOCOL}//${URL}/wallet/${link}`)
    .then(({ data }) => data)
}

const checkMoneyAmount = ({ address }: AddressRequestStructure) => {
  return axios.get(`${PROTOCOL}//${URL}/wallet/balance/${address}`)
    .then(({ data }) => data)
}

const activateWallet = ({ address }: AddressRequestStructure) => {
  return axios.get(`${PROTOCOL}//${URL}/wallet/activate/${address}`)
    .then(({ data }) => data)
}

const isLinkActive = ({ link }: WalletRequestStructure) => {
  return axios.get(`${PROTOCOL}//${URL}/wallet/is_activated/${link}`)
    .then(({ data }) => data)
}

const checkPassword = ({ link, password }) => {
  return axios.post(`${PROTOCOL}//${URL}/password/check`, { link, password })
    .then(({ data }) => data)
}

const sendMoney = ({ link, to, password, amount, payload }) => {
  const p = payload || ''
  return axios.post(`${PROTOCOL}//${URL}/send/bip_wallet`, { link, to, password, amount, payload: p })
    .then(({ data }) => data)
}

const getUserGifts = ({ link }) => {
  return axios.get(`${PROTOCOL}//${URL}/gift/${link})`)
    .then(({ data }) => data)
}

export default {
  sendSingleUser,
  sendMultiUsers,
  getUserLink,
  checkMoneyAmount,
  activateWallet,
  isLinkActive,
  checkPassword,
  sendMoney,
  getUserGifts
}
