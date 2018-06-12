FROM hkube/base-node:v1.0.0
LABEL maintainer="maty zisserman"
WORKDIR /mondial
ADD . .
RUN npm install
ENTRYPOINT [ "npm","start" ]
