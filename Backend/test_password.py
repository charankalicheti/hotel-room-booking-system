"""
=========================================================
Test Password Hash Utility
Run: python test_password.py
=========================================================
"""

import sys
import os

# Add the Backend folder to path so app imports work
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.utils.password_hash import hash_password, verify_password

print("=" * 50)
print("  Password Hash Utility - Test")
print("=" * 50)

# ----------------------------------------------------------
# Test 1: Normal short password
# ----------------------------------------------------------
print("\n[Test 1] Normal password (short)")
password = "test123"
hashed = hash_password(password)
result = verify_password(password, hashed)
print(f"  Password  : {password}")
print(f"  Hashed    : {hashed[:40]}...")
print(f"  Verified  : {result}")
print(f"  Status    : {'✅ PASS' if result else '❌ FAIL'}")

# ----------------------------------------------------------
# Test 2: Wrong password should return False
# ----------------------------------------------------------
print("\n[Test 2] Wrong password verification")
wrong = "wrongpassword"
result2 = verify_password(wrong, hashed)
print(f"  Password  : {wrong}")
print(f"  Verified  : {result2}")
print(f"  Status    : {'✅ PASS' if not result2 else '❌ FAIL'}")

# ----------------------------------------------------------
# Test 3: Long password (>72 bytes) — the bug case
# ----------------------------------------------------------
print("\n[Test 3] Long password (>72 bytes) - bcrypt 5.x bug case")
long_password = "a" * 100
try:
    hashed_long = hash_password(long_password)
    result3 = verify_password(long_password, hashed_long)
    print(f"  Password  : 'a' x 100 chars")
    print(f"  Hashed    : {hashed_long[:40]}...")
    print(f"  Verified  : {result3}")
    print(f"  Status    : {'✅ PASS' if result3 else '❌ FAIL'}")
except Exception as e:
    print(f"  Status    : ❌ FAIL — {e}")

# ----------------------------------------------------------
# Test 4: Exact 72 byte password
# ----------------------------------------------------------
print("\n[Test 4] Exactly 72 byte password")
exact_password = "b" * 72
try:
    hashed_exact = hash_password(exact_password)
    result4 = verify_password(exact_password, hashed_exact)
    print(f"  Password  : 'b' x 72 chars")
    print(f"  Hashed    : {hashed_exact[:40]}...")
    print(f"  Verified  : {result4}")
    print(f"  Status    : {'✅ PASS' if result4 else '❌ FAIL'}")
except Exception as e:
    print(f"  Status    : ❌ FAIL — {e}")

# ----------------------------------------------------------
# Test 5: Simulate register + login flow
# ----------------------------------------------------------
print("\n[Test 5] Simulate Register → Login flow")
user_password = "MySecurePass@2026"
stored_hash = hash_password(user_password)       # at register
login_check  = verify_password(user_password, stored_hash)   # at login
wrong_check  = verify_password("wrongpass", stored_hash)     # wrong login
print(f"  Register hash     : {stored_hash[:40]}...")
print(f"  Login (correct)   : {login_check}  {'✅' if login_check else '❌'}")
print(f"  Login (wrong)     : {wrong_check}  {'✅' if not wrong_check else '❌'}")

# ----------------------------------------------------------
# Summary
# ----------------------------------------------------------
print("\n" + "=" * 50)
all_pass = result and not result2 and result3 and result4 and login_check and not wrong_check
print(f"  Final Result : {'✅ ALL TESTS PASSED' if all_pass else '❌ SOME TESTS FAILED'}")
print("=" * 50)
