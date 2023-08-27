Installation Steps
Install the dependencies npm install

Run the server with npm run dev and visit http://localhost:8000/

Localhost Links

The Lidar task endpoints are:

Get all task
GET http://localhost:8000/api/lidar

Get task detail by pid
GET http://localhost:8000/api/lidar/:pid

Raise Request
POST http://localhost:8000/api/lidar

Download Task
Gte http://localhost:8000/api/lidar/download/:pid

Cancel task
DELETE http://localhost:8000/api/lidar/:pid