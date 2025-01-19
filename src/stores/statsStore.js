import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStatsStore = defineStore('stats', () => {
  const stats = ref({
    explorers: 1234,
    missions: 89,
    communications: 5200,
    uptime: 99.9
  })

  const updates = ref([
    {
      id: 1,
      title: 'System Update v1.2.3',
      description: 'Enhanced navigation systems and improved communication protocols.',
      icon: 'status',
      timeAgo: '2 hours ago'
    },
    {
      id: 2,
      title: 'New Mission Available',
      description: 'Deep space exploration mission now accepting crew applications.',
      icon: 'portal',
      timeAgo: '1 day ago'
    }
  ])

  async function fetchStats() {
    // In a real app, this would be an API call
    // For now, we'll just use the static data
    return stats.value
  }

  async function fetchUpdates() {
    // In a real app, this would be an API call
    return updates.value
  }

  return {
    stats,
    updates,
    fetchStats,
    fetchUpdates
  }
})
