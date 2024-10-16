from flask import Flask, render_template
from flask_mysqldb import MySQL
import sys
sys.setrecursionlimit(1500)

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'fatec'
app.config['MYSQL_DB'] = 'api'

mysql = MySQL(app)

def conectar_db():
    conectar = mysql.connect()

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
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM proposicoes")
    proposicoes = cur.fetchall()
    cur.close()
    return render_template('relatorios.html', proposicoes=proposicoes)

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
