import mysql.connector, os

db_config = {
    'user': os.getenv("DB_USER"),
    'password': os.getenv("DB_PASSWORD"),
    'host': os.getenv("DB_HOST"),
    'database': os.getenv("DB_NAME")
}


def get_db():
    try:
        con = mysql.connector.connect(**db_config)
        return con
    except mysql.connector.Error as err:
        print(f"Erro na conexão com o banco de dados: {err}")
        return None
