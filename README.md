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

3. After install prisma, and run `npx prisma init` and re-run `sudo docker-compose up --build` to create prisma.schema file. Then you can run `npx prisma studio` to see the database and the tables. At last, we need to run `npx prisma migrate dev --name init_db` to generate the 'migration.sql', and then run `npx prisma generate` or `npx prisma db push` on the docker api terminal to create the tables in the database.

4. And then, we can enter the docker container runtime and interact with the application, by running the following command: `docker exec -it <container> bash`, and then run `apt-get update` `apt-get install vim`

5. When project uses Prisma and connect it with mysql in docker, we need run `npx prisma init` and `npx prisma generate` tot create the local PrismaClient, and then run `npx prisma migrate dev --name xxx` and `npx prisma db push` in the docker api terminal to create the tables in the database. And then we can run `npx prisma studio` to see the database and the tables.
