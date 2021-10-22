
FROM zodern/meteor:root
COPY --chown=app:app /bundle  /built_app
RUN apt-get update && apt-get install -y imagemagick
RUN cd /built_app/programs/server && npm install
