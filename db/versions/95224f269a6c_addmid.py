"""addmid

Revision ID: 95224f269a6c
Revises: 6ce2db35b8b2
Create Date: 2021-10-30 13:17:54.866314

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '95224f269a6c'
down_revision = '6ce2db35b8b2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('mid', sa.String(length=32), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'mid')
    # ### end Alembic commands ###
