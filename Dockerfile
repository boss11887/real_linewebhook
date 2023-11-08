# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
WORKDIR /usr/src/app
COPY . .

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base as install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# copy production dependencies and source code into final image
FROM install as release
COPY --from=install /temp/dev/node_modules node_modules
COPY --from=base /usr/src/app/index.ts .
COPY --from=base /usr/src/app/package.json .
COPY --from=base /usr/src/app/tsconfig.json .
COPY --from=base /usr/src/app/query.ts .

#inject env
ARG HOST
ARG PORT
ARG DATABASE
ARG USERNAME
ARG PASSWORD

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "index.ts" ]
