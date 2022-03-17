export class MSPHeader {
  static get START_BYTE() {
    return '$'.charCodeAt(0)
  }

  static get DIRECTION_FROM_MSC() {
    return '>'.charCodeAt(0)
  }

  static get DIRECTION_TO_MSC() {
    return '<'.charCodeAt(0)
  }

  static get UNSUPPORTED() {
    return '!'.charCodeAt(0)
  }

  /**
   * @param buffer {Uint8Array}
   */
  start(buffer) {
    return buffer.length > 0 ? buffer[0] : null
  }

  /**
   * @param buffer {Uint8Array}
   */
  protocol(buffer) {
    return buffer.length > 1 ? buffer[1] : null
  }

  /**
   * @param buffer {Uint8Array}
   */
  direction(buffer) {
    return buffer.length > 2 ? buffer[2] : null
  }

  /**
   * @param buffer {Uint8Array}
   */
  command(buffer) {
    throw new Error('MSPHeader class is abstract and does not implement the "decodeCommand" method. Use protocol-specific packet class instead.')
  }

  /**
   * @param buffer {Uint8Array}
   */
  payloadOffset(buffer) {
    throw new Error('MSPHeader class is abstract and does not implement the "decodePayloadOffset" method. Use protocol-specific packet class instead.')
  }

  /**
   * @param buffer {Uint8Array}
   */
  payloadLength(buffer) {
    throw new Error('MSPHeader class is abstract and does not implement the "decodePayloadLength" method. Use protocol-specific packet class instead.')
  }
}

export class MSP {
  constructor(header = new MSPHeader()) {
    this.header = header
  }

  /**
   * @param buffer {Uint8Array}
   */
  decodePayload(buffer) {
    const offset = this.header.payloadOffset(buffer)
    const length = this.header.payloadLength(buffer)
    const result = new DataView(new ArrayBuffer(length))
    for (let i = 0; i < length; i++) {
      result.setUint8(i, buffer[offset + i])
    }
    return result
  }

  /**
   * @param buffer {Uint8Array}
   */
  getExpectedPacketLength(buffer) {
    return this.header.payloadOffset(buffer) + this.header.payloadLength(buffer) + 1 // crc at the end
  }

  /**
   * @param buffer {Uint8Array}
   */
  decodeCRC(buffer) {
    return buffer[buffer.length - 1]
  }

  /**
   * @param buffer {Uint8Array}
   */
  checksum(buffer) {
    throw new Error('MSP class is abstract and does not implement the "checksum" method. Use protocol-specific packet class instead.')
  }

  /**
   * @param buffer {Uint8Array}
   */
  decode(buffer) {
    throw new Error('MSP class is abstract and does not implement the "decode" method. Use protocol-specific packet class instead.')
  }

  /**
   * @param direction {String} direction ('<' or '>')
   * @param command {Number} command id
   * @param payload {Uint8Array} payload
   */
  encode(direction, command, payload) {
    throw new Error('MSP class is abstract and does not implement the "encode" method. Use protocol-specific packet class instead.')
  }
}
