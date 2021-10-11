from datetime import datetime, timedelta

from flask import Flask, abort, jsonify, redirect, request, url_for
from flask.globals import session
from flask_redis import FlaskRedis
from flask_restful import Api, Resource, abort, reqparse
from sqlalchemy import or_

from data.models import Cdog,Udog
from data.db import db_session
from tools.gid import gen_dog_id
import uuid


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
parser.add_argument('y', type=int, help='页数')
parser.add_argument('type', type=str, help='类型')


def get_user_by_i(tokend):
    """
    从token得到用户信息
    """
    try:
        udog=Udog.query.filter(Udog.token==tokend).first()
    except:
        return "ERROR"
    return udog

class addog(Resource):
    def post(self):
        """
        添加新内容
        """
        args = parser.parse_args()
        ty=args['type']
        if ty=="q":
            tid=args["t"]
            context=args['c']
            if args["i"] is not None:
                tuid = get_user_by_i(args["i"])
                pass
            return {"to":tid,"i":args['i'],"tuds":tuid.uid}
        context=args['c']
        token=args['i']
        user=get_user_by_i(token)
        print(user)
        if (user is None) or(user == "ERROR") :
            return {"r":403}
        return {"r":"ok","c":context,"uid":user.uid,"nid":user.nid}
    pass

@app.route("/")
def hel():
    """
    docstring
    """
    return {"server":"runing"}

# api.add_resource(tsdog, '/api/')
api.add_resource(addog, '/api/create/')
# api.add_resource(lsdog, '/api/list/')
# api.add_resource(rmdog, '/api/remove/')
# api.add_resource(logindog, '/api/login/')
# api.add_resource(doginfos, '/api/user/')
# api.add_resource(updog, '/api/update/')


if __name__ == '__main__':
    app.run(debug=True)
