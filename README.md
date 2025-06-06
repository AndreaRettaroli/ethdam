## Guide feedback

https://github.com/oasisprotocol/oasis-sdk/pull/2213

https://github.com/elizaOS/eliza/issues/4528

## Build images


build and push:
```
docker compose build
```

push images:
```
docker compose push
```

pull latest image:
```
docker pull andrearettaroli/test:latest
```

or docker build gh image
```
docker build -t ghcr.io/andrearettaroli/ethdam:latest .
```

docker push gh image
```
docker push ghcr.io/andrearettaroli/ethdam:latest  
```

## Rofl setup:

1. create oasis wallet
``` 
oasis wallet create <wallet-name>
```
2. get wallet address
```
oasis wallet show <wallet-name>
```

result: 

```
Name:             andrea
Kind:             file (ed25519-adr8:0)
Public Key:       kJPqqrnGf7WO61YZQAMV+tNsOXVx7r5MuA+N0wNKZlc=
Native address:   oasis1qrndplkvklx8pjcd7cz37edapyagcarwsc05ejre
```

3. get faucet to your wallet address:
 
https://faucet.testnet.oasis.io/


4. init rofl and create app
```
oasis rofl init
oasis rofl create --network testnet --account <wallet-name>
```

result:
```
Created ROFL app: rofl1qq3tue6d0373mhpnd4ftt724ttapjdmvqs25s048
```
5. 
build rofl image on MacOS:
```
docker run --platform linux/amd64 --volume .:/src -it ghcr.io/oasisprotocol/rofl-dev:main oasis rofl build
```

6. setup secrets:
```
echo -n "$<secret-name>" | oasis rofl secret set <secret-name> -
```
7. update rofl:
```
oasis rofl update
```

8. deploy rofl:
```
oasis rofl deploy
```

9. tx result
```
9ecf7f1825aa48b388183f1edc618a162ae959a8901aa64a5c5fd3879c4aa8b8
```


//TODO for feedback: 
guide point on setup miss all the wallet creation part. and eventually the part to remove the image.


