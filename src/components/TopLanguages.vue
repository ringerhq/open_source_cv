<script setup>

defineProps({
  languages: Array
})

</script>

<template>
    <div class="mb-8">
        <h3 class="text-xl w-full md:text-3xl mr-2 mb-4 font-semibold">Top Languages</h3>
        <div class="flex-1 flex items-center flex-wrap">
            <div class="gap-x-2 flex flex-wrap gap-y-2">
                <template v-for="language, key in languages" v-bind:key="key">
                    <div class="language inline text-sm bg-blend-color md:text-base font-semibold rounded-lg px-1.5 print:text-black" :class="'text-black text-opacity-75 dark:text-opacity-100 dark:text-white'" :style="'background-color: '+language.color+'8a'" v-if="key<10">{{ language.name }}</div>
                </template>
            </div>
        </div>
    </div>
</template>
