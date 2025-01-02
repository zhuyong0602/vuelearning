<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo">车票查询系统</div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="search">
          <router-link to="/">车票查询</router-link>
        </a-menu-item>
        <a-menu-item key="orders">
          <router-link to="/orders">我的订单</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <router-view></router-view>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ticket Booking System ©2023
    </a-layout-footer>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue'

const selectedKeys = ref(['search'])
</script>

<style>
.layout {
  min-height: 100vh;
}
.logo {
  float: left;
  color: white;
  font-size: 18px;
  margin-right: 30px;
}
</style>