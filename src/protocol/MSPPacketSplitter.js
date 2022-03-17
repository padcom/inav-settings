import { MSP, MSPHeader } from './MSP'
import { MSPv1 } from './MSPv1'
import { MSPv2 } from './MSPv2'

export class MSPPacketSplitter {
  #buffer = new Uint8Array()
  #header = new MSPHeader()
  #protocols = {
    [MSPv1.PROTOCOL_ID]: new MSPv1(),
    [MSPv2.PROTOCOL_ID]: new MSPv2(),
  }

  #digest(chunk) {
    this.#buffer = [...this.#buffer, ...chunk]
  }

  #isBufferEmpty() {
    return this.#buffer.length < 5
  }

  #getProtocol() {
    return this.#protocols[this.#header.protocol(this.#buffer)] || null
  }

  #isPacketStart(buffer) {
    return this.#header.start(this.#buffer) === MSPHeader.START_BYTE
  }

  #getExpectedPacketLength(protocol) {
    return protocol.getExpectedPacketLength(this.#buffer)
  }

  #isPacketFullyRetrieved(expectedPacketLength) {
    return this.#buffer.length >= expectedPacketLength
  }

  #checkCRC(buffer, protocol) {
    return protocol.decodeCRC(buffer) === protocol.checksum(buffer)
  }

  #read(length) {
    return this.#buffer.slice(0, length)
  }

  #skip(length = 1) {
    this.#buffer = this.#buffer.slice(length)
  }

  #commit(controller, packet) {
    controller.enqueue(packet)
  }

  transform(chunk, controller) {
    this.#digest(chunk)

    while(true) {
      // check if the buffer is empty
      if (this.#isBufferEmpty()) {
        break
      }
      // check if the first byte in the buffer is a packet start
      if (!this.#isPacketStart(this.#buffer)) {
        this.#skip()
        continue
      }

      // check if the buffer has a valid protocol identifier
      const protocol = this.#getProtocol()
      if (!protocol) {
        this.#skip()
        continue
      }

      // check if the current buffer contains all the data for the packet
      const expectedPacketLength = this.#getExpectedPacketLength(protocol)
      if (!this.#isPacketFullyRetrieved(expectedPacketLength)) {
        // the buffer is not retrieved yet - exiting
        break
      }

      // read the packet from the buffer
      const buffer = this.#read(expectedPacketLength)
      if (this.#checkCRC(buffer, protocol)) {
        // crc matches - it is a valid packet
        this.#commit(controller, buffer)
        this.#skip(expectedPacketLength)
      } else {
        // crc doesn't match - let's skip the first byte and start over
        this.#skip()
      }
    }
  }
}
