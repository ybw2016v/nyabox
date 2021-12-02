from .getuser import get_user_by_i,get_user_by_uid

def get_dog_i(args):
    if args["i"] is None:
        return {"r":403}
    dog_token=args["i"]
    udog=get_user_by_i(dog_token)
    if udog is None or udog=="ERROR":
        return {"r":4065}
    res={"uid":udog.uid,"nid":udog.nid,"name":udog.name,"avatar":udog.avatar,"text":udog.text,"mid":udog.mid,"isAccept":udog.isAccept,"isShow":udog.isShow,"isAdmin":udog.isAdmin}
    return {"r":"OK","c":res}

def get_dog_id(args):

    dog_id=args["t"]
    udog=get_user_by_uid(dog_id)
    if udog is None or udog=="ERROR":
        return {"r":4065}
    res={"uid":udog.uid,"nid":udog.nid,"name":udog.name,"avatar":udog.avatar,"text":udog.text,"mid":udog.mid,"isAccept":udog.isAccept}
    return {"r":"OK","c":res}
