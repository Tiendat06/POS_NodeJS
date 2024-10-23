Level 1 + 2:
step1: docker-compose up --build
step2: go to http://localhost or http://localhost:80 to see the result
step3: you can delete the app by using "docker-compose down" or stop the app by press ctrl + C

Level 3 with Docker Swarm init:
go to POS_NODEJS folder and following these step:
step1: docker load -i app.tar (load the image)
step2: docker swarm init
step3: docker stack deploy -c docker-stack.yml my-app
step4: docker stack services my-app (this command line to check whether our services are on)
step5: "docker service update --force my-app_app"  (optional if the app keep loading on browser) --> run this command to restart services of the app
step6: enjoy your app with Docker Swarm!!!
step7: you can stop swarm using docker swarm leave --force

**Note** for level3: 
you can scale your app to many replicas by using this: docker service scale my-app_app={number of replica you want} 
  - example: docker service scale my-app_app=10 
