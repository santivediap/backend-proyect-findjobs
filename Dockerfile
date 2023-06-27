FROM ghcr.io/puppeteer/puppeteer:19.7.2

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
    PG_USER=kierabsa
    PG_HOST=lucky.db.elephantsql.com
    PG_DATABASE=kierabsa
    PG_PASSWORD=JSYV7T68JfWBLyTV2onrJCkMg_9Kkjd8
    MG_PASSWORD=I0fz3Z6KJB4JdSeC
    ULTRA_SECRET_KEY=tortilla

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
CMD [ "node", "app.js" ]