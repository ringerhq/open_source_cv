<template>
   <section class="dark:bg-slate-900 text-slate-900 dark:text-slate-200 print:text-black mx-auto max-w-7xl px-2 xl:px-4">
        <div v-if="!loaded" class=" flex justify-center text-5xl h-96 w-full text-center">
            <div class="animate-pulse">
                {{ loadingMessage }}
            </div>
        </div>
        <div v-if="loaded" class="print:mb-8 mb-24 w-full grid grid-cols-4">
            <div class="col-span-4 md:col-span-3 print:pt-0 pt-12 md:pt-24 relative">
                <h1 class="w-full  text-xl text-slate-600 dark:text-slate-300 sm:text-xl">
                    Open Source CV &rarr; 
                </h1>
                <h1 class="w-full pt-3 text-5xl print:text-black text-slate-700 dark:text-slate-100 sm:text-6xl" v-if="loaded">
                    {{ contributions.expert.name ? contributions.expert.name : contributions.expert.login }}
                </h1>
                <h2 class="text-2xl sm:text-2xl md:text-3xl print:text-black print:text-opacity-100 dark:text-opacity-60 mb-4 text-slate-600 dark:text-slate-50">
                    <a :href="'https://www.github.com/'+contributions.expert.login" target="_blank">@{{ contributions.expert.login }}</a>
                </h2>
                <p class="text-base md:text-lg">{{ contributions.expert.bio }}</p>
                <ContributingSince :year="Object.keys(contributions.years)[0]" :followers="contributions.expert.followers" />
                <div class="grid w-full print:break-inside-avoid mt-8">
                  <TopLanguages :languages="contributions.languages" />
                  <GrandTotals :totals="contributions.totals" />
                  
                </div>
            </div>
            <ShareSidebar :username="username" :siteUrl="siteUrl" />
        </div>
        <div v-if="loaded" class="timeline ml-1 flex flex-col-reverse md:ml-0 border-l-2 border-slate-300 dark:border-slate-700 pl-4 md:pl-8 mt-8">
            <CVYear :years="contributions.years" />
        </div>
    </section>
</template>
<script>
import GrandTotals from './components/GrandTotals.vue'
import TopLanguages from './components/TopLanguages.vue'
import ContributingSince from './components/ContributingSince.vue'
import CVYear from './components/CVYear.vue'

import { processedContributions } from './github.js'

export default {

  components: {
    GrandTotals,
    TopLanguages,
    ContributingSince,
    CVYear
  },
  data() {
    return {
      loaded: false,
      contributions: {},
      years: [],
      loadingMessage: 'Loading...',
    }
  },
  async mounted() {
    // Replace 'torvalds' with the actual GitHub username you want to fetch contributions for.
    const username = 'torvalds';
    const contributions = await processedContributions(username);
    this.contributions = contributions;
    this.loaded = true;
  },
};
</script>