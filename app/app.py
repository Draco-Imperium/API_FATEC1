from flask import Flask, render_template, request
from flask_caching import Cache
import sys
from getFunctions import *
import os

sys.setrecursionlimit(1500)

app = Flask(__name__)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

@app.route('/')
@cache.cached(timeout=300)
def index():
    return render_template('index.html')

@app.route('/vereadores_geral')
@cache.cached(timeout=300)
def vereadores_geral():
    parlamentares = get_parlamentar()
    return render_template('vereadores_geral.html', parlamentares=parlamentares)

@app.route('/vereadores_perfil/<int:parlamentar_id>')
@cache.cached(timeout=300)
def vereadores_perfil(parlamentar_id):
    parlamentar = get_parlamentar_por_id(parlamentar_id)
    if parlamentar is None:
        return render_template('404.html'), 404
    return render_template('vereadores_perfil.html', parlamentar=parlamentar)

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

if __name__ == '__main__':
    app.run(debug=True)