import json
import urllib.request
import urllib.error

BASE = 'http://127.0.0.1:8000'

try:
    print('Fetching rooms...')
    resp = urllib.request.urlopen(f'{BASE}/rooms/')
    rooms = json.load(resp)
    print('Rooms count:', len(rooms))
    if not rooms:
        print('No rooms available to test booking. Create a room first.')
        raise SystemExit(1)

    room = rooms[0]
    room_number = room.get('room_number') or room.get('room_number')
    print('Using room_number:', room_number)

    payload = {
        'customer_name': 'Test User',
        'room_number': room_number,
        'check_in': '2026-07-10',
        'check_out': '2026-07-12',
        'guests': 1
    }

    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(f'{BASE}/bookings', data=data, headers={'Content-Type': 'application/json'}, method='POST')
    resp = urllib.request.urlopen(req)
    body = resp.read().decode('utf-8')
    print('Status:', resp.getcode())
    print('Response:', body)

except urllib.error.HTTPError as e:
    print('HTTP Error:', e.code)
    try:
        print(e.read().decode())
    except Exception:
        pass
except Exception as exc:
    print('Error:', exc)
