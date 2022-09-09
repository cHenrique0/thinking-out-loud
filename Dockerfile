# syntax=docker/dockerfile:1

FROM node:lts-alpine
ENV NODE_ENV=production
RUN addgroup app
RUN adduser -S app --ingroup=app
WORKDIR /home/app/thinking-out-loud
COPY . .
RUN npm install -g npm@latest
RUN npm install --omit=dev
COPY --chown=app:app . /home/app/thinking-out-loud
USER app
EXPOSE 3000
CMD npm run start