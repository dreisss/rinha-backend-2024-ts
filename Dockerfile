FROM oven/bun:1 
WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile --production
RUN bun prisma generate
RUN bun run src/http/server.ts

EXPOSE 3000
ENTRYPOINT [ "server" ]
