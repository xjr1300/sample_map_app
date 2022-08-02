# React開発環境テンプレートの構築

## Node.js

### anyenvとnodenvのインストール

`nodenv`で`node.js`を管理するため、`anyenv`と`nodenv`をインストールする。

```sh
brew install anyenv
echo 'eval "$(anyenv init -)"' >> ~/.zshrc
exec $SHELL -l
anyenv install nodenv
exec $SHELL -l
```

### anyenvとnodenvのプラグインのインストール

```sh
mkdir -p $(anyenv root)/plugins
git clone https://github.com/znz/anyenv-update.git $(anyenv root)/plugins/anyenv-update
mkdir -p "$(nodenv root)"/plugins
git clone https://github.com/nodenv/nodenv-default-packages.git "$(nodenv root)/plugins/nodenv-default-packages"
vi $(nodenv root)/default-packages
```

`$(nodenv root)/default-packages`ファイルの内容は以下の通り。

```text
yarn
typescript
ts-node
typesync
```

### Node.jsのインストール

インストール可能な`Node.js`のバージョンを確認して、インストールするとともに、デフォルトで使用する`Node.js`のバージョンを指定する。

```sh
nodenv install -l           # インストール可能なバージョンを確認
nodenv install <version>    # 指定したバージョンをインストール
nodenv global <version>     # 指定したバージョンをデフォルトに設定
```

## Reactプロジェクトの作成

`React`プロジェクトを作成して、パッケージを最新にする。

```sh
npx create-react-app <app name> --template=typescript   # プロジェクトを作成
cd <app name>
yarn    # パッケージをインストール
yarn upgrade-interactive --latest   # パッケージを最新にするか確認しながら更新
yarn upgrade typescript@latest  # typescriptを最新に更新
```

## ESLintの設定

`eslint`は`create-react-app`によって、すでにインストールされている。

### ESLintの初期化

```sh
yarn add --dev @eslint/create-config
yarn eslint --init
? How would you like to use ESLint?
❯ To check syntax, find problems, and enforce code style
? What type of modules does your project use?
❯ JavaScript modules (import/export)
? Which framework does your project use?
❯ React
? Does your project use TypeScript? › Yes
? Where does your code run?
✔ Browser
? How would you like to define a style for your project?
❯ Use a popular style guide
? Which style guide do you want to follow?
❯ Airbnb: https://github.com/airbnb/javascript
? What format do you want your config file to be in?
❯ JavaScript
? Would you like to install them now? › Yes
? Which package manager do you want to use?
❯ yarn
```

### ESLintプラグインなどのインストール

```sh
# ESLintプラグインのインストール
yarn add --dev eslint-plugin-react @typescript-eslint/eslint-plugin  eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y  eslint-plugin-react-hooks @typescript-eslint/parser eslint-plugin-react-prefer-function-component eslint-plugin-prefer-arrow
# prettierのインストール
yarn add --dev prettier eslint-config-prettier
# stylelintのインストール
yarn add --dev stylelint stylelint-config-standard stylelint-order stylelint-config-recess-order
# 型定義のインストール
typesync
yarn
```

### Git Hooks

`git`の`commit`コマンドを実行した時、コミット前にリンターでコードを修正するように設定する。

#### simple-git-hooksのインストール

```sh
yarn add -D simple-git-hooks lint-staged
```

#### package.jsonの編集

`package.json`に以下を追加する。

```json
  "simple-git-hooks": {
    "pre-commit": "npx lint-staged"
  },
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": [
      "prettier --write --loglevel=error",
      "eslint --fix --quiet"
    ],
    "src/**/*.{css,less,sass,scss}": [
      "stylelint --fix --quiet"
    ],
    "{public,src}/**/*.{html,gql,graphql,json}": [
      "prettier --write --loglevel=error"
    ]
  }
```

#### simple-git-hooksの実行

以下のコマンドを実行すると、`git`のコミット前に、`npx lint-staged`が実行されて、リンターが実行される。

```sh
npx simple-git-hooks
```

### package.jsonの編集

`package.json`の`scripts`を以下に変更する。

```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "fix": "npm run -s format && npm run -s lint:fix",
    "format": "prettier --write --loglevel=warn '{public,src}/**/*.{js,jsx,ts,tsx,html,gql,graphql,json}'",
    "lint": "npm run -s lint:style; npm run -s lint:es",
    "lint:fix": "npm run -s lint:style:fix && npm run -s lint:es:fix",
    "lint:es": "eslint 'src/**/*.{js,jsx,ts,tsx}'",
    "lint:es:fix": "eslint --fix 'src/**/*.{js,jsx,ts,tsx}'",
    "lint:conflict": "npx eslint-config-prettier .eslintrc.js",
    "lint:style": "stylelint 'src/**/*.{css,less,sass,scss}'",
    "lint:style:fix": "stylelint --fix 'src/**/*.{css,less,sass,scss}'",
    "preinstall": "typesync || :",
    "prepare": "simple-git-hooks > /dev/null"
  },
```

### .eslintrc.js

`eslintrc.js`ファイルをリポジトリの通り作成する。

### .eslintignore

`.eslintignore`ファイルをリポジトリの通り作成する。

### .prettierrc.json

`.prettierrc.json`ファイルをリポジトリの通り作成する。

### .stylelintrc.js

`.stylelintrc.js`をリポジトリの通り作成する。

### tsconfig.eslint.json

`tsconfig.eslint.json`ファイルをリポジトリの通り作成する。

## Visual Studio Codeの設定

`Visual Studio Code`のワークスペース設定ファイルをリポジトリの通り作成する。

```sh
mkdir .vscode
vi .vscode/settings.json
```

## React開発環境の構築

```bash
git clone https://github.com/xjr1300/react18_template.git
mv react18_template <project_name>
cd <project_name>
yarn
typesync
rm -rf .git
git init
npx simple-git-hooks
git add --all
git commit -m '初期コミット'
```
