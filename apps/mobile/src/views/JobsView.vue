<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import type { RefresherCustomEvent } from "@ionic/vue";
import { onMounted, ref } from "vue";
import type { Job } from "@shofe/types";
import { listOpenJobs } from "@shofe/appwrite-client";
import { appwrite } from "@/lib/appwrite";

const jobs = ref<Job[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

async function load() {
  loading.value = true;
  error.value = null;
  try {
    jobs.value = await listOpenJobs(appwrite);
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Failed to load jobs.";
  } finally {
    loading.value = false;
  }
}

async function refresh(event: RefresherCustomEvent) {
  await load();
  event.target.complete();
}

onMounted(load);
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Open jobs</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonRefresher slot="fixed" @ion-refresh="refresh">
        <IonRefresherContent />
      </IonRefresher>
      <div v-if="loading" class="ion-padding ion-text-center">
        <IonSpinner />
      </div>
      <IonText v-else-if="error" color="danger">
        <p class="ion-padding">{{ error }}</p>
      </IonText>
      <div v-else-if="jobs.length === 0" class="ion-padding ion-text-center">
        <p>No open jobs right now. Pull to refresh.</p>
      </div>
      <IonList v-else>
        <IonItem v-for="job in jobs" :key="job.$id" :router-link="`/tabs/jobs/${job.$id}`">
          <IonLabel>
            <h2>{{ job.title }}</h2>
            <p>{{ job.workingConditions }}</p>
          </IonLabel>
          <IonNote slot="end">{{ job.dailyTargetKm }} km/day</IonNote>
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>
