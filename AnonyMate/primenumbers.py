import requests
name = 'abyssinian'
api_url = 'https://api.api-ninjas.com/v1/cats'
response = requests.get(api_url, headers={'X-Api-Key': 'PclwjNbke9yFN7BcMuP+Nw==8g7Erlot7SlYNzMk'})
if response.status_code == requests.codes.ok:
    print(response.text)
else:
    print("Error:", response.status_code, response.text)

            
