-- Link "Area" and "Award" under "General Setup" and fix paths to match routes
BEGIN;

-- Ensure General Setup exists (no change if already present)
-- Update Area
UPDATE public.menu_items
SET parent_id = '8a42f537-7c97-495e-9b69-2f77168ddd8e',
    path = '/masterfile/general-setup/area'
WHERE id = '803390e3-ecdf-4323-b52f-a284171136cd';

-- Update Award
UPDATE public.menu_items
SET parent_id = '8a42f537-7c97-495e-9b69-2f77168ddd8e',
    path = '/masterfile/general-setup/award'
WHERE id = 'f9bbfed8-2b2f-4b6c-84f3-3fc3280b5c06';

COMMIT;