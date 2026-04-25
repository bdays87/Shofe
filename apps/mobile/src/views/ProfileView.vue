<script setup lang="ts">
import {
  IonBadge,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const router = useRouter();

async function signOut() {
  await auth.logout();
  await router.replace("/login");
}

function statusColor(status: string | undefined) {
  if (status === "verified") return "success";
  if (status === "rejected") return "danger";
  return "warning";
}
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Profile</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <IonList>
        <IonItem>
          <IonLabel>
            <h2>{{ auth.profile?.fullName ?? "—" }}</h2>
            <p>{{ auth.user?.email ?? "" }}</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Verification</IonLabel>
          <IonBadge :color="statusColor(auth.profile?.verificationStatus)">
            {{ auth.profile?.verificationStatus ?? "pending" }}
          </IonBadge>
        </IonItem>
      </IonList>
      <IonButton expand="block" color="medium" class="ion-margin-top" @click="signOut">
        Sign out
      </IonButton>
    </IonContent>
  </IonPage>
</template>
