-- Cloud Storage Migration - SAFE VERSION
-- This version checks for existing columns/tables before creating them

-- Select the database
USE defaultdb;

-- ========================================
-- Create folders table
-- ========================================
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

-- ========================================
-- Create files table
-- ========================================
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

-- ========================================
-- Add storage quota column (if it doesn't exist)
-- ========================================
-- This uses a stored procedure to safely add the column
DELIMITER $$

CREATE PROCEDURE AddStorageQuotaColumn()
BEGIN
  -- Check if column exists
  IF NOT EXISTS (
    SELECT * FROM information_schema.COLUMNS 
    WHERE TABLE_SCHEMA = 'defaultdb' 
    AND TABLE_NAME = 'users' 
    AND COLUMN_NAME = 'storage_quota'
  ) THEN
    -- Add the column if it doesn't exist
    ALTER TABLE users ADD COLUMN storage_quota BIGINT DEFAULT 104857600 COMMENT '100MB in bytes';
  END IF;
END$$

DELIMITER ;

-- Execute the procedure
CALL AddStorageQuotaColumn();

-- Clean up: drop the procedure
DROP PROCEDURE IF EXISTS AddStorageQuotaColumn;

-- ========================================
-- Verification
-- ========================================
-- Run these to verify:
SELECT 'Migration completed successfully!' AS Status;
SHOW TABLES;
