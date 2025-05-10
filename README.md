

## Build images

```
docker login
```

build and push:
```
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --push \
  -t andrearettaroli/test:latest \
  .
```

image:
```
docker.io/andrearettaroli/test:latest
```

pull latest image:
```
docker pull andrearettaroli/test:latest
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
docker run --platform linux/amd64 --volume .:/src -it andrearettaroli/test:latest oasis rofl build
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


//TODO for feedback: 
guide point on setup miss all the wallet creation part. and eventually the part to remove the image.


