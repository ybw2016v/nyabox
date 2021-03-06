import uuid
from datetime import datetime, timedelta

from flask import (Flask, abort, jsonify, redirect, request,
                   send_from_directory, url_for, render_template)
from flask.globals import session
from flask_redis import FlaskRedis
from flask_restful import Api, Resource, abort, reqparse
from flask_executor import Executor
from sqlalchemy import or_
from sqlalchemy.sql.expression import text

from auth.login import create_user
from data.db import db_session
from data.models import Cdog, Udog
from tools.adda import adda
from tools.addq import addq
from tools.getc import get_c_by_id
from tools.getq import get_q_by_id
from tools.getques import get_ques_by_uid
from tools.getuser import get_user_by_i, get_user_by_uid
from tools.gid import gen_dog_id
from tools.listq import get_all_qa, get_my_q, get_user_qa
from tools.user import get_dog_i,get_dog_id
from tools.rmdq import rmqa_by_id_i
from tools.chus import ch_u_s
from admin.lsaq import aget_all_qa,aget_all_ans
from admin.upaq import update_qa
from admin.rmqa import remove_qa
import config

app = Flask(__name__)
app.config.update(RESTFUL_JSON=dict(ensure_ascii=False))
app.config['REDIS_URL']=config.REDIS_URL
rc=FlaskRedis(app,decode_responses=True)
app.config['EXECUTOR_MAX_WORKERS'] = 1
executor = Executor(app)
api = Api(app)


parser = reqparse.RequestParser()
parser.add_argument('c', type=str, help='内容')
parser.add_argument('p', type=str, help='密码')
parser.add_argument('t', type=str, help='提问目标')
parser.add_argument('r', type=float, help='显示概率')
parser.add_argument('i', type=str, help='访问token',required=False,location=['form', 'json'])
parser.add_argument('g', type=int, help='组别')
parser.add_argument('y', type=int, help='分页页数')
parser.add_argument('type', type=str, help='类型')
parser.add_argument('isShow', type=bool, help='id',location=['form', 'json'])
parser.add_argument('isAccept', type=bool, help='id',location=['form', 'json'])
parser.add_argument('u', type=dict, help='更新内容',location=['form', 'json'])


def doglimt(dogip):
    print(dogip)
    if rc.exists("nyaip:{}".format(dogip)):
        dog=rc.incr("nyaip:{}".format(dogip))
        if dog>20:
            rc.expire("nyaip:{}".format(dogip), 3600)
            return False
        else:
            return True
    else:
        rc.set("nyaip:{}".format(dogip), 1,ex=3600)
        return True


class addog(Resource):
    def post(self):
        """
        添加新内容
        """
        args = parser.parse_args()
        ty=args['type']
        if ty=="q":
            dogip=str(request.remote_addr)
            if doglimt(dogip):
                return addq(args,executor)
            else:
                return {"r":"操作太频繁"}
        if ty=="a":
            return adda(args)
        return {"r":"ok","c":"???"}

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
        后续版本应当废弃
        """
        args = parser.parse_args()
        return get_user_qa(args,True)

class ListUserAns(Resource):
    def post(self):
        """
        列出用户的所有问题
        """
        args = parser.parse_args()
        return get_user_qa(args,False)

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

class IDdog(Resource):
    def post(self):
        """
        返回用户相关信息
        """
        args = parser.parse_args()
        return get_dog_id(args)

class Logindog(Resource):
    def post(self):
        """
        用户登录
        """
        args = parser.parse_args()
        return create_user(args)

class GetQuesById(Resource):
    def post(self):
        """
        根据id获取问题
        """
        args = parser.parse_args()
        return get_q_by_id(args)

class RmQuesById(Resource):
    def post(self):
        """
        根据id删除问题
        """
        args = parser.parse_args()
        return rmqa_by_id_i(args)

class GetCById(Resource):
    def post(self):
        """
        根据id获取内容
        """
        args = parser.parse_args()
        return get_c_by_id(args)

class ChangeDog(Resource):
    def post(self):
        """
        更改用户信息
        """
        args = parser.parse_args()
        return ch_u_s(args)

class AdminListQA(Resource):
    def post(self):
        """
        管理员列出所有的问题回答
        """
        args = parser.parse_args()
        return aget_all_qa(args)
class AdminListAns(Resource):
    def post(self):
        """
        管理员列出所有的回答
        """
        args = parser.parse_args()
        return aget_all_ans(args)
class AdminUpdateQa(Resource):
    def post(self):
        """
        管理员更新问题
        """
        args = parser.parse_args()
        return update_qa(args)
class AdminRemoveQa(Resource):
    def post(self):
        """
        管理员删除问题
        """
        args = parser.parse_args()
        return remove_qa(args)


@app.route("/")
def hel():
    return render_template("index.html")

@app.route('/page/<path:subpath>')
def pwa(subpath):
    """
    单页应用
    """
    return send_from_directory('static','index.html')

@app.route('/u/<path:dogname>')
@app.route('/user/<path:dogname>')
def userpage(dogname):
    """
    用户页面
    """
    # return subpath
    udog=get_user_by_uid(dogname)
    if udog!="ERROR" and udog is not None:
        return render_template('index.html',dogtitle="{}的提问箱".format(udog.name),dogimage=udog.avatar,dogdescription=udog.text)
    else:
        return render_template('index.html')

@app.route('/q/<path:dogname>')
@app.route('/ques/<path:dogname>')
def quespage(dogname):
    """
    用户页面
    """
    # return subpath
    qdog=get_ques_by_uid(dogname)
    if qdog!="ERROR" and qdog is not None:
        return render_template('index.html',dogdescription=qdog.text)
    else:
        return render_template('index.html')

@app.route('/<path:dogname>')
def defaultpage(dogname):
    """
    默认页面
    """
    return render_template('index.html')



# api.add_resource(tsdog, '/api/')
api.add_resource(addog, '/api/create/')
api.add_resource(listdog, '/api/list/')
api.add_resource(ListUserAns, '/api/lsqa/')
api.add_resource(ListMyQa, '/api/lmqa/')
api.add_resource(Idog, '/api/i/')
api.add_resource(Logindog, '/api/login/')
api.add_resource(GetQuesById, '/api/getq/')
api.add_resource(GetCById, '/api/getc/')
api.add_resource(IDdog, '/api/getd/')
api.add_resource(RmQuesById, '/api/rmqa/')
api.add_resource(ChangeDog, '/api/chus/')
api.add_resource(AdminListQA, '/api/admin/list/')
api.add_resource(AdminListAns, '/api/admin/lsan/')
api.add_resource(AdminUpdateQa, '/api/admin/upqa/')
api.add_resource(AdminRemoveQa, '/api/admin/rmqa/')



if __name__ == '__main__':
    app.run(debug=True)
