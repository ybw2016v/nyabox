from .getuser import get_user_by_i
from data.db import db_session

def ch_u_s(args):
    """
    Change user's settings.
    """
    if args["i"] is None:
        return {"r":403}
    dog_token = args["i"]
    udog = get_user_by_i(dog_token)
    if udog is None or udog=="ERROR":
        return {"r":4065}
    if args["isShow"] is not None:
        udog.isShow = args["isShow"]
    if args["isAccept"] is not None:
        udog.isAccept = args["isAccept"]
    db_session.commit()
    return {"r":200}
