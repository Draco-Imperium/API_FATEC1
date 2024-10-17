import sys
import requests


def get_comissoes():
    api_url = 'https://camarasempapel.camarasjc.sp.gov.br/api/publico/comissoes/'

    try:
        response = requests.get(api_url)
        response.raise_for_status()  # Verifica se houve erro na requisição
        data = response.json()
        return data.get('comissoes', [])
    except requests.HTTPError as e:
        print(f'Erro na requisição: {e}')
    except requests.ConnectionError:
        print('Erro de conexão')
    except requests.Timeout:
        print('Tempo de requisição esgotado')
    except requests.JSONDecodeError:
        print('Erro ao decodificar JSON')
    return []


def get_parlamentar():
    api_url = 'https://camarasempapel.camarasjc.sp.gov.br/api/publico/parlamentar?qtd=99'

    try:
        response = requests.get(api_url)
        response.raise_for_status()  # Verifica se houve erro na requisição
        data = response.json()
        return data.get('parlamentares', [])
    except requests.HTTPError as e:
        print(f'Erro na requisição: {e}')
    except requests.ConnectionError:
        print('Erro de conexão')
    except requests.Timeout:
        print('Tempo de requisição esgotado')
    except requests.JSONDecodeError:
        print('Erro ao decodificar JSON')
    return []



def get_prop():
    api_url = 'https://camarasempapel.camarasjc.sp.gov.br/api/publico/proposicao?autorID=1160&qtd=99'

    try:
        response = requests.get(api_url)
        response.raise_for_status()  # Verifica se houve erro na requisição
        data = response.json()
        return data
    except requests.HTTPError as e:
        print(f'Erro na requisição: {e}')
    except requests.ConnectionError:
        print('Erro de conexão')
    except requests.Timeout:
        print('Tempo de requisição esgotado')
    except requests.JSONDecodeError:
        print('Erro ao decodificar JSON')
    return []
