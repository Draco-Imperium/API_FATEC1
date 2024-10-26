from flask import Flask, render_template, jsonify, request
from flask_caching import Cache
import json
import os
import sys
from getFunctions import *
import unidecode
import logging

sys.setrecursionlimit(1500)

logging.basicConfig(filename='app.log',level=logging.INFO,format='%(asctime)s-%(levelname)s-%(message)s')

app = Flask(__name__)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

def format_name(name):
    return unidecode.unidecode(name).lower().replace(" ", "_")

app.jinja_env.filters['format_name'] = format_name

@app.route('/')
def index():
    file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database', 'leis.json')
    with open(file_path, 'r', encoding='utf-8', errors='replace') as file:
        leis = json.load(file)      
    leis = leis['leis']
    ultimas = prepos() 
    return render_template('index.html', ultimas=ultimas, leis=leis )

    
    
@app.route('/dados2', methods=['GET'])

def get_dados2():
    try:
        with open('app/database/leis.json','r') as file:
            data = json.load(file)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"mensagem": "Arquivo não encontrado"}), 404
    except json.JSONDecodeError:
        return jsonify({"mensagem": "Erro ao decodificar JSON"}), 500


@app.route('/proposicoes')
def proposicoes():
    tipoID = request.args.get('tipoID', '')
    print(f"Tipo recebido: {tipoID}")
    numero = request.args.get('numero', '')
    ano = request.args.get('ano', '')
    autor = request.args.get('autor', '')
    page_number = request.args.get('page', default=1, type=int)
    proposicao = get_prop(tipoID=tipoID, numero=numero, ano=ano, autor=autor, pag=page_number)

    total_pages = (proposicao['total'] // 10) + (1 if proposicao['total'] % 10 > 0 else 0) if proposicao else 0

    return render_template('proposicoes.html', 
                           proposicao=proposicao, 
                           current_page=page_number, 
                           total_pages=total_pages, 
                           tipoID=tipoID, 
                           numero=numero, 
                           ano=ano, 
                           autor=autor)

@app.route('/graficos')
@cache.cached(timeout=300)
def graficos():
    return render_template('graficos.html')

@app.route('/dados', methods=['GET'])
def get_dados():
    try:
        with open('app/database/data.json', 'r') as file:
            data = json.load(file)
        return jsonify(data)
    except FileNotFoundError:
        logging.error("Arquivo não encontrado")
        return jsonify({"mensagem": "Arquivo não encontrado"}), 404
    except json.JSONDecodeError as e:
        logging.error("Erro ao decodificar JSON: %s", e)
        return jsonify({"mensagem": "Erro ao decodificar JSON"}), 500

@app.route('/usuarios/<int:id>', methods=['GET'])
def get_usuario(id):
    try:
        file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database', 'data.json')
        with open(file_path, 'r', encoding='utf-8', errors='replace') as file:
            data = json.load(file)
        
        usuario = next((user for user in data['usuarios'] if user['id'] == id), None)
        
        if usuario:
            return jsonify(usuario)
        else:
            return jsonify({"mensagem": "Usuário não encontrado"}), 404
    except FileNotFoundError:
        logging.error("Arquivo não encontrado")
        return jsonify({"mensagem": "Arquivo não encontrado"}), 404
    except json.JSONDecodeError:
        logging.error("Erro ao decodificar JSON")
        return jsonify({"mensagem": "Erro ao decodificar JSON"}), 500

@app.route('/vereadores_geral')
@cache.cached(timeout=300)
def vereadores_geral():
    try:
        file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database', 'data.json')
        with open(file_path, 'r', encoding='utf-8', errors='replace') as file:
            data = json.load(file)

        for parlamentar in data['parlamentares']:
            parlamentar['DS_SIT_TOT_TURNO'] = parlamentar['DS_SIT_TOT_TURNO'].replace('\r\n\r\n', '<br>').replace('\r\n', '<br>')



        return render_template('vereadores_geral.html', parlamentares=data['parlamentares'])
    except FileNotFoundError:
        print("Arquivo não encontrado:", file_path)
        return render_template('404.html'), 404
    except json.JSONDecodeError:
        return render_template('500.html'), 500


@app.route('/perfil/<string:NM_URNA_CANDIDATO>')
def perfil(NM_URNA_CANDIDATO):
    try:
        file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database', 'data.json')
        with open(file_path, 'r', encoding='utf-8', errors='replace') as file:
            data = json.load(file)
        
        parlamentar = next((p for p in data['parlamentares'] if format_name(p['NM_URNA_CANDIDATO']) == NM_URNA_CANDIDATO), None)
        
        if parlamentar is None:
            logging.warning(f"Parlamentar com NM_URNA_CANDIDATO '{NM_URNA_CANDIDATO}' não encontrado.")
            return render_template('404.html'), 404
        
        return render_template('perfil.html', parlamentar=parlamentar)
    except FileNotFoundError:
        logging.error("Arquivo não encontrado")
        return render_template('404.html'), 404
    except json.JSONDecodeError:
        logging.error("Erro ao decodificar JSON")
        return render_template('500.html'), 500
    
@app.errorhandler(404)
def not_found(error):
    logging.error(f"Página não encontrada: {error}")
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    logging.error(f"Erro interno: {error}")
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(debug=True)
