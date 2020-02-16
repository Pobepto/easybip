# Easy BIP
<p align="center">
  <img width="150" src="client/src/assets/phone.png">
</p>

## Client part (Front-end)
### Getting started
To start use this application you should run this commands in terminal.
``` bash
$ git clone https://github.com/Pobepto/easybip
$ cd easybip/client
$ yarn
```

**IMPORTANT** in our application we use `yarn` for dependency management if you do not have it, you should install it - [Installation | Yarn](https://yarnpkg.com/en/docs/install)

#### How to run
To run application, this will serve application with hot reload. 
``` bash
$ yarn serve
```

#### How to build
To build application for production
``` bash
$ yarn build
```

#### App design
<a href="https://github.com/Pobepto/easybip/issues/6">Images</a>

## Server part (Back-end)
### Getting started
To start use server part on your machine you should run this commands in terminal.

##### Create a virtual environment with Python 3.7
``` bash
$ virtualenv env
$ source ./env/bin/activate
```

##### Clone the repository from Github and install requirements:
``` bash
$ git clone https://github.com/Pobepto/easybip
$ cd easybip/server
$ pip install -r requirements.txt
$ export DB_USERNAME=''
         DB_NAME=''
         DB_PASSWORD=''
         HASH_KEY=''
         API_PORT='' 
         WALLET_PASSWORD=''
```

##### Environments
* DB_USERNAME - database username
* DB_NAME - name of database
* DB_PASSWORD - database password
* HASH_KEY - salt for hash
* API_PORT - port on which the server starts
* WALLET_PASSWORD - password for mailing wallet

#### How to run
``` bash
$ python run.py
```

### API Documentation

<a href="https://easybip.ru/docs">Swagger EasyBip</a>

`https://easybip.ru`

#### POST api/v1/wallet/send

Create one wallet for single user

#### Parameters

| Parameter     | Description                       | Type    |
| ------------- | -------------                     | ---     |
| `from_`         | Name of wallet creator.           | `String (Optional)`  |
| `to`            | Name of wallet receiver.          | `String (Optional)`  |
| `password`      | Password to get access to wallet. | `String (Optional)`  |

#### Response 

| Parameter     | Description                       | Type    |
| ------------- | -------------                     | ---     |
| `link`         | Link to wallet replenishment address.             | `String`  |

#### Example

_Request_

``` bash
$ curl --location --request POST 'https://easybip.ru/api/v1/wallet/send' \
--header 'Content-Type: application/json' \
--data-raw '{"from_": "minter", "to": "user", "password": "123"}'
```

_Response_
``` bash
{"link":"9npwd"}
```

***

#### POST api/v1/wallets/send

Create wallets for several users

#### Parameters

| Parameter     | Description                       | Type        |
| ------------- | -------------                     | ---     |
| `from_`         | Name of wallet creator.            | `String (Optional)`  |
| `users`         | List of users for sending coins.   | `{'email': String (Optional), 'fullname': String (Optional), 'amount': String}   `  |
| `password`      | Password to get access to wallet.  | `String (Optional)`  |

#### Response 

| Parameter     | Description                       | Type    |
| ------------- | -------------                     | ---     |
| `link`         | Link to wallet replenishment address.             | `String`  |

#### Example

_Request_

``` bash
$ curl --location --request POST 'https://easybip.ru/api/v1/wallets/send' \
--header 'Content-Type: application/json' \
--data-raw '{
    "from_": "a",
    "users": [ {
      "email": "example@example.com",
      "fullname": "Example",
      "amount": "0.5"
    },
    {
      "email": "example1@example.com",
      "fullname": "Example1",
      "amount": "0.5"
    }],
    "password": "1"
}'
```

_Response_
``` bash
{"link":"83qyn"}
```

***

#### GET /api/v1/wallet/{link}

Return wallet address corresponding to replenish link

#### Parameters

| Parameter     | Description                       | Type        |
| ------------- | -------------                     | ---     |
| `link`         | Link to wallet replenishment address.          | `String`  |


#### Response 

| Parameter     | Description                                      | Type    |
| ------------- | -------------                                    | ---     |
| `address`     | Wallet address corresponding to replenish link  | `String`  |

#### Example

_Request_

``` bash
$ curl --location --request GET 'https://easybip.ru/api/v1/wallet/9npwd'
```

_Response_
``` bash
{"address":"Mxfebcc418eb0a23aec55d26911cc9e78639c5cb1f"}
```

***


#### GET /api/v1/wallet/activate/{address}

Activates the wallet for the recipient after replenishing the account
#### Parameters

| Parameter     | Description                       | Type        |
| ------------- | -------------                     | ---     |
| `address`         | Wallet address to activate         | `String`  |


#### Response 

| Parameter     | Description                                      | Type    |
| ------------- | -------------                                    | ---     |
| `link`     | Link for receiver | `String` - for single user `[String]`- for several users |

#### Example

**For single user**  
_Request_

``` bash
$ curl --location --request GET 'https://easybip.ru/api/v1/wallet/activate/Mxfebcc418eb0a23aec55d26911cc9e78639c5cb1f'
```

_Response_
``` bash
{"link":"9npwd"}
```

**For several users**
``` bash
$ curl --location --request GET 'https://easybip.ru/api/v1/wallet/activate/Mx563545bf2d15e34ac81b8a3a7b1888a2c02a4abc'
```

_Response_
``` bash
{"link": ["cycu3","wwe3c"]}
```
***


#### GET /api/v1/wallet/is_activated/{link}

Check if wallet is activated on this link

#### Parameters

| Parameter     | Description                       | Type        |
| ------------- | -------------                     | ---     |
| `link`         | Link for receiver         | `String`  |


#### Response 

| Parameter     | Description                                      | Type    |
| ------------- | -------------                                    | ---     |
| `link`     | Link for receiver | `String`|

#### Example

_Request_

``` bash
$ curl --location --request GET 'https://easybip.ru/api/v1/wallet/is_activated/cycu3'
```

_Response_
``` bash
{"is_activated": true}
```

***



#### GET /api/v1/wallet/balance/{address}

Return wallet balance

#### Parameters

| Parameter     | Description                       | Type        |
| ------------- | -------------                     | ---     |
| `address`         | Wallet address        | `String`  |


#### Response 

| Parameter     | Description    | Type    |
| ------------- | -------------  | ---     |
| `balance`     | Wallet balance | `Dictionary`|

#### Example

_Request_

``` bash
$ curl --location --request GET 'https://easybip.ru/api/v1/wallet/balance/Mxfebcc418eb0a23aec55d26911cc9e78639c5cb1f'
```

_Response_
``` bash
{
    "balance": {"BIP": "0"}
}
```

***


#### POST /api/v1/password/check

Check receiver`s password

#### Parameters

| Parameter     | Description                       | Type        |
| ------------- | -------------                     | ---     |
| `link`         |   Link for receiver    | `String`  |
| `password`         | Password candidate to get access to wallet   | `String`


#### Response 

| Parameter     | Description                       | Type    |
| ------------- | -------------                     | ---     |
| `from_`         | Name of wallet creator.           | `String`  |
| `to`            | Name of wallet receiver.          | `String`  |
| `amount`      | Amount of coins indicated by creator | `String`  |
| `email`      | Email of receiver | `String`  |
| `balance`     | Wallet balance | `Dictionary`|

#### Example

_Request_

``` bash
$ curl --location --request POST 'https://easybip.ru/api/v1/password/check' \
--header 'Content-Type: application/json' \
--data-raw '{"link":"9npwd", "password": "123"}'
```

_Response_
``` bash
{
    "from_": "minter",
    "to": "user",
    "amount": "",
    "email": "",
    "balance": {
        "BIP": "0"
    }
}
```

***


#### POST /api/v1/send/bip_wallet

Send BIP from receiver`s link to another BIP wallet

#### Parameters

| Parameter     | Description                       | Type        |
| ------------- | -------------                     | ---     |
| `link`         |   Link for receiver    | `String`  |
| `password`         | Password to get access to wallet   | `String`
| `to`         | Wallet address to send coins   | `String`
| `amount`         | Amount of coins  | `String`

#### Example

_Request_

``` bash
$ curl --location --request POST 'https://easybip.ru/api/v1/send/bip_wallet' \
--header 'Content-Type: application/json' \
--data-raw '{"link": "9npwd",
    "to": "Mx563545bf2d15e34ac81b8a3a7b1888a2c02a4abc",
    "password": "123",
    "amount": 0.01}'
```

_Response_
``` bash
{}
```

***

#### Status codes


| Code     | Reason |
| ------------- | ------| 
| 200 | OK|
| 400 | Not enough money
| 401 | Incorrect password
| 404 | No data in database
| 500 | Something goes wrong
