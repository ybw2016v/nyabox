from .getques import get_ques_by_uid

def get_q_by_id(args):
    """
    Get the question by id.
    """
    qidog=args["t"]
    qdog=get_ques_by_uid(qidog)
    if qdog == "ERROR" or qdog is None:
        return {"r": 404, "m": "Question not found."}
    if qdog.type!="Q":
        return {"r": 403, "m": "Not a question."}
    resdog={"id":qdog.id,"hid":qdog.hid,"c":qdog.text,"tid":qdog.tid,"time":qdog.stime.astimezone().isoformat(timespec='milliseconds'),"type":qdog.type}
    return {"r": "OK", "res":resdog}


    pass