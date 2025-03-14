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
# --------------------------------------------------------------------------------------------------------

def format_name(name):
    return unidecode.unidecode(name).lower().replace(" ", "_")

app.jinja_env.filters['format_name'] = format_name

@app.route('/')
def index():
    file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database', 'leis.json')
    with open(file_path, 'r', encoding='utf-8', errors='replace') as file:
        leis = json.load(file)
    leis = leis['leis']
    for lei in leis:
        lei['PrimeiraLetra'] = lei['Lei'][0] if 'Lei' in lei and lei['Lei'] else ''
    ultimas = prepos() 
    return render_template('index.html', ultimas=ultimas, leis=leis)
    
# --------------------------------------------------------------------------------------------------------

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
    
# --------------------------------------------------------------------------------------------------------

def carregar_votacoes():
    try:
        file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database', 'data3.json')
        with open(file_path, 'r', encoding='utf-8', errors='replace') as file:
            votacoes = json.load(file)
        return votacoes.get('votacoes', [])
    except FileNotFoundError:
        logging.error("Arquivo data3.json não encontrado")
        return []
    except json.JSONDecodeError as e:
        logging.error(f"Erro ao decodificar JSON: {e}")
        return []
    
@app.route('/votacoes')
def votacoes_view():
    votacoes = carregar_votacoes()

    # Processamento das votações
    for votacao in votacoes:
        votacao['PrimeiraLetra'] = votacao['Votação'][0] if 'Votação' in votacao and votacao['Votação'] else ''
    
    # Aqui você pode adicionar mais lógica se necessário
    ultimas = votacoes  # ou alguma outra lógica que você precise
    
    return render_template('perfil.html', ultimas=ultimas, Votos=votacoes)

@app.route('/dados3', methods=['GET'])
def get_dados3():
    try:
        file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database', 'data3.json')
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"mensagem": "Arquivo não encontrado"}), 404
    except json.JSONDecodeError:
        return jsonify({"mensagem": "Erro ao decodificar JSON"}), 500

# --------------------------------------------------------------------------------------------------------

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

# --------------------------------------------------------------------------------------------------------

@app.route('/graficos')
# @cache.cached(timeout=300)
def graficos():
    return render_template('graficos.html')

# --------------------------------------------------------------------------------------------------------

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

# --------------------------------------------------------------------------------------------------------

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

# --------------------------------------------------------------------------------------------------------

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

# --------------------------------------------------------------------------------------------------------
@app.route('/perfil/<string:NM_URNA_CANDIDATO>', methods=['GET'])
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

        vereador_id = parlamentar.get("ID_VER")
        comentarios = obter_comentarios(vereador_id)
        votacoes = carregar_votacoes()
        votacoes_filtradas = []
        for votacao in votacoes:
            for vereador in votacao['vereadores']:
                if format_name(vereador['vereador']) == NM_URNA_CANDIDATO:
                    votacoes_filtradas.append({
                        "tipo": votacao["tipo"],
                        "projeto_de_lei": votacao["projeto_de_lei"],
                        "descricao": votacao["descricao"],
                        "autoria": votacao["autoria"],
                        "status": votacao["status"],
                        "voto": vereador["voto"]
                    })

        # Renderiza a página de perfil com os comentários
        # return render_template('perfil.html', parlamentar=parlamentar,)
        return render_template('perfil.html', parlamentar=parlamentar, comentarios=comentarios, votacoes=votacoes_filtradas)

    except FileNotFoundError:
        logging.error("Arquivo não encontrado")
        return render_template('404.html'), 404
    except json.JSONDecodeError:
        logging.error("Erro ao decodificar JSON")
        return render_template('500.html'), 500


def adicionar_comissoes_ao_perfil(parlamentar_id, comissoes, parlamentares):
    parlamentar = next(
        (p for p in parlamentares if p["ID_VER"] == parlamentar_id), None
    )

    if not parlamentar:
        return f"Parlamentar com ID {parlamentar_id} não encontrado."

    comissoes_participadas = []

    for comissao in comissoes:
        for p in comissao.get("comissaoParlamentar", []):
            if p.get("parlamentarID") == str(
                parlamentar_id
            ):  # Corrigido para comparar como string
                comissoes_participadas.append(
                    {
                        "comissaoNome": comissao["comissaoNome"],
                        "cargo": p["comissaoCargo"],
                    }
                )

    if not comissoes_participadas:
        return f"Parlamentar com ID {parlamentar_id} não está participando de nenhuma comissão."

    return comissoes_participadas

def busca_perfil(NM_URNA_CANDIDATO):
    app.logger.info(f"Acessando perfil do vereador: {NM_URNA_CANDIDATO}")
    try:
        file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database', 'data.json')
        with open(file_path, 'r', encoding='utf-8', errors='replace') as file:
            data = json.load(file)
        
        parlamentar = next((p for p in data['parlamentares'] if format_name(p['NM_URNA_CANDIDATO']) == format_name(NM_URNA_CANDIDATO)), None)
        if parlamentar is None:
            logging.warning(f"Parlamentar com NM_URNA_CANDIDATO '{NM_URNA_CANDIDATO}' não encontrado.")
            return render_template('404.html'), 404

        vereador_id = parlamentar.get("ID_VER")
        comentarios = obter_comentarios(vereador_id)

        return render_template('perfil.html', parlamentar=parlamentar, comentarios=comentarios)

    except FileNotFoundError:
        logging.error("Arquivo não encontrado")
        return jsonify({"mensagem": "Arquivo não encontrado"}), 404
    except json.JSONDecodeError as e:
        logging.error("Erro ao decodificar JSON: %s", e)
        return jsonify({"mensagem": "Erro ao decodificar JSON"}), 500

