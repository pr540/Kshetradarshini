import uvicorn
import subprocess
import sys
import os

def run():
    print("🚀 Starting Kshetradarshini Backend...")
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Run database initialization
    print("📅 Initializing Database...")
    subprocess.run([sys.executable, "create_db.py"])
    
    # Run seeder
    print("🌱 Seeding Data...")
    subprocess.run([sys.executable, "seed.py"])
    
    # Start FastAPI
    print("📡 Launching API on http://localhost:8082")
    uvicorn.run("main:app", host="0.0.0.0", port=8082, reload=True)

if __name__ == "__main__":
    run()
