from data.db import *
from data.models import Cdog,Udog
from tools.gid import gen_dog_id
import uuid
from datetime import datetime
import config
import requests as r

MKURL="{}/api/i/".format(config.MKURL)

def create_user(args):
    """
    创建新用户
    """
    token=args["t"]
    print(token)
    jsondog={"i":token}
    resdog=r.post(MKURL,json=jsondog)
    tes=resdog.json()
    print(tes)
    if "id" not in tes:
        return {"r":403}

    # uid=gen_dog_id()
    # return {"r":"OK","uid":uid,"id":tes["id"],"name":tes["name"],"username":tes["username"],"avatarUrl":tes["avatarUrl"],"description":tes["description"]}
    udog=Udog.query.filter(Udog.mid==tes["id"]).first()
    if udog is None:
        id=gen_dog_id()
        uuidog = uuid.uuid4()
        namedog=tes["name"] if tes["name"] is not None else tes["username"]
        udog = Udog(uid=id,mid=tes["id"],nid=tes["username"],name=namedog,uuid=str(uuidog),stime=datetime.now(),token=str(uuidog),avatar=tes["avatarUrl"],text=tes["description"],isAccept=True,isShow=True,isAdmin= True if (tes["isAdmin"] or tes["isModerator"]) else False)
        db_session.add(udog)
        db_session.commit()
    else:
        udog.name=tes["name"] if tes["name"] is not None else tes["username"]
        udog.avatar=tes["avatarUrl"]
        udog.text=str(tes["description"])
        udog.isAdmin=True if (tes["isAdmin"] or tes["isModerator"]) else False
        # print("dog")
        db_session.commit()

    return {"r":"OK","id":udog.uid,"mid":str(udog.mid),"nid":str(udog.nid),"name":str(udog.name),"token":str(udog.token),"avatar":str(udog.avatar),"text": str(udog.text) if udog.text is not None else None}

