<template>
  <casket-star
    v-model="value"
    :lang="lang"
    :plugins="plugins"
    :show-editor="showEditor"
    :show-viewer="showViewer"
  />
</template>

<script setup lang="ts">
import { CasketStar, zhCN, enUS, getDefaultPlugins, markdown, markdownLanguage } from 'casket-star'

import { getRemarkPlugins, getRehypePlugins, getRemarkRehypeOptions } from '@/tools/markdown'
import { codemirrorMath } from '@/tools/codemirror-math'

import { onBeforeMount, ref } from 'vue'

import '@lfe/casket-star/themes/markdown/light.css'
import '@lfe/casket-star/themes/luogu/light.css'

// TODO: i18n
const lang = zhCN

const props = withDefaults(
  defineProps<{
    narrow?: boolean | 'auto'
  }>(),
  {
    narrow: 'auto',
  },
)
const value = defineModel<string>({ required: true })

const showEditor = ref(true)
const showViewer = ref(true)

const plugins = getDefaultPlugins()

// Drop default plugin settings
plugins.remark = getRemarkPlugins()
plugins.rehype = getRehypePlugins()
plugins.remarkRehypeOptions = getRemarkRehypeOptions()

// Config markdown language in Codemirror
plugins.codemirror = [
  markdown({
    base: markdownLanguage, // Use GFM as base
    extensions: [
      { remove: ['HTMLBlock', 'HTMLTag'] }, // Avoid resolving HTML in the Editor
      codemirrorMath, // Resolve math equations
    ],
    completeHTMLTags: false, // Avoid resolving HTML in the Editor
  }),
]

// Should we use a rehype plugin instead?
const ele = ref<HTMLDivElement | null>(null)

onBeforeMount(() => {
  const mobile = window.innerWidth <= 576
  if ((props.narrow === 'auto' && mobile) || props.narrow === true) {
    showViewer.value = false

    // Remove left toolbar for more spaces
    plugins.toolbarL = []
  }
  plugins
})
</script>
