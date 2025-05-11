<template>
  <div class="testdata-container">
    <el-upload class="upload-testdata" drag multiple>
      <font-awesome-icon :icon="faCloudArrowUp" />
      将数据包拖拽至此处，或者<em>点击上传</em>
      <template #tip> 数据包大小不超过 200MB。 </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { ElUpload } from 'element-plus'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
</script>

<style lang="scss" scoped></style>
