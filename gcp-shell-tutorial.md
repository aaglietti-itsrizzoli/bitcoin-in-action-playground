# Bitcoin in Action playground!!!

Avviando questo tutorial verrai guidato nei primi passi che ti consentiranno di
- accendere nodi Bitcoin
- collegare il tuo portafoglio
- piovono bitcoin!!!

## Install Bitcoin Core

Esegui il seguente snippet per scaricare Bitcoin Core 0.21

```sh
wget https://bitcoincore.org/bin/bitcoin-core-0.21.0/bitcoin-0.21.0-x86_64-linux-gnu.tar.gz && \
tar xzvf bitcoin-0.21.0-x86_64-linux-gnu.tar.gz && \
mv bitcoin-0.21.0/* bitcoin-core && \
rm -Rf bitcoin-0.21.0 && \
rm -Rf bitcoin-0.21.0-x86_64-linux-gnu.tar.gz
```

## Playground bootstrap

```sh
docker-compose pull
```

```sh
docker-compose up
```

Attendere messaggio come descritto al seguente indirizzo

![waiting-for-bitcoind-sync-to-finish](https://github.com/aaglietti-itsrizzoli/bitcoin-in-action-playground/docs/images/waiting-for-bitcoind-sync-to-finish.png "waiting-for-bitcoind-sync-to-finish")


### Bitcoin blockchain explorer

Click <walkthrough-web-preview-icon></walkthrough-web-preview-icon> and change
the preview port to 8094.

If everything is fine you'll see something.

### Mining

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

### Connect your Electrum

Using the ngrok domain and port to connect your Electrum wallet

```terminal
--regtest --oneserver --server {ngrok domain 500001}:{ngrok 50001 port}:t
```

