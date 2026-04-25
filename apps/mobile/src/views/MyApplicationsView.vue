<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>My applications</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <IonText>
        <p>
          Your job applications will list here once you've applied. The
          <code>listApplicationsForDriver()</code> helper from
          <code>@shofe/appwrite-client</code> powers this view.
        </p>
      </IonText>
    </IonContent>
  </IonPage>
</template>
