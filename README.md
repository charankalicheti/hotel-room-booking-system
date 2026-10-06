**to run backend :**

cd ~/hotel-room-booking-system/Backend
source venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000

Browser : http://52.90.235.22:8000

**To run Frontend :**

cd ~/hotel-room-booking-system/Frontend
source ../Backend/venv/bin/activate
serve -s dist -l 3000

Browser : http://52.90.235.22:3000

**Database :**
RDS need to run independently
