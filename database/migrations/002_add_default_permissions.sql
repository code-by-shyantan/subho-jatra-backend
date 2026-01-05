-- This migration does NOT alter schema; it documents default permissions.
-- Managers will store permissions as JSONB in users.permissions.
-- Example structure:
-- {
--   "logbook_add": true,
--   "expense_add": true,
--   "same_day_edit": false,
--   "salary_mark_paid": false,
--   "govt_print": false
-- }

-- No-op migration for documentation / versioning.
SELECT 1;
