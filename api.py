from datetime import datetime, timedelta

from flask import Flask, abort, jsonify, redirect, request, url_for
from flask.globals import session
from flask_redis import FlaskRedis
from flask_restful import Api, Resource, abort, reqparse
from sqlalchemy import or_
from sqlalchemy.sql.expression import text

from data.models import Cdog,Udog
from data.db import db_session
from tools.addq import addq
from tools.adda import adda
from tools.listq import get_all_qa,get_user_qa,get_my_q
from tools.gid import gen_dog_id
from tools.user import get_dog_i
import uuid

from tools.getuser import get_user_by_i,get_user_by_uid

app = Flask(__name__)
app.config.update(RESTFUL_JSON=dict(ensure_ascii=False))
api = Api(app)


parser = reqparse.RequestParser()
parser.add_argument('c', type=str, help='内容')
parser.add_argument('p', type=str, help='密码')
parser.add_argument('t', type=str, help='提问目标')
parser.add_argument('r', type=float, help='显示概率')
parser.add_argument('i', type=str, help='访问token',required=False)
parser.add_argument('g', type=int, help='是否生成图片')
parser.add_argument('y', type=int, help='分页页数')
parser.add_argument('type', type=str, help='类型')



class addog(Resource):
    def post(self):
        """
        添加新内容
        """
        args = parser.parse_args()
        ty=args['type']
        if ty=="q":
            return addq(args)
        if ty=="a":
            return adda(args)
        return {"r":"ok","c":context}

class listdog(Resource):
    def post(self):
        """
        列出所有的已回答问题
        """
        args = parser.parse_args()
        return get_all_qa(args)

class ListUserQa(Resource):
    def post(self):
        """
        列出用户的所有问题
        """
        args = parser.parse_args()
        return get_user_qa(args)

class ListMyQa(Resource):
    def post(self):
        """
        列出用户的所有问题
        """
        args = parser.parse_args()
        return get_my_q(args)

class Idog(Resource):
    def post(self):
        """
        返回用户相关信息
        """
        args = parser.parse_args()
        return get_dog_i(args)

# class 


@app.route("/")
def hel():
    """
    docstring
    """
    return {"server":"runing"}



# api.add_resource(tsdog, '/api/')
api.add_resource(addog, '/api/create/')
api.add_resource(listdog, '/api/list/')
api.add_resource(ListUserQa, '/api/lsqa/')
api.add_resource(ListMyQa, '/api/lmqa/')
api.add_resource(Idog, '/api/i/')
# api.add_resource(logindog, '/api/login/')
# api.add_resource(doginfos, '/api/user/')
# api.add_resource(updog, '/api/update/')


if __name__ == '__main__':
    app.run(debug=True)
