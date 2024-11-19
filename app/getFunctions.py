import requests

def get_comissoes():
    api_url = "https://camarasempapel.camarasjc.sp.gov.br/api/publico/comissoes/"
    
    try:
        response = requests.get(api_url)
        response.raise_for_status()
        data = response.json()
        return data.get("comissoes", [])
    except requests.HTTPError as e:
        print(f"Erro na requisição: {e}")
    except requests.ConnectionError:
        print("Erro de conexão")
    except requests.Timeout:
        print("Tempo de requisição esgotado")
    except requests.JSONDecodeError:
        print("Erro ao decodificar JSON")
    
    return []

def get_parlamentar():
    api_url = "https://camarasempapel.camarasjc.sp.gov.br/api/publico/parlamentar?qtd=25"
    
    try:
        response = requests.get(api_url)
        response.raise_for_status()
        data = response.json()
        return data.get("parlamentares", [])
    except requests.HTTPError as e:
        print(f"Erro na requisição: {e}")
    except requests.ConnectionError:
        print("Erro de conexão")
    except requests.Timeout:
        print("Tempo de requisição esgotado")
    except requests.JSONDecodeError:
        print("Erro ao decodificar JSON")
    
    return []

def get_parlamentar_por_id(parlamentar_id):
    api_url = f'https://camarasempapel.camarasjc.sp.gov.br/api/publico/parlamentar?parlamentarID={parlamentar_id}'
    
    try:
        response = requests.get(api_url)
        response.raise_for_status()
        data = response.json()
        
        if data and 'parlamentares' in data and isinstance(data['parlamentares'], list):
            if len(data['parlamentares']) > 0:
                return data['parlamentares'][0]
        
        return None
    except requests.HTTPError as e:
        print(f'Erro na requisição: {e}')
    except requests.ConnectionError:
        print('Erro de conexão')
    except requests.Timeout:
        print('Tempo de requisição esgotado')
    except requests.JSONDecodeError:
        print('Erro ao decodificar JSON')
    
    return None

def get_prop(tipoID='', numero='', ano='', autor='', pag=1):
    base_url = "https://camarasempapel.camarasjc.sp.gov.br/api/publico/proposicao?"
    params = {
        'qtd': 10,  
        'pag': pag
    }

    if tipoID:
        params['tipoID'] = tipoID
    if numero:
        params['numero'] = numero
    if ano:
        params['ano'] = ano
    if autor:
        params['autor'] = autor

    api_url = base_url + '&'.join([f"{key}={value}" for key, value in params.items()])

    try:
        response = requests.get(api_url)
        response.raise_for_status()
        data = response.json()
        return data
    except requests.HTTPError as e:
        print(f"Erro na requisição: {e}")
    except requests.ConnectionError:
        print("Erro de conexão")
    except requests.Timeout:
        print("Tempo de requisição esgotado")
    except requests.JSONDecodeError:
        print("Erro ao decodificar JSON")

    return None


import requests

def prepos():
    api_url = 'https://camarasempapel.camarasjc.sp.gov.br/api/publico/proposicao?qtd=3'

    try:
        response = requests.get(api_url)
        response.raise_for_status()
        data = response.json()

        if 'Data' in data:
            for proposta in data['Data']:
                arquivo = proposta.get('arquivo')
                if not arquivo or arquivo.strip() == "":  
                    proposta['arquivo'] = "Conteúdo indisponível"  
                else:
                    proposta['arquivo'] = arquivo 
        return data['Data'] if 'Data' in data else []
    
    except requests.HTTPError as e:
        print(f'Erro na requisição: {e}')
    except requests.ConnectionError:
        print('Erro de conexão')
    except requests.Timeout:
        print('Tempo de requisição esgotado')
    except requests.JSONDecodeError:
        print('Erro ao decodificar JSON')
    return []
