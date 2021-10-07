from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker



engine = create_engine("sqlite+pysqlite:///dog.db", echo=True)
db_session = scoped_session(sessionmaker(autocommit=False,autoflush=False,bind=engine))
Base = declarative_base()

from sqlalchemy import Column, Integer, String, Text ,Boolean
from sqlalchemy.sql.sqltypes import DateTime, Float
# from .db import Base
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
    uid = Column(String(16), primary_key=True)
    nid = Column(String(256), unique=False)
    username = Column(String(256), unique=False)
    avatar = Column(String(512), unique=False)
    # key = Column(String(256), unique=False)
    token = Column(String(256), unique=False)
    stime = Column(DateTime, unique=False)
    uuid = Column(String(256), unique=False)
    text = Column(Text, unique=False)
Base.metadata.create_all(bind=engine)