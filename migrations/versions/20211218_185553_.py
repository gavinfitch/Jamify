"""empty message

Revision ID: bb1795e202ed
Revises: 7edf34aa1885
Create Date: 2021-12-18 18:55:53.856785

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bb1795e202ed'
down_revision = '7edf34aa1885'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('library_songs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('userId', sa.Integer(), nullable=True),
    sa.Column('songId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['songId'], ['songs.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('library_songs')
    # ### end Alembic commands ###
