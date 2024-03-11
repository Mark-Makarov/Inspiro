FROM node:20-alpine as builder
WORKDIR /app/

COPY package.json yarn.lock ./

RUN yarn install --immutable

FROM node:20
WORKDIR /app/
COPY                package.json yarn.lock  ./
COPY --from=builder /app/node_modules/ ./node_modules/
COPY . .

EXPOSE 3457
ENV NODE_ENV production
ENV PORT 3457
ENV LIVEBLOCKS_API_KEY=$LIVEBLOCKS_API_KEY
RUN echo $LIVEBLOCKS_API_KEY

RUN yarn build
