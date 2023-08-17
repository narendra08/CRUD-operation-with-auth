To start application 
npm start.

If connection to mongo db fails follow below instructions
start docker daemon
docker pull mongo
mkdir mongodb-docker
cd mongodb-docker
docker run -d -p 2717:27017 -v ~/mongodb-docker:/data/db --name mymongo mongo:latest