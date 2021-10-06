from sqlalchemy import Column, Integer, String, Text ,Boolean
from sqlalchemy.sql.sqltypes import DateTime, Float
from .db import Base
import string

class Cdog(Base):
    __tablename__ = 'texts'
    id = Column(String(16), primary_key=True)
    type = Column(String(4), unique=False)
    stime = Column(DateTime, unique=False)
    uid = Column(String(16), unique=False)
    uuid = Column(String(256), unique=False)
    qid = Column(String(16), unique=False)
    hid = Column(String(16), unique=False)
    text = Column(Text, unique=False)

class Udog(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    uid = Column(String(16), primary_key=True)
    key = Column(String(256), unique=False)
    token = Column(String(256), unique=False)
    stime = Column(DateTime, unique=False)
    uid = Column(String(16), unique=False)
    uuid = Column(String(256), unique=False)
    qid = Column(String(16), unique=False)
    hid = Column(String(16), unique=False)
    text = Column(Text, unique=False)
