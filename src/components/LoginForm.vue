<template>
  <v-form class="border-sm elevation-2">
    <v-container>
      <div class="my-1">
        <label class="text-body-2">E-mail</label>
        <v-text-field
          :rules="rules.email"
          v-model="form.email"
          validate-on="blur lazy | submit lazy"
          variant="outlined"
        />
      </div>
      <div class="my-1">
        <label class="text-body-2">Senha</label>
        <v-text-field
          v-model="form.password"
          variant="outlined"
          :type="visibility ? 'password' : 'text'"
        >
          <template v-slot:append-inner>
            <v-icon @click="visibility = !visibility">
              {{ visibility ? "mdi-eye" : "mdi-eye-off" }}
            </v-icon>
          </template>
        </v-text-field>
      </div>
      <v-checkbox
        v-model="remember"
        color="primary"
        label="Lembrar me"
        density="compact"
      />
      <v-btn
        @click.prevent="submitLogin"
        block
        variant="flat"
        height="50px"
        color="primary"
        type="submit"
      >
        Login
      </v-btn>
      <div class="d-flex mt-4 justify-center">
        <a class="text-body-2 text-blue-darken-2" href="/" @click.prevent="foForgot">
          Esqueci minha senha
        </a>
      </div>
    </v-container>
  </v-form>
</template>
<script setup>
import { ref } from "vue";
const emits = defineEmits(["submit", "forgot"]);
const form = ref({
  email: null,
  password: null,
});
const visibility = ref(false);
const remember = ref(false);
const rules = {
  email: [(v) => /.+@.+\..+/.test(v) || "E-mail precisa ser válido"],
};
function submitLogin() {
  emits("submit", form.value);
}
function foForgot() {
  emits("forgot");
}
</script>
