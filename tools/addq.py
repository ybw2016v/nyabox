from data.db import db_session
from data.models import Cdog
from datetime import datetime

from .getuser import get_user_by_i, get_user_by_uid
from .gid import gen_dog_id
import uuid


def addq(args):
    tid=args["t"]
    context=args['c']
    tuid = None
    dogid=args["i"]
    if dogid is not None:
        tuid = get_user_by_i(dogid).uid
    to_user=get_user_by_uid(tid)

    if to_user is None:
        return {"r":"bad","m":"没有这个用户"}

    if not to_user.isAccept:
        return {"r":"bad","m":"该用户不接受提问"} 
    if not to_user.isShow :
        return {"r":"bad","m":"没有这个用户"}
    uuidog=str(uuid.uuid4())
    dogid=gen_dog_id()
    newcdog=Cdog(id=dogid,type="Q",stime=datetime.now(),tid=to_user.uid,uuid=uuidog,text=context,uid=tuid)
    
    db_session.add(newcdog)
    db_session.commit()
    return {"r":"ok","to":tid,"i":args['i'],"uuid":uuidog,"qid":dogid}

    
