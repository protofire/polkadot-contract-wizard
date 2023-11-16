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

> 🚨🚨🚨 It is mandatory to create the `.env` to run the application.

- Clone the repository with the following command and enter the project folder:

    ```bash
    git clone https://github.com/protofire/polkadot-contract-wizard.git && cd polkadot-contract-wizard
    ```

- Init the backend submodule with the following command:

    ```bash
    git submodule update --init
    ```

#### A. With Docker

- ⚠️ Requirements:
  - docker >= 20
  - docker-compose >= 2.15

1. Make sure your daemon `docker` is running in your system.

2. (Optional) Set the environment variables for the container on [dev.docker.env](./.docker/dev.docker.env). These will be used to configure the application.

3. Run the following command to start the container (Will do a build previously in the first run):

    ```bash
    docker-compose --env-file .docker/dev.docker.env up
    ```

4. Your application should now be running on the specified port. You can access it by visiting `localhost:<EXTERNAL_PORT>` (Port 3000 by default) in your browser.

> ✋ Stop the all the running containers with the following command:  
> `docker-compose stop`

#### B. Local Stack

> ⚠️ For the application to function properly on a local machine, it's essential to have the backend up and running in order for the frontend to operate.

> You must rename the env variable NEXT_PUBLIC_BACKEND_API in the .env file as follows: `NEXT_PUBLIC_BACKEND_API=http://127.0.0.1:8000`

#### Backend

- Follow the instructions in the README.md of the [backend](https://github.com/protofire/ink-compiler-be/blob/main/README.md) repository.

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

## License

Copyright 2023 Protofire

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

## Notice of Use

This project includes code from a GPL v3 licensed source called "contracts-ui."

### Original Source

The original source code is available at [contracts-ui repository](https://github.com/paritytech/contracts-ui).

### License

The code from "contracts-ui" is licensed under the GNU General Public License, version 3.0. The full text of the license is available in the [GPL-3.0 License file](https://github.com/paritytech/contracts-ui/blob/master/LICENSE).
