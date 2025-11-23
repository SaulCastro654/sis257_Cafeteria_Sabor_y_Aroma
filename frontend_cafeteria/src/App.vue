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
  background: #614938ff;
}

body {
  background-color: #121212;
  color: #f1f1f1;
  overflow-x: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
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
  background: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #333;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

th {
  background-color: #252525 !important;
  color: #d15801 !important;
  padding: 18px 20px !important;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  font-weight: 700;
  border-bottom: 2px solid #444;
  white-space: nowrap;
}

td {
  padding: 16px 20px !important;
  border-bottom: 1px solid #333;
  color: #e0e0e0;
  vertical-align: middle;
}

tr:last-child td {
  border-bottom: none;
}

tr:hover td {
  background-color: #2c2c2c;
  color: #fff;
}

h2 {
  color: #d15801;
  font-weight: 800;
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 1px;
}

h2::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 4px;
  background-color: #d15801;
  border-radius: 2px;
}

/* --- BOTONES --- */
.p-button,
.custom-btn {
  background: linear-gradient(45deg, #d15801, #a84600) !important;
  border: none !important;
  border-radius: 50px !important;
  padding: 12px 28px !important;
  font-weight: 600 !important;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3) !important;
}

.p-button:hover,
.custom-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(209, 88, 1, 0.4) !important;
  background: linear-gradient(45deg, #e3690b, #be5000) !important;
}

.p-button.p-button-danger {
  background: linear-gradient(45deg, #dc3545, #b02a37) !important;
}

.p-button.p-button-secondary {
  background: #495057 !important;
  color: white !important;
}

.p-button.p-button-text {
  background: transparent !important;
  color: #d15801 !important;
  box-shadow: none !important;
  padding: 8px 16px !important;
}

.p-button.p-button-text:hover {
  background: rgba(209, 88, 1, 0.1) !important;
}

input,
.p-inputtext,
.p-inputnumber-input,
.p-dropdown,
.p-textarea,
.p-select {
  background-color: #121212 !important;
  color: white !important;
  border: 1px solid #444 !important;
  border-radius: 8px !important;
  padding: 12px 15px !important;
}

input:focus,
.p-inputtext:focus {
  border-color: #d15801 !important;
  box-shadow: 0 0 0 1px #d15801 !important;
}

.p-dialog {
  background: #1e1e1e !important;
  border: 1px solid #444 !important;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.7) !important;
}

.p-dialog-header {
  background: #252525 !important;
  color: #d15801 !important;
  border-bottom: 1px solid #333 !important;
  padding: 1.5rem !important;
}

.p-dialog-content {
  background: #1e1e1e !important;
  padding: 2rem !important;
}

.p-dialog-footer {
  background: #1e1e1e !important;
  border-top: 1px solid #333 !important;
  padding: 1.5rem !important;
}

.p-dialog label {
  color: #ccc !important;
  margin-bottom: 0.5rem;
  display: block;
}

.p-select-overlay,
.p-dropdown-panel {
  background: #1e1e1e !important;
  border: 1px solid #444 !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.8) !important;
}

.p-select-header,
.p-dropdown-header {
  background: #252525 !important;
  border-bottom: 1px solid #333 !important;
  padding: 12px !important;
  color: #fff !important;
}

.p-select-filter,
.p-dropdown-filter {
  background: #121212 !important;
  color: white !important;
  border: 1px solid #555 !important;
}

.p-select-option,
.p-dropdown-item {
  color: #e0e0e0 !important;
  background: transparent !important;
  padding: 12px 15px !important;
}

.p-select-option.p-focus,
.p-dropdown-item.p-focus,
.p-select-option:hover,
.p-dropdown-item:hover {
  background: #333 !important;
  color: #d15801 !important;
}

.p-select-option.p-select-option-selected,
.p-dropdown-item.p-highlight {
  background: rgba(209, 88, 1, 0.2) !important;
  color: #d15801 !important;
}
</style>
