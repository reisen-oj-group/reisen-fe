<template>
  <div class="user-list">
    <div class="toolbar">
      <el-button type="primary" @click="handleCreate">新增用户</el-button>
      <el-input
        v-model="searchQuery"
        placeholder="搜索用户"
        style="width: 300px; margin-left: 10px;"
        clearable
        @clear="handleSearch"
        @keyup.enter="handleSearch"
      >
        <template #append>
          <el-button icon="search" @click="handleSearch" />
        </template>
      </el-input>
    </div>

    <el-table
      :data="users"
      v-loading="loading"
      border
      style="width: 100%; margin-top: 20px;"
    >
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="用户名" />
      <el-table-column prop="role" label="角色">
        <template #default="{ row }">
          <el-tag :type="roleTagType(row.role)">
            {{ roleText(row.role) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="register" label="注册时间">
        <template #default="{ row }">
          {{ formatDate(row.register) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="fetchUsers"
      @current-change="fetchUsers"
    />

    <!-- 编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form :model="form" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.role">
            <el-option label="管理员" :value="0" />
            <el-option label="裁判" :value="1" />
            <el-option label="用户" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            action="/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <el-avatar :src="form.avatar" />
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { type User } from '@/interface'
import { formatDate } from '@/utils/format'

const users = ref<User[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)
const searchQuery = ref('')
const dialogVisible = ref(false)
const dialogTitle = ref('')
const form = ref({
  id: 0,
  name: '',
  role: 2,
  avatar: ''
})

const roleText = (role: number) => {
  const roles = ['管理员', '裁判', '用户']
  return roles[role] || '未知'
}

const roleTagType = (role: number) => {
  const types = ['danger', 'warning', '']
  return types[role] || ''
}

const fetchUsers = async () => {
  loading.value = true
  try {
    // 调用API获取用户列表
    // const res = await getUserList({
    //   page: currentPage.value,
    //   size: pageSize.value,
    //   query: searchQuery.value
    // })
    // users.value = res.data
    // total.value = res.total
  } catch (error) {
    ElMessage.error('获取用户列表失败')
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  currentPage.value = 1
  fetchUsers()
}

const handleCreate = () => {
  dialogTitle.value = '新增用户'
  form.value = {
    id: 0,
    name: '',
    role: 2,
    avatar: ''
  }
  dialogVisible.value = true
}

const handleEdit = (user: User) => {
  // dialogTitle.value = '编辑用户'
  // form.value = { ...user }
  // dialogVisible.value = true
}

const handleDelete = (user: User) => {
  ElMessageBox.confirm(`确定删除用户 "${user.name}"?`, '提示', {
    type: 'warning'
  }).then(async () => {
    // try {
    //   // await deleteUser(user.id)
    //   ElMessage.success('删除成功')
    //   fetchUsers()
    // } catch (error) {
    //   ElMessage.error('删除失败')
    // }
  })
}

const handleAvatarSuccess = (res: any) => {
  form.value.avatar = res.url
}

const submitForm = async () => {
  // try {
  //   if (form.value.id) {
  //     // await updateUser(form.value)
  //     ElMessage.success('更新成功')
  //   } else {
  //     // await createUser(form.value)
  //     ElMessage.success('创建成功')
  //   }
  //   dialogVisible.value = false
  //   fetchUsers()
  // } catch (error) {
  //   ElMessage.error('操作失败')
  // }
}

onMounted(() => {
  fetchUsers()
})
</script>

<style lang="scss" scoped>

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-pagination {
  margin-top: 20px;
  justify-content: flex-end;
}
</style>