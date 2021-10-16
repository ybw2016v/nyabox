from data.models import Cdog

def get_all_qa(args):
    """
    获取带有答案的所有问题列表
    """
    page= 0 if args['y'] is None else args['y']
    qdog=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.hid!=None).filter(Cdog.type=="Q").limit(10).offset(page*10)
    qdogn=Cdog.query.order_by(Cdog.stime.desc()).filter(Cdog.hid!=None).filter(Cdog.type=="Q").count()
    resdog=[]
    for qudog in qdog:
        dictd={"id":qudog.id,"hid":qudog.hid,"c":qudog.text,"tid":qudog.tid}
        resdog.append(dictd)
    return {"r":"OK","res":resdog,"num":qdogn}

def get_user_qa(args):

    return "dog"
