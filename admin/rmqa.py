from data.models import Cdog
from .ckad import ckadmin
from data.db import db_session

def remove_qa(args):
    """
    删除问答信息
    """
    token=args["i"]
    ad=ckadmin(token)
    if not ad:
        return {"r":403,"msg":"您没有权限"}
    qid=args["t"]
    qdog=Cdog.query.filter(Cdog.id==qid).first()
    if qdog is None:
        return {"r":404,"msg":"问题不存在"}
    db_session.delete(qdog)
    db_session.commit()
    return {"r":"OK","id":qid}
