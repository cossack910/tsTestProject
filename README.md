# typescript

```
cd /src
```

## コンパイル用の設定ファイルを作成

```
tsc –-init
```

## javascript 変換

```
docker exec -it tstestproject tsc
```

## WSL の html を開く

```
explorer.exe file://wsl.localhost/Ubuntu/var/www/tsTestProject/index.html
```

## ウォッチモード

```
docker exec -it tstestproject tsc --watch
```
