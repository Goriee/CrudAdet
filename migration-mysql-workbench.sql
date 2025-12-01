-- Cloud Storage Migration (MySQL Workbench Compatible)
-- This script creates the necessary tables for file storage functionality
-- Version: Compatible with MySQL Workbench and standard MySQL clients

-- ========================================
-- STEP 1: Select your database
-- ========================================
-- Option 1: Double-click your database name in the SCHEMAS panel (left sidebar)
-- Option 2: Uncomment and run this line (change 'defaultdb' if needed):
USE defaultdb;

-- ========================================
-- STEP 2: Create folders table
-- ========================================
CREATE TABLE folders (
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

-- ========================================
-- STEP 3: Create files table
-- ========================================
CREATE TABLE files (
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

-- ========================================
-- STEP 4: Add storage quota to users (optional)
-- ========================================
-- Uncomment the line below if you want to add storage quota tracking to users table
-- ALTER TABLE users ADD COLUMN storage_quota BIGINT DEFAULT 104857600 COMMENT '100MB in bytes';

-- ========================================
-- STEP 5: Cleanup old positions table (optional)
-- ========================================
-- ONLY uncomment this if you want to completely remove the old positions functionality
-- DROP TABLE IF EXISTS positions;

-- ========================================
-- Verification Queries
-- ========================================
-- Run these to verify the migration was successful:

-- Check folders table structure
-- DESCRIBE folders;

-- Check files table structure
-- DESCRIBE files;

-- Check for any existing data
-- SELECT COUNT(*) as folder_count FROM folders;
-- SELECT COUNT(*) as file_count FROM files;

-- ========================================
-- Migration Complete! ✅
-- ========================================
