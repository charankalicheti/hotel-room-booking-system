from app.utils.password_hash import hash_password

password = "Admin@123"

hashed = hash_password(password)

print("\nGenerated Password Hash:\n")
print(hashed)