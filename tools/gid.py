import base36
import time

SDOG=890064000000

def gen_dog_id():
    """
    生成10位时间戳(伪)
    """
    tdog=int(1000*time.time())-SDOG
    strdog=base36.dumps(tdog)
    return str(strdog)