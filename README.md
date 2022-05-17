<img src="https://img.shields.io/npm/v/quasar-ui-linkage-cms-ui.svg?label=quasar-ui-linkage-cms-ui">
<img src="https://img.shields.io/npm/v/quasar-app-extension-linkage-cms-ui.svg?label=quasar-app-extension-linkage-cms-ui">

Compatible with Quasar UI v2 and Vue 3.

組件庫目前仍以 v1 為主要版本，如果需要安裝 [v2](https://github.com/LinkageRetail/quasar-app-extension-boilerplate/tree/v2) 版本，請指定版本：

`quasar ext add linkage-cms-ui@2`

# 目錄結構

- [/ui](ui) - standalone npm package
- [/app-extension](app-extension) - Quasar app extension

## 安裝套件

```sh
cd ui && yarn
```

```sh
cd ui && yarn build
```

## 啟動專案

```sh
cd ui && yarn dev
```

## 發行 UI 庫

- 專案發行需要分別到 `app-extension`, `ui` 兩個目錄進行 publish
- 請確認發行前的 `package.json` 版本

```sh
cd ./app-extension && npm publish
```

```sh
cd ./ui && npm run build && npm publish
```

完成發行後可使用 `quasar ext add` 進行安裝

```sh
quasar ext add linkage-cms-ui
```

# Donate

If you appreciate the work that went into this project, please consider [donating to Quasar](https://donate.quasar.dev).

# License

MIT (c) Robby <ta7382@gmail.com>
