from flask import Flask, render_template, request
import requests

app = Flask(__name__)

def get_prop(pag=1):
    api_url = f'https://camarasempapel.camarasjc.sp.gov.br/api/publico/proposicao?autorID=1160&qtd=10&pag={pag}'
    
    try:
        response = requests.get(api_url)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f'Erro: {e}')
    return None

@app.route('/proposicoes')
def proposicoes():

    page_number = int(request.args.get('page', 1))
    
    response_data = get_prop(pag=page_number)
    
    if response_data:
        proposicoes = response_data.get('Data', [])
        total = response_data.get('total', 0)
        total_pages = (total // 10) + (1 if total % 10 > 0 else 0)
    else:
        proposicoes = []
        total_pages = 0

    return render_template('proposicoes.html', proposicoes=proposicoes, current_page=page_number, total_pages=total_pages)

if __name__ == '__main__':
    app.run(debug=True)