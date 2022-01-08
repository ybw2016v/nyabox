from data.models import Cdog
from .ckad import ckadmin
from datetime import datetime
from data.db import db_session

def update_qa(args):
    """
    更新问答信息
    """
    token=args["i"]
    ad=ckadmin(token)
    if not ad:
        return {"r":403,"msg":"您没有权限"}
    qid=args["t"]
    updateinfo=args['u']
    qdog=Cdog.query.filter(Cdog.id==qid).first()
    if qdog is None:
        return {"r":404,"msg":"问题不存在"}
    if updateinfo is not None:
        if "time" in updateinfo:
            qdog.stime=datetime.strptime(updateinfo["time"],"%Y-%m-%dT%H:%M:%S.%fZ")
        if "c" in updateinfo:
            qdog.text=updateinfo["c"]
    db_session.commit()
    return {"r":"OK","msg":"更新成功","res":updateinfo}

