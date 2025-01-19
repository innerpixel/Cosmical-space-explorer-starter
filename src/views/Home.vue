<template>
  <div class="bg-space-black">
    <!-- Main Content -->
    <div class="relative">
      <!-- Hero Section -->
      <div class="py-12 px-8">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <div class="portal-large mx-auto mb-8">
              <div class="portal-icon">
                <div class="gateway"></div>
                <div class="vortex"></div>
              </div>
            </div>
            <h1 class="text-4xl font-bold mb-4 text-glow">
              Welcome to Cosmical Space Explorer
            </h1>
            <p class="text-xl text-interface-text-muted max-w-2xl mx-auto">
              Your gateway to interstellar exploration and cosmic discoveries
            </p>
          </div>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="py-8 px-8">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Active Explorers -->
            <div class="bg-space-dark p-6 rounded-lg border border-interface-border">
              <div class="flex items-center gap-4">
                <div class="alien-icon">
                  <div class="bioscan-icon">
                    <div class="scanner"></div>
                    <div class="data">
                      <div class="data-line"></div>
                      <div class="data-line"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="text-2xl font-bold">{{ stats.explorers }}</div>
                  <div class="text-interface-text-muted">Active Explorers</div>
                </div>
              </div>
            </div>

            <!-- Active Missions -->
            <div class="bg-space-dark p-6 rounded-lg border border-interface-border">
              <div class="flex items-center gap-4">
                <div class="alien-icon">
                  <div class="portal-icon">
                    <div class="gateway"></div>
                    <div class="vortex"></div>
                  </div>
                </div>
                <div>
                  <div class="text-2xl font-bold">{{ stats.missions }}</div>
                  <div class="text-interface-text-muted">Active Missions</div>
                </div>
              </div>
            </div>

            <!-- Communications -->
            <div class="bg-space-dark p-6 rounded-lg border border-interface-border">
              <div class="flex items-center gap-4">
                <div class="alien-icon">
                  <div class="telepathy-icon">
                    <div class="circles">
                      <div class="circle"></div>
                      <div class="circle"></div>
                    </div>
                    <div class="link"></div>
                  </div>
                </div>
                <div>
                  <div class="text-2xl font-bold">{{ stats.communications }}</div>
                  <div class="text-interface-text-muted">Communications</div>
                </div>
              </div>
            </div>

            <!-- System Uptime -->
            <div class="bg-space-dark p-6 rounded-lg border border-interface-border">
              <div class="flex items-center gap-4">
                <div class="alien-icon">
                  <div class="ground-control-icon">
                    <div class="base"></div>
                    <div class="tower"></div>
                    <div class="signal"></div>
                  </div>
                </div>
                <div>
                  <div class="text-2xl font-bold">{{ stats.uptime }}h</div>
                  <div class="text-interface-text-muted">System Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Latest Updates -->
      <div class="py-8 px-8">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-2xl font-bold mb-6">Latest Updates</h2>
          <div class="grid gap-6">
            <div v-for="update in updates" :key="update.id" class="bg-space-dark p-6 rounded-lg border border-interface-border">
              <div class="flex items-start gap-4">
                <div class="alien-icon small mt-1">
                  <div class="glyph-icon">
                    <div class="symbol">
                      <div class="line"></div>
                      <div class="line"></div>
                      <div class="dot"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 class="font-medium mb-2">{{ update.title }}</h3>
                  <p class="text-interface-text-muted">{{ update.description }}</p>
                  <div class="mt-2 text-sm text-interface-text-muted">{{ update.timestamp }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSoundStore } from '../stores/soundStore'
import { useStatsStore } from '../stores/statsStore'

const router = useRouter()
const soundStore = useSoundStore()
const statsStore = useStatsStore()

const stats = ref({
  explorers: 0,
  missions: 0,
  communications: 0,
  uptime: 0
})

const updates = ref([])

// Navigation handlers
function handleNavHover() {
  soundStore.playUIHover()
}

function navigateTo(path) {
  soundStore.playUIClick()
  router.push(path)
}

// Load initial data
onMounted(async () => {
  stats.value = await statsStore.fetchStats()
  updates.value = await statsStore.fetchUpdates()
})
</script>

<style scoped>
.text-glow {
  text-shadow: 
    0 0 10px rgba(6, 182, 212, 0.3),
    0 0 20px rgba(6, 182, 212, 0.2),
    0 0 30px rgba(6, 182, 212, 0.1);
}

.portal-large {
  width: 128px;
  height: 128px;
}

.alien-icon.small {
  width: 24px;
  height: 24px;
}

.alien-icon.large {
  width: 64px;
  height: 64px;
}

.bg-scan-lines {
  background-image: repeating-linear-gradient(
    0deg,
    rgba(6, 182, 212, 0.05) 0px,
    rgba(6, 182, 212, 0.05) 1px,
    transparent 1px,
    transparent 2px
  );
}

/* Card hover effects */
.group:hover .alien-icon {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

/* Stats counter animation */
@keyframes countUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.text-2xl {
  animation: countUp 0.5s ease-out forwards;
}
</style>
