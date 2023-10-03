<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" class="max-6">
        <v-img height="100" class="my-2" src="@/assets/logo.png"></v-img>
        <login-form @submit="getClientData" />
      </v-col>
      <v-col cols="12" class="max-6">
        <p>
          {{ JSON.stringify(clientData) }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { onMounted, ref } from "vue";
import LoginForm from "@/components/LoginForm.vue";

function initilize() {
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