# # Nova rota para enviar comentários via AJAX
@app.route('/comentar', methods=['POST'])
def comentar():
    try:
        # Recebe os dados do formulário
        conteudo = request.form.get('comment')
        star = request.form.get('avaliacao')
        NM_URNA_CANDIDATO = request.form.get('NM_URNA_CANDIDATO')
        user_ip = get('https://api.ipify.org').content.decode('utf8')  # Obtém o IP do usuário

        # Carrega o arquivo JSON para obter o vereador ID
        file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database', 'data.json')
        with open(file_path, 'r', encoding='utf-8', errors='replace') as file:
            data = json.load(file)

        parlamentar = next((p for p in data['parlamentares'] if format_name(p['NM_URNA_CANDIDATO']) == NM_URNA_CANDIDATO), None)
        vereador_id = parlamentar.get("ID_VER") if parlamentar else None

        if conteudo and vereador_id:
            user_id = criar_usuario_anonimo(user_ip)

            if user_id:
                # Insere o comentário no banco de dados
                inserir_comentario(conteudo, star, vereador_id, user_ip)
                logging.info("Comentário adicionado com sucesso.")
                return jsonify({"status": "success", "message": "Comentário adicionado com sucesso."})
            else:
                logging.error("Erro ao criar ou obter o usuário anônimo.")
                return jsonify({"status": "error", "message": "Erro ao criar ou obter o usuário anônimo."}), 500
        else:
            logging.warning("Comentário ou ID do vereador ausente.")
            return jsonify({"status": "error", "message": "Comentário ou ID do vereador ausente."}), 400

    except Exception as e:
        logging.error(f"Erro ao adicionar comentário: {e}")
        return jsonify({"status": "error", "message": "Erro interno no servidor."}), 500


#----------------------------------------------------------------------------------------

def obter_comentarios(vereador_id):
    con = get_db()
    comentarios = []

    try:
        cursor = con.cursor(dictionary=True)

        # Consulta para obter os comentários de um vereador específico
        query = """
            SELECT TB_CONTEUDO AS conteudo, TB_STARVALUE AS star_value, TB_DATACOMENT AS data_comentario, TB2_NOME AS usuario
            FROM apidb.tb1_comentarios
            LEFT JOIN apidb.tb2_usuarios ON apidb.tb1_comentarios.TB2_IP = apidb.tb2_usuarios.TB2_IP
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
        cursor.execute("SELECT IDUSUARIO FROM apidb.tb2_usuarios WHERE TB2_IP = %s", (user_ip,))
        usuario = cursor.fetchone()

        if usuario:
            return usuario[0]

        sql = """
            INSERT INTO apidb.tb2_usuarios (TB2_NOME, TB2_IP)
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
            INSERT INTO apidb.tb1_comentarios (TB_CONTEUDO, TB_STARVALUE, TB_VEREADORID, TB_DATACOMENT, TB2_IP)
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

#-------------------------------------------------------------------------------------------------------

@app.route('/search')
def search():
    query = request.args.get('q', '').lower()
    try:
        file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database', 'data.json')
        with open(file_path, 'r', encoding='utf-8', errors='replace') as file:
            data = json.load(file)
        
        resultados = [
            {
                "NM_URNA_CANDIDATO": v['NM_URNA_CANDIDATO'],
                "link": f"/perfil/{format_name(v['NM_URNA_CANDIDATO'])}"
            }
            for v in data['parlamentares'] if query in v['NM_URNA_CANDIDATO'].lower()
        ]

        if not resultados:
            app.logger.info(f"Sem resultados para a busca por '{query}'")

        app.logger.info(f"Resultados da busca para '{query}': {resultados}")

        return jsonify(resultados)

    except FileNotFoundError:
        app.logger.error("Arquivo não encontrado")
        return jsonify({"mensagem": "Arquivo não encontrado"}), 404
    except json.JSONDecodeError as e:
        app.logger.error(f"Erro ao decodificar JSON: {e}")
        return jsonify({"mensagem": "Erro ao decodificar JSON"}), 500
    except Exception as e:
        app.logger.error(f"Erro desconhecido: {e}")
        return jsonify({"mensagem": "Erro interno do servidor"}), 500

#----------------------------------------------------------------------------------------------

def carregar_votacoes():
    try:
        file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database', 'data3.json')
        with open(file_path, 'r', encoding='utf-8', errors='replace') as file:
            votacoes = json.load(file)
        return votacoes
    except FileNotFoundError:
        logging.error("Arquivo data3.json não encontrado")
        return []
    except json.JSONDecodeError as e:
        logging.error(f"Erro ao decodificar JSON: {e}")
        return []
    
@app.route('/perfil_vereador/<string:nome_vereador>', methods=['GET'])
def perfil_vereador(nome_vereador):
    votacoes = carregar_votacoes()
    
    # Filtrar proposições do vereador específico
    votacoes_filtradas = []
    for votacao in votacoes:
        if any(vereador['vereador'].lower() == nome_vereador.lower() for vereador in votacao['vereadores']):
            votacoes_filtradas.append(votacao)
    
    if not votacoes_filtradas:
        logging.warning(f"Sem proposições encontradas para o vereador: {nome_vereador}")
    
    return render_template('perfil.html', nome_vereador=nome_vereador, proposicoes=votacoes_filtradas) 

if __name__ == '__main__':
    app.run(debug=True)
