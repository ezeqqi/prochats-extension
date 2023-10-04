<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" class="max-6">
        <v-img height="100" class="my-2" src="@/assets/logo.png"></v-img>
        <login-form @submit="infoChannels" @forgot="filterChats" />
      </v-col>
      <v-col cols="12" class="max-6">
        <v-row>
          <v-col cols="12">
            <v-btn @click="chatGetAttributes">Chat attributes</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <p class="max-4 wrap">
              {{ JSON.stringify(clientData) }}
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { onMounted, ref } from "vue";
import LoginForm from "@/components/LoginForm.vue";
import { api } from "@/api/axios";

function initilize() {
  console.log("window.WlExtension", window.WlExtension);
  window.WlExtension.initialize({
    buttons: {
      "contacts-list": [
        {
          icon_url: "src/assets/logo.png",
          text: "Botao Alert",
          callback: () => {
            window.WlExtension.alert({
              message: "Mensagem de sucesso",
              variant: "success",
            });
          },
        },
      ],
      "attendance-view": [
        {
          icon_url: "http://127.0.0.1:3000/public/favicon.ico",
          text: "Ver Perfil",
          callback: (crique) => {
            console.log("crique");
            window.WlExtension.modal({
              url: "http://127.0.0.1:3000/",
              title: "CRM",
              maxWidth: "1024px",
              maxHeight: "960px",
              height: "960px",
            });
          },
        },
      ],
    },
    navbar: [
      {
        id: "group_extension",
        icon_url: "",
        text: "Teste",
        type: "group",
      },
      {
        id: "ext_1",
        type: "item",
        icon_url: "",
        text: "Extensao item",
        parentId: "modules",
        callback: () => {
          window.WlExtension.openPage({
            url:
              "https://br.widgets.investing.com/live-currency-cross-rates?theme=darkTheme",
          });
        },
      },
      {
        id: "ext_2",
        type: "item",
        icon_url: "",
        text: "Investing",
        parentId: "group_extension",
        callback: () => {
          window.WlExtension.openPage({
            url:
              "https://br.widgets.investing.com/live-currency-cross-rates?theme=darkTheme",
          });
        },
      },
      {
        id: "ext_3",
        type: "item",
        icon_url: "/src/assets/logo.png",
        text: "Yahoo Finance",
        parentId: "group_extension",
        callback: () => {
          window.WlExtension.openPage({
            url: "https://finance.yahoo.com/quote/YM%3DF?p=YM%3DF",
          });
        },
      },
    ],
  });
}
const channelId = "61c909b242fda9d334bc5aaa";
async function infoChannels() {
  try {
    const response = await window.WlExtension.getInfoChannels();
    if (response) {
      clientData.value = response;
    }
  } catch (error) {
    console.error(error);
  }
}
async function filterChats() {
  try {
    const response = await api.post(
      "chats/list",
      {
        page: 0,
        typeChat: 2,
        status: 1,
      },
      {
        headers: {
          "access-token": channelId,
        },
      }
    );
    if (response) {
      clientData.value = response.data.chats;
    }
  } catch (error) {
    clientData.value = error;
  }
}
async function userList(form) {
  try {
    const userId = "61c909b242fda9d334bc5aa7";
    const response = await api.get(`users/${userId}`, {
      headers: {
        "access-token": channelId,
      },
    });
    if (response) {
      clientData.value = response.data.chats;
    }
  } catch (error) {
    clientData.value = error;
  }
}
async function chatGetAttributes() {
  try {
    const attendanceId = "61c909b242fda9d334bc5aa7";
    const response = await api.get(`chats/${attendanceId}/get-attributes`, {
      headers: {
        "access-token": channelId,
      },
    });
    if (response) {
      clientData.value = response.data.chats;
    }
  } catch (error) {
    clientData.value = error;
  }
}
async function chatSetAttributes() {
  try {
    const attendanceId = "61c909b242fda9d334bc5aa7";
    const response = await api.post(
      `chats/${attendanceId}/set-attributes`,
      [
        {
          key: "chave-1",
          value: "valor-1",
          description: "descricao-1",
        },
        {
          key: "chave-2",
          value: "valor-2",
          description: "descricao-2",
        },
      ],
      {
        headers: {
          "access-token": channelId,
        },
      }
    );
    if (response) {
      clientData.value = response.data.chats;
    }
  } catch (error) {
    clientData.value = error;
  }
}
const clientData = ref({});
async function getClientData() {
  try {
    const response = await window.WlExtension.getInfoUser();
    if (response) {
      clientData.value = response;
    }
  } catch (error) {
    clientData.value = error;
  }
}
onMounted(() => {
  initilize();
});
</script>
