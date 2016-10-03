from flask import Flask
from flask import request
from flask import make_response

app = Flask(__name__)


@app.route('/', methods = ['POST'])
def index():
   d = request.get_data()

   fo = open("projects.txt", "a")
   fo.seek(0)
   fo.truncate()
   fo.write(d)
   fo.close()
   
   resp = make_response("")
   resp.headers.set('Access-Control-Allow-Origin', "*")
   return resp

@app.route('/', methods = ['GET'])
def index2():
   fo = open("projects.txt", "r")
   resp = make_response(str(fo.read()))
   #resp = app.send_static_file('./projects.txt')
   fo.close()
   resp.headers.set('Access-Control-Allow-Origin', "*")
   return resp

if __name__ == '__main__':
    app.run()


