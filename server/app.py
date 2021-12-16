from os import environ as env
from flask import Flask, request
from pymongo import MongoClient
from flask_cors import CORS
from shortuuid import ShortUUID

app = Flask(__name__)
CORS(app)

client = MongoClient(env.get('DB_URI', 'mongodb://localhost/'))
db = client.imgDB
img = db.img

@app.route('/', methods=['POST'])
def home():
	data = request.get_data(as_text=True)
	id = ShortUUID().random(8)
	img.insert_one({
		'id': id,
		'data': data
	})

	return id

@app.route('/<id>')
def page(id):
	obj = img.find_one({ 'id': id })
	
	if obj is None:
		return 'Invalid', 404
	
	return obj['data']

if __name__ == '__main__':
	app.run(port=env.get('PORT', 5000))