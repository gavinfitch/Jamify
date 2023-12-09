"""empty message

Revision ID: 322309e9d8da
Revises: 028e732d8bfb
Create Date: 2023-12-09 14:42:04.451663

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '322309e9d8da'
down_revision = '028e732d8bfb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('playlists', sa.Column('trigger_upgrade', sa.String(length=250), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('playlists', 'trigger_upgrade')
    # ### end Alembic commands ###
