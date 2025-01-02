<template>
  <div class="orders-container">
    <a-card title="我的订单" :bordered="false">
      <a-table
        :columns="columns"
        :data-source="ticketStore.orders"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-button
              type="primary"
              danger
              @click="refundTicket(record.id)"
              :disabled="record.status === 'refunded'"
            >
              退票
            </a-button>
          </template>
          <template v-if="column.key === 'status'">
            <a-tag :color="record.status === 'booked' ? 'green' : 'red'">
              {{ record.status === 'booked' ? '已订票' : '已退票' }}
            </a-tag>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { useTicketStore } from '../stores/ticket'
import { message } from 'ant-design-vue'

const ticketStore = useTicketStore()

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
    title: '状态',
    key: 'status',
  },
  {
    title: '操作',
    key: 'action',
  },
]

const refundTicket = (orderId) => {
  if (ticketStore.refundTicket(orderId)) {
    message.success('退票成功！')
  } else {
    message.error('退票失败，请重试')
  }
}
</script>

<style scoped>
.orders-container {
  padding: 24px;
  background: #f0f2f5;
  min-height: calc(100vh - 64px - 70px);
}
</style>