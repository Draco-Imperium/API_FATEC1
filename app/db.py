import mysql.connector

db_config = {
    'user': 'root',
    'password': '',
    'host': 'localhost',
    'database': 'apidb'
}

def get_db():
    try:
        con = mysql.connector.connect(**db_config)
        return con
    except mysql.connector.Error as err:
        print(f"Erro na conexão com o banco de dados: {err}")
        return None
