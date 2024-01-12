# Bitcoin in Action playground!!!

## Benvenuto!!!

Avviando questo tutorial verrai guidato nei primi passi che ti consentiranno di
- Scaricare ed installare la versione 0.21 di Bitcoin Core
- Accendere due nodi Bitcoin e un blockchain explorer
- Piovono bitcoinsss!!!
- Connettere altri nodi Bitcoin

## Scaricare ed installare la versione 0.21 di Bitcoin Core

Esegui il seguente snippet per scaricare Bitcoin Core 0.21

```sh
wget https://bitcoincore.org/bin/bitcoin-core-0.21.0/bitcoin-0.21.0-x86_64-linux-gnu.tar.gz && \
tar xzvf bitcoin-0.21.0-x86_64-linux-gnu.tar.gz && \
mv bitcoin-0.21.0/* bitcoin-core && \
rm -Rf bitcoin-0.21.0 && \
rm -Rf bitcoin-0.21.0-x86_64-linux-gnu.tar.gz
```

## Accendere due nodi Bitcoin e un blockchain explorer

```sh
docker-compose pull
```

```sh
docker-compose up
```

Attendere messaggio come descritto al seguente indirizzo

![waiting-for-bitcoind-sync-to-finish](https://raw.githubusercontent.com/aaglietti-itsrizzoli/bitcoin-in-action-playground/master/docs/images/waiting-for-bitcoind-sync-to-finish.png "waiting-for-bitcoind-sync-to-finish")

### Block explorer

Click <walkthrough-web-preview-icon></walkthrough-web-preview-icon> and change
the preview port to 8094.

### Bitcoin full node API
Click <walkthrough-web-preview-icon></walkthrough-web-preview-icon> and change
the preview port to 18443.

*You'll got a 404*

- Change the last part of URL with `/rest/chaininfo.json` to see the blockchain state.
- Change the last part of URL with `/rest/mempool/info.json` to see the mempool state.

## Piovono bitcoinsss!!!

<walkthrough-open-cloud-shell-button></walkthrough-open-cloud-shell-button> to
open a new shell leaving docker-compose running

```sh
cd cloudshell_open/bitcoin-in-action-playground
```

```sh
docker exec -ti hansel bash
```

```sh
bitcoin-cli createwallet "il_mio_primo_wallet"
```

```sh
bitcoin-cli generatetoaddress 1 $(bitcoin-cli getnewaddress)
```

Verificare i fondi

```sh
bitcoin-cli getwalletinfo
```

## Connettere altri nodi Bitcoin

### Rendere raggiungibile il tuo nodo "hansel"

<walkthrough-open-cloud-shell-button></walkthrough-open-cloud-shell-button>

```sh
cd cloudshell_open/bitcoin-in-action-playground
```

```sh
./gcp-shell-install-ngrok.sh
```

```sh
ngrok start hansel_18444
```

### Aggiungere altri nodi

<walkthrough-open-cloud-shell-button></walkthrough-open-cloud-shell-button>

```sh
cd cloudshell_open/bitcoin-in-action-playground
```

```sh
docker exec -ti hansel bash
```

```sh
bitcoin-cli addnode <DOMINIO:PORTA DEL NODO BITCOIN DA AGGIUNGERE> add
```

```sh
bitcoin-cli getaddednodeinfo
```

Generare un nuovo indirizzo e condividerlo in chat!

```sh
bitcoin-cli getnewaddress
```

### Minare 100 blocchi

Altrimenti i fondi non sono maturi perche' provenienti tutti da coinbase

```sh
bitcoin-cli generatetoaddress 100 $(bitcoin-cli getnewaddress)
```

```sh
bitcoin-cli sendtoaddress <INDIRIZZO DEL DESTINATARIO> 5
```

We can verify the mempool is working

```sh
bitcoin-cli getmempoolinfo
```

```sh
bitcoin-cli getrawmempool
```

also from `/rest/mempool/contents.json`

mine one extra block to confirm the transaction that is in the mempool

```sh
bitcoin-cli generatetoaddress 1 $(bitcoin-cli getnewaddress)
```
