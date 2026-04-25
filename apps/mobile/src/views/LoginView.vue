<script setup lang="ts">
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const email = ref("");
const password = ref("");
const error = ref<string | null>(null);
const submitting = ref(false);
const router = useRouter();
const auth = useAuthStore();

async function submit() {
  error.value = null;
  submitting.value = true;
  try {
    await auth.login(email.value, password.value);
    await router.replace("/tabs/jobs");
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Sign-in failed.";
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Sign in</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <form @submit.prevent="submit">
        <IonItem>
          <IonInput v-model="email" label="Email" type="email" required autocomplete="email" />
        </IonItem>
        <IonItem>
          <IonInput v-model="password" label="Password" type="password" required />
        </IonItem>
        <IonText v-if="error" color="danger">
          <p class="ion-padding-start">{{ error }}</p>
        </IonText>
        <IonButton expand="block" type="submit" :disabled="submitting" class="ion-margin-top">
          {{ submitting ? "Signing in..." : "Sign in" }}
        </IonButton>
        <IonButton expand="block" fill="clear" router-link="/register">
          Need an account? Register
        </IonButton>
      </form>
    </IonContent>
  </IonPage>
</template>
