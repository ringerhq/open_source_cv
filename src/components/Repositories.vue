<script setup>


defineProps({
  repositories: Array,
})

</script>

<template>
    <template v-for="(repository, i, k) in repositories" v-bind:key="i">
        <div class="flex flex-row flex-wrap w-full mb-8 md:mb-2 print:mb-2 print:break-inside-avoid" v-if="k < 10 || showAll">
            <div class="w-full print:w-3/4 md:w-auto flex-1">
                <div class="title flex flex-row items-center">
                    <h3 class="mr-1 text-2xl md:text-3xl font-semibold">{{ repository.name }}</h3>
                    <div class="border-b-2 flex-1 mx-1 border-slate-300 dark:border-slate-700"></div>
                </div>
                <div class="text-xl md:text-2xl text-slate-700 dark:text-slate-400 md:mb-4">
                    <a :href="'https://www.github.com/'+repository.fullname" target="_blank">{{ repository.fullname }}</a>
                </div>
                <div class="flex print:hidden md:hidden text-xl mb-4">
                    {{ localNumber(repository.contributions) }} Contributions
                </div>
                <div class="text-base md:text-xl text-slate-700 dark:text-slate-200 w-full md:w-3/4">
                    {{ repository.description }}
                </div>
                <div class="flex flex-row gap-x-8 mt-4 items-center mb-4 md:mb-8">
                    <div class="stars text-sm md:text-xl">
                        <i class="fas fa-star mr-1"></i>
                        {{ millify(repository.stargazers) }} <span class="sr-only"> Stars</span>
                    </div>
                    <div class="gap-x-2 flex">
                        <template v-for="language, i in repository.languages" v-bind:key="i">
                            <div class="language inline text-sm bg-blend-color md:text-base font-semibold rounded-lg px-1.5 print:text-black" :class="'text-black text-opacity-75 dark:text-opacity-100 dark:text-white'" :style="'background-color: '+language.node.color+'8a'">{{ language.node.name }}</div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="w-full print:w-1/4 md:w-auto hidden print:block md:block flex-row md:flex-wrap print:text-xl text-2xl">
                <div class="w-full text-right">{{ localNumber(repository.contributions) }} Contributions</div>
            </div>   
        </div>
    </template>
</template>