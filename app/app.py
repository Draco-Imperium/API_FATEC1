from flask import Flask, render_template, jsonify, request
from flask_caching import Cache
import json
import os
import sys
import unidecode
from getFunctions import *

sys.setrecursionlimit(1500)

app = Flask(__name__)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

def format_name(name):
    """Remove acentos, converte para minúsculas e substitui espaços por underscores."""
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
        with open('app/database/leis','r') as file:
            data = json.load(file)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"mensagem": "Arquivo não encontrado"}), 404
    except json.JSONDecodeError:
        return jsonify({"mensagem": "Erro ao decodificar JSON"}), 500


@app.route('/proposicoes')
def proposicoes():
    tipo = request.args.get('tipo', '')
    numero = request.args.get('numero', '')
    ano = request.args.get('ano', '')
    page_number = request.args.get('page', default=1, type=int)
    proposicao = get_prop(tipo=tipo, numero=numero, ano=ano, pag=page_number)

    total_pages = (proposicao['total'] // 10) + (1 if proposicao['total'] % 10 > 0 else 0) if proposicao else 0

    return render_template('proposicoes.html', 
                           proposicao=proposicao, 
                           current_page=page_number, 
                           total_pages=total_pages, 
                           tipo=tipo, 
                           numero=numero, 
                           ano=ano)

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
        return jsonify({"mensagem": "Arquivo não encontrado"}), 404
    except json.JSONDecodeError:
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
        return jsonify({"mensagem": "Arquivo não encontrado"}), 404
    except json.JSONDecodeError:
        return jsonify({"mensagem": "Erro ao decodificar JSON"}), 500

@app.route('/vereadores_geral')
@cache.cached(timeout=300)
def vereadores_geral():
    try:
        file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database', 'data.json')
        with open(file_path, 'r', encoding='utf-8', errors='replace') as file:
            data = json.load(file)
        parlamentares = data['parlamentares']
        return render_template('vereadores_geral.html', parlamentares=parlamentares)
    except FileNotFoundError:
        print("Arquivo não encontrado:", file_path)
        return render_template('404.html'), 404
    except json.JSONDecodeError:
        return render_template('500.html'), 500

@app.route('/perfil/<string:NM_URNA_CANDIDATO>')
# @cache.cached(timeout=300)
def perfil(NM_URNA_CANDIDATO):
    try:
        file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database', 'data.json')
        with open(file_path, 'r', encoding='utf-8', errors='replace') as file:
            data = json.load(file)
        
        parlamentar = next((p for p in data['parlamentares'] if format_name(p['NM_URNA_CANDIDATO']) == NM_URNA_CANDIDATO), None)
        
        if parlamentar is None:
            print(f"Parlamentar com NM_URNA_CANDIDATO '{NM_URNA_CANDIDATO}' não encontrado.")
            return render_template('404.html'), 404
        
        return render_template('perfil.html', parlamentar=parlamentar)
    except FileNotFoundError:
        return render_template('404.html'), 404
    except json.JSONDecodeError:
        return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(debug=True)
