!#/bin/bash
set -e
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
sudo tar -xzvf ngrok-v3-stable-linux-amd64.tgz -C /usr/sbin
sudo chmod o+x /usr/sbin/ngrok
mkdir -p $HOME/.ngrok2
cp ngrok.yml $HOME/.ngrok2/ngrok.yml
echo "https://dashboard.ngrok.com/get-started/your-authtoken ... ngrok auth token?"
read line
sed -i "s/NGROK_AUTH_TOKEN/$line/g" $HOME/.ngrok2/ngrok.yml

echo "READY TO USE NGROK!!!"
