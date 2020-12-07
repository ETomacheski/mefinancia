const express = require('express')
const router = express.Router()

const axios = require('axios');

const access_token = process.env.ACCESS_TOKEN
router.get('/',async (req, res) => {

  
  res.status(200).send("<h1>Rotas</h1>: <br> <h2>Contas do usuário: /account</h2> <br> <h2>Pegar uma conta do usuário: /account/:AccountId</h2> <br> <h2>Get score: /score</h2>")
})



router.get('/accounts',async (req, res) => {

    const response = await axios({
        method: 'get',
        url: `https://gw-dev.obiebank.banfico.com/obie-aisp/v3.1/aisp/accounts`,

        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'x-fapi-financial-id': "1234",
          Authorization: 'Bearer ' + access_token
        },

      }).catch(function (response) {
        //handle error
        res.status(400).json(response)
    })
    console.log(response.data)
    res.status(200).json(response.data)
})

router.get('/accounts/:id',async (req, res) => {
  const accountId = req.params.id


  const response = await axios({
      method: 'get',
      url: `https://gw-dev.obiebank.banfico.com/obie-aisp/v3.1/aisp/accounts/${accountId}`,

      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-fapi-financial-id': "1234",
        Authorization: 'Bearer ' + access_token
      },

    }).catch(function (response) {
      //handle error
      res.status(400).json(response)
  })
  res.status(200).json(response.data)
})

router.get('/score',async (req, res) => {
  // const accountId = req.params.id
  const accountsResponse = await axios({
      method: 'get',
      url: `https://gw-dev.obiebank.banfico.com/obie-aisp/v3.1/aisp/accounts`,

      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-fapi-financial-id': "1234",
        Authorization: 'Bearer ' + access_token
      },

    }).catch(function (response) {
      //handle error
      res.status(400).json(response)
  })
  const accounts = accountsResponse.data.Data.Account
  var creditAmount = 0
  for (const account of accounts) {
    const response = await axios({
      method: 'get',
      url: `https://gw-dev.obiebank.banfico.com/obie-aisp/v3.1/aisp/accounts/${account.AccountId}/balances`,

      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-fapi-financial-id': "1234",
        Authorization: 'Bearer ' + access_token
      },
      


    }).catch(function (response) {
      res.status(400).json(response)
    })
    creditAmount += +response.data.Data.Balance[0].Amount.Amount
  }
  
  

  const score = creditAmount/60
  res.status(200).json({score:score})
})





module.exports = router;