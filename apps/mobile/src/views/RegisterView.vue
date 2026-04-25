<script setup lang="ts">
import {
  IonBackButton,
  IonButton,
  IonButtons,
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

const fullName = ref("");
const email = ref("");
const password = ref("");
const phone = ref("");
const error = ref<string | null>(null);
const submitting = ref(false);
const router = useRouter();
const auth = useAuthStore();

async function submit() {
  error.value = null;
  submitting.value = true;
  try {
    await auth.register({
      fullName: fullName.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
    });
    await router.replace("/tabs/profile");
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Registration failed.";
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton default-href="/login" />
        </IonButtons>
        <IonTitle>Driver registration</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <form @submit.prevent="submit">
        <IonItem>
          <IonInput v-model="fullName" label="Full name" required />
        </IonItem>
        <IonItem>
          <IonInput v-model="email" label="Email" type="email" required autocomplete="email" />
        </IonItem>
        <IonItem>
          <IonInput v-model="phone" label="Phone" type="tel" required autocomplete="tel" />
        </IonItem>
        <IonItem>
          <IonInput
            v-model="password"
            label="Password"
            type="password"
            required
            autocomplete="new-password"
          />
        </IonItem>
        <IonText v-if="error" color="danger">
          <p class="ion-padding-start">{{ error }}</p>
        </IonText>
        <IonButton expand="block" type="submit" :disabled="submitting" class="ion-margin-top">
          {{ submitting ? "Creating..." : "Create account" }}
        </IonButton>
      </form>
    </IonContent>
  </IonPage>
</template>
