<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainHeader from '@/components/MainHeader.vue'
import MainFooter from '@/components/MainFooter.vue'
</script>

<template>
  <div class="app-container">
    <MainHeader />
    
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <MainFooter />
  </div>
</template>

<style>
@import '@/assets/css/bootstrap.min.css';
@import '@/assets/css/bootstrap-icons.css';
@import '@/assets/css/Coffe.css';

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #121212;
}

::-webkit-scrollbar-thumb {
  background: #6f4e37;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #d15801;
}

body {
  background-color: #121212;
  color: #f1f1f1;
  overflow-x: hidden;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 20px;
  background: rgba(30, 30, 30, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

th {
  background: linear-gradient(45deg, #6f4e37, #8b6b4f);
  color: white;
  padding: 18px;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 1.5px;
  font-weight: 600;
}

td {
  padding: 16px;
  border-bottom: 1px solid #333;
  color: #e0e0e0;
  transition: background-color 0.2s;
}

tr:last-child td {
  border-bottom: none;
}

tr:hover td {
  background-color: rgba(209, 88, 1, 0.1);
  color: #fff;
}

h2 {
  color: #d15801;
  font-weight: 800;
  margin-bottom: 25px;
  position: relative;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 1px;
}

h2::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 60px;
  height: 4px;
  background-color: #d15801;
  border-radius: 2px;
}

.p-button, .custom-btn {
  background: linear-gradient(45deg, #d15801, #a84600) !important;
  border: none !important;
  border-radius: 50px !important;
  padding: 10px 24px !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 4px 15px rgba(209, 88, 1, 0.3) !important;
}

.p-button:hover, .custom-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(209, 88, 1, 0.5) !important;
  background: linear-gradient(45deg, #e3690b, #be5000) !important;
}

.p-button:active {
  transform: translateY(0);
}

.p-button.p-button-danger {
  background: linear-gradient(45deg, #dc3545, #b02a37) !important;
  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3) !important;
}

.p-button.p-button-secondary {
  background: linear-gradient(45deg, #6c757d, #545b62) !important;
  box-shadow: none !important;
}

.p-button.p-button-text {
  background: transparent !important;
  box-shadow: none !important;
  color: #d15801 !important;
}

.p-button.p-button-text:hover {
  background: rgba(209, 88, 1, 0.1) !important;
}

input, .p-inputtext, .p-inputnumber-input, .p-dropdown {
  background-color: #252525 !important;
  color: white !important;
  border: 1px solid #444 !important;
  border-radius: 8px !important;
  padding: 10px 15px !important;
  transition: border-color 0.3s !important;
}

input:focus, .p-inputtext:focus, .p-inputnumber-input:focus, .p-dropdown:focus {
  border-color: #d15801 !important;
  box-shadow: 0 0 0 2px rgba(209, 88, 1, 0.2) !important;
}

.p-dialog {
  background: #1e1e1e !important;
  border: 1px solid #444 !important;
  border-radius: 16px !important;
  overflow: hidden;
}

.p-dialog-header {
  background: #252525 !important;
  color: #d15801 !important;
  border-bottom: 1px solid #333 !important;
}

.p-dialog-content {
  background: #1e1e1e !important;
  padding-top: 20px !important;
}

.p-dialog-footer {
  background: #1e1e1e !important;
  border-top: 1px solid #333 !important;
}
</style>