from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Connect to MariaDB
def get_db_connection():
    conn = mysql.connector.connect(
        host="localhost",
        user="demo",
        password="mot_de_passe_secret",
        database="demo"
    )
    return conn

# Get all users
@app.route('/users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(users)

# Get user by id
@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE id = %s", (id,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    return jsonify(user)

# Add new user
@app.route('/users', methods=['POST'])
def add_user():
    conn = get_db_connection()
    cursor = conn.cursor()
    data = request.get_json()
    cursor.execute("INSERT INTO users (first_name, last_name, email) VALUES (%s, %s, %s)", (data['first_name'], data['last_name'], data['email']))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'User added successfully'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)