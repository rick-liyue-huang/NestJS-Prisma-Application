Docker Prisma Application

1. If you want to run the application in docker you need to install docker and docker-compose, and then in the current project directory, we can create the Dockerfile and Dockerfile.prod files, and run the following commands to create the images and run the the single application:

`docker build -t nestjs-prisma-app .` to create the image

`docker run -p 4000:3001 nestjs-prisma-app` to run the image

`docker build -t nestjs-prisma-app-prod -f Dockerfile.
prod .` to create the production image

`docker run -p 4001:3001 nestjs-prisma-app-prod` to run the production image

2. If you want to run the multi-container application, you need to install docker and docker-compose, and then in the current project directory, we can create the docker-compose.yml and run the following commands to create the images and run the the multi-container application:

`docker-compose up --build` to create the images and containers, notice that the docker container will be synced with the local files, so you can make changes and the container will be updated automatically

`sudo docker-compose -f docker-compose.prod.yml up --build`

`sudo docker-compose -f docker-compose.prod.yml up --build -d` to create the production images and containers, here the containers will be detached from the terminal
