from flask import Flask, render_template
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
    parlamentares = get_parlamentar()  # Obtém as comissões da API
    return render_template('vereadores_geral.html', parlamentares=parlamentares)

@app.route('/vereadores_perfil')
def vereadores_perfil():
    return render_template('vereadores_perfil.html')

@app.route('/proposicoes')
def proposicoes():
    proposicao = get_prop()
    return render_template('proposicoes.html', proposicao=proposicao)

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
