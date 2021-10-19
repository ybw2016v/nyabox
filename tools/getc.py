from data.models import Cdog

def get_c_id(dogid):
    """
    通过id获取内容
    """
    rdog=Cdog.queryfilter(Cdog.id==dogid).first()
    return rdog

def get_c_uuid(doguuid):
    """
    通过id获取内容
    """
    rdog=Cdog.queryfilter(Cdog.uuid==doguuid).first()
    return rdog



