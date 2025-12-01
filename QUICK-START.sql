-- QUICK START MIGRATION - Run this in MySQL Workbench
-- Double-click your database in the left sidebar FIRST, then run this!

USE defaultdb;

-- Step 1: Create folders table
CREATE TABLE IF NOT EXISTS folders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  parent_id INT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES folders(id) ON DELETE CASCADE,
  INDEX idx_user_parent (user_id, parent_id),
  INDEX idx_deleted (deleted_at)
);

-- Step 2: Create files table
CREATE TABLE IF NOT EXISTS files (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  folder_id INT NULL,
  original_name VARCHAR(255) NOT NULL,
  stored_name VARCHAR(255) NOT NULL UNIQUE,
  mime_type VARCHAR(100) NOT NULL,
  size BIGINT NOT NULL,
  path VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE CASCADE,
  INDEX idx_user_folder (user_id, folder_id),
  INDEX idx_deleted (deleted_at)
);

-- Step 3: Verify it worked
SHOW TABLES;

-- ✅ Done! You should see 'folders' and 'files' in the output.
-- The storage_quota column is optional - skip it for now if it causes errors.
