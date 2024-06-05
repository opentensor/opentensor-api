//@ts-nocheck

import React, { useEffect, useRef } from 'react'

const WebGLCanvas = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    // All WebGL related code encapsulated in useEffect
    const canvas: any = canvasRef.current
    if (!canvas) return

    let gl = canvas.getContext('webgl', { antialias: true })
    if (gl === null) {
      gl = canvas.getContext('experimental-webgl', { antialias: true })
    }
    if (gl === null) {
      alert('Your browser does not support WebGL.\nThis page will not function.')
      return
    }

    // Coordinates of the roots (these are fixed):
    const roots: any = []
    const createRoots = () => {
      const rootFirstKind = (i0: any, i1: any, s0: any, s1: any) => {
        const rt = [0, 0, 0, 0, 0, 0, 0, 0]
        rt[i0] = s0 ? -2 : 2
        rt[i1] = s1 ? -2 : 2
        return rt
      }
      const rootSecondKind = (s0: any, s1: any, s2: any, s3: any, s4: any, s5: any, s6: any) => {
        const s7 = s0 ^ s1 ^ s2 ^ s3 ^ s4 ^ s5 ^ s6
        return [s0 ? -1 : 1, s1 ? -1 : 1, s2 ? -1 : 1, s3 ? -1 : 1, s4 ? -1 : 1, s5 ? -1 : 1, s6 ? -1 : 1, s7 ? -1 : 1]
      }
      for (let i0 = 0; i0 < 8; i0++) {
        for (let i1 = i0 + 1; i1 < 8; i1++) {
          roots.push(rootFirstKind(i0, i1, false, false))
          roots.push(rootFirstKind(i0, i1, false, true))
          roots.push(rootFirstKind(i0, i1, true, false))
          roots.push(rootFirstKind(i0, i1, true, true))
        }
      }
      for (let i = 0; i < 128; i++) {
        roots.push(rootSecondKind(!!(i & 1), !!(i & 2), !!(i & 4), !!(i & 8), !!(i & 16), !!(i & 32), !!(i & 64)))
      }
      roots.sort((a: any, b: any) => {
        // Lexicographic ordering
        for (let k = 0; k < 8; k++) {
          if (a[k] < b[k]) return -1
          else if (a[k] > b[k]) return 1
        }
        return 0
      })
    }
    const sqnorm = (a: any) => a.reduce((ret: any, d: any) => ret + d * d, 0)
    const dotprod = (a: any, b: any) => a.reduce((ret: any, ai: any, i: any) => ret + ai * b[i], 0)
    const sqdist = (a: any, b: any) => a.reduce((ret: any, ai: any, i: any) => ret + (ai - b[i]) * (ai - b[i]), 0)

    // List of edges (an edge connects each even entry of this array to the following):
    let edges: any
    const createEdges = () => {
      const edges0 = []
      for (let a = 0; a < roots.length; a++) {
        for (let b = a + 1; b < roots.length; b++) {
          if (sqdist(roots[a], roots[b]) === 8) {
            edges0.push(a)
            edges0.push(b)
          }
        }
      }
      edges = new Uint16Array(edges0)
    }

    let gaussianStore: any = null
    const gaussian = () => {
      // Generate a Gaussian variable by Box-Muller.
      if (gaussianStore == null) {
        const u0 = Math.random()
        const u1 = Math.random()
        gaussianStore = Math.sqrt(-2 * Math.log(u0)) * Math.cos(2 * Math.PI * u1)
        return Math.sqrt(-2 * Math.log(u0)) * Math.sin(2 * Math.PI * u1)
      } else {
        const ret = gaussianStore
        gaussianStore = null
        return ret
      }
    }

    // The two 8-vectors determining the projection to a plane,
    // plus the two 8-vectors determining the direction of motion:
    // these should be normed and orthogonal and motion should be orthogonal.
    const projMatrix: any = [[], [], [], []]
    const gramSchmidt = () => {
      // Make projMatrix normed and orthogonal.
      const ortho = [[], [0], [0], [0, 1, 2]]
      for (let k = 0; k < ortho.length; k++) {
        let d
        for (let l = 0; l < ortho[k].length; l++) {
          const k2 = ortho[k][l]
          d = dotprod(projMatrix[k], projMatrix[k2])
          for (let i = 0; i < 8; i++) projMatrix[k][i] -= d * projMatrix[k2][i]
        }
        d = Math.sqrt(sqnorm(projMatrix[k]))
        for (let i = 0; i < 8; i++) projMatrix[k][i] /= d
      }
    }
    const chooseProjectionRandom = () => {
      for (let k = 0; k < 8; k++) {
        projMatrix[0][k] = gaussian()
        projMatrix[1][k] = gaussian()
        projMatrix[2][k] = gaussian()
        projMatrix[3][k] = gaussian()
      }
      gramSchmidt()
    }
    const modifyProjection = () => {
      for (let k = 0; k < 8; k++) {
        projMatrix[0][k] += projMatrix[2][k] * 0.01
        projMatrix[1][k] += projMatrix[3][k] * 0.01
        projMatrix[2][k] += gaussian() * 0.01
        projMatrix[3][k] += gaussian() * 0.01
      }
      gramSchmidt()
    }

    let rootProj: any // Projection of the roots (in canvas coordinates)
    let color: any // colours (in size 4)
    let edgeProj
    let shaderProg
    const computeProjections = () => {
      if (typeof rootProj === 'undefined') {
        rootProj = new Float32Array(roots.length * 2)
        color = new Float32Array(roots.length * 4)
        edgeProj = new Float32Array(edges.length * 8)
      }

      for (let n = 0; n < roots.length; n++) {
        const a = dotprod(projMatrix[0], roots[n]) / 3
        const b = dotprod(projMatrix[1], roots[n]) / 3

        rootProj[2 * n] = a
        rootProj[2 * n + 1] = b
        color[2 * n + 0] = 0
        color[2 * n + 1] = 0.1
        color[2 * n + 2] = 0.6
        color[2 * n + 3] = 0.9
      }

      for (let n = 0; n < edges.length; n += 2) {
        const i = edges[n]
        const j = edges[n + 1]

        edgeProj[n] = rootProj[i]
        edgeProj[n + 1] = rootProj[i + 1]
        edgeProj[n + 2] = rootProj[j]
        edgeProj[n + 3] = rootProj[j + 1]
      }
    }

    const drawLines = (buffers: any) => {
      // Draw the 6720 edges.
      // Set the edges as the indices
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers[0])
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, edges, gl.STATIC_DRAW)

      gl.bindBuffer(gl.ARRAY_BUFFER, buffers[1])
      gl.bufferData(gl.ARRAY_BUFFER, rootProj, gl.STATIC_DRAW)
      gl.vertexAttribPointer(shaderProg.pos, 2, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(shaderProg.pos)

      gl.bindBuffer(gl.ARRAY_BUFFER, buffers[2])
      gl.bufferData(gl.ARRAY_BUFFER, color, gl.STATIC_DRAW)
      gl.vertexAttribPointer(shaderProg.col, 1, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(shaderProg.col)
      gl.drawElements(gl.LINES, edges.length, gl.UNSIGNED_SHORT, 0)
    }

    const initGl = (canvas: any, gl: any) => {
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clearColor(0, 0, 0, 0)
      gl.enable(gl.SAMPLE_COVERAGE)
      gl.enable(gl.LINE_SMOOTH)
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
      gl.lineWidth(0.05)
      const v = document.getElementById('vertex-shader').textContent
      const f = document.getElementById('fragment-shader').textContent
      const vs = gl.createShader(gl.VERTEX_SHADER)
      gl.shaderSource(vs, v)
      gl.compileShader(vs)
      const fs = gl.createShader(gl.FRAGMENT_SHADER)
      gl.shaderSource(fs, f)
      gl.compileShader(fs)
      shaderProg = gl.createProgram()
      gl.attachShader(shaderProg, vs)
      gl.attachShader(shaderProg, fs)
      gl.linkProgram(shaderProg)
      gl.useProgram(shaderProg)

      shaderProg.fs = fs
      shaderProg.vs = vs
      shaderProg.col = gl.getAttribLocation(shaderProg, 'col')
      shaderProg.pos = gl.getAttribLocation(shaderProg, 'pos')

      const lineBuf = gl.createBuffer()
      const colourBuf = gl.createBuffer()
      const pointBuf = gl.createBuffer()

      return [lineBuf, pointBuf, colourBuf]
    }

    const computeAndDraw = (buffers) => {
      gl.clear(gl.COLOR_BUFFER_BIT)
      computeProjections()
      drawLines(buffers)
    }

    const buffers = initGl(canvas, gl)
    createRoots()
    createEdges()
    chooseProjectionRandom()
    const update = () => {
      computeAndDraw(buffers)
      modifyProjection()
      window.setTimeout(update, 120)
    }
    update()
  }, [])

  return (
    <div className="flex justify-center items-center w-full h-full">
      <canvas
        id="canvas2"
        ref={canvasRef}
        width="1500"
        height="1500"
        className="w-[29%]  dark:invert object-center"
      ></canvas>

      <script id="vertex-shader" type="x-shader/x-vertex">
        {`
          attribute vec2 col;
          attribute vec2 pos;
          
          // --> Pass to Fragment Shader
          varying vec4 variableC;
          void main() {
              if (col == vec2(0.1, 0)) {
                variableC = vec4(1, 1, 1, 0.9);
              } else {
                variableC = vec4(0, 0, 0, 0.9);
              }
              
              gl_Position = vec4(pos, 0.75, 0.75);
          }
        `}
      </script>

      <script id="fragment-shader" type="x-shader/x-fragment">
        {`
          #ifdef GL_ES
          precision highp float;
          #endif
          varying vec4 variableC;
          
          void main() {
              gl_FragColor = variableC;
          }
        `}
      </script>
    </div>
  )
}

export default WebGLCanvas
