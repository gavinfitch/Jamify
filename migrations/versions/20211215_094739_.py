"""empty message

Revision ID: 253d3fdee8bc
Revises: 7b8f62b9015b
Create Date: 2021-12-15 09:47:39.041678

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '253d3fdee8bc'
down_revision = '7b8f62b9015b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('songs', 'song_s3Name')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('songs', sa.Column('song_s3Name', sa.VARCHAR(length=2000), autoincrement=False, nullable=False))
    # ### end Alembic commands ###
