from app.database import engine
from sqlalchemy import text

SQL = '''
ALTER TABLE reservations
ADD COLUMN IF NOT EXISTS customer_name varchar(100) DEFAULT 'Guest';

-- Make column NOT NULL if it's currently nullable and has defaults set
ALTER TABLE reservations
ALTER COLUMN customer_name SET NOT NULL;

-- Optionally remove default
ALTER TABLE reservations
ALTER COLUMN customer_name DROP DEFAULT;
'''

if __name__ == '__main__':
    with engine.begin() as conn:
        conn.execute(text(SQL))
        print('Ensured reservations.customer_name exists and is NOT NULL')
