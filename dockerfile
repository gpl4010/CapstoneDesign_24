FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8082

CMD ["npm", "start"]

#RUN sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8082