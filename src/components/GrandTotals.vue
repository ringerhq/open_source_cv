<script setup>

defineProps({
  totals: Array
})

</script>

<template>
    <div class="mb-8">
        <h3 class="text-xl w-full md:text-3xl mr-2 mb-4 font-semibold">Grand totals</h3>
        <div class="flex-1 flex items-start flex-wrap text-xl md:text-2xl">
            <div class="w-full flex items-center ">
                <h3 class="flex-0 mr-2">Contributions</h3>
                <div class="border-b-2 flex-1 mr-2 border-slate-300 dark:border-slate-700"></div>
                <h3 class="flex-0">{{ localNumber(totals.contributions) }}</h3>
            </div>
            <div class="w-full flex items-center">
                <h3 class="flex-0 mr-2">Commits</h3>
                <div class="border-b-2 flex-1 mr-2 border-slate-300 dark:border-slate-700"></div>
                <h3 class="flex-0">{{ localNumber(totals.commitContributions) }}</h3>
            </div>
            <div class="w-full flex items-center">
                <h3 class="flex-0 mr-2">Pull Requests</h3>
                <div class="border-b-2 flex-1 mr-2 border-slate-300 dark:border-slate-700"></div>
                <h3 class="flex-0">{{ localNumber(totals.pullRequestContributions) }}</h3>
            </div>
            <div class="w-full flex items-center">
                <h3 class="flex-0 mr-2">Pull Request Reviews</h3>
                <div class="border-b-2 flex-1 mr-2 border-slate-300 dark:border-slate-700"></div>
                <h3 class="flex-0">{{ localNumber(totals.pullRequestReviewContributions) }}</h3>

            </div>
            <div class="w-full flex items-center">
                <h3 class=" flex-0  mr-2">Issues</h3>
                <div class="border-b-2 flex-1 mr-2 border-slate-300 dark:border-slate-700"></div>
                <h3 class=" flex-0 ">{{ localNumber(totals.issueContributions) }}</h3>
            </div>
            <div class="w-full flex items-center">
                <h3 class=" flex-0  mr-2">Discussion Answers</h3>
                <div class="border-b-2 flex-1 mr-2 border-slate-300 dark:border-slate-700"></div>
                <h3 class=" flex-0 ">{{ localNumber(totals.discussionContributions) }}</h3>
            </div>
        </div>
    </div>
</template>
