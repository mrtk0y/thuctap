# Thuc-Tap
Hallo, writing in Container
## Project setup

```
Install Mongo Community Edition : https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-ubuntu/
```
```
Install Nodemon : sudo npm install -g nodemon
```
```
Use: service mongod start + nodemon to run Appplication
```

## Docker Setup (cd to folder contain)
```
docker container run -it --name <CONTAINER> --volume ~/Desktop/docker-express:/<DES>  <BASEIMAGE>
```
sudo docker image build --tag docker-express-1.0.0 .
sudo docker container run -it --name docker-express-container --volume ~/Desktop/thuctap:/ThucTap docker-express-1.0.0
