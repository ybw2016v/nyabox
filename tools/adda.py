from sqlalchemy.sql.expression import text
from data.db import db_session
from data.models import Cdog
from datetime import datetime

from .getuser import get_user_by_i, get_user_by_uid
from .getques import get_ques_by_uid
from .gid import gen_dog_id
import uuid

def adda(args):
    dogid=args["i"]
    to_ques=args["t"]
    if dogid is None:
        return {"r":403}
    idog = get_user_by_i(dogid)
    if idog is None:
        return {"r":403}
    if to_ques is None:
        return {"r":403}
    qdog=get_ques_by_uid(to_ques)
    if qdog is None or qdog =="ERROR":
        return {"r":"问题不存在"}

    if qdog.tid!=idog.uid:
        return {"r":"不是你的问题"}
    uuidog=str(uuid.uuid4())
    context=args["c"]
    aid=gen_dog_id()
    newans=Cdog(id=aid,uuid=uuidog,type="A",stime=datetime.now(),uid=idog.uid,qid=qdog.id,text=context)
    qdog.hid=aid
    db_session.add(newans)
    db_session.commit()
    return {"r":"OK","id":aid,"uuid":uuidog}

    return "dog"


