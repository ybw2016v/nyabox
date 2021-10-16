from data.db import *
from data.models import Cdog,Udog
from tools.gid import gen_dog_id
import uuid
from datetime import datetime , timedelta


id=gen_dog_id()
uuidog = uuid.uuid4()
udog = Udog(uid=id,nid="test",uuid=str(uuidog),stime=datetime.now(),token=str(uuidog))
db_session.add(udog)
db_session.commit()


