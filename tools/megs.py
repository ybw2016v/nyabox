import requests as r

def sendmassage(URL,key,dogid,cont):
    """
    Send a message to a dog
    """
    jsondog={
        "i":key,
        "userId":dogid,
        "text":cont
    }
    res=r.post(URL,json=jsondog)
    return res.json()
    