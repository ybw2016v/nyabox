from data.models import Cdog,Udog
from tools.getuser import get_user_by_i

def aget_all_qa(args):
    """
    管理员获取带所有问答列表
    """
    page= 0 if args['y'] is None else args['y']
    token=args["i"]
    udog = get_user_by_i(token)
    print(udog)
    if udog=="ERROR" or udog is None:
        return {"r":403}
    if not udog.isAdmin:
        return {"r":404}
    qdogs=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.type=="Q").limit(10).offset(page*10)
    qdogsn=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.type=="Q").count()
    resdogs=[]
    for qitem in qdogs:
        qdoga=[]
        if qitem.hid is not None:
            adog=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.qid==qitem.id).all()
            for aitem in adog:
                ait={"id":aitem.id,"time":aitem.stime.astimezone().isoformat(timespec='milliseconds'),"c":aitem.text}
                qdoga.append(ait)
        qit={"id":qitem.id,"hid":qitem.hid,"c":qitem.text,"tid":qitem.tid,"time":qitem.stime.astimezone().isoformat(timespec='milliseconds'),"ans":qdoga}
        resdogs.append(qit)
    return {"r":"OK","res":resdogs,"num":qdogsn}



