# Polkadot Contract Wizard

## Overview

The Polkadot Contract Wizard is a smart contract creation tool that allows users to create their own smart contracts in minutes. This tool is designed to adhere to the Polkadot Standards (**PSP22**, **PSP34**, and **PSP37**) and provides useful extensions with custom logic such as Ownable, Roles, Mintable, Burnable, Timelock, and Payment Splitter. Additionally, it contains useful macros to simplify the development process such as function modifiers, storage definition, and trait definitions. With the Polkadot Contract Wizard, users can easily create their own smart contracts in just three steps: 1. Choose your contract features, 2. Deploy your smart contract and 3. Use your smart contract.

## Built with

- 📦 NextJS as framework for the application.
- 📘 React framework.
- 🧪 Jest for unit testing.
- 🔍 ESLint for code linting and formating.
- 🐳 Docker for development and testing operations.

## Getting Started

### 🚀 Run app

To run the application it is necessary to copy the environment variables file `.env.example` and paste it as `.env`, in this file you will find environment variables like as the default RPC.

> 🚨🚨🚨 It is necessary to specify the variables int the `.env` to run the application.
>

#### A. With Docker

- ⚠️ Requirements:
  - docker >= 20
  - docker-compose >= 2.15

1. Make sure your daemon `docker` is running in your system.

2. (Optional) Set the environment variables for the container on [dev.docker.env](./.docker/dev.docker.env). These will be used to configure the application.

3. Init the backend submodule with the following command:

    ```bash
    git submodule update --init
    ```

4. Run the following command to start the container (Will do a build previously in the first run):

    ```bash
    docker-compose --env-file .docker/dev.docker.env up
    ```

5. Your application should now be running on the specified port. You can access it by visiting `localhost:<EXTERNAL_PORT>` (Port 3000 by default) in your browser.

> ✋ Stop the all the running containers with the following command:  
> `docker-compose stop`

#### B. Local Stack

#### Frontend

- ⚠️ Requirements:
  - node `^14.18.0` || `^16.14.0` || `>=18.0.0`
  - yarn >= 1.20

1. Open a command-line interface in the application's root directory and install the packages with the command:

    ```bash
    yarn install
    ```

2. To start the app, use:

    ```bash
    yarn dev
    ```

    > This will start a Next.js development server on the default port (3000).

3. Once the development server is running, you can access the application from your web browser at the address [http://localhost:3000](http://localhost:3000).

> ✋ Stop the Server  
> To stop the development server, press `Ctrl + C` in the terminal.

#### Backend

- Follow the instructions in the README.md of the [backend](./ink-compiler-be/README.md) folder.

## License

Copyright 2023 Protofire

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

<http://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
