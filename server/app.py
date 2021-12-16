from os import environ as env
from flask import Flask, request
from flask_cors import CORS
from shortuuid import ShortUUID

app = Flask(__name__)

CORS(app)

all = {}

@app.route('/', methods=['POST'])
def home():
	data = request.get_data(as_text=True)
	id = ShortUUID().random(8)
	all[id] = data
	print(all)

	return id

@app.route('/<name>')
def page(name):
	if name in all:
		print(all)
		return all[name]

	return 'Invalid', 404

if __name__ == '__main__':
	app.run(port=env.get('PORT', 5000))