FROM mcr.microsoft.com/devcontainers/typescript-node:20

# pin bun version
ARG BUN_VERSION=1.0.30

# add bun bin to path
ENV PATH "/home/node/.bun/bin:${PATH}"

# set node user/group
USER 1000:1000

# workdir
WORKDIR /workspaces/react-template

# install bun
RUN curl -fsSL https://bun.sh/install | bash -s "bun-v${BUN_VERSION}"

# ports
EXPOSE 4173 5173
