from datetime import datetime

from data.db import db_session
from data.models import Cdog

from .getques import get_ques_by_uid
from .getuser import get_user_by_i, get_user_by_uid


def rmqa_by_id_i(args):
    """
    rmqa_by_id_i
    """
    qidog=args["t"]
    # qdog=get_ques_by_uid(qidog)
    usdog=get_user_by_i(args["i"])
    if usdog is None or usdog=="ERROR":
        return {"r": 403, "m": "USER not found."}
    udog=Cdog.query.filter(Cdog.id==qidog).filter(Cdog.tid==usdog.uid).first()
    u2dog=Cdog.query.filter(Cdog.qid==qidog).filter(Cdog.uid==usdog.uid)
    if udog is None :
        return {"r": 403, "m": "Question not found."}
    numdog=u2dog.count()
    db_session.delete(udog)
    for ddog in u2dog:
        db_session.delete(ddog)
    db_session.commit()

    return {"r": "OK","n":numdog+1,"id":qidog}
