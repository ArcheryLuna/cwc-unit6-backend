# cwc-unit6-backend

## Prerequirements

you must have nodejs 20 or later installed on your computer and have typescript installed with nodemon as globals. If you dont run these commands. If you need to install nodejs here are the steps for your OS of choice

#### Macos

Best way is to use homebrew so install homebrew by running these commands

```bash
xcode-select --install
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

Then just run this command to install nodejs

```bash
brew install node
```
Then check if nodejs is installed by running `node --version` if it responds with `v21.x.x` it means you have the current version. Never run any npm commands in sudo or it will break npm.

#### Windows

To install nodejs on windows just go to the [nodejs website](https://nodejs.org/en) and click on current and follow the installer.

#### Linux

To install on linux follow this guide on the [nodejs website](https://nodejs.org/en/download/package-manager).

#### Setup the project

Run the following command in the terminal.
```bash
npm i -g npm@latest nodemon typescript ts-node
cp ./.example.env ./.env
```


Then to start the code run the following commands. This may throw errors but that may be because your `.env` file is not setup yet so just set that up and it should fix.

```bash
npm i
npm run dev
```
