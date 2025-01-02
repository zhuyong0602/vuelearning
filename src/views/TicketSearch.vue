<template>
  <div class="search-container">
    <a-card title="车票查询" :bordered="false">
      <a-form
        :model="formState"
        @finish="onSearch"
        layout="inline"
        class="search-form"
      >
        <a-form-item label="出发地" name="from">
          <a-input v-model:value="formState.from" placeholder="请输入出发地" />
        </a-form-item>
        
        <a-form-item label="目的地" name="to">
          <a-input v-model:value="formState.to" placeholder="请输入目的地" />
        </a-form-item>
        
        <a-form-item label="出发日期" name="date">
          <a-date-picker
            v-model:value="formState.date"
            format="YYYY-MM-DD"
          />
        </a-form-item>
        
        <a-form-item>
          <a-button type="primary" html-type="submit">查询</a-button>
        </a-form-item>
      </a-form>
      
      <a-table
        :columns="columns"
        :data-source="searchResults"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-button
              type="primary"
              @click="bookTicket(record.id)"
              :disabled="record.available === 0"
            >
              预订
            </a-button>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useTicketStore } from '../stores/ticket'
import { message } from 'ant-design-vue'

const ticketStore = useTicketStore()
const searchResults = ref([])

const formState = reactive({
  from: '',
  to: '',
  date: null
})

const columns = [
  {
    title: '出发地',
    dataIndex: 'from',
    key: 'from',
  },
  {
    title: '目的地',
    dataIndex: 'to',
    key: 'to',
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '剩余座位',
    dataIndex: 'available',
    key: 'available',
  },
  {
    title: '操作',
    key: 'action',
  },
]

const onSearch = () => {
  if (!formState.date) {
    message.error('请选择出发日期')
    return
  }
  
  const date = formState.date.format('YYYY-MM-DD')
  searchResults.value = ticketStore.searchTickets(
    formState.from,
    formState.to,
    date
  )
}

const bookTicket = (ticketId) => {
  const order = ticketStore.bookTicket(ticketId)
  if (order) {
    message.success('订票成功！')
    onSearch()
  } else {
    message.error('订票失败，请重试')
  }
}
</script>

<style scoped>
.search-container {
  padding: 24px;
  background: #f0f2f5;
  min-height: calc(100vh - 64px - 70px);
}
.search-form {
  margin-bottom: 24px;
}
</style>