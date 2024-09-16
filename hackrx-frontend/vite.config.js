import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import {resolve} from 'path'

dotenv.config({path: resolve(__dirname, '../.env')});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    'process.env':process.env
  }
})
