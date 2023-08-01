<script>
import Repositories from './Repositories.vue'

export default {
    components: {
        Repositories
    },
    props: {
        years: Object
    },
    data() {
        return {
            showAll: false,
        }
    },
}
</script>

<template>
<div class="year mb-24" v-for="year, k in years" v-bind:key="year">
        <div class="flex flex-row flex-wrap mb-4 relative h-full print:break-inside-avoid">
            <div class=" h-5 w-5 mt-3 -ml-7 md:-ml-11 relative">
            <div class="dot animate-pulse h-5 w-5 bg-sky-200 dark:bg-slate-700 rounded-full relative" style="left: 1px"></div>
            <div class="bg-sky-600 dark:bg-sky-400 w-3 h-3 rounded-full top-1 left-1 absolute" style="left: 5px"></div>
            </div>
            <div class="year text-4xl font-semibold md:text-5xl ml-2 md:ml-8">
                {{ k }}
            </div>
            <div class="w-full flex flex-row flex-wrap my-4 print:text-lg text-lg md:text-2xl">
                <div class="w-full print:w-1/3 md:w-1/3" v-if="year.contributions">{{ localNumber(year.contributions) }} Total Contributions</div>
                <div class="w-full print:w-1/3 md:w-1/3" v-if="year.commitContributions">{{ localNumber(year.commitContributions) }} Commits</div>
                <div class="w-full print:w-1/3 md:w-1/3" v-if="year.issueContributions">{{ localNumber(year.issueContributions) }} Issues</div>
                <div class="w-full print:w-1/3 md:w-1/3" v-if="year.pullRequestContributions">{{ localNumber(year.pullRequestContributions) }} Pull Requests</div>
                <div class="w-full print:w-1/3 md:w-1/3" v-if="year.pullRequestReviewContributions">{{ localNumber(year.pullRequestReviewContributions) }} Pull Request Reviews</div>
            </div>
        </div>
        <Repositories :repositories="year.repositories" />
        
    </div>
</template>