from app.database.database import engine
from app.database.models import Base

print("Creating tables...")

try:
    Base.metadata.create_all(bind=engine)
    print("✅ Tables created successfully!")
except Exception as e:
    print(f"❌ Error: {e}")