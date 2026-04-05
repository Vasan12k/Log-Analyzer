log_file = "logs.txt"

with open(log_file, "r") as file:
    for line in file:
        
        if "401" in line:
            print("⚠️ Failed login detected:", line)

        if "admin" in line:
            print("🚨 Admin access attempt:", line)

        if "OR 1=1" in line:
            print("💀 SQL Injection attempt:", line)