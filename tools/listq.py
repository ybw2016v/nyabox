from data.models import Cdog
from .getuser import get_user_by_i

def get_all_qa(args):
    """
    获取带有答案的所有问题列表
    """
    page= 0 if args['y'] is None else args['y']
    qdog=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.hid!=None).filter(Cdog.type=="Q").limit(10).offset(page*10)
    qdogn=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.hid!=None).filter(Cdog.type=="Q").count()
    resdog=[]
    for qudog in qdog:
        dictd={"id":qudog.id,"hid":qudog.hid,"c":qudog.text,"tid":qudog.tid,"time":qudog.stime.astimezone().isoformat(timespec='milliseconds')}
        resdog.append(dictd)
    return {"r":"OK","res":resdog,"num":qdogn}

def get_user_qa(args):

    page= 0 if args['y'] is None else args['y']
    uid=args["t"]
    if uid is None:
        return {"r":404}
    qdogs=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.type=="Q").filter(Cdog.tid==uid).limit(10).offset(page*10)
    qdogsn=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.hid!=None).filter(Cdog.type=="Q").filter(Cdog.tid==uid).count()
    if qdogsn==0:
        return {"r":"用户不存在或者没有问题"}
    resdog=[]
    for qdog in qdogs:
        qdoga=None
        if qdog.hid is not None:
            
            adog=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.id==qdog.hid).first()
            qdoga={"id":adog.id,"time":adog.stime.astimezone().isoformat(timespec='milliseconds'),"c":adog.text}
        dictd={"id":qdog.id,"hid":qdog.hid,"c":qdog.text,"tid":qdog.tid,"time":qdog.stime.astimezone().isoformat(timespec='milliseconds'),"ans":qdoga}
        resdog.append(dictd)
    return {"r":"OK","res":resdog,"num":qdogsn}

def get_my_q(args):
    """
    docstring
    """

    page= 0 if args['y'] is None else args['y']

    token=args["i"]
    udog = get_user_by_i(token)
    if udog=="ERROR":
        return {"r":403}
    qdogs=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.type=="Q").filter(Cdog.tid==udog.uid).limit(10).offset(page*10)
    qdogsn=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.type=="Q").filter(Cdog.tid==udog.uid).count()
    if qdogsn==0:
        return {"r":"用户不存在或者没有问题"}
    resdog=[]
    for qdog in qdogs:
        qdoga=None
        if qdog.hid is not None:
            
            adog=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.id==qdog.hid).first()
            qdoga={"id":adog.id,"time":adog.stime.astimezone().isoformat(timespec='milliseconds'),"c":adog.text}
        dictd={"id":qdog.id,"hid":qdog.hid,"c":qdog.text,"tid":qdog.tid,"time":qdog.stime.astimezone().isoformat(timespec='milliseconds'),"ans":qdoga}
        resdog.append(dictd)
    return {"r":"OK","res":resdog,"num":qdogsn}


    pass



