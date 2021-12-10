import requests as r
import config

def sendmassage(dogid,cont):
    """
    Send a message to a dog
    """
    jsondog={
        "i":config.MISSKEY_TOKEN,
        "userId":dogid,
        "text":cont
    }
    res=r.post(config.MISSKEY_URL+"/api/messaging/messages/create",json=jsondog)
    return res.json()
    