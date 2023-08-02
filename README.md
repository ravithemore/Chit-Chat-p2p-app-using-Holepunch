# P2P - CHAT APP REACT APP using HOLEPUNCH💻🤹‍♂️

P2P Chat App is a lightweight, easy-to-use React app that allows you to chat with friends and family in real time. With This app, you can create a private chat room or join an existing one, send text messages, photos, and videos, and even make voice calls.📲

This app is built using the Holepunch platform, which is a secure, reliable, and scalable platform for building P2P chat apps. This app is easy to use, even for users with no prior experience with React apps.📞📱

### How to run
Open Command Centre and run this Command.
Clone this Repo using this command.
``` Git Clone```
After Cloning this app, Use this command to install all the dependencies in your environment
```npm install```
Then simply run this command
``` npm start```

### Tech Stacks:
- Front-end: React.js.
- Back-end: Node.js.


### Why do we need a relay?


A relay in P2P apps is a server that sits between two users and relays messages between them. This is necessary for a number of reasons, including:

- Security: A relay can help to protect the privacy of users by encrypting messages before they are sent. This prevents third parties from eavesdropping on the conversation.
- Scalability: A relay can help to scale P2P apps by distributing the load of messages across multiple servers. This can prevent individual servers from becoming overloaded.
- Reliability: A relay can help to improve the reliability of P2P apps by providing a backup path for messages. If one server goes down, the relay can still relay messages between the two users.

In some cases, a relay may not be necessary. For example, if two users are on the same network, they can communicate directly with each other without a relay. However, in most cases, a relay is a valuable addition to a P2P app.

Here are some additional benefits of using a relay in P2P apps:

- Firewall traversal: A relay can help users to bypass firewalls that may block direct P2P connections.
- NAT traversal: A relay can help users to connect to each other even if they are behind NAT routers.
- Bandwidth sharing: A relay can help to share bandwidth between users, which can improve performance for everyone.

Overall, a relay can be a valuable addition to any P2P app. It can help to improve security, scalability, reliability, firewall traversal, NAT traversal, and bandwidth sharing.

### Implementation

- 1. Create a DHT instance.

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

## Contributing🤝❤️

We are always looking for ways to improve This App, and we welcome your contributions! If you have any ideas, bug fixes, or feature suggestions, please let us know by opening an issue or submitting a pull request. Your feedback is important to us, and we appreciate your help in making This App the best it can be.

## Acknowledgments 🙏🌟

This app would not be possible without the foundational technologies provided by the creators of Node.js, React, WebRTC, and Holepunch. We are grateful for their contributions, and we would like to thank them for building the shoulders upon which we stand.

## Contact📧📞

For any questions or inquiries about the project, please contact me at damorravi540@gmail.com
