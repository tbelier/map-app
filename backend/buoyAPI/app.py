from flask import Flask, request, jsonify
import jsonify
import pymysql
from flask_cors import CORS

app= Flask(__name__)
CORS(app)

def db_connection():
    conn=None
    try:
        conn = pymysql.connect(
            host='sql7.freesqldatabase.com',
            database='sql7723419',
            user='sql7723419',
            password='nPlFTnXHwg',
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
            )
        return conn
    except pymysql.Error as e:
        return None


@app.route('/buoys', methods=["GET", "POST"])
def buoys():
    conn=db_connection()
    
    if conn == None:
        return "HELLO WOOOOOOOOOOOOOOOOOOOORLD"
    cursor = conn.cursor()
    if request.methods == "GET":
        cursor.execute("SELECT * FROM book")
        buoys = [dict(id = row["id"], name = row["name"], x = row["x"], y = row["y"]) for row in cursor.fetchall()]
            
        if buoys is not None:
            return jsonify(buoys)
    
    if request.method == "POST":
        new_name = request.form["name"]
        new_x = request.form["x"]
        new_y = request.form["y"]
        sql = """INSERT INTO buoy (name, x, y) VALUES (%s, %s, %s)"""
        cursor = cursor.execute(sql, (new_name, new_x, new_y))
        conn.commit()
        return f"Buoy with the id: {new_name} created successfullly"
        

@app.route('/buoy/<int:id>', methods = ["GET","PUT", "DELETE"])
def single_buoy(id):
    conn = db_connection()
    cursor = conn.cursor()
    buoy = None
    if request.method == "GET":
        cursor.execute("SELECT * FROM buoy WHERE id=?", (id,))
        rows = cursor.fetchall()
        for r in rows:
            buoy = r 
        if buoy is not None:
            return jsonify(buoy), 200
        else:
            return "Something wrong", 404

    if request.method == "PUT":
        sql = """UPDATE buoy
                SET name=?
                    x=?,
                    y=?,
                WHERE id=? """
        buoy["name"] = request.form["name"]
        buoy["x"] = request.form["x"]
        buoy["y"] = request.form["y"]
        updated_buoy = {
            "id": id,
            "x":  x,
            "y":  y,
        }
        conn.execute(sql, (name, x, y, ids))
        conn.commit()
        return jsonify(updated_buoy)

    if request.method == "DELETE":
        sql = """ DELETE FROM buoy WHERE id=?"""
        conn.execute(sql, (id,))
        conn.commit()
        return f"The book with id: {id}has been deleted.", 200

if __name__ == "__main__":
    app.run(debug=True)