from data.models import Udog

def get_user_by_i(tokend):
    """
    从token得到用户信息
    """
    try:
        udog=Udog.query.filter(Udog.token==tokend).first()
    except:
        return "ERROR"
    return udog

def get_user_by_uid(uidog):
    """
    从uid得到用户信息
    """
    try:
        if uidog[0]=="@":
            udog=Udog.query.filter(Udog.nid==uidog[1:]).first()
        else:
            udog=Udog.query.filter(Udog.uid==uidog).first()
    except:
        return "ERROR"
    return udog


