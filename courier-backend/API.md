POST /api/auth/register – Register user with role --> Done

POST /api/auth/login – Login and get JWT --> Done

GET /api/auth/me – Get current user profile --> Done

GET /api/users – Get all users (Admin) --> Done

GET /api/users/:id – Get user by ID (Admin) --> Done

DELETE /api/users/:id – Delete user (Admin) --> Done

POST /api/parcels – Book a new parcel

GET /api/parcels – Get list of parcels (role-based)

GET /api/parcels/:id – Get parcel details

PUT /api/parcels/:id – Update parcel (Admin)

DELETE /api/parcels/:id – Cancel/Delete parcel

PATCH /api/parcels/:id/status – Update parcel status (Agent)

POST /api/parcels/:id/location – Update agent location

GET /api/parcels/:id/track – Track parcel location

GET /api/agents/:id/optimized-route – Get optimized delivery route

PATCH /api/parcels/:id/assign-agent – Assign agent to parcel

GET /api/dashboard/metrics – Get parcel metrics (Admin)

GET /api/reports/export – Export report as CSV/PDF

GET /api/my-bookings – Get customer booking history
