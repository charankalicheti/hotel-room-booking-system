import argparse
from sqlalchemy import text
from app.database import engine

TABLES = [
    'admins',
    'customers',
    'room',
    'reservations',
]

SQL_TEMPLATE = """
SELECT setval(
    pg_get_serial_sequence(:table_name, 'id'),
    COALESCE(MAX(id), 1),
    CASE WHEN MAX(id) IS NULL THEN false ELSE true END
)
FROM {table};
"""

RESTART_TEMPLATE = """
SELECT setval(
    pg_get_serial_sequence(:table_name, 'id'),
    1,
    false
)
"""


def reset_sequences():
    with engine.begin() as conn:
        for table in TABLES:
            stmt = text(SQL_TEMPLATE.format(table=table))
            conn.execute(stmt, {'table_name': table})
            print(f"Reset sequence for table '{table}'")


def restart_identity_for_empty_tables():
    with engine.begin() as conn:
        for table in TABLES:
            count = conn.execute(text(f"SELECT COUNT(*) FROM {table}"))
            row_count = count.scalar()
            if row_count == 0:
                stmt = text(RESTART_TEMPLATE)
                conn.execute(stmt, {'table_name': table})
                print(f"Restarted sequence at 1 for empty table '{table}'")
            else:
                print(f"Skipped '{table}' because it contains {row_count} rows")


def truncate_and_restart():
    with engine.begin() as conn:
        conn.execute(text(
            'TRUNCATE TABLE admins, customers, room, reservations RESTART IDENTITY CASCADE'
        ))
        print('Truncated all tables and restarted identity counters')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Reset Postgres ID sequences for app tables.')
    parser.add_argument('--truncate', action='store_true', help='Truncate all tables and restart identity counters')
    parser.add_argument('--empty-only', action='store_true', help='Restart identity only for empty tables')
    args = parser.parse_args()

    if args.truncate:
        truncate_and_restart()
    elif args.empty_only:
        restart_identity_for_empty_tables()
    else:
        reset_sequences()
