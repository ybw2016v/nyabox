from data.models import Cdog

def get_ques_by_uuid(tokend):
    """
    从uuid得到问题信息
    """
    try:
        udog=Cdog.query.filter(Cdog.uuid==tokend).first()
    except:
        return "ERROR"
    return udog

def get_ques_by_uid(uidog):
    """
    从uid得到问题信息
    """
    try:
        udog=Cdog.query.filter(Cdog.id==uidog).first()
    except:
        return "ERROR"
    return udog