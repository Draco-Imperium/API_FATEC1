from flask import Flask, render_template, request
import sys
import requests
from getFunctions import *
sys.setrecursionlimit(1500)

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/vereadores_geral')
def vereadores_geral():
    parlamentares = get_parlamentar()
    return render_template('vereadores_geral.html', parlamentares=parlamentares)

@app.route('/vereadores_perfil')
def vereadores_perfil():
    return render_template('vereadores_perfil.html')

@app.route('/proposicoes')
def proposicoes():
    page_number = request.args.get('page', default=1, type=int)
    proposicao = get_prop(pag=page_number)

    total_pages = (proposicao['total'] // 10) + (1 if proposicao['total'] % 10 > 0 else 0) if proposicao else 0

    return render_template('proposicoes.html', proposicao=proposicao, current_page=page_number, total_pages=total_pages)

@app.route('/graficos')
def graficos():
    return render_template('graficos.html')

@app.route('/draco')
def draco():
    return render_template('draco.html')

@app.route('/sobrenos')
def sobrenos():
    return render_template('sobrenos.html')

@app.route('/proposta')
def proposta():
    return render_template('proposta.html')

if __name__ == '__main__':
    app.run(debug=True)
