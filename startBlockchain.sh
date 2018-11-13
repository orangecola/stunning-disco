#!/bin/bash
/home/id2020/fabric-dev-servers/startFabric.sh
/home/id2020/fabric-dev-servers/createPeerAdminCard.sh
cd /home/id2020/id2020/blockchain
composer network install --card PeerAdmin@hlfv1 --archiveFile id2020@0.0.2.bna;
composer network start --networkName id2020 --networkVersion 0.0.2 --networkAdmin admin --card PeerAdmin@hlfv1 --networkAdminEnrollSecret adminpw 
composer card import --file admin@id2020.card
composer-rest-server -c admin@id2020 -n never -w true
