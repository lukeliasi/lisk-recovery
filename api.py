import requests
api = "https://testnet.lisk.io/api/accounts/open"

response = requests.post(api, data={'secret': 'tobacco day start afford analyst foot tiny curtain tennis pear taxi cause'})

if response.status_code == 200:
  print(response.json()['account'])