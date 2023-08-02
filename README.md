# P2P - CHAT APP REACT APP using HOLEPUNCH

P2P Chat App is a lightweight, easy-to-use React app that allows you to chat with friends and family in real time. With This app, you can create a private chat room or join an existing one, send text messages, photos, and videos, and even make voice calls.

This app is built using the Holepunch platform, which is a secure, reliable, and scalable platform for building P2P chat apps. This app is easy to use, even for users with no prior experience with React apps.

### What is this repository for?

- 1. To use Hyperswarm (DHT)
- 2. To integrate the React and Hyperswarm
- 3. Git repo (https://github.com/holepunchto/hyperswarm-dht-relay)

### How to run

- 1. Git Clone
- 2. npm install
- 3. npm start

### Why do we need relay?

Hyperswarm works in the browser, but browsers can't do P2P, that is why we need a Relay.

### Implmentaion

- 1. Create DHT instance.

```
import b4a from 'b4a'
import DHT from '@hyperswarm/dht-relay'
import Stream from '@hyperswarm/dht-relay/ws'

const ws = new WebSocket('wss://dht2-relay.leet.ar')
const dht = new DHT(new Stream(true, ws))
```

Now we are using dht2-relay.leet.ar as a relay, which is not P2P, (this is a limitation from browsers.)

- 2. Create Hyperswarm

```
import Hyperswarm from 'hyperswarm'

// DHT ...

const swarm = new Hyperswarm({ dht }) // you pass it as an option
```

- 3. Handling method Swarm connection

```
swarm.on('connection', function (socket, info) {
  console.log('new swarm connection')

  socket.on("data", function (data) {
    console.log("data", data);
    addToHistory({ from: socket, message: b4a.toString(data) });
  });
})
```

- 4. Join swarm
```
const topic = b4a.alloc(32).fill("game-room-002"); // + custom room name, prefix + hash it
swarm.join(topic);
```
