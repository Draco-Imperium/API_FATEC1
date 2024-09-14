from flask import Flask, render_template
import sys
sys.setrecursionlimit(1500)

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/vereadores_geral')
def vereadores_geral():
    return render_template('vereadores_geral.html')

@app.route('/vereadores_perfil')
def vereadores_perfil():
    return render_template('vereadores_perfil.html')

@app.route('/relatorios')
def relatorios():
    return render_template('relatorios.html')

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
