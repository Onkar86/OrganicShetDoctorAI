import sqlite3
import os

db_path = "db/organic_shet.db"
sql_part1 = "db/bulk_insert_25.sql"
sql_part2 = "db/bulk_insert_25_part2.sql"

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    print("🔄 Loading SQL Part 1...")
    with open(sql_part1, 'r', encoding='utf-8') as f:
        sql_commands = f.read()
    
    # Execute Part 1
    cursor.executescript(sql_commands)
    conn.commit()
    print("✅ Part 1 complete: 10 problems + 20 solutions")
    
    print("\n🔄 Loading SQL Part 2...")
    with open(sql_part2, 'r', encoding='utf-8') as f:
        sql_commands2 = f.read()
    
    # Execute Part 2
    cursor.executescript(sql_commands2)
    conn.commit()
    print("✅ Part 2 complete: 15 problems + 30 solutions")
    
    # Count records
    cursor.execute("SELECT COUNT(*) FROM problem")
    problem_count = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM organic_solution")
    solution_count = cursor.fetchone()[0]
    
    print(f"\n📊 Database Status:")
    print(f"   ✅ Total Problems: {problem_count}")
    print(f"   ✅ Total Solutions: {solution_count}")
    print(f"   ✅ Average Solutions per Problem: {solution_count // problem_count if problem_count > 0 else 0}")
    
    conn.close()
    print("\n✅ DATABASE COMPLETELY LOADED - 25 समस्या + 50 उपाय 🌾")
    
except Exception as e:
    print(f"❌ Error: {e}")
