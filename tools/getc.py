from data.models import Cdog

def get_c_id(dogid):
    """
    通过id获取内容
    """
    rdog=Cdog.query.filter(Cdog.id==dogid).first()
    return rdog

def get_c_uuid(doguuid):
    """
    通过id获取内容
    """
    rdog=Cdog.queryf.ilter(Cdog.uuid==doguuid).first()
    return rdog

def get_c_by_id(args):
    """
    通过id获取内容
    """
    dogid=args["t"]
    cdog=get_c_id(dogid)
    if cdog is None:
        return {"r":404,"msg":"没有找到对应的内容"}
    resdog={"id":cdog.id,"hid":cdog.hid,"c":cdog.text,"tid":cdog.tid,"time":cdog.stime.astimezone().isoformat(timespec='milliseconds'),"type":cdog.type}
    return {"r": "OK", "res":resdog}



