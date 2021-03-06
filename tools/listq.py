from data.models import Cdog,Udog
from .getuser import get_user_by_i

def get_all_qa(args):
    """
    获取带有答案的所有问题列表
    """
    page= 0 if args['y'] is None else args['y']
    qdog=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.hid!=None).filter(Cdog.type=="Q").limit(10).offset(page*10)
    qdogn=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.hid!=None).filter(Cdog.type=="Q").count()
    resdog=[]
    catch={}
    for qudog in qdog:
        dictd={"id":qudog.id,"hid":qudog.hid,"c":qudog.text,"tid":qudog.tid,"time":qudog.stime.astimezone().isoformat(timespec='milliseconds')}
        resdog.append(dictd)
        if qudog.tid in catch:
            dictd["user"]=catch[qudog.tid]
        else:
            udog=Udog.query.filter(Udog.uid==qudog.tid).first()
            udogf={"uid":udog.uid,"nid":udog.nid,"name":udog.name,"avatar":udog.avatar,"text":udog.text,"mid":udog.mid}
            catch[qudog.tid]=udogf
            dictd["user"]=udogf
    return {"r":"OK","res":resdog,"num":qdogn}

def get_user_qa(args,isAll=False):

    page= 0 if args['y'] is None else args['y']
    uid=args["t"]
    if uid is None:
        return {"r":404}
    if isAll:
        if uid[0]=="@":
            udog=Udog.query.filter(Udog.nid==uid[1:]).first()
            nuid=udog.uid
            qdogs=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.type=="Q").filter(Cdog.tid==nuid).limit(10).offset(page*10)
            qdogsn=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.type=="Q").filter(Cdog.tid==nuid).count()
        else:
            qdogs=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.type=="Q").filter(Cdog.tid==uid).limit(10).offset(page*10)
            qdogsn=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.type=="Q").filter(Cdog.tid==uid).count()
    else:
        if uid[0]=="@":
            udog=Udog.query.filter(Udog.nid==uid[1:]).first()
            nuid=udog.uid
            qdogs=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.type=="Q").filter(Cdog.tid==nuid).filter(Cdog.hid!=None).limit(10).offset(page*10)
            qdogsn=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.hid!=None).filter(Cdog.type=="Q").filter(Cdog.tid==nuid).count()

        else:
            qdogs=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.type=="Q").filter(Cdog.tid==uid).filter(Cdog.hid!=None).limit(10).offset(page*10)
            qdogsn=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.hid!=None).filter(Cdog.type=="Q").filter(Cdog.tid==uid).count()
    
    if qdogsn==0:
        return {"r":"用户不存在或者没有问题"}
    resdog=[]
    for qdog in qdogs:
        qdoga=None
        if qdog.hid is not None:
            
            adog=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.id==qdog.hid).first()
            if adog is None:
                qdoga={"id":"9kiiad8k","time":"2020-12-28T10:12:05.636+08:00","c":"回答不见了"}
            else:
                qdoga={"id":adog.id,"time":adog.stime.astimezone().isoformat(timespec='milliseconds'),"c":adog.text}
        dictd={"id":qdog.id,"hid":qdog.hid,"c":qdog.text,"tid":qdog.tid,"time":qdog.stime.astimezone().isoformat(timespec='milliseconds'),"ans":qdoga}
        resdog.append(dictd)
    return {"r":"OK","res":resdog,"num":qdogsn}

def get_my_q(args):
    """
    获取我的问题列表
    """

    page= 0 if args['y'] is None else args['y']
    dogtype=args["type"]

    token=args["i"]
    udog = get_user_by_i(token)
    if udog=="ERROR":
        return {"r":403}
    if dogtype=="a":
        qdogs=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.type=="Q").filter(Cdog.hid!=None).filter(Cdog.tid==udog.uid).limit(10).offset(page*10)
        qdogsn=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.type=="Q").filter(Cdog.hid!=None).filter(Cdog.tid==udog.uid).count()
    elif dogtype=="b":
        qdogs=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.type=="Q").filter(Cdog.hid==None).filter(Cdog.tid==udog.uid).limit(10).offset(page*10)
        qdogsn=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.type=="Q").filter(Cdog.hid==None).filter(Cdog.tid==udog.uid).count()
    else:
        qdogs=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.type=="Q").filter(Cdog.tid==udog.uid).limit(10).offset(page*10)
        qdogsn=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.type=="Q").filter(Cdog.tid==udog.uid).count()
    # if qdogsn==0:
    #     return {"r":"用户不存在或者没有问题"}
    resdog=[]
    for qdog in qdogs:
        qdoga=None
        if (qdog.hid is not None) and (dogtype!="b"):
            
            adog=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.id==qdog.hid).first()
            if adog is None:
                qdoga={"id":"9kiiad8k","time":"2020-12-28T10:12:05.636+08:00","c":"回答不见了"}
            else:
                qdoga={"id":adog.id,"time":adog.stime.astimezone().isoformat(timespec='milliseconds'),"c":adog.text}
        dictd={"id":qdog.id,"hid":qdog.hid,"c":qdog.text,"tid":qdog.tid,"time":qdog.stime.astimezone().isoformat(timespec='milliseconds'),"ans":qdoga}
        resdog.append(dictd)
    return {"r":"OK","res":resdog,"num":qdogsn}

