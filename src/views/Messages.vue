<template>
  <div class="messages">

    <div class="users">
      <div class="name">
        <p class="mes ps-5 pt-3">Сообщения</p>
      </div>
      <div v-for="(user, key) in users" v-bind:key="key" v-bind:user="user" class="user"
      @click="push(user.id)">
        <div class="photo">
          <a :href="`/users/${user.id}`">
            <img  :src="require(`../assets/${user.photoUrl}`)"/>
          </a>
        </div>
        <div class="name-mes">
          <div class="my-name p-0 m-0">
            <a :href="`/users/${user.id}`" v-if="user.name !== null">{{user.name}}</a>
            <a :href="`/users/${user.id}`" v-else>{{user.email}}</a>
          </div>
          <div class="messs m-0 p-0">
            messs
          </div>
        </div>
      </div>
    </div>
    <div v-if="chat" class="chat">
      <div class="messages-list">
        <div class="message" v-for="(message, key) in messages" :key="key" :message="message"
             :class="{'text-end': message.senderId == user.id}">
          <p>{{message.content}}</p>
        </div>
      </div>
      <div class="">
        <b-textarea v-model="message" no-resize class="message-area"></b-textarea>
      </div>
      <div class="but text-end mt-3">
      <b-button @click="sendMessage()"
                variant="outline-secondary" class="send-button" :disabled="message == null">Отправить</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";

export default {
  name: "Messages",
  data() {
    return {
      user: {},
      users: [],
      message: null,
      stompClient: null,
      chat: false,
      messages: []
    }
  },
  methods: {
    async getMessages() {
      const request = new Request(
          'http://localhost/messages/' +  + this.user.id + '/' + router.currentRoute.params['id'],
          {
            method: "GET"
          }
      );
      console.log(request)
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      const response = await fetch(request);
      if (response.status === 200) {
        var user;
        await response.text().then(data => {

              this.messages = JSON.parse(data)
            }
        )
        return user;
      } else {
        await router.push("/error/default")
      }
      this.$forceUpdate()

    },
    sendMessage() {
      if (this.message.trim() !== "") {
        const message = {
          senderId: this.user.id,
          recipientId: router.currentRoute.params['id'],
          senderName: '',
          recipientName: '',
          content: this.message,
          timestamp: new Date(),
        };

        this.stompClient.send("/app/chat", {}, JSON.stringify(message));
        this.messages.push(message)
      }
    },
    onConnected() {
      console.log("connected");

      this.stompClient.subscribe(
          "/user/" + this.user.id + "/queue/messages",
          this.onMessageReceived
      );
    },
    connect() {
      const Stomp = require("stompjs");
      var SockJS = require("sockjs-client");
      SockJS = new SockJS("http://localhost/ws");
      this.stompClient = Stomp.over(SockJS);
      this.stompClient.connect({}, this.onConnected, this.onError);
      },
    push(id) {
      router.push("/messages/" + id)
    },
    async getUser(id) {
      var url;
      console.log('lkjjnmlkj')
      if (id == null) {
        url = 'http://localhost/profile';
      } else {
        url = 'http://localhost/users/' + id
      }
      const request = new Request(
          url,
          {
            method: "GET"
          }
      );
      if (this.$store.state.token !== null) {
        request.headers.append("Authorization", this.$store.state.token);
      }
      const response = await fetch(request);
      if (response.status === 200) {
        var user;
        await response.text().then(data => {

              user = JSON.parse(data)
            }
        )
        return user;
      } else {
        await router.push("error/default")
      }
      this.$forceUpdate()

    },
  },
  async beforeMount() {
    this.user = await this.getUser(null);
    if (router.currentRoute.params['id']) {
      console.log("ye")
      var user = await this.getUser(router.currentRoute.params['id']);
      this.users.push(user);
      this.chat = true
      this.getMessages()
    } else {
      console.log('no')
    }
    this.connect()
    this.$options.sockets.onmessage = (data) => {
      console.log(data);
    }
  }
}
</script>

<style scoped>
.messages {
  display: flex;
  margin-top: 70px;
  min-height: 650px;
}

.users {
  width: 30%;
  border-right: 1px solid #dddddd;
}

.name {
  border-bottom: 1px solid #dddddd;
  height: 60px;
}

.mes {
  font-size: 18px;
  font-weight: bold;
}

.user {
padding: 10px;
  display: flex;
  cursor: pointer;
}

.user img {
  width: 70px;
  height: 70px;
  object-fit: cover;
}

.name-mes {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: 'Roboto Mono', monospace;
}

.my-name a {
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  color: black;
}

.my-name a:hover {
  color: #b8a7a7;
}

.user:hover {
  box-shadow: 0 0px 10px 1px #dedede;

}

.chat {
  width: 70%;
  padding: 20px;
}
.messages-list {
  height: 70%;
}
.message-area {
  height: 120px;
  width: 100%;
}
.message {
  font-family: 'Roboto Mono', monospace;
  font-size: 18px;
}

</style>
