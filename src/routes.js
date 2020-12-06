const express = require('express')
const router = express.Router()

const axios = require('axios');

const access_token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJSeHpPWmc5dW42dTZyNE50T014elNVbUR6cFZwU3gyaVhha25aWUNxUnRJIn0.eyJleHAiOjE2MDcyNTcwNzUsImlhdCI6MTYwNzIyODI4MSwiYXV0aF90aW1lIjoxNjA3MjI4Mjc1LCJqdGkiOiI4ZDVkN2M0MS1mODc1LTQ3ZWQtOTI5OS0yYTBkYjRmNzMyZjYiLCJpc3MiOiJodHRwczovL2F1dGgub2JpZWJhbmsuYmFuZmljby5jb20vYXV0aC9yZWFsbXMvcHJvdmlkZXIiLCJhdWQiOiJQU0RVSy1OQ0EtRURVQVJET1RPTSIsInN1YiI6IjE4MzI4YWEwLWVmNjItNDI3OS05ZGU0LTc3MGIxOTM4YTFlMCIsInR5cCI6IkJlYXJlciIsImF6cCI6IlBTRFVLLU5DQS1FRFVBUkRPVE9NIiwibm9uY2UiOiIxMzc0NTc3NDYzNTA1Iiwic2Vzc2lvbl9zdGF0ZSI6IjY2N2Y2MGMxLTllZDYtNDQ1Ni05ZjcyLTBmMDcwZjQ3NDZkMiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJzY29wZSI6Im9wZW5pZCBhY2NvdW50cyBvZmZsaW5lX2FjY2VzcyBwcm9maWxlIGVtYWlsIiwic3ViIjoidG9tYWNoZXNraTIwMDFAZ21haWwuY29tIiwib3BlbmJhbmtpbmdfaW50ZW50X2lkIjoidXJuOm9iaWViYW5rOmFjY291bnRzOmNlMzFjYmY2LWYzOWQtNGYyYy05ZTFiLTQ5Y2QwZmM5Mjk4YyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6Im4vYSBuL2EiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0b21hY2hlc2tpMjAwMUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoibi9hIiwiZmFtaWx5X25hbWUiOiJuL2EiLCJlbWFpbCI6InRvbWFjaGVza2kyMDAxQGdtYWlsLmNvbSIsImNsaWVudF9pZCI6IlBTRFVLLU5DQS1FRFVBUkRPVE9NIn0.fcDSkJGqOZs_t9n87JidRDVMBV5ob_kgCx_zFFz6mMquGvySDmrndFzwLaCwRGRpzqxdqdPTp1UrO8uY-ze6ZHNRIeBWOHwesMjEdjfMF8cBuCiG1GfUYg3wg8wb6IOq5AfaFY1jhJ_HGo-bSGa_Q2n_j50FZsYDhyEYds7XAkNKccTnDdi3SqC4t6F9BZPAVUR_PUUIsRtCl3CxlVfWwiplqpoHaDZn3Tk8ivHpxz-uEIc6cKtNZYI4Jc0gvH3n81RbxUd6N7dtpibwcsfG2vfL53BXDyRcI7nCn7LfLciNBmjPv8j6SmYrPMlru-QwCG7f086-Dutm8zZNMGPa8A'
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