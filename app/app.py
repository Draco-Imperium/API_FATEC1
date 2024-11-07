from flask import Flask, render_template, jsonify, request
from flask_caching import Cache
import json,unidecode, logging, os, sys, random, string, datetime
from requests import get
from getFunctions import *
import mysql.connector
from db import get_db


sys.setrecursionlimit(1500)

logging.basicConfig(filename='app.log',level=logging.INFO,format='%(asctime)s-%(levelname)s-%(message)s')

app = Flask(__name__)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

app.secret_key = os.getenv("SECRET_KEY")
#--------------------------------------------------------------------------------------------------------   

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

#-------------------------------------------------------------------------------------------------------- 
    
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

#--------------------------------------------------------------------------------------------------------

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

#--------------------------------------------------------------------------------------------------------

@app.route('/graficos')
# @cache.cached(timeout=300)
def graficos():
    return render_template('graficos.html')

#--------------------------------------------------------------------------------------------------------

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

#--------------------------------------------------------------------------------------------------------

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

#--------------------------------------------------------------------------------------------------------

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
    
#--------------------------------------------------------------------------------------------------------

@app.route('/perfil/<string:NM_URNA_CANDIDATO>', methods=['GET', 'POST'])
def perfil(NM_URNA_CANDIDATO):
    try:
        
        # Carrega o arquivo JSON
        file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database', 'data.json')
        with open(file_path, 'r', encoding='utf-8', errors='replace') as file:
            data = json.load(file)
        
        # Encontra o parlamentar pelo nome formatado
        parlamentar = next((p for p in data['parlamentares'] if format_name(p['NM_URNA_CANDIDATO']) == NM_URNA_CANDIDATO), None)
        if parlamentar is None:
            logging.warning(f"Parlamentar com NM_URNA_CANDIDATO '{NM_URNA_CANDIDATO}' não encontrado.")
            return render_template('404.html'), 404

        if request.method == 'POST':
            conteudo = request.form.get('comment')
            #star_value = request.form.get('avaliacao')
            vereador_id = parlamentar.get("ID_VER")  
            print(vereador_id)
            user_ip = get('https://api.ipify.org').content.decode('utf8')
            print(user_ip)  

            if conteudo and vereador_id:
                user_id = criar_usuario_anonimo(user_ip)
                print(user_id)

                if user_id:
                    # Insere o comentário no banco de dados
                    inserir_comentario(conteudo, 5, vereador_id, user_ip)
                    comentarios = obter_comentarios(vereador_id) 
                    logging.info("Comentário adicionado com sucesso.")

                    # Redireciona para a mesma página para evitar reenvio do formulário
                    return render_template('perfil.html', parlamentar=parlamentar, comentarios=comentarios)
                else:
                    logging.error("Erro ao criar ou obter o usuário anônimo.")
            else:
                logging.warning("Comentário, avaliação ou ID do vereador ausente no formulário.")
        
        comentarios = obter_comentarios(vereador_id) 
        print(comentarios) # Função para obter comentários com base no ID do vereador

        # Renderiza a página de perfil com os comentários
        return render_template('perfil.html', parlamentar=parlamentar, comentarios=comentarios)
    
    except FileNotFoundError:
        logging.error("Arquivo não encontrado")
        return render_template('404.html'), 404
    except json.JSONDecodeError:
        logging.error("Erro ao decodificar JSON")
        return render_template('500.html'), 500
    

#----------------------------------------------------------------------------------------

def obter_comentarios(vereador_id):
    con = get_db()
    comentarios = []

    try:
        cursor = con.cursor(dictionary=True)
        
        # Consulta para obter os comentários de um vereador específico
        query = """
            SELECT TB_CONTEUDO AS conteudo, TB_STARVALUE AS star_value, TB_DATACOMENT AS data_comentario, TB2_NOME AS usuario
            FROM tb1_comentarios
            LEFT JOIN tb2_usuarios ON tb1_comentarios.TB2_IP = tb2_usuarios.TB2_IP
            WHERE TB_VEREADORID = %s
            ORDER BY TB_DATACOMENT DESC
        """
        
        cursor.execute(query, (vereador_id,))
        raw_comentarios = cursor.fetchall()
        
        for comentario in raw_comentarios:
            # Formata a data e estrutura o JSON do comentário
            comentario_formatado = {
                "conteudo": comentario["conteudo"],
                "star_value": comentario["star_value"],
                "data_comentario": comentario["data_comentario"].strftime('%Y-%m-%d %H:%M:%S') if comentario["data_comentario"] else None,
                "usuario": comentario["usuario"] or "Anônimo"
            }
            comentarios.append(comentario_formatado)
        
        cursor.close()
        con.close()

        logging.info(f"{len(comentarios)} comentários encontrados para o vereador {vereador_id}.")
        return comentarios  # Retorna a lista formatada de comentários

    except mysql.connector.Error as err:
        logging.error(f"Erro ao obter comentários: {err}")
        return []

#----------------------------------------------------------------------------------------
def criar_usuario_anonimo(user_ip):
    sufixo = ''.join(random.choices(string.ascii_letters + string.digits, k=4))
    nome_usuario = f"anonimo{sufixo}"
    print(nome_usuario)

    con = get_db()
    if con is None:
        logging.error("Falha ao obter conexão com o banco de dados.")
        return None

    try:
        cursor = con.cursor()
        cursor.execute("SELECT IDUSUARIO FROM tb2_usuarios WHERE TB2_IP = %s", (user_ip,))
        usuario = cursor.fetchone()
        
        if usuario:
            return usuario[0]
        
        sql = """
            INSERT INTO tb2_usuarios (TB2_NOME, TB2_IP)
            VALUES (%s, %s)
        """
        cursor.execute(sql, (nome_usuario, user_ip))
        con.commit()
        
        user_id = cursor.lastrowid 
        logging.info(f"Usuário {nome_usuario} criado com sucesso.")
        cursor.close()
        con.close()
        
        return user_id
    except mysql.connector.Error as err:
        print(f"Erro ao criar usuário anônimo: {err}")
        return None


#---------------------------------------------------------------------------------

def inserir_comentario(conteudo, star_value, vereador_id, user_ip):
    con = get_db()
    if con is None:
        logging.error("Falha ao obter conexão com o banco de dados.")
        return

    try:
        cursor = con.cursor()
        data_comentario = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        sql = """
            INSERT INTO tb1_comentarios (TB_CONTEUDO, TB_STARVALUE, TB_VEREADORID, TB_DATACOMENT, TB2_IP)
            VALUES (%s, %s, %s, %s, %s)
        """
        values = (conteudo, star_value, vereador_id, data_comentario, user_ip)
        
        cursor.execute(sql, values)
        con.commit()
        
        logging.info("Comentário inserido com sucesso no banco de dados.")
        
        cursor.close()
        con.close()
    except mysql.connector.Error as err:
        logging.error(f"Erro ao inserir comentário: {err}")

    
# HANDLE 404 -------------------------------------------------
    
@app.errorhandler(404)
def not_found(error):
    logging.error(f"Página não encontrada: {error}")
    return render_template('404.html'), 404

# HANDLE 500 -------------------------------------------------

@app.errorhandler(500)
def internal_error(error):
    logging.error(f"Erro interno: {error}")
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(debug=True)
