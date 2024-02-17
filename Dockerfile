FROM imbios/bun-node
WORKDIR /app

COPY bun.lockb .
COPY package.json . 
RUN bun install --frozen-lockfile --production

COPY . .
RUN bun prisma generate

EXPOSE 3000
ENTRYPOINT [ "bun", "serve" ]
