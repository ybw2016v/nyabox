from sqlalchemy import Column, Integer, String, Text ,Boolean
from sqlalchemy.sql.sqltypes import DateTime, Float
from . import db
Base = db.Base
# import string

class Cdog(Base):
    __tablename__ = 'texts'
    id = Column(String(16), primary_key=True)
    type = Column(String(4), unique=False)
    stime = Column(DateTime, unique=False)
    uid = Column(String(16), unique=False)
    uuid = Column(String(256), unique=False)
    tid = Column(String(16), unique=False)
    qid = Column(String(16), unique=False)
    hid = Column(String(16), unique=False)
    text = Column(Text, unique=False)

class Udog(Base):
    __tablename__ = 'users'
    uid = Column(String(16), primary_key=True)
    nid = Column(String(256), unique=False)
    mid = Column(String(32), unique=False)
    name = Column(String(256), unique=False)
    avatar = Column(String(512), unique=False)
    # key = Column(String(256), unique=False)
    token = Column(String(256), unique=False)
    stime = Column(DateTime, unique=False)
    uuid = Column(String(256), unique=False)
    text = Column(Text, unique=False)
    ip = Column(Text, unique=False)
    isAccept = Column(Boolean, unique=False,default=True)
    isShow = Column(Boolean, unique=False,default=True)
    isAdmin = Column(Boolean, unique=False,default=False)
