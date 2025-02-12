FROM node:alpine

WORKDIR /app .

COPY . .

RUN npm i

RUN npx prisma generate

CMD ["sh", "-c", "until nc -z db 3306; do sleep 2; done && npx prisma migrate deploy && npm run dev"]

EXPOSE 3000