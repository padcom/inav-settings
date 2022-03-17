<template>
  <h1>INav Settings</h1>
  <h2 v-if="hasSerialPortCapability">Serial port supported</h2>
  <h2 v-else>Serial port not supported</h2>
  <button @click="open">Open serial port</button>
  <pre><code>{{ port }}</code></pre>
</template>

<script>
import { defineComponent } from 'vue'
import { Byterizer } from './protocol/Byterizer'
import { MSPPacketSplitter } from './protocol/MSPPacketSplitter'
import { MSPHeader } from './protocol/MSP'
import { MSPv1 } from './protocol/MSPv1'
import { IdentRequest, IdentResponse, MSP_IDENT } from './command/v1/Ident'

export default defineComponent ({
  data() {
    return {
      hasSerialPortCapability: !!navigator.serial
    }
  },
  created() {
    this.port = null
  },
  async mounted() {
  },
  methods: {
    async open() {
      const filters = [
        { usbVendorId: 0x0483, usbProductId: 0x5740 },
      ]
      const port = await navigator.serial.requestPort({ filters })
      if (!port) return
      await port.open({ baudRate: 115200 })

      const request = new IdentRequest()
      const buffer  = new MSPv1().encode(MSPHeader.DIRECTION_TO_MSC, request.command, request.payload)
      console.log('Buffer', buffer)
      const writer = port.writable.getWriter()
      try {
        const result = await writer.write(buffer)
        console.log('result', result)
      } finally {
        writer.releaseLock()
      }

      const reader = port.readable
        // .pipeThrough(new TransformStream(new Byterizer()))
        .pipeThrough(new TransformStream(new MSPPacketSplitter()))
        .getReader()

      while (true) {
        const { value: buffer, done } = await reader.read()
        if (done) {
          reader.releaseLock()
          break
        } else {
          const decoded = new IdentResponse(new MSPv1(), buffer).toString()
          console.log('packet', decoded)
        }
      }
    },
  }
})
</script>
