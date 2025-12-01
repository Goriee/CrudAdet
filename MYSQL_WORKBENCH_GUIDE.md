# MySQL Workbench Migration Guide

## ✅ How to Run the Migration in MySQL Workbench

### Option 1: Using the Visual Interface (Recommended for Beginners)

1. **Open MySQL Workbench** and connect to your Render MySQL database

2. **Select the Database:**
   - Look at the left sidebar under "SCHEMAS"
   - **Double-click** on your database name (usually `defaultdb`)
   - It should become **bold** when selected

3. **Open the Migration File:**
   - File → Open SQL Script
   - Navigate to: `migration-mysql-workbench.sql`
   - Click Open

4. **Execute the Migration:**
   - Click the **⚡ lightning bolt icon** (Execute)
   - Or press `Ctrl+Shift+Enter`

5. **Verify Success:**
   - Check the "Output" panel at the bottom
   - Should see: "2 row(s) affected" or similar
   - Refresh the SCHEMAS panel (right-click → Refresh All)
   - You should now see `folders` and `files` tables under your database

---

### Option 2: Using the SQL Editor (For Advanced Users)

1. **Connect to your database** in MySQL Workbench

2. **Select the database** by double-clicking it in the SCHEMAS panel

3. **Copy and paste** the contents of `migration-mysql-workbench.sql` into a new query tab

4. **Execute line by line** (recommended) or **all at once**:
   - Line by line: Place cursor on each line and press `Ctrl+Enter`
   - All at once: Select all (`Ctrl+A`) and press `Ctrl+Shift+Enter`

5. **Check results** in the Output panel

---

### Option 3: Command Line (If GUI doesn't work)

If MySQL Workbench gives you issues, use the command line:

```bash
# Connect to your Render MySQL database
mysql -h <your-mysql-host> -u <your-username> -p

# Enter password when prompted

# Select database
USE defaultdb;

# Then copy-paste the table creation statements one by one
```

---

## 🔧 Troubleshooting

### Error: "No database selected"
**Solution:** Double-click your database name (usually `defaultdb`) in the left SCHEMAS panel before running the script.

### Error: "Table 'folders' already exists"
**Solution:** The table already exists! This means you've already run the migration. You can verify by:
```sql
SHOW TABLES;
DESCRIBE folders;
DESCRIBE files;
```

### Error: "Can't connect to MySQL server"
**Solution:** 
1. Check your connection details in MySQL Workbench
2. Make sure you're using the correct host, port, username, and password from Render
3. Check if SSL is required (Render usually requires SSL)

### Error: "Foreign key constraint fails"
**Solution:** Make sure the `users` table exists first. If not, you need to run your initial database migration.

---

## ✅ Verification Steps

After running the migration, verify it worked:

```sql
-- Check if tables exist
SHOW TABLES;

-- Check folders table structure
DESCRIBE folders;

-- Check files table structure
DESCRIBE files;

-- Check for any data (should be empty after migration)
SELECT COUNT(*) FROM folders;
SELECT COUNT(*) FROM files;
```

**Expected Output:**
- `SHOW TABLES;` should show: `users`, `folders`, `files` (and possibly `positions` if you didn't drop it)
- `DESCRIBE` commands should show the table structure
- `COUNT` queries should return `0` (no data yet)

---

## 🎯 What This Migration Does

✅ Creates `folders` table for folder hierarchy  
✅ Creates `files` table for file metadata storage  
✅ Sets up foreign keys to link files/folders with users  
✅ Adds indexes for performance optimization  
✅ Adds soft-delete support (`deleted_at` column)  

**Note:** Physical files will be stored in the `uploads/` directory on the server, but metadata (filename, size, mime type, etc.) is stored in the database.

---

## 🚀 Next Steps

Once the migration is successful:

1. ✅ **Backend is already deployed** (auto-deployed from GitHub)
2. 📤 **Deploy Frontend to Vercel** (see `DEPLOYMENT_GUIDE.md`)
3. 🧪 **Test the application** - Upload files, create folders, etc.

---

## 📞 Need Help?

If you encounter any issues:
1. Check the error message in the Output panel
2. Verify you're connected to the correct database
3. Make sure the `users` table exists (required for foreign keys)
4. Try running statements one by one instead of all at once

Good luck! 🎉
