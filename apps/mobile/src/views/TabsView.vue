<script setup lang="ts">
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/vue";
import { briefcaseOutline, documentTextOutline, personOutline } from "ionicons/icons";
</script>

<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet />
      <IonTabBar slot="bottom">
        <IonTabButton tab="jobs" href="/tabs/jobs">
          <IonIcon :icon="briefcaseOutline" />
          <IonLabel>Jobs</IonLabel>
        </IonTabButton>
        <IonTabButton tab="applications" href="/tabs/applications">
          <IonIcon :icon="documentTextOutline" />
          <IonLabel>Applications</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/tabs/profile">
          <IonIcon :icon="personOutline" />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>
