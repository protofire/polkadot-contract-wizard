# This is a base image to build substrate nodes
FROM docker.io/paritytech/ci-linux:production as builder

WORKDIR /node-template

COPY ./.docker/substrate-node/substrate-contracts-node-linux.tar.gz /tmp/
RUN mkdir /tmp/extracted && tar -xzf /tmp/substrate-contracts-node-linux.tar.gz -C .
RUN rm /tmp/substrate-contracts-node-linux.tar.gz
RUN mv ./artifacts/substrate-contracts-node-linux/substrate-contracts-node ./


# This is the 2nd stage: a very small image where we copy the binary."
FROM --platform=linux/amd64 docker.io/library/ubuntu:20.04
LABEL description="Multistage Docker image for Substrate Node Template" \
  image.type="builder" \
  image.authors="you@email.com" \
  image.vendor="Substrate Developer Hub" \
  image.description="Multistage Docker image for Substrate Node Template" \
  image.source="https://github.com/substrate-developer-hub/substrate-node-template" \
  image.documentation="https://github.com/substrate-developer-hub/substrate-node-template"

# Copy the node binary.
COPY --from=builder /node-template/substrate-contracts-node /usr/local/bin

RUN useradd -m -u 1000 -U -s /bin/sh -d /node-dev node-dev && \
  mkdir -p /chain-data /node-dev/.local/share && \
  chown -R node-dev:node-dev /chain-data && \
  ln -s /chain-data /node-dev/.local/share/substrate-conctracts-node && \
  # unclutter and minimize the attack surface
  rm -rf /usr/bin /usr/sbin && \
  # check if executable works in this container
  /usr/local/bin/substrate-contracts-node --version

USER node-dev

EXPOSE 30333 9933 9944 9615
VOLUME ["/chain-data"]

ENTRYPOINT ["/usr/local/bin/substrate-contracts-node"]
